-- ============================================================
--  دلالة — تطبيق المالك: قاعدة البيانات السحابية (Supabase / PostgreSQL)
--  شغّل هذا الملف كاملاً مرة واحدة في Supabase ← SQL Editor ← Run
--  المبالغ كلها بالملّيم (1000 = 1 دينار) كما في المنظومة.
-- ============================================================
create extension if not exists pgcrypto with schema extensions;

create table if not exists public.stores (
  id          uuid primary key default gen_random_uuid(),
  owner       uuid not null references auth.users(id) on delete cascade,
  name        text not null default 'متجري',
  currency    text not null default 'د.ل',
  secret_hash text not null,
  last_seen   timestamptz,
  created_at  timestamptz not null default now()
);
create index if not exists stores_owner_idx on public.stores(owner);

create table if not exists public.daily (
  store_id uuid not null references public.stores(id) on delete cascade,
  day date not null,
  sales bigint not null default 0, invoices int not null default 0,
  profit bigint not null default 0, expenses bigint not null default 0,
  collections bigint not null default 0, purchases bigint not null default 0,
  primary key (store_id, day)
);
create table if not exists public.invoices (
  store_id uuid not null references public.stores(id) on delete cascade,
  local_id bigint not null, no text not null, customer text not null default '',
  total bigint not null default 0, returned bigint not null default 0, paid bigint not null default 0,
  method text not null default 'cash', status text not null default 'completed',
  created_at timestamp not null, items jsonb not null default '[]'::jsonb,
  primary key (store_id, local_id)
);
create index if not exists invoices_time_idx on public.invoices(store_id, created_at desc);
create table if not exists public.expenses (
  store_id uuid not null references public.stores(id) on delete cascade,
  local_id bigint not null, category text not null default '', description text not null default '',
  amount bigint not null default 0, method text not null default 'cash', created_at timestamp not null,
  primary key (store_id, local_id)
);
create index if not exists expenses_time_idx on public.expenses(store_id, created_at desc);
create table if not exists public.vouchers (
  store_id uuid not null references public.stores(id) on delete cascade,
  local_id bigint not null, no text not null default '', kind text not null default 'receipt',
  party text not null default '', amount bigint not null default 0, method text not null default 'cash',
  note text not null default '', created_at timestamp not null,
  primary key (store_id, local_id)
);
create index if not exists vouchers_time_idx on public.vouchers(store_id, created_at desc);
-- لقطات صغيرة (مخزون منخفض، قيمة المخزون، الديون ...)
create table if not exists public.snapshot (
  store_id uuid not null references public.stores(id) on delete cascade,
  key text not null, data jsonb not null default '{}'::jsonb, updated_at timestamptz not null default now(),
  primary key (store_id, key)
);

-- ---------- الأمان: المالك يقرأ متجره فقط، ولا أحد يكتب مباشرة ----------
alter table public.stores   enable row level security;
alter table public.daily    enable row level security;
alter table public.invoices enable row level security;
alter table public.expenses enable row level security;
alter table public.vouchers enable row level security;
alter table public.snapshot enable row level security;

drop policy if exists own_store on public.stores;
create policy own_store on public.stores for select to authenticated using (owner = auth.uid());
do $$ declare t text; begin
  foreach t in array array['daily','invoices','expenses','vouchers','snapshot'] loop
    execute format('drop policy if exists own_rows on public.%I', t);
    execute format('create policy own_rows on public.%I for select to authenticated using (exists (select 1 from public.stores s where s.id = store_id and s.owner = auth.uid()))', t);
  end loop;
end $$;
revoke all on public.stores, public.daily, public.invoices, public.expenses, public.vouchers, public.snapshot from anon, authenticated;
grant select on public.stores, public.daily, public.invoices, public.expenses, public.vouchers, public.snapshot to authenticated;

-- ---------- دوال الرفع (تُستدعى من المنظومة بمفتاح المتجر السري) ----------
create or replace function public._store_ok(p_store uuid, p_secret text) returns boolean
language sql security definer set search_path = public, extensions as $$
  select exists (select 1 from stores s where s.id = p_store and s.secret_hash = extensions.crypt(p_secret, s.secret_hash));
$$;
revoke all on function public._store_ok(uuid, text) from public, anon, authenticated;

-- فحص الربط: يرجع اسم المتجر إن كان المفتاح صحيحاً
create or replace function public.ping_store(p_store uuid, p_secret text) returns text
language plpgsql security definer set search_path = public, extensions as $$
declare n text;
begin
  if not public._store_ok(p_store, p_secret) then raise exception 'bad_key'; end if;
  update stores set last_seen = now() where id = p_store returning name into n;
  return n;
end $$;

-- رفع دفعة صفوف. p_from: إن وُجد تُحذف صفوف الجدول من هذا التاريخ فصاعداً ثم تُدرج الدفعة (لمزامنة الحذف والتعديل)
create or replace function public.push_data(p_store uuid, p_secret text, p_table text, p_rows jsonb, p_from text default null, p_name text default null, p_currency text default null)
returns int language plpgsql security definer set search_path = public, extensions as $$
declare n int := 0; f timestamp;
begin
  if not public._store_ok(p_store, p_secret) then raise exception 'bad_key'; end if;
  if p_rows is null or jsonb_typeof(p_rows) <> 'array' then raise exception 'rows_must_be_array'; end if;
  if jsonb_array_length(p_rows) > 2000 then raise exception 'too_many_rows'; end if;
  f := nullif(p_from, '')::timestamp;
  if p_name is not null or p_currency is not null then
    update stores set name = coalesce(nullif(p_name, ''), name), currency = coalesce(nullif(p_currency, ''), currency) where id = p_store;
  end if;
  update stores set last_seen = now() where id = p_store;
  if p_table = 'daily' then
    if f is not null then delete from daily where store_id = p_store and day >= f::date; end if;
    insert into daily(store_id, day, sales, invoices, profit, expenses, collections, purchases)
      select p_store, (r->>'day')::date, coalesce((r->>'sales')::bigint,0), coalesce((r->>'invoices')::int,0), coalesce((r->>'profit')::bigint,0),
             coalesce((r->>'expenses')::bigint,0), coalesce((r->>'collections')::bigint,0), coalesce((r->>'purchases')::bigint,0)
      from jsonb_array_elements(p_rows) r
      on conflict (store_id, day) do update set sales=excluded.sales, invoices=excluded.invoices, profit=excluded.profit, expenses=excluded.expenses, collections=excluded.collections, purchases=excluded.purchases;
  elsif p_table = 'invoices' then
    if f is not null then delete from invoices where store_id = p_store and created_at >= f; end if;
    insert into invoices(store_id, local_id, no, customer, total, returned, paid, method, status, created_at, items)
      select p_store, (r->>'id')::bigint, coalesce(r->>'no',''), coalesce(r->>'customer',''), coalesce((r->>'total')::bigint,0), coalesce((r->>'returned')::bigint,0),
             coalesce((r->>'paid')::bigint,0), coalesce(r->>'method','cash'), coalesce(r->>'status','completed'), (r->>'at')::timestamp, coalesce(r->'items','[]'::jsonb)
      from jsonb_array_elements(p_rows) r
      on conflict (store_id, local_id) do update set no=excluded.no, customer=excluded.customer, total=excluded.total, returned=excluded.returned, paid=excluded.paid,
        method=excluded.method, status=excluded.status, created_at=excluded.created_at, items=excluded.items;
  elsif p_table = 'expenses' then
    if f is not null then delete from expenses where store_id = p_store and created_at >= f; end if;
    insert into expenses(store_id, local_id, category, description, amount, method, created_at)
      select p_store, (r->>'id')::bigint, coalesce(r->>'category',''), coalesce(r->>'description',''), coalesce((r->>'amount')::bigint,0), coalesce(r->>'method','cash'), (r->>'at')::timestamp
      from jsonb_array_elements(p_rows) r
      on conflict (store_id, local_id) do update set category=excluded.category, description=excluded.description, amount=excluded.amount, method=excluded.method, created_at=excluded.created_at;
  elsif p_table = 'vouchers' then
    if f is not null then delete from vouchers where store_id = p_store and created_at >= f; end if;
    insert into vouchers(store_id, local_id, no, kind, party, amount, method, note, created_at)
      select p_store, (r->>'id')::bigint, coalesce(r->>'no',''), coalesce(r->>'kind','receipt'), coalesce(r->>'party',''), coalesce((r->>'amount')::bigint,0),
             coalesce(r->>'method','cash'), coalesce(r->>'note',''), (r->>'at')::timestamp
      from jsonb_array_elements(p_rows) r
      on conflict (store_id, local_id) do update set no=excluded.no, kind=excluded.kind, party=excluded.party, amount=excluded.amount, method=excluded.method, note=excluded.note, created_at=excluded.created_at;
  elsif p_table = 'snapshot' then
    insert into snapshot(store_id, key, data, updated_at)
      select p_store, r->>'key', coalesce(r->'data','{}'::jsonb), now() from jsonb_array_elements(p_rows) r
      on conflict (store_id, key) do update set data = excluded.data, updated_at = now();
  else
    raise exception 'unknown_table';
  end if;
  get diagnostics n = row_count;
  -- تنظيف تلقائي: الاحتفاظ بآخر 400 يوم فقط لتوفير المساحة
  if p_table = 'invoices' then delete from invoices where store_id = p_store and created_at < now() - interval '400 days';
  elsif p_table = 'expenses' then delete from expenses where store_id = p_store and created_at < now() - interval '400 days';
  elsif p_table = 'vouchers' then delete from vouchers where store_id = p_store and created_at < now() - interval '400 days';
  elsif p_table = 'daily' then delete from daily where store_id = p_store and day < current_date - 800;
  end if;
  return n;
end $$;
revoke all on function public.ping_store(uuid, text), public.push_data(uuid, text, text, jsonb, text, text, text) from public;
grant execute on function public.ping_store(uuid, text), public.push_data(uuid, text, text, jsonb, text, text, text) to anon, authenticated;

-- ---------- ربط متجر جديد (يستدعيها تطبيق المالك بعد تسجيل الدخول) ----------
create or replace function public.create_store(p_name text) returns table(store_id uuid, secret text)
language plpgsql security definer set search_path = public, extensions as $$
declare sid uuid; sec text; raw text;
begin
  if auth.uid() is null then raise exception 'not_signed_in'; end if;
  if (select count(*) from stores where owner = auth.uid()) >= 10 then raise exception 'too_many_stores'; end if;
  raw := upper(encode(extensions.gen_random_bytes(10), 'hex'));      -- 20 خانة
  sec := substr(raw,1,5)||'-'||substr(raw,6,5)||'-'||substr(raw,11,5)||'-'||substr(raw,16,5);
  insert into stores(owner, name, secret_hash) values (auth.uid(), coalesce(nullif(trim(p_name),''),'متجري'), extensions.crypt(sec, extensions.gen_salt('bf'))) returning id into sid;
  return query select sid, sec;
end $$;
-- مفتاح جديد (إن ضاع أو للأمان): يُبطل القديم
create or replace function public.rotate_secret(p_store uuid) returns text
language plpgsql security definer set search_path = public, extensions as $$
declare sec text; raw text;
begin
  if auth.uid() is null then raise exception 'not_signed_in'; end if;
  if not exists (select 1 from stores where id = p_store and owner = auth.uid()) then raise exception 'not_yours'; end if;
  raw := upper(encode(extensions.gen_random_bytes(10), 'hex'));
  sec := substr(raw,1,5)||'-'||substr(raw,6,5)||'-'||substr(raw,11,5)||'-'||substr(raw,16,5);
  update stores set secret_hash = extensions.crypt(sec, extensions.gen_salt('bf')) where id = p_store;
  return sec;
end $$;
revoke all on function public.create_store(text), public.rotate_secret(uuid) from public, anon;
grant execute on function public.create_store(text), public.rotate_secret(uuid) to authenticated;

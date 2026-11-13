#!/usr/bin/env python3
"""build.py — يجمع تطبيق المالك في ملف واحد www/index.html (خط Tajawal مضمّن)."""
import base64,json,os
R=os.path.dirname(os.path.abspath(__file__))
rd=lambda p:open(os.path.join(R,p),encoding='utf-8').read()
b64=lambda p:base64.b64encode(open(os.path.join(R,p),'rb').read()).decode()
cfg={}
if os.path.exists(os.path.join(R,'config.json')):cfg=json.load(open(os.path.join(R,'config.json')))
fonts=''.join(f"@font-face{{font-family:Tajawal;font-weight:{w};font-display:swap;src:url(data:font/woff2;base64,{b64('build/taj-'+n+'.woff2')}) format('woff2')}}" for w,n in((400,'Regular'),(700,'Bold')))
html=f'''<!DOCTYPE html>
<html lang="ar" dir="rtl"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#070d1a"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="دلالة"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<link rel="manifest" href="manifest.webmanifest"><link rel="apple-touch-icon" href="icon.png"><link rel="icon" href="icon.png">
<title>دلالة — تطبيق المالك</title>
<style>{fonts}
{rd('src/style.css')}</style></head>
<body><div id="root"></div>
<script>window.OWNER_CONFIG={json.dumps(cfg)};</script>
<script>{rd('src/app.js')}</script></body></html>'''
os.makedirs(os.path.join(R,'www'),exist_ok=True)
open(os.path.join(R,'www/index.html'),'w',encoding='utf-8').write(html)
print('built',len(html)//1024,'KB')

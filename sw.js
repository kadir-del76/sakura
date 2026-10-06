// Sakura Service Worker – macht die App offline nutzbar.
// WICHTIG: Bei jedem Update der App die Versionsnummer erhöhen, sonst behalten Handys die alte Version.
const VERSION='sakura-v2';
const FILES=[
  "./",
  "fonts/fonts.css",
  "fonts/noto-sans-jp-commands.woff2",
  "fonts/noto-serif-jp-sakura.woff2",
  "fonts/saira-condensed-latin-600-normal.woff2",
  "fonts/saira-condensed-latin-700-normal.woff2",
  "fonts/saira-condensed-latin-800-normal.woff2",
  "fonts/saira-condensed-latin-ext-600-normal.woff2",
  "fonts/saira-condensed-latin-ext-700-normal.woff2",
  "fonts/saira-condensed-latin-ext-800-normal.woff2",
  "fonts/saira-latin-400-normal.woff2",
  "fonts/saira-latin-500-normal.woff2",
  "fonts/saira-latin-600-normal.woff2",
  "fonts/saira-latin-800-italic.woff2",
  "fonts/saira-latin-ext-400-normal.woff2",
  "fonts/saira-latin-ext-500-normal.woff2",
  "fonts/saira-latin-ext-600-normal.woff2",
  "fonts/saira-latin-ext-800-italic.woff2",
  "icons/apple-touch-icon.png",
  "icons/favicon-32.png",
  "icons/icon-1024.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
  "index.html",
  "manifest.webmanifest"
];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
// Erst den Speicher auf dem Handy fragen (schnell, offline), sonst das Netz.
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>hit||fetch(e.request).then(res=>{
    if(res.ok&&new URL(e.request.url).origin===location.origin){const copy=res.clone();caches.open(VERSION).then(c=>c.put(e.request,copy))}
    return res;
  }).catch(()=>caches.match('index.html'))));
});

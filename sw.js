// Sakura Service Worker – macht die App offline nutzbar.
// WICHTIG: Bei jedem Update der App die Versionsnummer erhöhen (und dieselbe Nummer in index.html, APP_VERSION).
const VERSION='sakura-v8';
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

// Die App selbst (Seitenaufruf): zuerst aus dem Netz, damit Updates sofort ankommen.
// Kommt nach 3 Sekunden keine Antwort (schlechter Empfang) oder gar keine, wird die gespeicherte Kopie genommen.
function networkFirst(req){
  return new Promise(resolve=>{
    let done=false;
    const fallback=()=>caches.match('index.html').then(r=>{if(!done){done=true;resolve(r||fetch(req))}});
    const t=setTimeout(fallback,3000);
    fetch(req,{cache:'no-store'}).then(res=>{
      if(res.ok){const copy=res.clone();caches.open(VERSION).then(c=>c.put('index.html',copy))}
      clearTimeout(t);if(!done){done=true;resolve(res)}
    }).catch(()=>{clearTimeout(t);fallback()});
  });
}

self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  if(e.request.mode==='navigate'){e.respondWith(networkFirst(e.request));return}
  // Alles andere (Schriften, Icons): zuerst vom Gerät, das ist schnell und ändert sich selten.
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>hit||fetch(e.request).then(res=>{
    if(res.ok&&new URL(e.request.url).origin===location.origin){const copy=res.clone();caches.open(VERSION).then(c=>c.put(e.request,copy))}
    return res;
  })));
});

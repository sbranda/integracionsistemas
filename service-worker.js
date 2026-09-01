// Subí la versión del cache cada vez que hagas un cambio grande de estructura
// de archivos (agregar/quitar archivos del app shell). Los cambios de
// contenido (data.js) ya no necesitan esto: la estrategia network-first de
// abajo siempre trae la versión más nueva cuando hay conexión.
const CACHE_NAME = 'integracion-shell-v2';

const APP_SHELL = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './data.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network-first: si hay conexión, siempre trae la versión más nueva del
// servidor y actualiza la caché. Si no hay conexión, usa la última copia
// guardada. Esto evita que la app quede "pegada" mostrando contenido viejo
// después de actualizar data.js, app.js, etc.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

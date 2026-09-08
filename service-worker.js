// Subí la versión del cache cada vez que hagas un cambio grande de estructura
// de archivos (agregar/quitar archivos del app shell).
const CACHE_NAME = 'integracion-shell-v4';

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

// Network-first, ignorando también la caché HTTP normal del navegador
// (cache: 'no-store'): así siempre se pide la versión más nueva al servidor
// cuando hay conexión, sin importar los headers de caché que use el
// hosting. Si no hay conexión, se usa la última copia guardada en la
// Cache API (que sí actualizamos nosotros mismos en cada fetch exitoso).
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request, { cache: 'no-store' })
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

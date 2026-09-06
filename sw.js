const CACHE_NAME = 'word-cards-v2';
const APP_SHELL = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './words_data.js',
  './words_data_2.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Network-first, falling back to the cache only when the network is unreachable (so the
// app still opens standalone from the home screen with no connection). Deliberately NOT
// cache-first: a cache-first strategy served every future code change forever from a
// stale cache to anyone who'd already installed the app, surviving even a hard refresh
// (unlike the browser's own HTTP cache, a service worker's Cache Storage isn't bypassed
// by cmd/ctrl+shift+R) — confirmed live when a gender-badge fix landed on the server but
// installed users kept seeing the old behavior indefinitely. Network-first is self-healing:
// online users always get current code, and bumping CACHE_NAME is never required again.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request).then((response) => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
      }
      return response;
    }).catch(() => caches.match(event.request))
  );
});

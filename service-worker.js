const CACHE = 'v1';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll([
      './',
      './index.html',
      './manifest.json',
      './icon-192.png',
      './icon-512.png'
    ]))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).then(response => {
      const responseClone = response.clone();
      caches.open(CACHE).then(cache => cache.put(e.request, responseClone));
      return response;
    }).catch(() => caches.match(e.request))
  );
});
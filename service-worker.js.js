const CACHE="nyan-shop-v1";

const FILES=[
  "./",
  "./index.html",
  "./manifest.json",
  "./service-worker.js"
];

self.addEventListener("install",event=>{
  event.waitUntil(
    caches.open(CACHE).then(cache=>cache.addAll(FILES))
  );
});

self.addEventListener("fetch",event=>{
  event.respondWith(
    caches.match(event.request).then(cached=>{
      return cached || fetch(event.request);
    })
  );
});

self.addEventListener("activate",event=>{
  event.waitUntil(
    caches.keys().then(keys=>
      Promise.all(
        keys
          .filter(key=>key!==CACHE)
          .map(key=>caches.delete(key))
      )
    )
  );
});

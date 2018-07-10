let cacheName = "Restaurant-Reviews";

// Install service worker and cache the files
self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open(cacheName).then(function(cache) {
        return cache.addAll(
          [
            './css/styles.css',
            './data/restaurants.json',
            './js/sw/index.js',
            './js/dbhelper.js',
            './js/main.js',
            './js/restaurant_info.js',
            './img/1.jpg',
            './img/2.jpg',
            './img/3.jpg',
            './img/4.jpg',
            './img/5.jpg',
            './img/6.jpg',
            './img/7.jpg',
            './img/8.jpg',
            './img/9.jpg',
            './img/10.jpg',
            './index.html',
            './restaurant.html',
          ]
        );
      })
    );
  });
console.log('All files are cached.');

// Removing outdated cache
self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName) {
              return (true);
            }).map(function(cacheName) {
              return caches.delete(cacheName);
            })
        );
      })
    );
  });
console.log('Old cache deleted.');

// Cache falling back to the network
self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });
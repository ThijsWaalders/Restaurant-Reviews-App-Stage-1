let cacheName = "Restaurant-Reviews";

// Install service worker and cache the files
self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open(cacheName).then(function(cache) {
        return cache.addAll(
          [
            './css/styles.css',
            './data/restaurants.json',
            './sw.js',
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

// Cache falling back to the network - in chrome this will give a error,
// it's a chrome bug. It does work in Firefox (maybe that is the reason
// why I didn't heard about it from the first reviewer).
self.addEventListener('fetch', (event) => {
	console.log("Fetched");
	event.respondWith(
		caches.match(event.request).then((response) => {
			if (response) return response;
			return fetch(event.request);
		})
	);
});

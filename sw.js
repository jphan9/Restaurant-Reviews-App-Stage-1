var staticCacheName = 'restaurant-v1';
self.addEventListener('install', function(event) {
  console.log("Installed");
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        'sw.js',
        'index.html',
        'restaurant.html',
        'js/main.js',
        'js/restaurant_info.js',
        'js/dbhelper.js',
        'js/register_sw.js',
        'img/1.jpg',
        'img/2.jpg',
        'img/3.jpg',
        'img/4.jpg',
        'img/5.jpg',
        'img/6.jpg',
        'img/7.jpg',
        'img/8.jpg',
        'img/9.jpg',
        'img/10.jpg',
        'data/restaurants.json',
        'css/responsive.css',
        'css/styles.css',
        'https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,600,700&amp;subset=cyrillic'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log("activated");

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(cacheNames.map(function(thisStaticCacheName) {
        if(thisStaticCacheName !== staticCacheName) {
          console.log("Removing Cached files", thisStaticCacheName);
          return caches.delete(thisStaticCacheName);
        }
      }));
    })
  );

});

self.addEventListener('fetch', function(event) {
  console.log("fetching", event.request.url);
  event.respondWith(
    caches.open(staticCacheName).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        if(response) {
          console.log('found in cache', event.request.url);
          return response;
        }
        return fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
    .catch(function(error) {
      console.log('Error fectching data:', error);
    })
  );
});

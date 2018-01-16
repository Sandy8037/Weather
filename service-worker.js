var cacheName = 'v1';
var cacheFiles = [
    './index.html',
    './styles.css',
    './app.js',
    './city.list.json',
    './src/angular.min.js'
];

self.addEventListener('install', function(e){
    console.log('[ServiceWorker] installed');

    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] caching cacheFiles');
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('activate', function(e){
    console.log('[ServiceWorker] activated');

    e.waitUntil(
        caches.keys().then(function(cacheName) {
            return Promise.all(cacheName.map(function(thisCacheName) {
                if (thisCacheName !== cacheName) {
                    console.log('[ServiceWorker] removing cached files from', thisCacheName);
                    return caches.delete(thisCacheName);
                }
            }))
        })
    );
});

self.addEventListener('fetch', function(e){
    console.log('[ServiceWorker] fetching', e.request.url);

    e.respondWith(
        caches.match(e.request).then(function(response){
            if (response) {
                console.log('[ServiceWorker] found in the cache', e.request.url);
                return response;
            }

            var requestClone = e.request.clone();

            fetch(requestClone).then(function(response) {
                if (!response) {
                    console.log('[ServiceWorker] no response from fetch');
                    return response;
                }

                var responseClone = response.clone();
                caches.open(cacheName).then(function(cache) {
                    console.log('[ServiceWorker] new data from', e.request.url);
                    cache.put(e.request, responseClone);
                    return response;
                });
            })
            .catch(function(err) {
                console.log('[ServiceWorker] error fetching and caching new data', err);
            });
        })
    );
});
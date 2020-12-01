let CACHE_NAME = "mex_1";
let CACHED_URLS = [
    "/index.html",
    "/js/app.js",
];


self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(CACHED_URLS);
        })
    );
});
self.addEventListener("fetch", function(event) {
    let requestURL = new URL(event.request.url);
// Handle requests for index.html
    if (requestURL.pathname === "/" || requestURL.pathname === "/index.html") {
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return cache.match("/index.html").then(function(cachedResponse) {
                    let fetchPromise = fetch("/index.html")
                        .then(function(networkResponse) {
                            cache.put("/index.html", networkResponse.clone());
                            return networkResponse;
                        });
                    return cachedResponse || fetchPromise;
                });
            })
        );
    } else if (CACHED_URLS.includes(requestURL.href) || CACHED_URLS.includes(requestURL.pathname)) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return cache.match(event.request).then(function (response) {
                    return response || fetch(event.request);
                });
            })
        );
    }
});

self.addEventListener("activate", function (event){
    event.waitUntil(
        caches.keys().then(function (cacheNames){
            return Promise.all(
                cacheNames.map(function (cacheName){
                    if(CACHE_NAME !== cacheName && cacheName.startsWith("mex")){
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})
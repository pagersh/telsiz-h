const CACHE_NAME = 'hamzachat-v1';
const assetsToCache = [
    './',
    './index.html',
    './manifest.json'
];

// Kurulum aşamasında dosyaları önbelleğe al
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(assetsToCache);
        })
    );
    self.skipWaiting();
});

// Eski önbellekleri temizleme
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// İstekleri yönetme (Firebase ve harici CDN'leri engellemeden)
self.addEventListener('fetch', (event) => {
    // Firebase veritabanı veya Googleapis isteklerine müdahale etme
    if (event.request.url.includes('firebaseio.com') || event.request.url.includes('googleapis.com') || event.request.url.includes('gstatic.com')) {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .catch(() => caches.match(event.request))
    );
});
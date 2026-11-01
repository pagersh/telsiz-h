self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {};
    const title = data.title || "HAMZACHAT Pager";
    const options = {
        body: data.body || "Yeni şifreli mesaj alındı.",
        icon: "https://cdn-icons-png.flaticon.com/512/3602/3602145.png"
    };
    event.waitUntil(self.registration.showNotification(title, options));
});
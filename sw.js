/* Service worker - Thu nhap PVG
   Chi cache tai nguyen tinh cua app (HTML/manifest/icon). Khong dung toi IndexedDB/localStorage
   va khong chan request nao khac nguon hoac khac phuong thuc GET.
   Cap nhat phien ban: doi v1 -> v2 ben duoi va thay index.html. */
const PREFIX = 'thu-nhap-pvg-cache-';
const CACHE_NAME = PREFIX + 'v1';
const ASSETS = [
  './',
  'index.html',
  'manifest.json',
  'icon-192.png',
  'icon-512.png',
  'icon-512-maskable.png'
  /* App khong goi thu vien CDN nao nen khong co URL ngoai de cache */
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((names) => Promise.all(
        names.filter((n) => n.startsWith(PREFIX) && n !== CACHE_NAME).map((n) => caches.delete(n))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  e.respondWith(
    caches.open(CACHE_NAME).then((c) => c.match(req)).then((hit) => {
      if (hit) return hit;
      return fetch(req).then((res) => {
        if (res && res.ok && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, copy)).catch(() => {});
        }
        return res;
      }).catch(() =>
        caches.open(CACHE_NAME).then((c) => c.match('index.html'))
      );
    })
  );
});

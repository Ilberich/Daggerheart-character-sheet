// Daggerheart PWA — Service Worker
// Caches all app assets on install so the sheet works offline.

const CACHE = 'daggerheart-v4';

const PRECACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.jsx',
  '/data/classes.js',
  '/data/config.js',
  '/data/ancestries.js',
  '/data/equipment.js',
  '/data/domain-cards.js',
  '/data/themes.js',
  '/data/rules.js',
  '/utils/advancement.js',
  '/components/ui.jsx',
  '/components/companion-tab.jsx',
  '/components/trait-modal.jsx',
  '/components/level-up-modal.jsx',
  '/components/character-sheet.jsx',
  'https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.3/babel.min.js',
];

// CDN origins that use cache-first (versioned/immutable URLs)
const CDN_ORIGINS = ['cdnjs.cloudflare.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];

// Install: cache all critical assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(PRECACHE))
      .catch(err => console.warn('[SW] Precache partial failure:', err))
  );
  self.skipWaiting();
});

// Activate: clean up old cache versions
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch handler
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // CDN resources: cache-first (versioned and immutable)
  if (CDN_ORIGINS.some(o => url.hostname.includes(o))) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(res => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return res;
        });
      })
    );
    return;
  }

  // All local app files: network-first so updates deploy automatically.
  // Falls back to cache for offline use.
  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});

var cacheName = 'gods';
var filesToCache = [
	'/',
	'/index.html',
	'/css/style.css',
	'/js/main.js'
];

/* Start the service worker and cache all the app's content */
/* Here 'self' refers to window object */
self.addEventListener('install', function(e){
	e.waitUntil(
		caches.open(cacheName).then((cache)=>{
			return cache.addAll(filesToCache);
		})
	);
});

/* Serve cached content when offline */
self.addEventListener('fetch', e => {
	e.respondWith(
		caches.match(e.request).then(response => {
			return response || fetch(e.request);
		})
	);
});
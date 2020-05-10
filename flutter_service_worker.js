'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "712ded3694b54f353675fd168c2308c6",
"assets/FontManifest.json": "3f7402c0d6d257e1811611c2ecd8d356",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"assets/fonts/Monda-Bold.ttf": "e2a8a23323cd7013a66f78b94b4eef22",
"assets/fonts/Monda-Regular.ttf": "84adf497d7c42640df9a137582bed209",
"assets/fonts/UnicaOne-Regular.ttf": "4e4ddc8c402295893fb881d4bcc43fad",
"assets/LICENSE": "4a3b954fa3b131e24aa5d846dcc89b7a",
"assets/packages/material_design_icons_flutter/lib/fonts/materialdesignicons-webfont.ttf": "e7dec9c5e1bd830c084f2d2fb94fa1e7",
"favicon.png": "c653fbefd4d8d73a2a2d1ac3c6a14a28",
"icons/icon_256.png": "1eab1a6594db9452fac991d67dd8a8de",
"icons/icon_512.png": "c1377bc0a5500d503a16c59014fdeea7",
"index.html": "be67a992222197f5f167ac777e604991",
"/": "be67a992222197f5f167ac777e604991",
"main.dart.js": "f6909a4394c1701905f1101dc96a8045",
"manifest.json": "11af150e35c57a0cb148132b5a3746a4"
};

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheName) {
      return caches.delete(cacheName);
    }).then(function (_) {
      return caches.open(CACHE_NAME);
    }).then(function (cache) {
      return cache.addAll(Object.keys(RESOURCES));
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

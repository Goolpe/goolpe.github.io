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
"favicon.png": "b1355b6505d5a52bffa5a2453fff5d40",
"icons/ic-256.png": "8fbca49c79ae60339d29448745fb2127",
"icons/ic-512.png": "28c052fc8ebb745f58a2a0fe27190e01",
"index.html": "ef00e318b087c6ae9b5f8bef63a6524f",
"/": "ef00e318b087c6ae9b5f8bef63a6524f",
"main.dart.js": "f028a47eef5461dfd0f7ac58f95c85f8",
"manifest.json": "3dab48bc69634ec1de7872ff5f31dd53"
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

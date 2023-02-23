'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "009c9e65172e010890f7f65fde438006",
"index.html": "8c7537bef0b267fe6fe44081a4f5879b",
"/": "8c7537bef0b267fe6fe44081a4f5879b",
"styles.css": "c7b17ad84259c7affdd5075b334b654b",
"main.dart.js": "f4280bc151d2c2c93691b09c0ab75552",
"flutter.js": "a85fcf6324d3c4d3ae3be1ae4931e9c5",
"favicon.png": "282d057e56cfeef9dc46a40bd9caa48d",
"icons/Icon-192.png": "68632bbeb1e15b6d1d5942826e3e8388",
"icons/Icon-512.png": "817497cd1eb882084d881fbcc376bde7",
"manifest.json": "78803926c9d5482f9c088d5a51191811",
"assets/AssetManifest.json": "8e175089bbc0104ce19cc93b80028e3a",
"assets/NOTICES": "6fc130cccddaa55f94a666c84898d10c",
"assets/FontManifest.json": "7b2a36307916a9721811788013e65289",
"assets/packages/easy_localization/i18n/ar-DZ.json": "acc0a8eebb2fcee312764600f7cc41ec",
"assets/packages/easy_localization/i18n/en.json": "5f5fda8715e8bf5116f77f469c5cf493",
"assets/packages/easy_localization/i18n/en-US.json": "5f5fda8715e8bf5116f77f469c5cf493",
"assets/packages/easy_localization/i18n/ar.json": "acc0a8eebb2fcee312764600f7cc41ec",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/assets/images/big/github.webp": "a3c5a1c82b625f17ad473d752662e4e7",
"assets/assets/images/big/ekf.webp": "7a00da88c94418988773f7d2a32d560e",
"assets/assets/images/big/epro.webp": "59b5f947ee6bff419ebc49945fb59a87",
"assets/assets/images/big/osom.webp": "383cbfc8d03b30b9b5542442b6c68eba",
"assets/assets/images/big/rostock.webp": "b889e60cf4ad9f2ce4b074a8a8c2a11c",
"assets/assets/images/other/artur.webp": "453c268c082ddababffe5f9bda9a52c2",
"assets/assets/images/other/background.webp": "1c5c819debb1cdeb35406044e6590dd2",
"assets/assets/images/other/picture.png": "eee957efc724440d6680a11ca6518242",
"assets/assets/images/icons/linkedin.webp": "89c4e54041fb6512b8d366035c472f1e",
"assets/assets/images/icons/githubwhite.webp": "a23bdb23e0bfe802ba96dbf1b4881c6d",
"assets/assets/images/icons/github.webp": "9baf7632efd80f15960d3bbacd58985a",
"assets/assets/images/icons/ekf.webp": "a7322db27e00fc92a6369328cedf5190",
"assets/assets/images/icons/googleplay.webp": "af1e9bbdc969cb1ecc34794e2edeafb7",
"assets/assets/images/icons/epro.webp": "f989550b8eced9d5a468832c673905d8",
"assets/assets/images/icons/osom.webp": "a19ddcd22e63b9f5ffb8d7bff3931eea",
"assets/assets/images/icons/pdf.webp": "042cde1febb02f789a69750b118a3d9c",
"assets/assets/images/icons/ios.webp": "8155f5b58e1c8835a7300daf33266115",
"assets/assets/images/icons/rostock.webp": "1128d86a872586bdc7871646aef13245",
"assets/assets/images/icons/ampersand.webp": "620049d9afd12ccd5936fb6e1825facd",
"assets/assets/images/icons/android.webp": "d4403cdde569dc3b8d4648ab4a059198",
"assets/assets/images/icons/appstore.webp": "fd56d883b88fb6106b0303dd81dd3264",
"assets/assets/docs/resume.pdf": "9fa42fac4c0884d176db7a7f133b496e",
"assets/assets/translations/ru.json": "3bd1bdc0fa5f45148698da1f774ad9e4",
"assets/assets/translations/en.json": "3bd1bdc0fa5f45148698da1f774ad9e4",
"assets/assets/translations/ko.json": "bc7aa4cecf9d94ac486ff5a997aa8a57",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}

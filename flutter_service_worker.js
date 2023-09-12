'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "009c9e65172e010890f7f65fde438006",
"index.html": "ca9f8ce1555237e2dbe265bfdf107366",
"/": "ca9f8ce1555237e2dbe265bfdf107366",
"styles.css": "c7b17ad84259c7affdd5075b334b654b",
"main.dart.js": "1968be9c41664f63cf7aca69310f7a36",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"favicon.png": "282d057e56cfeef9dc46a40bd9caa48d",
"icons/Icon-192.png": "68632bbeb1e15b6d1d5942826e3e8388",
"icons/Icon-512.png": "817497cd1eb882084d881fbcc376bde7",
"manifest.json": "78803926c9d5482f9c088d5a51191811",
"assets/AssetManifest.json": "213df27a35fb4717d79c69ee9630db0b",
"assets/NOTICES": "fd8143e2ceb1ff5df4b3a6db650c3f00",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/AssetManifest.bin": "72b45917f1bbc1b7c3d6606ce332ddcb",
"assets/fonts/MaterialIcons-Regular.otf": "32fce58e2acb9c420eab0fe7b828b761",
"assets/assets/images/big/basket.webp": "41cb9f4f1c942af1330823aa54426cec",
"assets/assets/images/big/github.webp": "8bdf02246d8e935b8cac52d7afb4eb4a",
"assets/assets/images/big/ekf.webp": "a27ce210c50cc4e89a0efbc7adf97e84",
"assets/assets/images/big/epro.webp": "71ff4dc5aebbcd13aa647807dd064e21",
"assets/assets/images/big/osom.webp": "6d8e094cc7cc3793a69bc02515ec6a85",
"assets/assets/images/big/rostock.webp": "71801b3373b06433c8fb2318ebab8d92",
"assets/assets/images/other/artur.webp": "905229cbbf6995eb39322797a4351378",
"assets/assets/images/other/background.webp": "e8a2b2acf4427f2e27f4b8de06f419e2",
"assets/assets/images/other/picture.png": "0fdb519cdfa0e39cabd7618daa88b669",
"assets/assets/images/icons/linkedin.webp": "26be7aeaed3a7a3b4f75b8ec97fccec6",
"assets/assets/images/icons/githubwhite.webp": "03595f0f32b7ebe0157b002756b0edf4",
"assets/assets/images/icons/github.webp": "25093637a96b0617d3b6054f2752103f",
"assets/assets/images/icons/ekf.webp": "6671a57ee7c761650a88b7e4b7cf78a3",
"assets/assets/images/icons/googleplay.webp": "6c48d769c107742668915f991fcdcdc1",
"assets/assets/images/icons/epro.webp": "7c3de0f8a93b224acea611d469e043a7",
"assets/assets/images/icons/osom.webp": "1c484a7c09c86cd8fda1da17ef6a317a",
"assets/assets/images/icons/pdf.webp": "81b26667ff9212b050850f04fcfa5794",
"assets/assets/images/icons/ios.webp": "1c812f08f25417c6846967290ff856d8",
"assets/assets/images/icons/rostock.webp": "7afcc167d239d08b324f3666d3109401",
"assets/assets/images/icons/ampersand.webp": "1ff2333c18b3d3316cbd9c3ab9b5a1f7",
"assets/assets/images/icons/android.webp": "c8185ba90fcdf97e52ee5282b52c1f8a",
"assets/assets/images/icons/appstore.webp": "cf66f785a81ef4a2510707ac5415a864",
"assets/assets/docs/resume.pdf": "9fa42fac4c0884d176db7a7f133b496e",
"assets/assets/translations/ru.json": "3bd1bdc0fa5f45148698da1f774ad9e4",
"assets/assets/translations/en.json": "3bd1bdc0fa5f45148698da1f774ad9e4",
"assets/assets/translations/ko.json": "bc7aa4cecf9d94ac486ff5a997aa8a57",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9",
"canvaskit/skwasm.wasm": "d1fde2560be92c0b07ad9cf9acb10d05",
"canvaskit/chromium/canvaskit.js": "ffb2bb6484d5689d91f393b60664d530",
"canvaskit/chromium/canvaskit.wasm": "393ec8fb05d94036734f8104fa550a67",
"canvaskit/canvaskit.js": "5caccb235fad20e9b72ea6da5a0094e6",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"canvaskit/canvaskit.wasm": "d9f69e0f428f695dc3d66b3a83a4aa8e",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
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
        // Claim client to enable caching on first launch
        self.clients.claim();
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
      // Claim client to enable caching on first launch
      self.clients.claim();
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

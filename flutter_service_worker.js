'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "f66e09886b3978f2d0f814ddcbb2bdd1",
"assets/assets/app_store.png": "c39e68ba1a8fc64510f91af125926dee",
"assets/assets/barley_break.png": "edf24b54d4ac50a208bbe9b58fdf0dee",
"assets/assets/bikes/0.png": "7007ccb767a39cf41132aaf382b3c56d",
"assets/assets/bikes/1.png": "750e8dc0f9c3dd17c05fe92cb4423d6e",
"assets/assets/bikes/2.png": "27df22bc19fb0e75778677c486065fbc",
"assets/assets/bikes/bike.png": "c53e7acde111f42efa4612a2ef921d0d",
"assets/assets/github.png": "de668f7144d44286edf6150100e13f83",
"assets/assets/google_play.png": "3801c5bb0cbb6c7811a4a12c269451f9",
"assets/assets/nevoffice/nevoffice.webp": "ff2e834c1129b457b71fb0e733dd3605",
"assets/assets/nevoffice/Screenshot_0.png": "687468cc3e7362a1cc7cd1f776076d9a",
"assets/assets/nevoffice/Screenshot_1.png": "f40cb581f65f105c7d238d09b7cbc1c0",
"assets/assets/nevoffice/Screenshot_2.png": "ef4d8952e242124e5a6bd8d7d1e5f001",
"assets/assets/nevoffice/Screenshot_3.png": "71035c762162256dee92ccc1b92c0a44",
"assets/assets/nevoffice/Screenshot_4.png": "f2fd2afbecbb0e9eb675c41744f6af68",
"assets/assets/nevoffice/Screenshot_5.png": "e33ed73a58a0d651cd382b8198610d8f",
"assets/assets/sprout/screenshot_0.webp": "7c3622846cd7bed27f5d4b6f703c0210",
"assets/assets/sprout/screenshot_1.webp": "87cd593541aa52a551235d3227f7a8ab",
"assets/assets/sprout/screenshot_2.webp": "a9c0cb9e3b0540f7031c367760557ea7",
"assets/assets/sprout/screenshot_3.webp": "dcd89f69e8c1fb28028557d4ba517050",
"assets/assets/sprout/screenshot_4.webp": "89d9364a5bc404a70ef105864ec89768",
"assets/assets/sprout/screenshot_5.webp": "b2032c6a2fdcbecbdcdd54f8b45de2b7",
"assets/assets/sprout/sprout.webp": "b21f1691a6b113ef66293f10c2660313",
"assets/assets/sprout_prom/screenshot_0.webp": "5fb698136b815f8ef04f194c0b811b05",
"assets/assets/sprout_prom/screenshot_1.webp": "8695e2f8018d0008edeefff5e908dbfd",
"assets/assets/sprout_prom/screenshot_2.webp": "3ebeaf5a579c4280e1499f55ade96431",
"assets/assets/sprout_prom/screenshot_3.webp": "40242c9e7d36fb9d6cbc20584dc91e67",
"assets/assets/sprout_prom/sprout_prom.webp": "a2dbaa7d355b1f9b65d8a88c6639163d",
"assets/FontManifest.json": "01700ba55b08a6141f33e168c4a6c22f",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"assets/LICENSE": "734ba6ca772eaec64ae8c7bf4e4ad39b",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "2def70cdfb9efbc99017bc85e0c5e804",
"/": "2def70cdfb9efbc99017bc85e0c5e804",
"main.dart.js": "bc1109c3230307644d26d264e053f217",
"manifest.json": "14e919b7b1dde549ab334b7ee3ce8412"
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

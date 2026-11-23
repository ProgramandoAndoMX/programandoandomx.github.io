// Keeps Logica-mente playable offline after the first load (MVP_SESSION A23).
//
// tool/web/build_web.py fills in VERSION and FILES from the build output and
// checks the list. Unfilled (VERSION 'dev', as `flutter run` serves it), the
// worker caches nothing.
//
// - install: every app file (code, levels, art, sound, fonts) is cached;
// - the renderer (canvaskit/) has several builds and a browser loads one, so
//   the page reports what it loaded after Flutter's first frame, and that is
//   cached too; anything fetched later is cached on the way through;
// - fetch: cache first, then the network. A new build brings a new sw.js,
//   which caches the new files, takes over, and drops the old cache.
'use strict';

const VERSION = 'a4a501a59ec6';
const FILES = ["assets/AssetManifest.bin","assets/AssetManifest.bin.json","assets/FontManifest.json","assets/NOTICES","assets/assets/art/chinampas/atlas/chinampas@1x.json","assets/assets/art/chinampas/atlas/chinampas@1x.webp","assets/assets/art/chinampas/atlas/chinampas@2x.json","assets/assets/art/chinampas/atlas/chinampas@2x.webp","assets/assets/art/chinampas/backdrop/chinampas_back@1280.webp","assets/assets/art/chinampas/badge/badge_chinampas@128.webp","assets/assets/art/chinampas/badge/badge_chinampas@256.webp","assets/assets/art/chinampas/map/map_chinampas@1280.webp","assets/assets/art/chinampas/story/story_chinampas@1280.webp","assets/assets/art/feria/atlas/feria@1x.json","assets/assets/art/feria/atlas/feria@1x.webp","assets/assets/art/feria/atlas/feria@2x.json","assets/assets/art/feria/atlas/feria@2x.webp","assets/assets/art/feria/backdrop/feria_back@1280.webp","assets/assets/art/feria/backdrop/feria_back@2048.webp","assets/assets/art/feria/badge/badge_feria@128.webp","assets/assets/art/feria/badge/badge_feria@256.webp","assets/assets/art/feria/map/map_feria@1280.webp","assets/assets/art/feria/story/story_feria@1280.webp","assets/assets/art/huerto/atlas/huerto@1x.json","assets/assets/art/huerto/atlas/huerto@1x.webp","assets/assets/art/huerto/atlas/huerto@2x.json","assets/assets/art/huerto/atlas/huerto@2x.webp","assets/assets/art/huerto/backdrop/huerto_back@1280.webp","assets/assets/art/huerto/backdrop/huerto_back@2048.webp","assets/assets/art/huerto/badge/badge_huerto@128.webp","assets/assets/art/huerto/badge/badge_huerto@256.webp","assets/assets/art/huerto/map/map_huerto@1280.webp","assets/assets/art/huerto/story/story_huerto@1280.webp","assets/assets/art/mercado/badge/badge_mercado@128.webp","assets/assets/art/mercado/badge/badge_mercado@256.webp","assets/assets/art/mercado/map/map_mercado@1280.webp","assets/assets/art/plaza/atlas/plaza@1x.json","assets/assets/art/plaza/atlas/plaza@1x.webp","assets/assets/art/plaza/atlas/plaza@2x.json","assets/assets/art/plaza/atlas/plaza@2x.webp","assets/assets/art/plaza/backdrop/plaza_back@1280.webp","assets/assets/art/plaza/backdrop/plaza_back@2048.webp","assets/assets/art/plaza/badge/badge_plaza@128.webp","assets/assets/art/plaza/badge/badge_plaza@256.webp","assets/assets/art/plaza/map/map_plaza@1280.webp","assets/assets/art/plaza/story/story_plaza@1280.webp","assets/assets/art/shared/app/app_icon@1024.webp","assets/assets/art/shared/app/feature_graphic@1280.webp","assets/assets/art/shared/app/splash_icon@1024.webp","assets/assets/art/shared/atlas/robot@1x.json","assets/assets/art/shared/atlas/robot@1x.webp","assets/assets/art/shared/atlas/robot@2x.json","assets/assets/art/shared/atlas/robot@2x.webp","assets/assets/art/shared/atlas/shared@1x.json","assets/assets/art/shared/atlas/shared@1x.webp","assets/assets/art/shared/atlas/shared@2x.json","assets/assets/art/shared/atlas/shared@2x.webp","assets/assets/art/shared/character/axolotl_pose_cheer@256.webp","assets/assets/art/shared/character/axolotl_pose_cheer@512.webp","assets/assets/art/shared/character/axolotl_pose_point@256.webp","assets/assets/art/shared/character/axolotl_pose_point@512.webp","assets/assets/art/shared/character/axolotl_pose_wave@256.webp","assets/assets/art/shared/character/axolotl_pose_wave@512.webp","assets/assets/art/shared/character/robot_pose_cheer@256.webp","assets/assets/art/shared/character/robot_pose_cheer@512.webp","assets/assets/art/shared/character/robot_pose_point@256.webp","assets/assets/art/shared/character/robot_pose_point@512.webp","assets/assets/art/shared/character/robot_pose_think@256.webp","assets/assets/art/shared/character/robot_pose_think@512.webp","assets/assets/art/shared/character/robot_pose_wave@256.webp","assets/assets/art/shared/character/robot_pose_wave@512.webp","assets/assets/art/shared/frame/frame_paper@256.webp","assets/assets/art/shared/frame/frame_wood_sign@256.webp","assets/assets/art/shared/frame/frame_wood_tray@256.webp","assets/assets/art/shared/frame/frames.json","assets/assets/art/shared/icon/icon_adult@192.webp","assets/assets/art/shared/icon/icon_adult@96.webp","assets/assets/art/shared/icon/icon_hint@192.webp","assets/assets/art/shared/icon/icon_hint@96.webp","assets/assets/art/shared/icon/icon_listen@192.webp","assets/assets/art/shared/icon/icon_listen@96.webp","assets/assets/art/shared/icon/icon_lock@192.webp","assets/assets/art/shared/icon/icon_lock@96.webp","assets/assets/art/shared/icon/icon_paint@192.webp","assets/assets/art/shared/icon/icon_paint@96.webp","assets/assets/art/shared/icon/icon_repeat@192.webp","assets/assets/art/shared/icon/icon_repeat@96.webp","assets/assets/art/shared/icon/icon_star_outline@192.webp","assets/assets/art/shared/icon/icon_star_outline@96.webp","assets/assets/art/shared/prop/instrument_bell@256.webp","assets/assets/art/shared/prop/instrument_bell@512.webp","assets/assets/art/shared/prop/instrument_drum@256.webp","assets/assets/art/shared/prop/instrument_drum@512.webp","assets/assets/art/shared/prop/instrument_maracas@256.webp","assets/assets/art/shared/prop/instrument_maracas@512.webp","assets/assets/art/shared/prop/instrument_tambourine@256.webp","assets/assets/art/shared/prop/instrument_tambourine@512.webp","assets/assets/art/shared/prop/pattern_flower@128.webp","assets/assets/art/shared/prop/pattern_flower@256.webp","assets/assets/art/shared/prop/star@256.webp","assets/assets/art/shared/prop/star@512.webp","assets/assets/art/shared/ribbon/ribbon@512.webp","assets/assets/art/shared/sprite/papel_picado_a@256.webp","assets/assets/art/shared/sprite/papel_picado_a@512.webp","assets/assets/art/shared/sprite/papel_picado_b@256.webp","assets/assets/art/shared/sprite/papel_picado_b@512.webp","assets/assets/art/shared/story/fair_finale@1280.webp","assets/assets/art/taller/atlas/taller@1x.json","assets/assets/art/taller/atlas/taller@1x.webp","assets/assets/art/taller/atlas/taller@2x.json","assets/assets/art/taller/atlas/taller@2x.webp","assets/assets/art/taller/backdrop/taller_back@1280.webp","assets/assets/art/taller/backdrop/taller_back@2048.webp","assets/assets/art/taller/badge/badge_taller@128.webp","assets/assets/art/taller/badge/badge_taller@256.webp","assets/assets/art/taller/map/map_taller@1280.webp","assets/assets/art/taller/story/story_taller@1280.webp","assets/assets/catalog.json","assets/assets/fonts/Fredoka.ttf","assets/assets/levels/l1_t1_0.json","assets/assets/levels/l1_t1_1.json","assets/assets/levels/l1_t1_2.json","assets/assets/levels/l1_t1_3.json","assets/assets/levels/l1_t1_4.json","assets/assets/levels/l1_t1_5.json","assets/assets/levels/l1_t1_6.json","assets/assets/levels/l1_t1_7.json","assets/assets/levels/l1_t1_g1.json","assets/assets/levels/l1_t1_g2.json","assets/assets/levels/l1_t2_0.json","assets/assets/levels/l1_t2_1.json","assets/assets/levels/l1_t2_2.json","assets/assets/levels/l1_t2_3.json","assets/assets/levels/l1_t2_4.json","assets/assets/levels/l1_t2_5.json","assets/assets/levels/l1_t2_6.json","assets/assets/levels/l1_t2_7.json","assets/assets/levels/l1_t2_g1.json","assets/assets/levels/l1_t2_g2.json","assets/assets/levels/l2_t1_0.json","assets/assets/levels/l2_t1_1.json","assets/assets/levels/l2_t1_2.json","assets/assets/levels/l2_t1_3.json","assets/assets/levels/l2_t1_4.json","assets/assets/levels/l2_t1_5.json","assets/assets/levels/l2_t1_6.json","assets/assets/levels/l2_t1_7.json","assets/assets/levels/l2_t1_g1.json","assets/assets/levels/l2_t1_g2.json","assets/assets/levels/l2_t2_0.json","assets/assets/levels/l2_t2_1.json","assets/assets/levels/l2_t2_2.json","assets/assets/levels/l2_t2_3.json","assets/assets/levels/l2_t2_4.json","assets/assets/levels/l2_t2_5.json","assets/assets/levels/l2_t2_6.json","assets/assets/levels/l2_t2_7.json","assets/assets/levels/l2_t2_g1.json","assets/assets/levels/l2_t2_g2.json","assets/assets/levels/l3_t1_0.json","assets/assets/levels/l3_t1_1.json","assets/assets/levels/l3_t1_2.json","assets/assets/levels/l3_t1_3.json","assets/assets/levels/l3_t1_4.json","assets/assets/levels/l3_t1_5.json","assets/assets/levels/l3_t1_6.json","assets/assets/levels/l3_t1_7.json","assets/assets/levels/l3_t1_g1.json","assets/assets/levels/l3_t2_0.json","assets/assets/levels/l3_t2_1.json","assets/assets/levels/l3_t2_2.json","assets/assets/levels/l3_t2_3.json","assets/assets/levels/l3_t2_4.json","assets/assets/levels/l3_t2_5.json","assets/assets/levels/l3_t2_6.json","assets/assets/levels/l3_t2_7.json","assets/assets/levels/l3_t2_g1.json","assets/assets/levels/l4_t1_0.json","assets/assets/levels/l4_t1_1.json","assets/assets/levels/l4_t1_2.json","assets/assets/levels/l4_t1_3.json","assets/assets/levels/l4_t1_4.json","assets/assets/levels/l4_t1_5.json","assets/assets/levels/l4_t1_6.json","assets/assets/levels/l4_t1_7.json","assets/assets/levels/l4_t1_g1.json","assets/assets/levels/l4_t1_g2.json","assets/assets/levels/l4_t2_0.json","assets/assets/levels/l4_t2_1.json","assets/assets/levels/l4_t2_2.json","assets/assets/levels/l4_t2_3.json","assets/assets/levels/l4_t2_4.json","assets/assets/levels/l4_t2_5.json","assets/assets/levels/l4_t2_6.json","assets/assets/levels/l4_t2_7.json","assets/assets/levels/l4_t2_g1.json","assets/assets/levels/l4_t2_g2.json","assets/assets/levels/l5_t1_0.json","assets/assets/levels/l5_t1_1.json","assets/assets/levels/l5_t1_2.json","assets/assets/levels/l5_t1_3.json","assets/assets/levels/l5_t1_4.json","assets/assets/levels/l5_t1_5.json","assets/assets/levels/l5_t1_6.json","assets/assets/levels/l5_t1_7.json","assets/assets/levels/l5_t1_g1.json","assets/assets/levels/l5_t2_0.json","assets/assets/levels/l5_t2_1.json","assets/assets/levels/l5_t2_2.json","assets/assets/levels/l5_t2_3.json","assets/assets/levels/l5_t2_4.json","assets/assets/levels/l5_t2_5.json","assets/assets/levels/l5_t2_6.json","assets/assets/levels/l5_t2_7.json","assets/assets/levels/l5_t2_g1.json","assets/assets/levels/sample_arrows_1.json","assets/assets/levels/sample_arrows_2.json","assets/assets/levels/sample_arrows_3.json","assets/assets/levels/sample_arrows_4.json","assets/assets/levels/sample_pinta_t1.json","assets/assets/levels/sample_pinta_t2.json","assets/fonts/MaterialIcons-Regular.otf","assets/packages/material_ui/shaders/ink_sparkle.frag","assets/shaders/ink_sparkle.frag","assets/shaders/stretch_effect.frag","favicon.png","flutter.js","flutter_bootstrap.js","icons/Icon-192.png","icons/Icon-512.png","icons/Icon-maskable-192.png","icons/Icon-maskable-512.png","icons/apple-touch-icon.png","index.html","main.dart.js","manifest.json","version.json"];

const PREFIX = 'logica-mente-';
const CACHE = PREFIX + VERSION;
const FONT_HOST = 'fonts.gstatic.com';
const scope = new URL(self.registration.scope);

function cacheable(url) {
  if (VERSION === 'dev') return false;
  if (url.hostname === FONT_HOST) return true;
  return url.origin === scope.origin && url.pathname.startsWith(scope.pathname);
}

self.addEventListener('install', (event) => {
  self.skipWaiting();
  if (VERSION === 'dev') return;
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      cache.addAll(FILES.map((file) => new Request(file, { cache: 'reload' })))),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys
        .filter((key) => key.startsWith(PREFIX) && key !== CACHE)
        .map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

// The page lists what it loaded before this worker took over.
self.addEventListener('message', (event) => {
  const urls = (event.data && event.data.loaded) || [];
  event.waitUntil(caches.open(CACHE).then((cache) => Promise.all(
    urls.filter((url) => cacheable(new URL(url))).map((url) =>
      cache.match(url, { ignoreSearch: true }).then((hit) =>
        hit || cache.add(url).catch(() => undefined))),
  )));
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (!cacheable(url)) return;
  const key = request.mode === 'navigate' ? new URL('index.html', scope).href : request;
  event.respondWith(
    caches.match(key, { ignoreSearch: true }).then((hit) => hit || fetch(request).then((response) => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE).then((cache) => cache.put(request, copy));
      }
      return response;
    })),
  );
});

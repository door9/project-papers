// 옛 주소(/project-papers/)의 메모앱 서비스워커를 걷어 내는 교체본. 주소는 /projectpapers/ 로 바뀌었다.
// 옛 앱이 이것을 받으면 다시 열리고(controllerchange) → 이 주소의 안내 페이지 → 새 주소로 간다.
// 같은 주소(door9.github.io)를 PROJ210·새 메모앱이 함께 쓰므로, 캐시는 옛 경로 파일만 든 것만 지운다.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const name of await caches.keys()) {
      const keys = await (await caches.open(name)).keys();
      if (keys.length && keys.every((r) => new URL(r.url).pathname.startsWith('/project-papers/'))) await caches.delete(name);
    }
    await self.registration.unregister();
  })());
});

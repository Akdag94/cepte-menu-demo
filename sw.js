/* Kendini silen servis çalışanı — çevrimdışı desteği kaldırıldı.

   Bu dosya artık bir mezar taşı. Silmek yerine burada durmasının sebebi şu:
   menüyü daha önce açmış olan telefonlarda eski servis çalışanı hâlâ kayıtlı
   ve kayıt, dosya sunucudan kaldırılsa bile kendiliğinden gitmiyor. O cihazlar
   sayfayı bir daha açtığında tarayıcı bu dosyayı güncelleme diye indiriyor;
   aşağıdaki iki satır tam o anda çalışıp kaydı ve önbellekleri temizliyor.

   Herkesin menüyü en az bir kez açtığından emin olunduktan sonra —pratikte
   birkaç ay— bu dosya ve build.mjs'deki üç satır tümüyle silinebilir. */

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const adlar = await caches.keys();
    await Promise.all(adlar.map((a) => caches.delete(a)));
    await self.registration.unregister();
    // Kayıt silindikten sonra açık sekmeler hâlâ eski çalışana bağlı kalıyor;
    // yenilenmedikleri sürece isteklerini o karşılamaya devam ediyor. Tek
    // seferlik yenileme, o sekmeleri de ağa geri veriyor.
    const sekmeler = await self.clients.matchAll({ type: 'window' });
    for (const s of sekmeler) s.navigate(s.url).catch(() => {});
  })());
});

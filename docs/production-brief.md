# PROJE: "Explained + Doğa Olayları" Kanalı — Claude Code Üretim Brifi

> Bu doküman Claude Code'a verilecek. Amaç: Professor Gusty formatında (Explained + hava/doğa olayları + çizim dili) **baştan sona, yayınlanabilir, 1920×1080, ~9 dakikalık** bir video üretmek. Önce tüm dokümanı oku, sonra "0. Kurulum"dan başla. Her aşamanın sonunda çıktıyı kontrol et, sonra ilerle.

---

## BÖLÜM A — REFERANS KANAL ANALİZİ (14 video, kare kare incelendi)

### A1. Teknik veriler (ffprobe + sahne tespiti)

| Ölçü | Değer |
|---|---|
| Video sayısı | 14 (hepsi yatay, uzun form) |
| Süre aralığı | 6:35 – 11:12, ortalama ≈ 9 dk |
| Konuşma hızı | ≈ 185–190 kelime/dk (1.150–2.180 kelime/video) — hızlı, enerjik |
| Sert kesme (sahne değişimi) | medyan 5–6 sn'de bir, video başına 63–121 kesme |
| Ekrana yeni öğe girişi | Kare incelemesine göre **her 1,5–3 sn'de bir** (yazı, ok, ikon, fotoğraf, karakter) |
| Ses | Entegre ses seviyesi ≈ −15 LUFS. Cümle aralarında gerçek sessizlik var → sürekli müzik yatağı yok ya da çok kısık; ses tasarımı SFX ağırlıklı |
| Segment yapısı | Video başına 7–11 madde, **madde başına ≈ 55–70 sn** |

### A2. Videonun iskeleti (14 videonun 14'ünde aynı)

1. **Intro yok.** 0:00'da thumbnail'in düz beyaz versiyonu (8'li veya 3'lü ikon ızgarası) görünür, 1. saniyede kamera ilk ikona zoom yapar ve anlatıcı direkt ilk maddenin adını söyler: *"The widest."*, *"Mammatus clouds."*, *"Supercell tornado."*
2. **Madde döngüsü (her ~60 sn):**
   - İsim (1–2 sn) → **duyusal sahne kurma** ("Dışarı çıkıyorsun, gökyüzü...") → yanlış algı ("Çoğu insan bunun zararsız olduğunu sanır...") → **mekanizma** (basit şema + oklar) → gerçek fotoğrafla doğrulama → **punchline/benzetme** ("Nature's bubble wrap, sized for giants").
   - Bazı videolarda bir sonraki maddeye köprü cümlesi: *"Soğuğun en kötüsü olduğunu mu sanıyorsun? İzlemeye devam et."*
3. **Orta CTA (videonun %45–55'i):** Boğaz temizleme + "çoğunuz hâlâ abone değil, sorun değil, ama beğendiysen..." + **açık döngü:** "Videonun sonunda sadece videoyu sonuna kadar izleyenlerin cevaplayabileceği bir soru soracağım." → Bu, izlemeyi sona kadar kilitleyen asıl retention hilesi.
4. **Final:** "Okay, let's get to the question." → Ekranda maskot + "Final Question" → tüm videoyu izlemeyi gerektiren bir soru → "Comment, like, share" → maskot abone butonunu işaret eder. Toplam ≈ 15–20 sn.

### A3. Saniye saniye örnek — "Every INSANE Tornado Records Explained" (0:00–0:60)

| Sn | Ekran | Ses |
|---|---|---|
| 0 | Thumbnail'in beyaz ızgarası (8 ikon + el yazısı etiketler) | "The widest." |
| 1 | İlk ikona zoom, etiket "The Widest" büyür | |
| 2–4 | Karanlık mor çizim sahnesi: sokak lambası + hortum (hafif hareket) | "...so wide it could swallow an entire town" |
| 5–10 | Beyaz zemin: siyah şehir silüeti, yatay devasa hortum silüeti soldan girip şehri kaplar | |
| 10–12 | Daktilo efektiyle "May 31st, 2013" | "On May 31st, 2013..." |
| 13–14 | Oklahoma haritası çizgi-çizim, kırmızı nokta + el yazısı "El Reno" | "...near El Reno, Oklahoma" |
| 15–16 | Hortum ikonu → üstüne altın "1" madalyası "pop" eder | "broke the absolute record" |
| 17–21 | Gerçek fotoğraf (yuvarlak köşe + gölge çerçeve), üstünde kırmızı çift yönlü ok çizilir + el yazısı "a few hundred feet wide" | "Most tornadoes are a few hundred feet wide" |
| 22–28 | Başka gerçek fotoğraf, yavaş Ken Burns; altta daktilo "**2.6 MILES** from end to end" (sayı kırmızı) | "...2.6 miles from end to end" |
| 29–34 | AI-render gerçekçi oturma odası + çöp adam karakter kahve içiyor, pencerede fırtına; 32. sn'de karakter korkuyla bağırır | "too wide to fit in your window" |
| 35–40 | Hortumun içinden kesit: içinde mini girdaplar; 39. sn kırmızı el yazısı "300 mph" | "mini vortices spinning at nearly 300 mph" |
| 41 | Daktilo "And wo_" | "And worse..." |
| 42–46 | Gri huni şekli değişir / yana kayar | "changed size and direction" |
| 47–49 | Fırtına avcısı çöp adam (ceket + anemometre) | "fooling even the experts" |
| 49–50 | "It was so **unpredictable**" (son kelime kırmızı) | |
| 51–54 | 3 fırtına avcısı yan yana → yüzleri kafatası emojisine döner | "killed experienced storm chasers" |
| 55 | Daktilo "To su_" | "To sum it up..." |
| 56–60 | Küçük → orta → dev hortum kartları sırayla girer (big / giant / this guy) | punchline |

**Çıkarılacak kural:** Anlatıcının söylediği her somut isim, sayı veya sıfat ekranda **aynı anda** görsel karşılık bulur. Asla 3 saniyeden uzun "boş" görüntü yok.

### A4. Görsel dil sözlüğü (tüm videolarda sabit)

- **Tuval:** #FAFAFA kırık beyaz. Tüm öğeler bunun üstüne oturur.
- **Sol üst:** küçük el yazısı bölüm etiketi (ör. "Green Flash") — tüm segment boyunca sabit.
- **Sağ üst:** küçük "Next" rozeti → **bir sonraki maddenin ikonu** + "Next" yazısı. İzleyiciye sürekli "sırada ne var" merakı verir.
- **Segment açılışı:** büyük ikon + el yazısı isim (başlık kartı), ya da thumbnail'deki gibi ikonların yatay dizildiği bir şerit kayar ve sıradaki ikon ortalanır.
- **Kinetik tipografi:** Siyah, el yazısı büyük harf; vurgu kelimesi **kırmızı**. Daktilo (harf harf) girişi, alt çizgi imleci "_".
- **Gerçek fotoğraflar:** asla tam ekran değil; yuvarlak köşe (~16px), yumuşak gölge, hafif Ken Burns. Üstüne kırmızı el çizimi ok/ölçü çizgisi/daire.
- **Karakterler:** (1) Maskot: gri hortum, iri gözler, çöp kol-bacak. Sadece orta CTA ve final sorusunda sahnede. (2) "Everyman" çöp adam (siyah tişört, kahverengi saç) — izleyicinin yerine olayları yaşar. (3) Rol kostümlü türevleri (fırtına avcısı, sörfçü, pilot).
- **Şemalar:** düz renkli çizgi-film ikonlar, katmanlı kesitler (yanardağ, atmosfer katmanları), mavi/kırmızı oklar (soğuk/sıcak hava), prizma, hava katmanı çizgileri.
- **Gag kesmeleri:** 1 sn'lik mizahi ek görseller (UNO reverse kartı, kafatası emojisi, "zZz" uyuyan yanardağ, üzgün güneş).
- **İki görsel ağırlık:** %70 beyaz zeminli çizim/şema, %20 kenarlı gerçek fotoğraf, %10 tam ekran renkli AI-illüstrasyon sahne (karanlık fırtına, lav, kar dağı).

### A5. Thumbnail formülü

- 3'lü dikey panel (her panel farklı renk atmosferi, kalın kontur çizgi roman stili, alt kısımda **sarı/yeşil/pembe kalın gölgeli büyük harf** isim) → "tür" videoları.
- 8'li ızgara (beyaz zemin, küçük ikonlar + el yazısı etiket) → "rekorlar/liste" videoları.
- Başlık kalıbı: `Every [BÜYÜK SIFAT] [Konu] Explained in [X] Minutes` / `The [SÜPERLATİF] [Konu] Explained`.

### A6. Ozillo yorum metniyle karşılaştırmam

Metin doğru tespitler yapıyor (format + niş + özgün görsel dil, mikro-retention döngüleri, benzetmeyle kapanış). Kare incelemesinde metnin **atladığı** ama en az onlar kadar önemli dört şey buldum:
1. **Sıfır intro** — video 1. saniyede içeriğe giriyor.
2. **Sağ üstteki "Next" rozeti** — sürekli açık merak döngüsü.
3. **Orta CTA'daki "sonda sadece sonuna kadar izleyenlerin cevaplayabileceği soru" vaadi** — asıl izlenme süresi kilidi.
4. **Anlatılan her kelimenin ekranda senkron görseli** — bu yüzden "edit öğretir" hissi var. Bu senkronu elle yapmak zor; kod (Remotion + kelime zaman damgaları) ile yapmak kolay → bu projenin kilit avantajı.

---

## BÖLÜM B — FORMAT KARARI: YATAY UZUN FORM

**Ana ürün: 16:9, 8–11 dk.** Gerekçeler:
- Referans kanalın tüm büyümesi (14 videoda ~2M izlenme, 16K abone, video başı ort. 150K) uzun formdan geliyor.
- Format doğası gereği birden çok maddenin karşılaştırılmasına dayanıyor; split-panel thumbnail'in çalışması da tarayıcı/önerilenler akışında.
- Science/Education kategorisinde uzun form RPM'i Shorts'tan kat kat yüksek (ekran görüntüsündeki RPM bandı uzun form için).

**Shorts: ikinci aşama, türev.** Her segment zaten ~60 sn ve kendi içinde kanca → açıklama → punchline döngüsüne sahip. Yani her uzun video **bedava 8–10 Short** demek. Uzun videolar 5–10 tane birikene kadar Shorts açmayın; sonra her uzun videodan 2–3 en güçlü segmenti 9:16'ya yeniden kompoze edip (dikey yerleşim, altyazı büyük) "tam liste kanalda" diyerek yayınlayın. Pipeline bunu destekleyecek şekilde kurulsun (Bölüm E7).

---

## BÖLÜM C — DİL PAZARLARI VE KANAL FİKİRLERİ

### C1. Aynı formatın dil klonları (öncelik sırasıyla)
1. **İngilizce (ana kanal)** — en yüksek RPM, referans kanal henüz 14 videoda, alan kalabalık değil.
2. **İspanyolca** — Latin Amerika'da kasırga, hortum, sel, volkan ilgisi yüksek; kanal adı önerisi: *Profesor Ráfaga*. Konu önceliği: huracanes, volcanes (Meksika, Guatemala, Şili), terremotos.
3. **Portekizce (Brezilya)** — "fenômenos da natureza explicados"; Brezilya'da sel, yıldırım (dünyanın en çok yıldırım düşen ülkelerinden) ve Amazon konuları güçlü.
4. **Almanca** — Avrupa'nın yüksek RPM'li pazarı; Unwetter, Gewitter, Hagel, Föhn, Alpen konuları.
5. **Türkçe** — RPM düşük ama deprem, sel, fırtına, dolu merakı çok yüksek. Türkçe versiyonda **görsellere asla Türkçe yazı ürettirme**; tüm metinler Remotion'da koddan basılacak (bu pipeline zaten öyle çalışıyor, Türkçe karakter sorunu yok).

Kural: çeviri değil **yerelleştirme**. Her dilde o ülkenin kendi olaylarını (Almanca için 2021 Ahr seli, İspanyolca için 2017 Meksika depremi vb.) bir-iki maddeye yerleştir.

### C2. Aynı "Explained + çizim + maskot" motoruyla yeni hibrit nişler
Bu pipeline bir kez kurulduktan sonra sadece stil kılavuzu ve maskot değişerek başka kanallar çıkar:
- **Okyanus/Derin deniz** — maskot: bir damla ya da ahtapot. "Every TERRIFYING Ocean Phenomenon Explained" (rogue wave, brinicle, milky sea, maelstrom...). Hava olaylarıyla aynı izleyiciye yakın, rekabet görece az.
- **Jeoloji/Yeryüzü şekilleri** — maskot: taş/volkan. "The STRANGEST Rocks on Earth Explained", "Every Type of Earthquake Explained".
- **Uzay havası** — maskot: güneş. Güneş fırtınaları, auroralar, meteorlar. Hava kanalıyla doğal çapraz öneri.
- **Hayvan savunma mekanizmaları** — maskot: kirpi. Aynı "tür/rekor/en tehlikeli" başlık aileleri çalışır.

İlk kanal için önerim: **İngilizce hava/doğa kanalı**, ama maskot ve çizim dili Professor Gusty'den net ayrışsın (aşağıda kendi stilimiz tanımlı).

---

## BÖLÜM D — KENDİ KANAL KİMLİĞİMİZ (klon değil, akraba)

- **Kanal adı (öneri):** *Doctor Drizzle* (alternatif: *Stormy Explains*, *Captain Cloud*). Kullanıcı son kararı verir; kodda `config/brand.json` içinde tek yerden değişsin.
- **Maskot:** Tombul bir **fırtına bulutu**, küçük yuvarlak gözlük, iri gözler, çöp kol-bacaklar, altından arada bir mini şimşek çıkar. (Gusty = gri hortum; biz bulutuz → karışmaz.)
- **Renk sistemi:** zemin #FAF7F2 (hafif sıcak kırık beyaz), metin #141414, vurgu kırmızı #E3262E, soğuk hava mavisi #2F6FEB, sıcak hava turuncusu #F28C28, marka rengi (rozetler, "Next") #7B61FF mor.
- **Yazı tipleri (Google Fonts, Remotion'a @remotion/google-fonts ile):** gövde/etiket `Patrick Hand`, büyük kinetik vurgu `Gochi Hand` (veya `Permanent Marker`), sayılar için `Bangers` (sadece thumbnail ve dev sayılar).
- **Everyman karakter:** çöp adam, sarı tişört, dağınık siyah saç (Gusty'nin siyah tişörtlüsünden ayrışır).

---

## BÖLÜM E — CLAUDE CODE İÇİN ÜRETİM TALİMATI

### 0. Kurulum

```bash
# 1) Remotion projesi
npx create-video@latest --yes --blank weather-explained
cd weather-explained
npm install

# 2) Resmî Remotion Agent Skills (kompozisyon, animasyon, ses, font, render kuralları)
npx remotion skills add          # alternatif: npx skills add remotion-dev/skills

# 3) Resmî ElevenLabs Agent Skills (TTS, kelime zaman damgalı STT, SFX, müzik)
npx skills add elevenlabs/skills

# 4) Yardımcı paketler
npm i @remotion/google-fonts @remotion/transitions @remotion/paths @remotion/shapes @remotion/media-utils zod
npm i openai @google/genai @elevenlabs/elevenlabs-js dotenv p-limit
# sistemde ffmpeg olmalı (ffmpeg -version ile kontrol et)
```

`.env` dosyası (kullanıcı dolduracak, kod asla anahtarları loglamaz):
```
ELEVENLABS_API_KEY=
ELEVENLABS_VOICE_ID=
GEMINI_API_KEY=          # Nano Banana Pro (gemini image) — ana görsel üretici
OPENAI_API_KEY=          # gpt-image — yedek / thumbnail
PEXELS_API_KEY=          # gerçek fotoğraflar
```

Kurulumdan sonra `/remotion-best-practices` (veya kurulan ana Remotion skill'i) ve ElevenLabs `text-to-speech`, `speech-to-text`, `sound-effects` skill'lerinin SKILL.md dosyalarını **oku**; aşağıdaki talimatlarla çelişirse skill'deki API kullanımını esas al.

### 1. Klasör yapısı

```
weather-explained/
  config/brand.json            # renkler, fontlar, kanal adı, maskot yolu
  config/style-bible.md        # görsel üretim stil metni (aşağıda)
  episodes/ep001/
    script.json                # segmentler + metin (Bölüm F)
    audio/vo.mp3               # tam seslendirme
    audio/words.json           # kelime düzeyinde zaman damgaları
    beats.json                 # sahne/vuruş planı (2. aşamanın çıktısı)
    assets/img/*.png           # üretilen çizimler
    assets/photo/*.jpg         # Pexels fotoğrafları
    assets/sfx/*.mp3
    thumbnail.png
  scripts/
    tts.ts  align.ts  plan-beats.ts  gen-images.ts  fetch-photos.ts  gen-sfx.ts  validate.ts
  src/
    Root.tsx  Episode.tsx
    components/ (Bölüm E5 listesi)
```

### 2. Pipeline (sırasıyla, her adım idempotent — var olan dosyayı yeniden üretme)

1. **tts.ts** — `script.json` içindeki tüm segmentleri tek seferde seslendir (ElevenLabs, `eleven_v3` veya `eleven_multilingual_v2`; stability orta-düşük, enerjik anlatıcı). Segmentleri ayrı ayrı üretip birleştirmek de olur ama aralarına 0,35 sn sessizlik koy. Orta CTA'daki "[clears throat]" için v3 audio tag kullan.
2. **align.ts** — ElevenLabs speech-to-text (Scribe) ile `vo.mp3`'ten **kelime düzeyinde** zaman damgası çıkar → `words.json`. Segment başlangıç/bitişlerini buradan hesapla.
3. **plan-beats.ts** — Bu adımda Claude (sen) `script.json` + `words.json` okuyup **beats.json** yazar. Kurallar:
   - Her beat bir anlatı cümlesine/yarım cümlesine bağlıdır; `start`/`end` kelime zaman damgalarından gelir.
   - Beat süresi **1,2–3,5 sn**; 4 sn'yi geçen beat varsa ikiye böl (aynı sahneye yeni öğe ekle).
   - Anlatılan her sayı, tarih, yer adı, vurgu sıfatı → ekranda metin/ikon/harita karşılığı.
   - Segment başına oran: ~%65 `diagram/icon/kinetic`, ~%20 `photo`, ~%15 `scene` (tam ekran renkli illüstrasyon).
   - Segment başına en az 1 `everyman` karakter sahnesi ve en az 1 `gag` beat.
   - Punchline cümlesi daima `kinetic` beat, vurgu kelimesi kırmızı.
4. **gen-images.ts** — `beats.json` içindeki her `image` isteğini üret. Ana model Nano Banana Pro (Gemini), başarısız olursa gpt-image. Her prompt = `style-bible` önekli + beat açıklaması. Şeffaf arka plan gereken ikonlar için "on pure white background, isolated" üret, sonra beyazı alfa'ya çevir (ffmpeg `colorkey` veya sharp). **Görsellere kesinlikle yazı ürettirme**; tüm yazılar Remotion'dan gelir. Paralellik 4 (p-limit). Karakter tutarlılığı için maskot ve everyman'in referans görsellerini (`assets/ref/`) her istekte referans resim olarak ver.
5. **fetch-photos.ts** — `photo` beat'leri için Pexels'ten ara (yatay, en az 1280 px), ilk 5 sonucu indir, en uygun olanı seç. Yoksa AI ile "photorealistic" üret ve `beats.json`'a `ai_photo: true` işaretle. Pexels lisans bilgisini `credits.txt`'e yaz.
6. **gen-sfx.ts** — ElevenLabs sound-effects ile küçük bir kütüphane üret (bir kere, `assets/sfx/shared/`): `pop` (ikon girişi), `whoosh-short` (geçiş), `typewriter-tick` (daktilo), `marker-squeak` (ok çizimi), `ding` (madalya/rekor), `thunder-soft`, `wind-gust`, `record-scratch` (gag), `throat-clear` gerekmez (VO'da). Seviyeler: VO −14 LUFS hedef, SFX VO'nun ~12 dB altında.
7. **Remotion render** — `npx remotion render Episode out/ep001.mp4` 1920×1080, 30 fps, h264, CRF 18. Ardından Shorts için `ShortSegment` kompozisyonu (1080×1920) — sadece istenirse.
8. **validate.ts** — render öncesi kontrol: her beat'in asset'i var mı, 4 sn'yi aşan beat var mı, ekranda 3 sn'den uzun değişmeyen alan var mı, toplam süre = VO süresi ± 0,5 sn. Render sonrası: `ffmpeg -vf fps=1/3,tile=8x6` ile iletişim tablosu üret, **kendin görüntüle** ve Bölüm A4'teki görsel dile uyuyor mu kontrol et; uymayan beat'leri düzelt.

### 3. `style-bible.md` (tüm görsel promptlarının öneki)

```
Hand-drawn educational cartoon illustration, clean bold black outlines of slightly varying
thickness, flat colors with soft cel shading, friendly and slightly humorous, not scary.
Style between a science textbook diagram and a webcomic. Simple shapes, readable at small
size. Palette: warm off-white #FAF7F2 background, storm greys, sky blue #2F6FEB,
warm orange #F28C28, accent red #E3262E. No text, no letters, no numbers, no watermark.
```
Varyantlar:
- `icon`: "single object centered, isolated on pure white background, no ground shadow"
- `scene`: "full-frame colorful cartoon landscape, dramatic sky, cinematic composition, 16:9"
- `crosssection`: "educational cutaway cross-section diagram, labeled layers WITHOUT text"
- `character`: maskot/everyman referans görseli + "same character, same proportions, new pose: ..."

### 4. `beats.json` şeması

```json
{
  "fps": 30,
  "segments": [
    {
      "id": "s01", "title": "Fish Rain", "icon": "img/s01_icon.png",
      "start": 0.0, "end": 58.4,
      "beats": [
        { "id": "s01b01", "start": 0.0, "end": 1.6, "type": "grid_zoom",
          "target": "s01" },
        { "id": "s01b02", "start": 1.6, "end": 4.1, "type": "scene",
          "image": { "prompt": "small Central American town street at night, heavy rain, silvery fish falling from dark clouds", "variant": "scene" },
          "motion": "slow_push_in", "sfx": "thunder-soft" },
        { "id": "s01b03", "start": 4.1, "end": 6.0, "type": "kinetic",
          "text": "It's raining FISH", "emphasis": ["FISH"], "style": "typewriter" },
        { "id": "s01b04", "start": 6.0, "end": 9.2, "type": "photo",
          "query": "waterspout ocean", "annotations": [
            { "kind": "arrow", "from": [0.3,0.8], "to": [0.5,0.2], "label": "sucks up water" } ] }
      ]
    }
  ],
  "midCta": { "start": 262.0, "end": 283.0 },
  "finalQuestion": { "start": 520.0, "end": 540.0, "question": "..." }
}
```
Beat `type` değerleri: `grid_zoom`, `title_card`, `kinetic`, `icon_pop` (1–4 ikon sırayla), `diagram` (ikonlar + oklar + katmanlar), `photo`, `scene`, `everyman`, `map`, `counter` (sayı sayarak büyür), `compare` (küçük→büyük kartlar), `gag`, `mascot`.

### 5. Remotion bileşenleri (hepsini yaz, hepsi `brand.json`'dan renk/font alsın)

| Bileşen | Davranış |
|---|---|
| `Canvas` | #FAF7F2 zemin + çok hafif kâğıt dokusu (SVG noise, %3 opaklık) |
| `ChapterLabel` | Sol üst, Patrick Hand 34px, segment boyunca sabit |
| `NextBadge` | Sağ üst, sıradaki segment ikonunun 72px küçük hali + "Next"; segment değişirken ikon aşağıdan yukarı kayar |
| `GridIntro` | 0. saniye: thumbnail ızgarası (8 veya 3 ikon + el yazısı etiket); 1. saniyede ilk ikona `spring` zoom |
| `SegmentCarousel` | Segment geçişi: ikonlar yatay şerit, sola kayar, sıradaki ortalanıp büyür (0,8 sn) + `whoosh-short` |
| `TypewriterText` | Harf harf yazılır (kelime zaman damgasına senkron), sonda yanıp sönen "_" imleci; `emphasis` kelimeleri kırmızı + %10 büyük; her 2 harfte bir `typewriter-tick` |
| `IconPop` | Scale 0 → 1.12 → 1 spring (damping 12), `pop` SFX, hafif ±2° sallanma idle |
| `HandArrow` | `@remotion/paths` ile SVG yolu `evolvePath` ile çizilir (0,4 sn), uçta ok başı, hafif titrek çizgi; opsiyonel el yazısı etiket |
| `MeasureLine` | Çift yönlü kırmızı ölçü oku + etiket (fotoğraf üstü) |
| `CircleHighlight` | Elle çizilmiş kırmızı daire (tamamlanmamış halka) |
| `PhotoCard` | Yuvarlak köşe 18px, gölge `0 10px 30px rgba(0,0,0,.18)`, genişlik %62, Ken Burns (1.0→1.06), üstüne annotation katmanı |
| `FullScene` | Tam ekran illüstrasyon, yavaş push-in/pan, yumuşak 6 kare çapraz geçiş |
| `Character` | Everyman/maskot PNG + poz değişimi (farklı PNG'ler arası 2 kare kesme) + nefes alma idle (scaleY 1→1.015) |
| `MapCallout` | Basit çizgi harita (ülke/eyalet silüeti SVG), kırmızı nokta pulse + el yazısı yer adı |
| `Counter` | Sayı 0'dan hedefe sayar (easeOut), birim kırmızı |
| `CompareCards` | 2–3 kart küçükten büyüğe sırayla girer |
| `Gag` | 0,6–1,2 sn tam ekran ek görsel + `record-scratch`/`pop` |
| `MidCta` | Maskot "Hey, you!" balonu → abone butonu mockup (tıklama animasyonu, zil) |
| `FinalQuestion` | Maskot + "?" ikonu + soru metni daktilo; ardından "Comment, Like and Share!" kırmızı; maskot abone butonunu işaret eder; son 10 sn end screen alanı boş bırakılır |

Genel hareket kuralları: tüm girişler `spring` (stiffness 180, damping 14), hiçbir öğe hareketsiz 3 sn'den fazla kalmaz (en azından idle), kesmelerin çoğu düz kesme; çapraz geçiş sadece `scene`→`scene`.

### 6. Ses mikslemesi
- VO tek parça, −14 LUFS.
- Müzik: referans kanal sürekli müzik yatağı kullanmıyor gibi görünüyor. Başlangıçta **müziksiz** render et; ikinci versiyonda çok kısık (VO'nun −28 dB altı) merak uyandıran pizzicato/lo-fi yatak dene (ElevenLabs music skill veya kullanıcının Suno kütüphanesi). Kullanıcıya iki versiyonu da ver.
- SFX: her `IconPop`, `HandArrow`, `SegmentCarousel`, `Counter` bitişine eşleşen SFX.

### 7. Shorts türevi (opsiyonel, ikinci aşama)
`ShortSegment` kompozisyonu: 1080×1920, üstte segment başlığı, ortada aynı beat'ler dikey yerleşim (fotoğraflar %90 genişlik), altta kelime kelime altyazı (Gochi Hand, 64px, aktif kelime kırmızı). Segment sesini `words.json`'dan kes. Sonda "Full list on the channel" kartı.

### 8. Thumbnail
`thumbnail.tsx` Remotion `Still` kompozisyonu 1280×720:
- 3 dikey panel; her panel segment'in `scene` görseli (en dramatik 3 segment), aralarında 6px siyah çizgi.
- Alt kısımda panel başına kalın gölgeli (6px siyah stroke + drop shadow) büyük harf isim, renkler sırasıyla sarı #FFE14D, yeşil #7CFF4F, pembe #FF5FA8, font Bangers.
- Kanal ilk 5 videodan sonra 8'li ızgara varyantını da A/B test için üret.

### 9. Kalite kontrol listesi (bitirmeden önce her maddeyi kontrol et ve kullanıcıya raporla)
- [ ] 0:00–0:02 arasında içerik başlıyor, intro yok
- [ ] Sağ üst "Next" rozeti her segmentte doğru ikonu gösteriyor
- [ ] Ekranda hiçbir görsel üretim yazısı yok (tüm metin Remotion'dan)
- [ ] Anlatılan her sayı/yer/tarih ekranda
- [ ] Orta CTA %45–55 aralığında, final soru vaadi içeriyor
- [ ] Final soru gerçekten videonun içinden bir bilgi gerektiriyor
- [ ] Karakterler tüm videoda aynı görünüyor
- [ ] Kontak tablosu incelendi (her 3 sn'de 1 kare)
- [ ] Ses: kırpılma yok, −14 LUFS ±1

---

## BÖLÜM F — BÖLÜM 1: TAM SENARYO

**Başlık:** `Every WEIRD Thing That Falls From the Sky Explained`
**Alternatif:** `The STRANGEST Things That Have Ever Fallen From the Sky Explained`
**Thumbnail:** 8'li ızgara (balık, örümcek, iguana, kırmızı yağmur, kuş, buz kütlesi, yıldız tozu, meteor) — ya da 3'lü: FISH RAIN / FROZEN IGUANAS / FIREBALL.
**Hedef süre:** ≈ 9 dk (≈ 1.650 kelime @ 185 kel/dk)

> Senaryo kuralları (sonraki bölümler için de geçerli): Madde adıyla başla → izleyiciyi sahnenin içine koy ("you") → yaygın yanlış algı → mekanizma, tek benzetmeyle → gerçek dünyadan tarih/yer/sayı → punchline. Her madde 150–190 kelime. Maddeler zayıftan güçlüye sıralanır. Olgular doğrulanmış olmalı; emin olunmayan iddia "reported" / "scientists think" ile yumuşatılır.

```
[S01 — FISH RAIN]
Fish rain. You step outside after a storm, and the street is flopping. Not with
puddles. With fish. Silver, wriggling, very confused fish, lying on the pavement
miles away from the nearest sea. It sounds like a folk tale, but people have
reported it for centuries, and in one town in Honduras it's said to happen almost
every year. Here's the leading explanation. Over a lake or the ocean, a waterspout
forms. That's basically a tornado standing on water, and it works like a giant
drinking straw. It sucks up water, and anything small enough swimming near the
surface. Fish, frogs, tadpoles. The storm carries them inland, sometimes for miles,
and when the updraft finally gets tired, it lets go of everything at once.
Some scientists think a few cases have a less exciting explanation, fish pushed
out of flooded underground rivers. But either way, the result is the same.
Somewhere, a very surprised fish went on its first and last flight.
The sky didn't just order seafood. It delivered.

[S02 — SPIDER RAIN]
Spider rain. If fish didn't bother you, this one might. In parts of Australia,
people have woken up to fields, fences and entire trees wrapped in a shimmering
white blanket, while tiny spiders drift down from the sky. Locals call it angel
hair, which is a very generous name. The spiders are doing it on purpose. It's
called ballooning. A young spider climbs to a high point, lifts its back end, and
releases thin threads of silk. The wind catches them, and off it goes, like a
paraglider the size of a grain of rice. And here's the wild part. Research
suggests spiders can also ride the Earth's natural electric field. The silk picks
up a tiny electric charge, and the air itself helps pull them upward. When
millions of spiders launch at the same time, often to escape flooding, they all
come down together. The spiders survive. Your sense of calm does not.
Nature invented air travel long before we did, it just forgot the flight attendants.

[S03 — FROZEN IGUANAS]
Frozen iguanas. Florida is sunshine, beaches, and, on a few cold mornings a year,
lizards dropping out of trees like stiff green bananas. Green iguanas are
cold-blooded. They can't make their own heat, so their body temperature follows
the air. When it drops below about ten degrees Celsius, fifty Fahrenheit, they get
slow and clumsy. Closer to four degrees, their muscles basically lock up. The
iguana is sleeping on a branch, it can't hold on anymore, and down it goes.
It looks dead, but most of them are just paused. When the sun warms them back up,
they slowly come back to life and walk away like nothing happened. It happens
often enough that Florida weather forecasters have actually warned people about
falling iguanas. Imagine checking the weather and the forecast says: cold,
windy, chance of lizards.

[S04 — RED RAIN]
Red rain. In the summer of 2001, in Kerala, India, it started raining red. Not
pink, not orange. Red, like the sky had a nosebleed. It came and went for about
two months, staining clothes and buildings, and people had every right to panic.
Some even suggested it came from space. The real answer was stranger in a quieter
way. When scientists looked at the water under a microscope, it was full of tiny
spores from a kind of algae that grows on trees and walls in the region. The
spores got lifted into the air and fell back down with the rain. In other places,
red rain has a different cause. Every few years, winds pick up huge clouds of
Sahara desert dust and carry them all the way to Europe. The dust mixes with
raindrops, and cars in Spain or France wake up covered in orange mud.
So if the rain ever looks like tomato soup, don't panic. Just don't drink it.

[S05 — FALLING BIRDS]
Falling birds. Just before midnight on New Year's Eve 2010, in the small town of
Beebe, Arkansas, thousands of blackbirds started dropping from the sky. By morning,
around five thousand of them were scattered across streets, roofs and lawns. Of
course, the internet decided it was the end of the world. The investigation found
something much more ordinary, and a little sad. The birds were roosting for the
night when loud fireworks went off nearby. Blackbirds see very poorly in the dark.
Startled, the whole flock took off in panic, flying low and blind, and crashed
into houses, trees, cars and each other. The injuries matched blunt trauma, not
poison, not disease. The sky was fine. The birds were just the wrong audience for
the wrong show. Humanity's New Year's party, reviewed by five thousand critics.
Zero stars.

[MID-CTA]
[clears throat] Quick thing. Most of you watching this aren't subscribed yet,
and hey, no pressure. But if this video already taught you something weird, hit
like and subscribe. It's free, it takes one second, and it helps the channel more
than you think. And stay until the end, because I'm going to ask you a question
that only the people who watched the whole video can answer.

[S06 — MEGACRYOMETEORS]
Megacryometeors. In January of 2000, in Spain, huge chunks of ice started falling
out of a clear blue sky. No storm. No clouds. Just blocks of ice, some weighing
several kilos, smashing into cars and streets over about ten days. The first
suspect was airplanes. Planes can leak frozen water, but many of these chunks fell
where no plane had passed, and their chemistry looked like normal rainwater.
The second suspect was hail. But hail needs a thunderstorm, and there wasn't one.
So scientists gave them a name, megacryometeors, which basically means giant ice
things from the sky. One idea is that in rare conditions, very high in the
atmosphere, where the air is extremely cold and full of moisture, ice can keep
growing without a storm to hold it up. But honestly? Nobody knows for sure.
It's the only item on this list where the sky is still keeping its secret.

[S07 — SPACE DUST]
Space dust. Right now, while you're watching this, space is falling on you.
Not metaphorically. Every year, thousands of tons of tiny particles from comets and
asteroids enter our atmosphere. Most burn up as shooting stars, but a lot of the
smallest grains survive and drift down to the ground. A study that collected them
in Antarctica estimated that about five thousand tons of this cosmic dust reach
the surface every single year. Each grain is smaller than a grain of sand, round,
often shiny, like microscopic metal pearls. They land on roofs, in rain gutters,
on your car. Some people collect them with a magnet and a microscope. Some of
these grains are older than the Earth itself. So the next time you wipe dust off
your shelf, remember, a tiny part of it may have traveled for billions of years
just to end up in your living room. Housekeeping just got cosmic.

[S08 — THE BIGGEST HAILSTONE]
The biggest hailstone. On July 23rd, 2010, in Vivian, South Dakota, a man picked up
a piece of ice from his yard that was bigger than a volleyball, almost. Eight inches
across, twenty centimeters, and nearly two pounds. It's still the official record
in the United States. Here's how the sky makes something that big. Inside a
powerful thunderstorm, there's an updraft, a column of air rushing upward so fast
it can hold ice up in the air. A small ice pellet gets tossed up into freezing
air, grabs a layer of water, falls, gets thrown back up, and grabs another layer.
Up, down, up, down, like a snowball getting rolled in the sky. Cut a big hailstone
in half and you can see those layers, like the rings of a tree. The stronger the
updraft, the longer the ride, and the bigger the stone. And when it finally gets
too heavy, it comes down at over a hundred miles per hour. Not a hailstone.
A bowling ball with a sky-diving license.

[S09 — THE CHELYABINSK FIREBALL]
The Chelyabinsk fireball. February 15th, 2013. It's a normal winter morning in a
Russian city. People are driving to work, and suddenly a second sun appears.
It's brighter than the real one. Shadows sweep across the streets. Dash cameras
all over the city record it. It was an asteroid, around twenty meters wide,
hitting the atmosphere at about sixty-nine thousand kilometers per hour. The air
in front of it couldn't get out of the way fast enough. It got compressed, it got
superheated, and about thirty kilometers above the ground, the rock exploded.
The blast released energy equal to roughly thirty Hiroshima bombs. But here's the
creepy part. The light arrived instantly. The shockwave took more than a minute.
People walked to their windows to see the flash, and that's exactly when the glass
blew in. Around fifteen hundred people were injured, almost all by flying glass.
Of everything that falls from the sky, this is the one that reminds you the
ceiling of our planet is not a ceiling at all. It's a very thin curtain.

[FINAL QUESTION]
Okay, final question. Out of everything in this video, which one was the only
thing that fell from a perfectly clear sky, with no storm at all, and still has
no confirmed explanation? Drop your answer in the comments. Like, share, and
subscribe for more. See you in the next one.
```
*(Doğru cevap: megacryometeors. Uzay tozu açık havada da düşer ama açıklaması biliniyor — soru bu yüzden dikkat ister.)*

**Olgu notları (Claude Code, render öncesi web'den tekrar doğrula):** Vivian SD hail 23 Tem 2010, 8 inç / 1,94 lb · Beebe AR 31 Ara 2010, ~5.000 kuş, havai fişek · Kerala kırmızı yağmur Tem–Eyl 2001, Trentepohlia alg sporları · İspanya megakriyometeorları Ocak 2000 · Antarktika mikrometeorit çalışması ~5.200 ton/yıl · Chelyabinsk 15 Şub 2013, ~20 m, ~30 km irtifa, ~1.500 yaralı · İguanalar ~10 °C altında yavaşlar, ~4 °C civarı hareketsiz kalır.

### F2. Örnek beat planı — S03 Frozen Iguanas (diğer segmentler bu yoğunlukta planlanacak)

| # | Anlatı | Beat tipi | Görsel |
|---|---|---|---|
| 1 | "Frozen iguanas." | `title_card` | İguana ikonu (buz kristalli) + el yazısı başlık, Next rozeti → kırmızı yağmur damlası |
| 2 | "Florida is sunshine, beaches," | `scene` | Renkli Florida plajı, palmiyeler |
| 3 | "...lizards dropping out of trees like stiff green bananas" | `scene`+`gag` | Aynı palmiyeden kaskatı iguana düşer; yanında muz ikonu pop |
| 4 | "cold-blooded" | `kinetic` | "COLD-BLOODED" (COLD mavi) |
| 5 | "can't make their own heat... follows the air" | `diagram` | Termometre ikonu + iguana; ok termometreden iguanaya |
| 6 | "below ten degrees Celsius, fifty Fahrenheit" | `counter` | Termometre 25 → 10 °C iner, "50°F" kırmızı |
| 7 | "slow and clumsy" | `icon_pop` | İguana kafasında "zZz" |
| 8 | "Closer to four degrees... lock up" | `counter` + `icon_pop` | 10 → 4 °C, iguanaya buz kaplaması + asma kilit ikonu |
| 9 | "sleeping on a branch, can't hold on" | `diagram` | Dal + iguana, pençelerde kırmızı daire, kayma animasyonu |
| 10 | "down it goes" | `gag` | Düşüş + `whoosh` + yerde "bonk" yıldızları |
| 11 | "It looks dead... just paused" | `kinetic` | "Not dead. **PAUSED.**" + ⏸ ikonu |
| 12 | "sun warms them back up" | `diagram` | Güneş ikonundan turuncu oklar, iguana renklenir |
| 13 | "walk away like nothing happened" | `everyman` | Everyman karakter şaşkın bakar, iguana yürüyüp gider |
| 14 | "forecasters have warned" | `photo` | Pexels: yerde yatan yeşil iguana (kenarlı kart) |
| 15 | "cold, windy, chance of lizards" | `kinetic` | Hava durumu kartı mockup: ☁️ 4°C · 💨 · **"Chance of lizards: 70%"** (kırmızı) |

---

## BÖLÜM G — SONRAKİ 10 BÖLÜM FİKRİ (aynı başlık aileleri)

1. Every Type of Hail Explained (graupel, sleet, ice pellets, giant hail, hail with layers)
2. The RAREST Rainbows Explained (moonbow, fogbow, fire rainbow, supernumerary, twinned)
3. Every DEADLY Wind Explained (föhn, bora, haboob, sirocco, katabatic, derecho, Santa Ana)
4. The STRANGEST Ice Formations Explained (brinicle, penitentes, ice circles, hair ice, frost flowers)
5. Every Weather Record That Seems IMPOSSIBLE Explained
6. The MOST DANGEROUS Floods Explained (flash flood, jökulhlaup, storm surge, GLOF, dam break)
7. Every Kind of Fog Explained in 8 Minutes
8. Things That Happen in the Sky Only Once a Decade Explained
9. The Most TERRIFYING Sounds Nature Makes Explained (skyquakes, singing sand, ice booms, thunder snow)
10. Every Type of Earthquake Explained (tectonic, volcanic, collapse, induced, slow slip, megathrust)

Her bölüm için aynı pipeline: `episodes/epXXX/script.json` yaz → Bölüm E2 adımları → QC listesi.

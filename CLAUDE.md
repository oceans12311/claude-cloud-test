# Proje: "Explained + Doğa/Hava Olayları" YouTube kanalı

Referans kanal: **Professor Gusty** (@professorgusty) — 14 video, ~16K abone, ~2M izlenme, video başı ort. ~150K.
Tam üretim brifi: `docs/production-brief.md` (Bölüm A–G). Kare kare referans analizi ve brif düzeltmeleri: `docs/reference-analysis.md` (**brifle çelişirse bu dosya geçerli**). Transkriptler: `docs/transcripts/`. Kod yazmadan önce oku.

## Çekirdek tez (Ozillo / Burak Turanlı analizi)
**Çalışan format + çalışan niş + özgün görsel dil.** Yeni niş icat etme; kanıtlanmış iki şeyi birleştir, üstüne kendi imzanı koy.
- Format: klasik *Explained* (split-panel thumbnail, beyaz tuval, oklar, şemalar, el yazısı notlar).
- Niş: hava/doğa olayları (ilkel merak, evergreen, gündemden beslenir ama gündeme bağımlı değil).
- Format–niş uyumu şart: şema süs değil, gerçekten açıklanacak bir mekanizmaya hizmet ediyor. Edit öğretme aracıdır, gösteriş değil.
- Marka = izleyicinin içeriği kanal adını okumadan tanıması. Thumbnail çizim dili videonun içinde de sürer. Tutarlılık > pahalı görünmek.
- Dar niş ≠ az fikir: aynı izleyiciye yüzlerce video (Strangest / Rarest / Deadliest / Most Dangerous / Every Type of…).

## Başlık & hook
- Başlık = ne öğreneceğin (net konu + "Explained" + BÜYÜK süperlatif). Gizemli/belirsiz başlık yok.
- Hook = neden izlemeye devam etmelisin. Başlık ve hook aynı işi yapmaz.
- Mikro retention döngüsü, her madde (~60 sn): **isim → duyusal sahne ("you step outside…") → yanlış algı → mekanizma (tek benzetme) → gerçek tarih/yer/sayı → punchline/analoji.**
- Analoji hayati: "Nature's bubble wrap, sized for giants", "the sun's one-frame magic trick".

## Kare incelemesinden kurallar (analizin atladıkları)
1. Sıfır intro — 0:00'da thumbnail ızgarası, 1. sn'de ilk maddeye zoom + maddenin adı.
2. Sağ üstte sürekli **"Next" rozeti** (sıradaki maddenin ikonu); bölüm etiketi **üst ortada**. Madde geçişinde tam 8'li ızgaraya dönülür, sonra sıradaki ikona kayılır.
3. Orta CTA (%45–55): "sonda sadece sonuna kadar izleyenlerin cevaplayabileceği bir soru soracağım."
4. Anlatılan her isim/sayı/tarih/yer ekranda **senkron** görsel bulur; 3 sn'den uzun boş/sabit görüntü yok.
- Ölçüler: ~9 dk, **~145 kel/dk (≈1.300 kelime, madde başına 110–140)**, 7–11 madde, yeni ekran öğesi her 1,5–3 sn, ~−15 LUFS, müzik yatağı yok/çok kısık, SFX ağırlıklı.
- Görsel oran: %70 beyaz zemin çizim/şema, %20 kenarlı gerçek fotoğraf (tam ekran değil), %10 tam ekran renkli sahne.

## Kendi kimliğimiz (klon değil, akraba) — `config/brand.json`
- Ad önerisi: Doctor Drizzle (alt.: Stormy Explains, Captain Cloud) — son karar kullanıcıda.
- Maskot: tombul fırtına bulutu, yuvarlak gözlük, çöp kol-bacak, altından mini şimşek.
- Renkler: zemin #FAF7F2, metin #141414, vurgu #E3262E, soğuk #2F6FEB, sıcak #F28C28, marka #7B61FF.
- Fontlar: Patrick Hand (gövde), Gochi Hand / Permanent Marker (kinetik), Bangers (sayılar/thumbnail).
- Everyman: çöp adam, sarı tişört, dağınık siyah saç.

## Üretim kuralları
- Stack: Remotion (1920×1080, 30 fps) + ElevenLabs (TTS, Scribe kelime zaman damgası, SFX) + Gemini/gpt-image + Pexels.
- **AI görsellerine asla yazı ürettirme** — tüm metin Remotion'dan basılır (çok dilli sürümler için de şart).
- Pipeline adımları idempotent: tts → align → plan-beats → gen-images → fetch-photos → gen-sfx → validate → render.
- Beat süresi 1,2–3,5 sn (4 sn üstü bölünür). Segment başına ≥1 everyman sahnesi, ≥1 gag. Punchline daima kırmızı vurgulu kinetik metin.
- Ana ürün yatay uzun form. Shorts ikinci aşama: 5–10 uzun video birikince segmentlerden türet.
- Diller: EN → ES → PT-BR → DE → TR. Çeviri değil yerelleştirme (o ülkenin kendi olaylarından madde ekle).
- Olgular doğrulanmış olmalı; emin olunmayan iddia "reported" / "scientists think" ile yumuşatılır.
- Telifli meme/film karesi kullanma; gag'ler kendi karakter ve ikonlarımızla.
- Referans kanal olguları abartıyor/yanlış veriyor; biz aynı enerjik tonla doğru sayılar kullanırız (farklılaşma noktası).

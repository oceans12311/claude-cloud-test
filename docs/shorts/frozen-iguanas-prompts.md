# Frozen Iguanas Short — görsel prompt listesi

Üretilen dosyaları bu isimlerle yükle; `weather-explained/assets-raw/` klasörüne konacaklar.
Promptlar İngilizce yazıldı, görsel modelleri İngilizceyle daha iyi sonuç veriyor.

## Stil öneki (her prompun başına ekle)
```
Hand-drawn educational cartoon illustration, clean bold black outlines of slightly varying thickness, flat bright colors with soft cel shading, friendly and slightly humorous, not scary. Style between a science textbook illustration and a webcomic. Simple readable shapes. No text, no letters, no numbers, no watermark.
```

- **Ikon/karakter** (beyaz zemin, 1:1): stil önekinin sonuna şunu ekle: `Single subject centered, isolated on pure white background, no ground shadow.`
- **Sahne** (dikey, 9:16): stil önekinin sonuna şunu ekle: `Full-frame vertical 9:16 scene, colorful, cinematic composition, keep the lower third calm and simple.`

Tutarlılık için şu sırayı izle: önce **04**'ü (çöp adam) üret. 08 ve 11'i üretirken 04'ü referans görsel olarak ver. İguanalı görsellerde de donmuş iguana görselini (`iguana_frozen.jpg`) referans olarak ver ve "same iguana character" de.

## Görseller

| # | Dosya | Oran | Hangi cümlede | Prompt (stil önekinden sonra) |
|---|---|---|---|---|
| 01 | `01_scene_florida_beach` | 9:16 | "Florida is sunshine, beaches," | Sunny Florida beach, tall palm trees, turquoise sea, a few happy cartoon people sunbathing on towels with sunglasses and a beach umbrella, bright blue sky, big smiling sun. |
| 02 | `02_scene_iguanas_falling` | 9:16 | "and lizards falling out of trees" | Same Florida beach but on a chilly grey morning, a few people in hoodies looking up in shock, several stiff green iguanas falling straight down from the palm tree fronds like sticks, motion lines behind them. |
| 03 | `03_icon_iguana_banana` | 1:1 | "like stiff green bananas" | A stiff frozen green iguana lying perfectly straight next to a big green unripe banana with the exact same curved shape and pose, side by side comparison, funny. |
| 04 | `04_char_everyman_shocked` | 1:1 | "falling" (tepki) | Simple stick-figure style man with round head, messy black hair, yellow t-shirt, black stick arms and legs, holding a coffee mug, looking up with a shocked wide-eyed face, mouth open. |
| 05 | `05_icon_iguana_sleepy` | 1:1 | "iguanas get slow" | Same green iguana character lying on a tree branch, very sleepy with half-closed droopy eyes, limp legs hanging down, a small blue snowflake above its head. |
| 06 | `06_scene_cold_florida` | 9:16 | "Below ten degrees Celsius" | Florida street at dawn in unusual cold weather, palm trees with light frost, people wearing winter coats, scarves and beanies next to a sign-shaped blank board, frosty breath clouds, pale blue light. |
| 07 | `07_diagram_iguana_cutaway` | 16:9 | "their muscles lock up" | Educational cutaway cross-section diagram of a green iguana's leg showing simple red muscle bands turning icy blue and frozen, clean textbook style, labeled parts WITHOUT any text. |
| 08 | `08_char_everyman_poking` | 1:1 | "It's not dead." | Same stick-figure man in yellow t-shirt, crouching and nervously poking a stiff frozen iguana lying on its back with a small twig, worried face. |
| 09 | `09_scene_sun_thaw` | 9:16 | "When the sun comes back, it thaws out" | Frozen green iguana lying on a sidewalk as warm golden sunlight hits it, ice crystals melting into water drops, small wisps of steam rising, warm orange morning light. |
| 10 | `10_icon_iguana_cool` | 1:1 | "walks away like nothing happened" | Same green iguana walking away confidently on all four legs, wearing small black sunglasses, relaxed cool attitude, side view facing right. |
| 11 | `11_char_everyman_confused` | 1:1 | "like nothing happened" (tepki) | Same stick-figure man in yellow t-shirt, scratching his head, very confused face, a big question mark shape made of dots above his head (no letters). |

## Gerçek fotoğraflar (Pexels veya Unsplash'tan, ücretsiz lisans)
| # | Dosya | Arama | Nerede |
|---|---|---|---|
| P1 | `p1_iguana_tree` | "green iguana tree" | "falling out of trees" (gerçek dünya kanıtı) |
| P2 | `p2_iguana_ground` | "iguana lying ground" ya da "cold stunned iguana" | "It's not dead" |

Fotoğrafların kaynak linkini de gönder; `credits.txt`'e yazacağım.

## Beat planı (15 sn)
0,0 donmuş iguana + başlık → 1,2 **01** → 2,8 **02** → 3,6 **04** (tepki, 0,8 sn) → 4,3 **03** (+ ok, "stiff green banana") → 5,7 **06** (+ termometre sayacı) → 6,9 **05** (+ zZz) → 8,4 **07** (+ buz yayılır, kilit düşer) → 10,1 **08** → 10,8 **P2** (fotoğraf kartı + kırmızı daire, "PAUSED") → 11,5 **09** (buz parçalanır) → 13,0 **10** (yürüyüp çıkar) → 14,2 **11**.

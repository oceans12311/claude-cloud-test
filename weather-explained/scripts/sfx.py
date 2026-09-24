"""Small synthetic SFX kit (placeholder until ElevenLabs sound-effects)."""
import numpy as np, soundfile as sf, os
SR = 44100
os.makedirs('public/sfx', exist_ok=True)
t = lambda d: np.linspace(0, d, int(SR * d), endpoint=False)
env = lambda x, k: np.exp(-k * np.linspace(0, 1, len(x)))
rng = np.random.default_rng(1)

def save(name, x, gain=0.6):
    x = x / max(1e-6, np.abs(x).max()) * gain
    fade = min(200, len(x))
    x[-fade:] *= np.linspace(1, 0, fade)
    sf.write(f'public/sfx/{name}.wav', x.astype(np.float32), SR)

x = t(0.12); save('pop', np.sin(2*np.pi*(300 + 900*x/0.12)*x) * env(x, 18))
x = t(0.45); n = rng.standard_normal(len(x)); b = np.convolve(n, np.ones(30)/30, 'same')
save('whoosh', b * np.sin(np.pi*x/0.45)**2, 0.45)
x = t(0.35); save('bonk', (np.sin(2*np.pi*(140 - 80*x)*x) + 0.4*np.sin(2*np.pi*420*x)) * env(x, 9))
x = t(0.9); save('ding', (np.sin(2*np.pi*1320*x) + 0.5*np.sin(2*np.pi*2640*x)) * env(x, 5), 0.4)
x = t(0.03); save('tick', rng.standard_normal(len(x)) * env(x, 40), 0.25)
x = t(0.8); save('freeze', sum(np.sin(2*np.pi*f*x) * (np.sin(2*np.pi*f/300*x)**2) for f in (2200, 2800, 3500, 4200)) * env(x, 3), 0.3)
x = t(0.25); save('marker', np.convolve(rng.standard_normal(len(x)), np.ones(6)/6, 'same') * np.sin(np.pi*x/0.25), 0.25)
x = t(0.6); save('thud', np.sin(2*np.pi*(70 - 30*x)*x) * env(x, 7), 0.8)
print(sorted(os.listdir('public/sfx')))

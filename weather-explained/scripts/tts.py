"""Voice-over with Kokoro (local, free) until ElevenLabs is reachable.

Synthesises each line separately so we know exact line boundaries, then
estimates word timings inside a line proportionally to word length.
Writes public/audio/vo.wav and src/timing.json.
"""
import json, os, sys
import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

MODEL_DIR = os.environ.get('KOKORO_DIR', '/tmp/kokoro')
VOICE = os.environ.get('KOKORO_VOICE', 'am_puck')
SPEED = float(os.environ.get('KOKORO_SPEED', '1.08'))
GAP = 0.22

lines = json.load(open(sys.argv[1] if len(sys.argv) > 1 else 'src/script.json'))['lines']
k = Kokoro(f'{MODEL_DIR}/kokoro-v1.0.onnx', f'{MODEL_DIR}/voices-v1.0.bin')

chunks, out, t = [], [], 0.0
sr = 24000
for line in lines:
    audio, sr = k.create(line['text'], voice=VOICE, speed=SPEED, lang='en-us')
    audio = np.asarray(audio, dtype=np.float32)
    # Trim leading/trailing near-silence so captions line up with speech.
    loud = np.where(np.abs(audio) > 0.01)[0]
    audio = audio[max(loud[0] - 240, 0): loud[-1] + 480] if len(loud) else audio
    dur = len(audio) / sr
    words = line['text'].split()
    weights = [len(w.strip('.,!?')) + 2 for w in words]
    total, acc, wt = sum(weights), 0.0, []
    for w, wgt in zip(words, weights):
        s = t + dur * acc / total
        acc += wgt
        wt.append({'w': w, 'start': round(s, 3), 'end': round(t + dur * acc / total, 3)})
    out.append({'id': line['id'], 'text': line['text'], 'start': round(t, 3), 'end': round(t + dur, 3), 'words': wt})
    chunks += [audio, np.zeros(int(GAP * sr), dtype=np.float32)]
    t += dur + GAP

vo = np.concatenate(chunks)
vo = vo / max(1e-6, np.abs(vo).max()) * 0.89
os.makedirs('public/audio', exist_ok=True)
sf.write('public/audio/vo.wav', vo, sr)
json.dump({'duration': round(t + 0.6, 3), 'lines': out}, open('src/timing.json', 'w'), indent=1)
print(f'{t:.2f}s', [(l["id"], l["start"]) for l in out])

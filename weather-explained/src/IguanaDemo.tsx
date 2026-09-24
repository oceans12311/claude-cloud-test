import React from 'react';
import {AbsoluteFill, Audio, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import timing from './timing.json';
import script from './script.json';
import {C, marker} from './theme';
import {Banana, Caption, ChapterLabel, HandArrow, Lock, PauseIcon, Pic, Pop, Stars, Sun, Thermometer, Typewriter, Zzz, outline} from './components';

type Line = (typeof timing.lines)[number];
const L = Object.fromEntries(timing.lines.map((l) => [l.id, l])) as Record<string, Line>;
const wordAt = (line: Line, word: string) => line.words.find((w) => w.w.toLowerCase().startsWith(word.toLowerCase()))!.start;

const FPS = 30;
const f = (s: number) => Math.round(s * FPS);
export const DEMO_DURATION = f(timing.duration);

// Where the iguana sleeps on the palm and where it lands, in 1080x1920 space (tuned to beach.jpg).
const BRANCH = {x: 450, y: 330, w: 360};
const GROUND = {x: 560, y: 1530};

const Sfx: React.FC<{at: number; name: string; volume?: number}> = ({at, name, volume = 0.5}) => (
  <Sequence from={f(at)} durationInFrames={f(1.5)} layout="none">
    <Audio src={staticFile(`sfx/${name}.wav`)} volume={volume} />
  </Sequence>
);

/** Scene 1: title card — frozen iguana pops onto the paper canvas. */
const TitleScene: React.FC = () => (
  <AbsoluteFill style={{background: C.paper}}>
    <Pop x={540} y={780} w={860} delay={2}>
      <Pic src="img/iguana_frozen.png" />
    </Pop>
    <div style={{position: 'absolute', top: 1110, width: '100%'}}>
      <Typewriter text="Frozen Iguanas" size={130} delay={6} cps={30} emphasis={['Frozen']} />
    </div>
  </AbsoluteFill>
);

/** Scene 2: Florida beach, iguana asleep on the palm, freezes and drops like a banana. */
const BeachScene: React.FC<{fallAt: number; bananaAt: number}> = ({fallAt, bananaAt}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const push = interpolate(frame, [0, 200], [1, 1.1]);
  const breathe = 1 + Math.sin(frame / 9) * 0.015;
  const tf = frame - fallAt;
  let y = BRANCH.y;
  let x = BRANCH.x;
  let rot = 0;
  const falling = tf >= 0;
  if (falling) {
    const t = tf / fps;
    const drop = GROUND.y - BRANCH.y;
    const fallT = Math.sqrt(drop / 2600);
    if (t < fallT) {
      y = BRANCH.y + 2600 * t * t;
      x = BRANCH.x + (GROUND.x - BRANCH.x) * (t / fallT);
      rot = 90 * (t / fallT);
    } else {
      const b = t - fallT;
      y = GROUND.y - Math.abs(Math.sin(b * 12)) * 60 * Math.exp(-b * 8);
      x = GROUND.x;
      rot = 90 + Math.sin(b * 20) * 6 * Math.exp(-b * 6);
    }
  }
  const landed = falling && tf / fps > Math.sqrt((GROUND.y - BRANCH.y) / 2600);
  const landFrame = fallAt + Math.round(Math.sqrt((GROUND.y - BRANCH.y) / 2600) * fps);
  const shake = frame - landFrame >= 0 && frame - landFrame < 6 ? Math.sin(frame * 3) * 14 : 0;
  const freezeTint = falling ? 1 : interpolate(frame, [fallAt - 10, fallAt], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const w = falling ? BRANCH.w * 1.25 : BRANCH.w;
  return (
    <AbsoluteFill style={{overflow: 'hidden', transform: `translate(${shake}px, ${shake / 2}px)`}}>
      <Img src={staticFile('img/beach.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${push})`}} />
      <div style={{position: 'absolute', left: x - w / 2, top: y - w * 0.3, width: w, transform: `rotate(${rot}deg) scale(${falling ? 1 : breathe})`}}>
        <Pic src={falling ? 'img/iguana_frozen.png' : 'img/iguana.png'} style={{filter: `saturate(${1 - freezeTint * 0.5}) hue-rotate(${freezeTint * 60}deg)`}} />
      </div>
      <Stars x={GROUND.x} y={GROUND.y - 40} delay={landFrame} />
      {landed && frame >= bananaAt && (
        <>
          <Pop x={250} y={1180} w={300} delay={bananaAt}>
            <Banana />
          </Pop>
          <HandArrow d="M 330 1260 Q 420 1380 470 1440" delay={bananaAt + 6} label="stiff green banana" labelX={120} labelY={1010} rotate={-6} />
        </>
      )}
    </AbsoluteFill>
  );
};

/** Scene 3: thermometer drops 25 → 10 → 4 °C, iguana slows down, then locks up. */
const ColdScene: React.FC<{lockAt: number}> = ({lockAt}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const temp = frame < lockAt
    ? interpolate(frame, [4, 26], [25, 10], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)})
    : interpolate(frame, [lockAt, lockAt + 18], [10, 4], {extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const frozen = interpolate(frame, [lockAt + 6, lockAt + 18], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const sway = frame < lockAt ? Math.sin(frame / 14) * 3 : 0;
  const lockDrop = spring({frame: frame - lockAt - 20, fps, config: {damping: 9, stiffness: 160}});
  return (
    <AbsoluteFill style={{background: C.paper}}>
      <div style={{position: 'absolute', left: 60, top: 330}}>
        <Thermometer temp={temp} />
      </div>
      <div style={{position: 'absolute', left: 60, top: 1070, width: 220, textAlign: 'center', fontFamily: marker, fontSize: 92, color: temp > 12 ? C.ink : C.cold}}>
        {Math.round(temp)}°C
      </div>
      {frame >= 26 && frame < lockAt && (
        <div style={{position: 'absolute', left: 40, top: 1180, width: 260, textAlign: 'center', fontFamily: marker, fontSize: 64, color: C.red}}>50°F</div>
      )}
      {frame >= lockAt + 18 && (
        <div style={{position: 'absolute', left: 40, top: 1180, width: 260, textAlign: 'center', fontFamily: marker, fontSize: 64, color: C.red}}>39°F</div>
      )}
      <div style={{position: 'absolute', left: 330, top: 560, width: 700, transform: `rotate(${sway}deg)`}}>
        <Pic src="img/iguana.png" style={{position: 'absolute', opacity: 1 - frozen}} />
        <Pic src="img/iguana_frozen.png" style={{opacity: frozen}} />
      </div>
      {frame < lockAt && frame > 30 && <Zzz x={880} y={560} />}
      {frame >= lockAt + 20 && (
        <div style={{position: 'absolute', left: 590, top: interpolate(lockDrop, [0, 1], [-300, 470]), width: 190, transform: `rotate(${(1 - lockDrop) * 30}deg)`}}>
          <Lock />
        </div>
      )}
      {frame >= lockAt + 26 && (
        <div style={{position: 'absolute', left: 520, top: 1030, fontFamily: marker, fontSize: 120, color: C.red, transform: `rotate(-8deg) scale(${spring({frame: frame - lockAt - 26, fps, config: {damping: 10}})})`, border: `10px solid ${C.red}`, padding: '0 30px', borderRadius: 20}}>
          LOCKED
        </div>
      )}
    </AbsoluteFill>
  );
};

/** Scene 4: "Not dead. PAUSED." */
const PausedScene: React.FC<{secondAt: number}> = ({secondAt}) => (
  <AbsoluteFill style={{background: C.paper}}>
    <div style={{position: 'absolute', top: 380, width: '100%'}}>
      <Typewriter text="Not dead." size={120} delay={0} cps={20} />
    </div>
    <div style={{position: 'absolute', top: 540, width: '100%'}}>
      <Typewriter text="PAUSED." size={170} delay={secondAt} cps={16} emphasis={['PAUSED']} />
    </div>
    <Pop x={540} y={900} w={220} delay={secondAt + 8}>
      <PauseIcon />
    </Pop>
    <Pop x={540} y={1150} w={620} delay={4}>
      <Pic src="img/iguana_frozen.png" />
    </Pop>
  </AbsoluteFill>
);

/** Scene 5: sun comes out, iguana thaws and walks off. */
const ThawScene: React.FC<{walkAt: number}> = ({walkAt}) => {
  const frame = useCurrentFrame();
  const thaw = interpolate(frame, [14, 40], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const walk = Math.max(0, frame - walkAt);
  const x = 540 + walk * 16;
  const bob = walk > 0 ? Math.abs(Math.sin(walk / 3)) * -18 : 0;
  return (
    <AbsoluteFill style={{background: C.paper}}>
      <Pop x={230} y={420} w={320} delay={0} wobble={false}>
        <Sun spin={frame * 1.5} />
      </Pop>
      <HandArrow d="M 360 480 Q 420 600 470 700" delay={8} />
      <HandArrow d="M 300 570 Q 320 680 360 760" delay={12} />
      <div style={{position: 'absolute', left: x - 330, top: 760 + bob, width: 660}}>
        <Pic src="img/iguana_frozen.png" style={{position: 'absolute', opacity: 1 - thaw}} />
        <Pic src="img/iguana.png" style={{opacity: thaw}} />
      </div>
    </AbsoluteFill>
  );
};

export const IguanaDemo: React.FC = () => {
  const fallAt = wordAt(L.fall, 'falling');
  const bananaAt = wordAt(L.fall, 'bananas');
  const scenes = [
    {from: 0, to: L.florida.start, el: <TitleScene />},
    {from: L.florida.start, to: L.slow.start, el: <BeachScene fallAt={f(fallAt - L.florida.start)} bananaAt={f(bananaAt - L.florida.start)} />},
    {from: L.slow.start, to: L.paused.start, el: <ColdScene lockAt={f(L.lock.start - L.slow.start)} />},
    {from: L.paused.start, to: L.thaw.start, el: <PausedScene secondAt={f(L.paused.words[3].start - L.paused.start)} />},
    {from: L.thaw.start, to: timing.duration, el: <ThawScene walkAt={f(wordAt(L.thaw, 'walks') - L.thaw.start)} />},
  ];
  return (
    <AbsoluteFill style={{background: C.paper}}>
      {scenes.map((s, i) => (
        <Sequence key={i} from={f(s.from)} durationInFrames={f(s.to) - f(s.from)}>
          {s.el}
        </Sequence>
      ))}
      <ChapterLabel text={script.title} />
      {timing.lines.map((l) => (
        <Sequence key={l.id} from={0} durationInFrames={f(l.end + 0.2)} layout="none">
          {l.id !== 'title' && <Caption words={l.words} y={l.id === 'florida' || l.id === 'fall' ? 1650 : 1400} />}
        </Sequence>
      ))}
      <Audio src={staticFile('audio/vo.wav')} />
      <Sfx at={0.07} name="pop" />
      <Sfx at={0.1} name="freeze" volume={0.35} />
      <Sfx at={L.florida.start} name="whoosh" volume={0.4} />
      <Sfx at={fallAt - 0.3} name="freeze" volume={0.35} />
      <Sfx at={fallAt} name="whoosh" />
      <Sfx at={fallAt + Math.sqrt((GROUND.y - BRANCH.y) / 2600)} name="bonk" volume={0.7} />
      <Sfx at={bananaAt} name="pop" />
      <Sfx at={bananaAt + 0.2} name="marker" />
      <Sfx at={L.slow.start} name="whoosh" volume={0.35} />
      <Sfx at={L.lock.start + 0.2} name="freeze" volume={0.4} />
      <Sfx at={L.lock.start + 0.9} name="thud" />
      <Sfx at={L.paused.words[3].start + 0.3} name="pop" />
      <Sfx at={L.thaw.start} name="ding" volume={0.35} />
      <Sfx at={wordAt(L.thaw, 'walks')} name="whoosh" volume={0.3} />
    </AbsoluteFill>
  );
};

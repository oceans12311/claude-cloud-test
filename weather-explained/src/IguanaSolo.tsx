import React from 'react';
import {AbsoluteFill, Audio, Easing, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import timing from './timing.json';
import script from './script.json';
import {C, marker} from './theme';
import {Banana, Caption, ChapterLabel, HandArrow, Lock, PauseIcon, Pop, Stars, Sun, Thermometer, Typewriter, Zzz} from './components';
import {IguanaRig} from './IguanaRig';

/**
 * Same Frozen Iguanas short, but every iguana shot comes from ONE AI image,
 * animated as a layered puppet (IguanaRig). Everything else is drawn in code.
 */
type Line = (typeof timing.lines)[number];
const L = Object.fromEntries(timing.lines.map((l) => [l.id, l])) as Record<string, Line>;
const wordAt = (line: Line, word: string) => line.words.find((w) => w.w.toLowerCase().startsWith(word.toLowerCase()))!.start;
const FPS = 30;
const f = (s: number) => Math.round(s * FPS);
export const SOLO_DURATION = f(timing.duration);
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const Sfx: React.FC<{at: number; name: string; volume?: number}> = ({at, name, volume = 0.5}) => (
  <Sequence from={f(at)} durationInFrames={f(1.5)} layout="none">
    <Audio src={staticFile(`sfx/${name}.wav`)} volume={volume} />
  </Sequence>
);

/** Rig placed by its center, with rotation (180° = right side up, 0° = belly up). */
const Placed: React.FC<{x: number; y: number; w: number; rot?: number; scale?: number; children: React.ReactNode}> = ({x, y, w, rot = 0, scale = 1, children}) => (
  <div style={{position: 'absolute', left: x - w / 2, top: y - w / 2, width: w, height: w, transform: `rotate(${rot}deg) scale(${scale})`}}>{children}</div>
);

const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - 2, fps, config: {stiffness: 200, damping: 11}});
  return (
    <AbsoluteFill style={{background: C.paper}}>
      <Placed x={540} y={760} w={900} scale={s} rot={Math.sin(frame / 10) * 1.5}>
        <IguanaRig width={900} frozen={1} />
      </Placed>
      <div style={{position: 'absolute', top: 1150, width: '100%'}}>
        <Typewriter text="Frozen Iguanas" size={130} delay={6} cps={30} emphasis={['Frozen']} />
      </div>
    </AbsoluteFill>
  );
};

const Branch: React.FC = () => (
  <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
    <path d="M -40 640 C 250 600, 600 650, 1120 560" fill="none" stroke="#141414" strokeWidth={70} strokeLinecap="round" />
    <path d="M -40 640 C 250 600, 600 650, 1120 560" fill="none" stroke="#9B6A3C" strokeWidth={52} strokeLinecap="round" />
    <path d="M 760 610 C 800 520, 880 480, 960 470" fill="none" stroke="#141414" strokeWidth={30} strokeLinecap="round" />
    <path d="M 760 610 C 800 520, 880 480, 960 470" fill="none" stroke="#9B6A3C" strokeWidth={16} strokeLinecap="round" />
    <path d="M 0 1270 H 1080 V 1920 H 0 Z" fill="#F3DFA8" />
    <path d="M 0 1270 H 1080" stroke="#141414" strokeWidth={10} />
  </svg>
);

/** Sleeping on a branch in the sun → freezes → falls belly-up like a stiff banana. */
const BranchScene: React.FC<{fallAt: number; bananaAt: number}> = ({fallAt, bananaAt}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const W = 560;
  const perch = {x: 470, y: 470};
  const ground = {x: 560, y: 1060};
  const freeze = interpolate(frame, [fallAt - 16, fallAt], [0, 1], clamp);
  const t = Math.max(0, frame - fallAt) / fps;
  const fallT = Math.sqrt((ground.y - perch.y) / 2600);
  let x = perch.x, y = perch.y + Math.sin(frame / 9) * 4, rot = 180;
  if (frame >= fallAt) {
    if (t < fallT) {
      const k = t / fallT;
      y = perch.y + 2600 * t * t;
      x = perch.x + (ground.x - perch.x) * k;
      rot = 180 + 180 * Easing.inOut(Easing.quad)(k);
    } else {
      const b = t - fallT;
      y = ground.y - Math.abs(Math.sin(b * 12)) * 70 * Math.exp(-b * 8);
      x = ground.x;
      rot = 360 + Math.sin(b * 20) * 6 * Math.exp(-b * 6);
    }
  }
  const landFrame = fallAt + Math.round(fallT * fps);
  const shake = frame - landFrame >= 0 && frame - landFrame < 6 ? Math.sin(frame * 3) * 16 : 0;
  return (
    <AbsoluteFill style={{background: '#CFE8FF', transform: `translate(${shake}px, ${shake / 2}px)`}}>
      <div style={{position: 'absolute', left: 760, top: 250, width: 260}}>
        <Sun spin={frame * 1.2} />
      </div>
      <Branch />
      <Placed x={x} y={y} w={W} rot={rot}>
        <IguanaRig width={W} frozen={freeze} life={frame < fallAt - 16 ? 0.35 : 0} eyelid={frame < fallAt - 16 ? 1 : 0} />
      </Placed>
      {frame < fallAt - 16 && <Zzz x={640} y={380} />}
      <Stars x={ground.x} y={ground.y - 140} delay={landFrame} />
      {frame >= bananaAt && (
        <>
          <Pop x={220} y={820} w={280} delay={bananaAt}>
            <Banana />
          </Pop>
          <HandArrow d="M 300 900 Q 360 980 420 1010" delay={bananaAt + 6} label="stiff green banana" labelX={70} labelY={650} rotate={-6} />
        </>
      )}
    </AbsoluteFill>
  );
};

/** Thermometer drops; iguana gets sluggish, then the ice creeps over it and it locks. */
const ColdScene: React.FC<{lockAt: number}> = ({lockAt}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const temp = frame < lockAt
    ? interpolate(frame, [4, 26], [25, 10], {...clamp, easing: Easing.out(Easing.cubic)})
    : interpolate(frame, [lockAt, lockAt + 18], [10, 4], {...clamp, easing: Easing.out(Easing.cubic)});
  const frozen = interpolate(frame, [lockAt + 2, lockAt + 22], [0, 1], clamp);
  const life = frame < lockAt ? 0.25 : 0;
  const drowsy = frame < lockAt ? 0.45 + Math.max(0, Math.sin(frame / 20)) * 0.5 : 0;
  const lockDrop = spring({frame: frame - lockAt - 22, fps, config: {damping: 9, stiffness: 160}});
  return (
    <AbsoluteFill style={{background: C.paper}}>
      <div style={{position: 'absolute', left: 50, top: 330}}>
        <Thermometer temp={temp} />
      </div>
      <div style={{position: 'absolute', left: 50, top: 1070, width: 220, textAlign: 'center', fontFamily: marker, fontSize: 92, color: temp > 12 ? C.ink : C.cold}}>{Math.round(temp)}°C</div>
      <div style={{position: 'absolute', left: 30, top: 1180, width: 260, textAlign: 'center', fontFamily: marker, fontSize: 64, color: C.red}}>
        {frame >= 26 && frame < lockAt ? '50°F' : frame >= lockAt + 18 ? '39°F' : ''}
      </div>
      <Placed x={660} y={760} w={760} rot={180 + (frame < lockAt ? Math.sin(frame / 18) * 3 : 0)}>
        <IguanaRig width={760} life={life} eyelid={drowsy} frozen={frozen} />
      </Placed>
      {frame < lockAt && frame > 30 && <Zzz x={900} y={520} />}
      {frame >= lockAt + 22 && (
        <div style={{position: 'absolute', left: 580, top: interpolate(lockDrop, [0, 1], [-300, 540]), width: 180, transform: `rotate(${(1 - lockDrop) * 30}deg)`}}>
          <Lock />
        </div>
      )}
      {frame >= lockAt + 28 && (
        <div style={{position: 'absolute', left: 470, top: 1040, fontFamily: marker, fontSize: 120, color: C.red, transform: `rotate(-8deg) scale(${spring({frame: frame - lockAt - 28, fps, config: {damping: 10}})})`, border: `10px solid ${C.red}`, padding: '0 30px', borderRadius: 20}}>
          LOCKED
        </div>
      )}
    </AbsoluteFill>
  );
};

const PausedScene: React.FC<{secondAt: number}> = ({secondAt}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - 3, fps, config: {damping: 12}});
  return (
    <AbsoluteFill style={{background: C.paper}}>
      <div style={{position: 'absolute', top: 360, width: '100%'}}>
        <Typewriter text="Not dead." size={120} cps={20} />
      </div>
      <div style={{position: 'absolute', top: 520, width: '100%'}}>
        <Typewriter text="PAUSED." size={170} delay={secondAt} cps={16} emphasis={['PAUSED']} />
      </div>
      <Pop x={540} y={870} w={200} delay={secondAt + 8}>
        <PauseIcon />
      </Pop>
      <Placed x={540} y={1100} w={680} scale={s}>
        <IguanaRig width={680} frozen={1} />
      </Placed>
    </AbsoluteFill>
  );
};

/** Sun comes out: ice shatters off, legs kick, it flips over and walks away. */
const ThawScene: React.FC<{walkAt: number}> = ({walkAt}) => {
  const frame = useCurrentFrame();
  const shatter = interpolate(frame, [16, 40], [0, 1], clamp);
  const kick = interpolate(frame, [30, 44], [0, 1], clamp);
  const flipStart = Math.max(46, walkAt - 14);
  const flip = interpolate(frame, [flipStart, flipStart + 12], [0, 1], {...clamp, easing: Easing.inOut(Easing.quad)});
  const hop = Math.sin(flip * Math.PI) * -160;
  const walk = Math.max(0, frame - walkAt);
  const bob = walk > 0 ? Math.abs(Math.sin(walk / 3)) * -16 : 0;
  const blink = frame % 40 < 4 && frame > 40 ? 1 : 0;
  return (
    <AbsoluteFill style={{background: C.paper}}>
      <Pop x={220} y={400} w={300} wobble={false}>
        <Sun spin={frame * 1.5} />
      </Pop>
      <HandArrow d="M 350 470 Q 420 600 470 700" delay={6} />
      <HandArrow d="M 290 560 Q 310 670 350 760" delay={10} />
      <Placed x={560 + walk * 18} y={1020 + hop + bob} w={680} rot={180 * flip + (walk > 0 ? Math.sin(walk / 3) * 2 : 0)}>
        <IguanaRig width={680} frozen={shatter > 0 ? 1 : 1} shatter={shatter} life={kick * (flip < 1 ? 1 : 0.5)} eyelid={blink} />
      </Placed>
    </AbsoluteFill>
  );
};

export const IguanaSolo: React.FC = () => {
  const fallAt = wordAt(L.fall, 'falling');
  const bananaAt = wordAt(L.fall, 'bananas');
  const fallT = Math.sqrt((1060 - 470) / 2600);
  const scenes = [
    {from: 0, to: L.florida.start, el: <TitleScene />},
    {from: L.florida.start, to: L.slow.start, el: <BranchScene fallAt={f(fallAt - L.florida.start)} bananaAt={f(bananaAt - L.florida.start)} />},
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
          {l.id !== 'title' && <Caption words={l.words} y={1420} />}
        </Sequence>
      ))}
      <Audio src={staticFile('audio/vo.wav')} />
      <Sfx at={0.07} name="pop" />
      <Sfx at={0.1} name="freeze" volume={0.35} />
      <Sfx at={L.florida.start} name="whoosh" volume={0.4} />
      <Sfx at={fallAt - 0.5} name="freeze" volume={0.4} />
      <Sfx at={fallAt} name="whoosh" />
      <Sfx at={fallAt + fallT} name="bonk" volume={0.7} />
      <Sfx at={bananaAt} name="pop" />
      <Sfx at={bananaAt + 0.2} name="marker" />
      <Sfx at={L.slow.start} name="whoosh" volume={0.35} />
      <Sfx at={L.lock.start + 0.1} name="freeze" volume={0.45} />
      <Sfx at={L.lock.start + 1.0} name="thud" />
      <Sfx at={L.paused.words[3].start + 0.3} name="pop" />
      <Sfx at={L.thaw.start + 0.5} name="ding" volume={0.4} />
      <Sfx at={L.thaw.start + 0.55} name="freeze" volume={0.3} />
      <Sfx at={wordAt(L.thaw, 'walks')} name="whoosh" volume={0.3} />
    </AbsoluteFill>
  );
};

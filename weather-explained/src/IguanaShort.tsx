import React from 'react';
import {AbsoluteFill, Audio, Easing, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import timing from './timing.json';
import script from './script.json';
import {C, marker} from './theme';
import {Caption, ChapterLabel, HandArrow, Lock, PauseIcon, Pop, Thermometer, Typewriter, Zzz} from './components';
import {IguanaRig} from './IguanaRig';

/**
 * Frozen Iguanas short, full version: a new AI shot roughly every 1–2 s,
 * cut on the voice-over words. Shots live in public/img/shots (see scripts/prep_shots.py).
 */
type Line = (typeof timing.lines)[number];
const L = Object.fromEntries(timing.lines.map((l) => [l.id, l])) as Record<string, Line>;
const wordAt = (line: Line, word: string) => line.words.find((w) => w.w.toLowerCase().startsWith(word.toLowerCase()))!.start;
const FPS = 30;
const f = (s: number) => Math.round(s * FPS);
export const SHORT_DURATION = f(timing.duration);
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const shot = (n: string, ext = 'png') => staticFile(`img/shots/${n}.${ext}`);

const Sfx: React.FC<{at: number; name: string; volume?: number}> = ({at, name, volume = 0.5}) => (
  <Sequence from={f(at)} durationInFrames={f(1.5)} layout="none">
    <Audio src={staticFile(`sfx/${name}.wav`)} volume={volume} />
  </Sequence>
);

/** Full-bleed 9:16 illustration with a slow push-in and optional drift / shake. */
const FullScene: React.FC<{n: string; from?: number; to?: number; drift?: number; shakeAt?: number; tint?: string}> = ({n, from = 1, to = 1.12, drift = 0, shakeAt, tint}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const k = frame / Math.max(1, durationInFrames);
  const s = interpolate(k, [0, 1], [from, to]);
  const shake = shakeAt !== undefined && frame - shakeAt >= 0 && frame - shakeAt < 8 ? Math.sin(frame * 2.7) * 12 : 0;
  const fadeIn = interpolate(frame, [0, 4], [0.6, 1], clamp);
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: C.ink}}>
      <Img src={shot(n, 'jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', opacity: fadeIn, transform: `translate(${drift * k + shake}px, ${shake / 2}px) scale(${s})`}} />
      {tint && <AbsoluteFill style={{background: tint, mixBlendMode: 'soft-light'}} />}
    </AbsoluteFill>
  );
};

/** Paper canvas with a cut-out character/icon popping in. */
const Paper: React.FC<{children: React.ReactNode}> = ({children}) => <AbsoluteFill style={{background: C.paper}}>{children}</AbsoluteFill>;

const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - 2, fps, config: {stiffness: 200, damping: 11}});
  return (
    <Paper>
      <div style={{position: 'absolute', left: 90, top: 330, width: 900, height: 900, transform: `scale(${s}) rotate(${Math.sin(frame / 10) * 1.5}deg)`}}>
        <IguanaRig width={900} frozen={1} />
      </div>
      <div style={{position: 'absolute', top: 1130, width: '100%'}}>
        <Typewriter text="Frozen Iguanas" size={130} delay={6} cps={30} emphasis={['Frozen']} />
      </div>
    </Paper>
  );
};

/** 02 falling iguanas + the shocked everyman (04) popping in from the corner. */
const FallingScene: React.FC<{reactAt: number}> = ({reactAt}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - reactAt, fps, config: {stiffness: 220, damping: 12}});
  return (
    <AbsoluteFill>
      <FullScene n="02" from={1.05} to={1.18} shakeAt={reactAt} />
      {frame >= reactAt && (
        <div style={{position: 'absolute', right: -40, bottom: 560, width: 470, transform: `translate(${(1 - s) * 400}px, 0) rotate(${(1 - s) * 25 - 4}deg)`, filter: 'drop-shadow(0 12px 18px rgba(0,0,0,.35))'}}>
          <Img src={shot('04')} style={{width: '100%'}} />
        </div>
      )}
    </AbsoluteFill>
  );
};

/** 03 iguana vs banana, side by side, with a red arrow and label. */
const BananaScene: React.FC = () => (
  <Paper>
    <Pop x={540} y={760} w={600} delay={0} wobble>
      <Img src={shot('03')} style={{width: '100%'}} />
    </Pop>
    <HandArrow d="M 170 1190 Q 230 1080 330 1010" delay={6} label="same shape" labelX={90} labelY={1200} rotate={-5} />
  </Paper>
);

/** 06 cold Florida street + a thermometer dropping in the corner. */
const ColdStreetScene: React.FC = () => {
  const frame = useCurrentFrame();
  const temp = interpolate(frame, [6, 30], [25, 10], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill>
      <FullScene n="06" from={1.12} to={1.0} tint="rgba(80,140,255,.25)" />
      <div style={{position: 'absolute', left: 40, top: 270, background: 'rgba(255,255,255,.92)', borderRadius: 30, padding: '20px 20px 10px', border: `6px solid ${C.ink}`, transform: 'scale(.72)', transformOrigin: 'top left'}}>
        <Thermometer temp={temp} h={620} />
        <div style={{textAlign: 'center', fontFamily: marker, fontSize: 96, color: temp > 12 ? C.ink : C.cold}}>{Math.round(temp)}°C</div>
        <div style={{textAlign: 'center', fontFamily: marker, fontSize: 70, color: C.red, opacity: frame > 30 ? 1 : 0}}>50°F</div>
      </div>
    </AbsoluteFill>
  );
};

/** 05 sleepy iguana on a branch, slow sway, drifting z's. */
const SleepyScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Paper>
      <Pop x={540} y={780} w={900} delay={0} wobble={false}>
        <div style={{transform: `rotate(${Math.sin(frame / 16) * 2}deg) translateY(${Math.sin(frame / 12) * 8}px)`}}>
          <Img src={shot('05')} style={{width: '100%'}} />
        </div>
      </Pop>
      <Zzz x={820} y={420} />
    </Paper>
  );
};

/** 07 muscle cut-away as a card; ice lock + stamp on "lock". */
const MuscleScene: React.FC<{lockAt: number}> = ({lockAt}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const zoom = interpolate(frame, [0, 50], [1, 1.35], {...clamp, easing: Easing.inOut(Easing.quad)});
  const lock = spring({frame: frame - lockAt, fps, config: {damping: 9, stiffness: 160}});
  const stamp = spring({frame: frame - lockAt - 6, fps, config: {damping: 10}});
  return (
    <Paper>
      <div style={{position: 'absolute', left: 30, top: 460, width: 1020, borderRadius: 26, overflow: 'hidden', boxShadow: '0 12px 34px rgba(0,0,0,.2)'}}>
        <Img src={shot('07')} style={{width: '100%', display: 'block', transform: `scale(${zoom})`, transformOrigin: '85% 55%'}} />
      </div>
      <div style={{position: 'absolute', left: 780, top: 380, fontFamily: marker, fontSize: 90, color: C.cold}}>4°C</div>
      {frame >= lockAt && (
        <div style={{position: 'absolute', left: 430, top: interpolate(lock, [0, 1], [-300, 1060]), width: 200, transform: `rotate(${(1 - lock) * 30}deg)`}}>
          <Lock />
        </div>
      )}
      {frame >= lockAt + 6 && (
        <div style={{position: 'absolute', left: 300, top: 1140, fontFamily: marker, fontSize: 120, color: C.red, border: `10px solid ${C.red}`, borderRadius: 20, padding: '0 30px', background: 'rgba(250,247,242,.9)', transform: `rotate(-8deg) scale(${stamp})`}}>
          LOCKED
        </div>
      )}
    </Paper>
  );
};

/** 08 everyman poking the iguana; "Not dead. PAUSED." */
const PokeScene: React.FC<{secondAt: number}> = ({secondAt}) => {
  const frame = useCurrentFrame();
  const poke = Math.max(0, Math.sin(frame / 2.2)) * 10;
  return (
    <Paper>
      <div style={{position: 'absolute', top: 300, width: '100%'}}>
        <Typewriter text="Not dead." size={110} cps={20} />
      </div>
      <div style={{position: 'absolute', top: 430, width: '100%'}}>
        <Typewriter text="PAUSED." size={160} delay={secondAt} cps={16} emphasis={['PAUSED']} />
      </div>
      <Pop x={880} y={520} w={170} delay={secondAt + 8}>
        <PauseIcon />
      </Pop>
      <Pop x={540} y={980} w={900} delay={0} wobble={false}>
        <div style={{transform: `translate(${poke}px, ${poke / 3}px)`}}>
          <Img src={shot('08')} style={{width: '100%'}} />
        </div>
      </Pop>
    </Paper>
  );
};

/** 09 thawing in the sun (warm push-in), then 10 walks through with sunglasses. */
const ThawScene: React.FC = () => <FullScene n="09" from={1.0} to={1.15} drift={-30} tint="rgba(255,170,60,.18)" />;

const CoolWalkScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const x = interpolate(frame, [0, durationInFrames], [-760, 1000]);
  const bob = Math.abs(Math.sin(frame / 3)) * -18;
  return (
    <Paper>
      <div style={{position: 'absolute', left: x, top: 640 + bob, width: 820, transform: `rotate(${Math.sin(frame / 3) * 1.5}deg)`}}>
        <Img src={shot('10')} style={{width: '100%'}} />
      </div>
    </Paper>
  );
};

export const IguanaShort: React.FC = () => {
  const reactAt = wordAt(L.fall, 'falling') + 0.25;
  const likeAt = wordAt(L.fall, 'like');
  const sleepyAt = wordAt(L.slow, 'iguanas');
  const walkAt = wordAt(L.thaw, 'walks');
  const cuts: {from: number; to: number; el: React.ReactNode}[] = [
    {from: 0, to: L.florida.start, el: <TitleScene />},
    {from: L.florida.start, to: L.fall.start, el: <FullScene n="01" from={1.0} to={1.1} />},
    {from: L.fall.start, to: likeAt, el: <FallingScene reactAt={f(reactAt - L.fall.start)} />},
    {from: likeAt, to: L.slow.start, el: <BananaScene />},
    {from: L.slow.start, to: sleepyAt, el: <ColdStreetScene />},
    {from: sleepyAt, to: L.lock.start, el: <SleepyScene />},
    {from: L.lock.start, to: L.paused.start, el: <MuscleScene lockAt={f(wordAt(L.lock, 'muscles') - L.lock.start)} />},
    {from: L.paused.start, to: L.thaw.start, el: <PokeScene secondAt={f(L.paused.words[3].start - L.paused.start)} />},
    {from: L.thaw.start, to: walkAt, el: <ThawScene />},
    {from: walkAt, to: timing.duration, el: <CoolWalkScene />},
  ];
  return (
    <AbsoluteFill style={{background: C.paper}}>
      {cuts.map((c, i) => (
        <Sequence key={i} from={f(c.from)} durationInFrames={f(c.to) - f(c.from)}>
          {c.el}
        </Sequence>
      ))}
      <ChapterLabel text={script.title} />
      {timing.lines.map((l) => (
        <Sequence key={l.id} from={0} durationInFrames={f(l.end + 0.2)} layout="none">
          {l.id !== 'title' && <Caption words={l.words} y={1440} />}
        </Sequence>
      ))}
      <Audio src={staticFile('audio/vo.wav')} />
      <Sfx at={0.07} name="pop" />
      <Sfx at={0.1} name="freeze" volume={0.35} />
      <Sfx at={L.florida.start} name="whoosh" volume={0.4} />
      <Sfx at={L.fall.start} name="whoosh" volume={0.5} />
      <Sfx at={reactAt} name="bonk" volume={0.6} />
      <Sfx at={likeAt} name="pop" />
      <Sfx at={likeAt + 0.2} name="marker" />
      <Sfx at={L.slow.start} name="freeze" volume={0.4} />
      <Sfx at={sleepyAt} name="pop" volume={0.4} />
      <Sfx at={wordAt(L.lock, 'muscles') + 0.35} name="thud" />
      <Sfx at={L.paused.words[3].start + 0.3} name="pop" />
      <Sfx at={L.thaw.start} name="ding" volume={0.35} />
      <Sfx at={walkAt} name="whoosh" volume={0.4} />
    </AbsoluteFill>
  );
};

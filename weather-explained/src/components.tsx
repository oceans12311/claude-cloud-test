import React from 'react';
import {Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {evolvePath} from '@remotion/paths';
import {C, body, marker} from './theme';

export const useSpring = (delay = 0, config = {stiffness: 180, damping: 14}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: frame - delay, fps, config});
};

/** Scale 0 → overshoot → 1 entrance, with a gentle idle wobble. */
export const Pop: React.FC<{delay?: number; x: number; y: number; w: number; children: React.ReactNode; wobble?: boolean}> = ({delay = 0, x, y, w, children, wobble = true}) => {
  const frame = useCurrentFrame();
  const s = useSpring(delay, {stiffness: 200, damping: 11});
  const rot = wobble ? Math.sin((frame - delay) / 12) * 2 : 0;
  return (
    <div style={{position: 'absolute', left: x - w / 2, top: y, width: w, transform: `translateY(-50%) scale(${s}) rotate(${rot}deg)`}}>
      {children}
    </div>
  );
};

export const Pic: React.FC<{src: string; style?: React.CSSProperties}> = ({src, style}) => (
  <Img src={staticFile(src)} style={{width: '100%', display: 'block', ...style}} />
);

/** Handwritten text typed letter by letter with a trailing "_" cursor. */
export const Typewriter: React.FC<{text: string; delay?: number; cps?: number; size?: number; color?: string; emphasis?: string[]; font?: string}> = ({text, delay = 0, cps = 22, size = 80, color = C.ink, emphasis = [], font = marker}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const n = Math.max(0, Math.floor(((frame - delay) / fps) * cps));
  const shown = text.slice(0, n);
  const done = n >= text.length;
  const cursor = !done || Math.floor(frame / 8) % 2 === 0;
  const words = shown.split(/(\s+)/);
  return (
    <div style={{fontFamily: font, fontSize: size, color, textAlign: 'center', lineHeight: 1.15}}>
      {words.map((w, i) => {
        const hit = emphasis.some((e) => e.toLowerCase().startsWith(w.replace(/[.,!?]/g, '').toLowerCase()) && w.trim());
        return <span key={i} style={{color: hit ? C.red : undefined}}>{w}</span>;
      })}
      <span style={{opacity: n > 0 && cursor && !done ? 1 : 0}}>_</span>
    </div>
  );
};

/** Hand-drawn red arrow that draws itself, with an optional handwritten label. */
export const HandArrow: React.FC<{d: string; delay?: number; label?: string; labelX?: number; labelY?: number; rotate?: number}> = ({d, delay = 0, label, labelX = 0, labelY = 0, rotate = 0}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - delay, [0, 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const {strokeDasharray, strokeDashoffset} = evolvePath(p, d);
  const labelOpacity = interpolate(frame - delay, [10, 16], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <>
      <svg style={{position: 'absolute', inset: 0}} width={1080} height={1920}>
        <defs>
          <marker id="head" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill={C.red} />
          </marker>
        </defs>
        <path d={d} fill="none" stroke={C.red} strokeWidth={12} strokeLinecap="round" strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset} markerEnd={p > 0.95 ? 'url(#head)' : undefined} />
      </svg>
      {label && (
        <div style={{position: 'absolute', left: labelX, top: labelY, fontFamily: marker, fontSize: 64, color: C.red, opacity: labelOpacity, transform: `rotate(${rotate}deg)`, whiteSpace: 'nowrap', ...outline}}>
          {label}
        </div>
      )}
    </>
  );
};

export const outline: React.CSSProperties = {
  WebkitTextStroke: '14px white',
  paintOrder: 'stroke fill',
};

export const ChapterLabel: React.FC<{text: string}> = ({text}) => (
  <div style={{position: 'absolute', top: 150, width: '100%', textAlign: 'center', fontFamily: body, fontSize: 72, color: C.ink, ...outline}}>{text}</div>
);

type Word = {w: string; start: number; end: number};
/** Word-by-word caption: words appear as spoken, the active one is red and slightly larger. */
export const Caption: React.FC<{words: Word[]; y?: number}> = ({words, y = 1330}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  return (
    <div style={{position: 'absolute', top: y, left: 70, right: 70, textAlign: 'center', fontFamily: marker, fontSize: 84, lineHeight: 1.15, color: C.ink, ...outline}}>
      {words.map((w, i) => {
        if (t < w.start) return null;
        const active = t < w.end + 0.05 && (i === words.length - 1 || t < words[i + 1].start);
        const s = interpolate(t - w.start, [0, 0.08], [0.6, 1], {extrapolateRight: 'clamp'});
        return (
          <span key={i} style={{display: 'inline-block', margin: '0 14px', color: active ? C.red : C.ink, transform: `scale(${active ? s * 1.1 : 1})`, transformOrigin: 'center bottom'}}>
            {w.w}
          </span>
        );
      })}
    </div>
  );
};

/* ---------- small flat icons (drawn in code; everything with detail comes from AI images) ---------- */

export const Thermometer: React.FC<{temp: number; h?: number}> = ({temp, h = 720}) => {
  // Scale: -5..30 °C
  const f = (temp + 5) / 35;
  const tubeTop = 40, tubeBot = h - 160;
  const level = tubeBot - (tubeBot - tubeTop) * f;
  const color = temp > 12 ? C.red : C.cold;
  return (
    <svg width={220} height={h} viewBox={`0 0 220 ${h}`}>
      <rect x={70} y={20} width={80} height={h - 120} rx={40} fill="white" stroke={C.ink} strokeWidth={10} />
      <rect x={90} y={level} width={40} height={tubeBot - level + 40} fill={color} />
      <circle cx={110} cy={h - 90} r={75} fill={color} stroke={C.ink} strokeWidth={10} />
      {[0.2, 0.4, 0.6, 0.8].map((k) => (
        <line key={k} x1={150} x2={180} y1={tubeTop + (tubeBot - tubeTop) * k} y2={tubeTop + (tubeBot - tubeTop) * k} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
      ))}
    </svg>
  );
};

export const Banana: React.FC = () => (
  <svg viewBox="0 0 300 200" width="100%">
    <path d="M30 60 C 60 170, 230 190, 280 70 C 250 120, 110 140, 55 45 Z" fill="#FFD84D" stroke={C.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M30 60 L 18 38 L 40 30 L 55 45" fill="#6B8E23" stroke={C.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M80 110 C 130 150, 200 150, 250 105" fill="none" stroke="#E0B020" strokeWidth={8} strokeLinecap="round" />
  </svg>
);

export const Lock: React.FC = () => (
  <svg viewBox="0 0 200 240" width="100%">
    <path d="M55 110 V75 a45 45 0 0 1 90 0 V110" fill="none" stroke={C.ink} strokeWidth={22} />
    <path d="M55 110 V75 a45 45 0 0 1 90 0 V110" fill="none" stroke="#9AA5B1" strokeWidth={10} />
    <rect x={25} y={105} width={150} height={120} rx={18} fill="#F5C542" stroke={C.ink} strokeWidth={10} />
    <circle cx={100} cy={155} r={16} fill={C.ink} />
    <rect x={93} y={160} width={14} height={34} rx={6} fill={C.ink} />
  </svg>
);

export const PauseIcon: React.FC = () => (
  <svg viewBox="0 0 200 200" width="100%">
    <circle cx={100} cy={100} r={88} fill={C.cold} stroke={C.ink} strokeWidth={10} />
    <rect x={62} y={55} width={26} height={90} rx={6} fill="white" stroke={C.ink} strokeWidth={6} />
    <rect x={112} y={55} width={26} height={90} rx={6} fill="white" stroke={C.ink} strokeWidth={6} />
  </svg>
);

export const Sun: React.FC<{spin: number}> = ({spin}) => (
  <svg viewBox="0 0 300 300" width="100%">
    <g transform={`rotate(${spin} 150 150)`}>
      {Array.from({length: 12}).map((_, i) => (
        <path key={i} d="M150 18 L166 62 L134 62 Z" fill={C.warm} stroke={C.ink} strokeWidth={7} strokeLinejoin="round" transform={`rotate(${i * 30} 150 150)`} />
      ))}
    </g>
    <circle cx={150} cy={150} r={82} fill="#FFD84D" stroke={C.ink} strokeWidth={10} />
    <path d="M112 150 q38 38 76 0" fill="none" stroke={C.ink} strokeWidth={9} strokeLinecap="round" />
    <circle cx={120} cy={128} r={9} fill={C.ink} />
    <circle cx={180} cy={128} r={9} fill={C.ink} />
  </svg>
);

/** Cartoon "bonk" stars circling a point. */
export const Stars: React.FC<{x: number; y: number; delay: number}> = ({x, y, delay}) => {
  const frame = useCurrentFrame();
  const f = frame - delay;
  if (f < 0) return null;
  const op = interpolate(f, [0, 4, 30, 40], [0, 1, 1, 0], {extrapolateRight: 'clamp'});
  return (
    <>
      {[0, 1, 2].map((i) => {
        const a = f / 6 + (i * Math.PI * 2) / 3;
        return (
          <svg key={i} width={70} height={70} viewBox="0 0 100 100" style={{position: 'absolute', left: x + Math.cos(a) * 110 - 35, top: y + Math.sin(a) * 36 - 35, opacity: op}}>
            <path d="M50 5 L61 38 L95 38 L67 58 L78 92 L50 71 L22 92 L33 58 L5 38 L39 38 Z" fill="#FFD84D" stroke={C.ink} strokeWidth={7} strokeLinejoin="round" />
          </svg>
        );
      })}
    </>
  );
};

/** Floating "z" letters for a sleepy / slowed-down character. */
export const Zzz: React.FC<{x: number; y: number}> = ({x, y}) => {
  const frame = useCurrentFrame();
  return (
    <>
      {[0, 1, 2].map((i) => {
        const f = (frame + i * 14) % 42;
        return (
          <div key={i} style={{position: 'absolute', left: x + f * 1.6 + i * 12, top: y - f * 3, fontFamily: marker, fontSize: 60 + i * 14, color: C.cold, opacity: interpolate(f, [0, 8, 34, 42], [0, 1, 1, 0])}}>
            z
          </div>
        );
      })}
    </>
  );
};

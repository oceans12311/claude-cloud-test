import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';

/**
 * A "puppet" built from ONE AI image (the frozen iguana, 1264x1264 source).
 * Layers: base (ice painted out) cut into body / arms / hind legs / tail with clip-paths,
 * plus the ice layer on top. Coordinates are in source pixels.
 */
const S = 1264;
const pct = (v: number) => `${(v / S) * 100}%`;
const rect = (x1: number, y1: number, x2: number, y2: number) =>
  `polygon(${pct(x1)} ${pct(y1)}, ${pct(x2)} ${pct(y1)}, ${pct(x2)} ${pct(y2)}, ${pct(x1)} ${pct(y2)})`;

const ARMS = {box: [380, 0, 580, 450], pivot: [470, 450]};
const LEGS = {box: [700, 0, 1100, 470], pivot: [790, 470]};
const TAIL = {box: [0, 820, 1264, 1264], pivot: [1100, 820]};
const BODY_CLIP = `polygon(${[
  [0, 0], [380, 0], [380, 450], [580, 450], [580, 0], [700, 0], [700, 470], [1100, 470], [1100, 0], [1264, 0], [1264, 820], [0, 820],
].map(([x, y]) => `${pct(x)} ${pct(y)}`).join(', ')})`;
const EYE = {x: 188, y: 452, rx: 44, ry: 46};

type Props = {
  width: number;
  /** 0 = thawed, 1 = fully frozen (ice wipes in left → right). */
  frozen?: number;
  /** 0..1 progress of the ice shattering and flying off. */
  shatter?: number;
  /** 0 = stiff, 1 = lively limb/tail movement. */
  life?: number;
  /** 0 = open, 1 = closed. */
  eyelid?: number;
  style?: React.CSSProperties;
};

const Piece: React.FC<{clip: string; pivot: number[]; angle: number}> = ({clip, pivot, angle}) => (
  <Img
    src={staticFile('img/layers/base.png')}
    style={{position: 'absolute', inset: 0, width: '100%', clipPath: clip, transform: `rotate(${angle}deg)`, transformOrigin: `${pct(pivot[0])} ${pct(pivot[1])}`}}
  />
);

// Ice shards: the ice layer re-drawn in a 5x5 grid of clipped tiles that fly outward.
const GRID = 5;
const tiles = Array.from({length: GRID * GRID}, (_, i) => {
  const gx = i % GRID, gy = Math.floor(i / GRID);
  const seed = Math.sin(i * 91.7) * 43758.5;
  const rnd = seed - Math.floor(seed);
  return {gx, gy, rnd};
});

export const IguanaRig: React.FC<Props> = ({width, frozen = 0, shatter = 0, life = 0, eyelid = 0, style}) => {
  const frame = useCurrentFrame();
  const wave = (speed: number, phase = 0) => Math.sin(frame / speed + phase);
  const tailA = life * wave(5) * 5;
  const legA = life * wave(3.2, 1) * 9;
  const armA = life * wave(3.6, 2.5) * 8;
  const wipe = frozen * 115 - 10;
  return (
    <div style={{position: 'relative', width, height: width, ...style}}>
      <Img src={staticFile('img/layers/base.png')} style={{position: 'absolute', inset: 0, width: '100%', clipPath: BODY_CLIP, filter: `saturate(${1 - frozen * 0.25}) brightness(${1 + frozen * 0.05})`}} />
      <Piece clip={rect(...(TAIL.box as [number, number, number, number]))} pivot={TAIL.pivot} angle={tailA} />
      <Piece clip={rect(...(LEGS.box as [number, number, number, number]))} pivot={LEGS.pivot} angle={legA} />
      <Piece clip={rect(...(ARMS.box as [number, number, number, number]))} pivot={ARMS.pivot} angle={armA} />
      {/* eyelid */}
      <svg viewBox={`0 0 ${S} ${S}`} style={{position: 'absolute', inset: 0, width: '100%'}}>
        <clipPath id="eyeclip">
          <ellipse cx={EYE.x} cy={EYE.y} rx={EYE.rx} ry={EYE.ry} />
        </clipPath>
        <g clipPath="url(#eyeclip)">
          <rect x={EYE.x - EYE.rx} y={EYE.y - EYE.ry} width={EYE.rx * 2} height={EYE.ry * 2 * eyelid} fill="#7CC242" />
          {eyelid > 0.05 && <line x1={EYE.x - EYE.rx} x2={EYE.x + EYE.rx} y1={EYE.y - EYE.ry + EYE.ry * 2 * eyelid} y2={EYE.y - EYE.ry + EYE.ry * 2 * eyelid} stroke="#141414" strokeWidth={9} />}
        </g>
      </svg>
      {/* ice: wipes in while freezing, then shatters into flying tiles */}
      {frozen > 0 && shatter <= 0 && (
        <Img
          src={staticFile('img/layers/ice.png')}
          style={{position: 'absolute', inset: 0, width: '100%', WebkitMaskImage: `linear-gradient(90deg, black ${wipe}%, transparent ${wipe + 10}%)`, maskImage: `linear-gradient(90deg, black ${wipe}%, transparent ${wipe + 10}%)`}}
        />
      )}
      {shatter > 0 && shatter < 1 &&
        tiles.map(({gx, gy, rnd}, i) => {
          const cx = (gx + 0.5) / GRID - 0.5, cy = (gy + 0.5) / GRID - 0.5;
          const d = shatter * (0.6 + rnd * 0.8);
          const dx = cx * width * 1.4 * d, dy = cy * width * 1.4 * d - Math.sin(shatter * Math.PI) * width * 0.15 + shatter * shatter * width * 0.5;
          return (
            <Img
              key={i}
              src={staticFile('img/layers/ice.png')}
              style={{position: 'absolute', inset: 0, width: '100%', clipPath: rect((gx * S) / GRID, (gy * S) / GRID, ((gx + 1) * S) / GRID, ((gy + 1) * S) / GRID), transform: `translate(${dx}px, ${dy}px) rotate(${(rnd - 0.5) * 120 * shatter}deg)`, opacity: 1 - shatter}}
            />
          );
        })}
    </div>
  );
};

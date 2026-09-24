import {continueRender, delayRender, staticFile} from 'remotion';

// Fonts are bundled in public/fonts (Google Fonts, OFL) so renders never depend on the network.
const load = (family: string, file: string) => {
  if (typeof document === 'undefined') return family;
  const handle = delayRender(`font ${family}`);
  const face = new FontFace(family, `url(${staticFile(`fonts/${file}`)}) format('woff2')`);
  face.load().then((f) => {
    document.fonts.add(f);
    continueRender(handle);
  }).catch((e) => {
    console.error(e);
    continueRender(handle);
  });
  return family;
};

export const body = load('Patrick Hand', 'PatrickHand.woff2');
export const marker = load('Gochi Hand', 'GochiHand.woff2');

export const C = {
  paper: '#FAF7F2',
  ink: '#141414',
  red: '#E3262E',
  cold: '#2F6FEB',
  warm: '#F28C28',
  brand: '#7B61FF',
};

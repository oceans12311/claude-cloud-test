import React from 'react';
import {Composition} from 'remotion';
import {IguanaDemo, DEMO_DURATION} from './IguanaDemo';
import {IguanaSolo, SOLO_DURATION} from './IguanaSolo';

export const Root: React.FC = () => (
  <>
    <Composition id="IguanaSolo" component={IguanaSolo} durationInFrames={SOLO_DURATION} fps={30} width={1080} height={1920} />
    <Composition id="IguanaDemo" component={IguanaDemo} durationInFrames={DEMO_DURATION} fps={30} width={1080} height={1920} />
  </>
);

import React from 'react';
import {Composition} from 'remotion';
import {IguanaDemo, DEMO_DURATION} from './IguanaDemo';

export const Root: React.FC = () => (
  <Composition id="IguanaDemo" component={IguanaDemo} durationInFrames={DEMO_DURATION} fps={30} width={1080} height={1920} />
);

import type { BeamCoords } from '../magic-ui-beam-edge.types';

export interface MagicBeamGradientProps {
  beam: BeamCoords;
  beginValue: string;
  durationValue: string;
  gradientStartColor: string;
  id: string;
}

export interface BeamAnimationProps {
  beam: BeamCoords;
  beginValue: string;
  durationValue: string;
}

export interface BeamAnimateProps {
  attributeName: string;
  beginValue: string;
  durationValue: string;
  values: string;
}

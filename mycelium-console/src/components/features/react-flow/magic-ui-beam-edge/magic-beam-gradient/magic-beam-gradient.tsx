import {
  MAGIC_BEAM_TRAIL_COLOR,
  MagicBeamGradientOffset,
} from '../magic-ui-beam-edge.config';
import type { MagicBeamGradientProps } from './magic-beam-gradient.types';
import { BeamAnimation } from './magic-beam-gradient-animation';

export function MagicBeamGradient({
  id,
  beam,
  durationValue,
  beginValue,
  gradientStartColor,
}: MagicBeamGradientProps) {
  return (
    <linearGradient
      id={id}
      gradientUnits='userSpaceOnUse'
      x1={beam.x1From}
      y1={beam.y1From}
      x2={beam.x2From}
      y2={beam.y2From}
    >
      <BeamAnimation
        beam={beam}
        durationValue={durationValue}
        beginValue={beginValue}
      />
      <stop
        offset={MagicBeamGradientOffset.Start}
        stopColor={MAGIC_BEAM_TRAIL_COLOR}
        stopOpacity='0'
      />
      <stop
        offset={MagicBeamGradientOffset.Trail}
        stopColor={MAGIC_BEAM_TRAIL_COLOR}
        stopOpacity='0.5'
      />
      <stop
        offset={MagicBeamGradientOffset.Highlight}
        stopColor={gradientStartColor}
      />
      <stop
        offset={MagicBeamGradientOffset.End}
        stopColor={gradientStartColor}
        stopOpacity='0'
      />
    </linearGradient>
  );
}

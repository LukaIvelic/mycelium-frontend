import { MAGIC_BEAM_REPEAT_COUNT } from '../magic-ui-beam-edge.config';
import type {
  BeamAnimateProps,
  BeamAnimationProps,
} from './magic-beam-gradient.types';

export function BeamAnimation({
  beam,
  durationValue,
  beginValue,
}: BeamAnimationProps) {
  return (
    <>
      <BeamAnimate
        attributeName='x1'
        values={`${beam.x1From};${beam.x1To}`}
        durationValue={durationValue}
        beginValue={beginValue}
      />
      <BeamAnimate
        attributeName='y1'
        values={`${beam.y1From};${beam.y1To}`}
        durationValue={durationValue}
        beginValue={beginValue}
      />
      <BeamAnimate
        attributeName='x2'
        values={`${beam.x2From};${beam.x2To}`}
        durationValue={durationValue}
        beginValue={beginValue}
      />
      <BeamAnimate
        attributeName='y2'
        values={`${beam.y2From};${beam.y2To}`}
        durationValue={durationValue}
        beginValue={beginValue}
      />
    </>
  );
}

function BeamAnimate({
  attributeName,
  values,
  durationValue,
  beginValue,
}: BeamAnimateProps) {
  return (
    <animate
      attributeName={attributeName}
      values={values}
      dur={durationValue}
      begin={beginValue}
      repeatCount={MAGIC_BEAM_REPEAT_COUNT}
    />
  );
}

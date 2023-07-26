/* synth.js */

import { Synth, PolySynth } from 'tone';

const SUPRESS_AUDIO_CONTEXT_WARNING = true;

function sendAudioContextWarning()
{
  if (!SUPRESS_AUDIO_CONTEXT_WARNING) {
    console.warn('audio context could not be loaded');
  }
}

export default function createSynth() 
{
  var synth;
  try {
    synth = new PolySynth(Synth).toDestination();
  } catch (e) {
    synth = null;
    if (e instanceof ReferenceError) {
      sendAudioContextWarning();
    } else {
      console.error('unexpected error when loading synth');
    }
  }
  return synth;
}

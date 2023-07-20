/* DetectedChordList.jsx */

import { Chord } from "tonal";

import { getPitchName } from './notes_api'

export default function DetectedChordsList({ notes })
{
  let chords = Chord.detect(notes.map(getPitchName));
  let chordsString = chords.length > 0 ? chords.join(', ') : "N/A";

  return (
    <div style={{textAlign: "center", paddingTop: '20px'}}>
      <h3>Detected Chords: {chordsString}</h3>
    </div>
  );
}
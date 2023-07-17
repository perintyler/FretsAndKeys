/* Keyboard.jsx */

import 'react-piano/dist/styles.css';

import { Piano, MidiNumbers } from 'react-piano';
import { getPitchName, getOctaveNumber, isBlackKey } from './notes_api';

function NoteLabel({ midiNumber, color }) 
{
  return (
    <div style={{"color": color}} className="note-label-container unselectable-text">
      <span className="note-label-name">{getPitchName(midiNumber)}</span> 
      <span className="note-label-octave"> {getOctaveNumber(midiNumber)} </span>
    </div>
  );
}

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

export default function Keyboard() 
{
  const firstNote = MidiNumbers.fromNote('a0');
  const lastNote = MidiNumbers.fromNote('C8');

  return (
    <Piano
      noteRange={{ first: firstNote, last: lastNote }}
      playNote={(midiNumber) => {}}
      stopNote={(midiNumber) => {}}
      renderNoteLabel={({ keyboardShortcut, midiNumber, isActive, isAccidental }) => {
        let color = isBlackKey(midiNumber) ? "white" : "black";
        return <NoteLabel midiNumber={midiNumber} color={color}></NoteLabel>;
      }}
    />
  );
}

/* Keyboard.jsx */

import 'react-piano/dist/styles.css';

import { useState } from 'react';
import { Piano, MidiNumbers } from 'react-piano';
import { getPitchName, getOctaveNumber, isBlackKey } from './notes_api';

const FIRST_KEYBOARD_NOTE = MidiNumbers.fromNote('a0');
const LAST_KEYBOARD_NOTE = MidiNumbers.fromNote('C8');

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
  var [selectedNotes, setSelectedNotes] = useState([]);

  function updateSelectedNotes(midiNumber) {

    if (selectedNotes.includes(midiNumber)) {
      setSelectedNotes(selectedNotes.filter((alreadySelectedMidiNumber) => midiNumber !== alreadySelectedMidiNumber));
    } else {
      setSelectedNotes([...selectedNotes, midiNumber]);
    }
  }

  return (
    <Piano
      noteRange={{ first: FIRST_KEYBOARD_NOTE, last: LAST_KEYBOARD_NOTE }}
      stopNote={(midiNumber) => {}}
      playNote={(midiNumber) => {}}
      onPlayNoteInput={(midiNumber) => {updateSelectedNotes(midiNumber)}}
      renderNoteLabel={({ keyboardShortcut, midiNumber, isActive, isAccidental }) => {
        let color = isBlackKey(midiNumber) ? "white" : "black";
        return <NoteLabel midiNumber={midiNumber} color={color}></NoteLabel>;
      }}
    />
  );
}

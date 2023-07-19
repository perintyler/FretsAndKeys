/* Keyboard.jsx */

import 'react-piano/dist/styles.css';

import { useState } from 'react';
import { Piano, MidiNumbers } from 'react-piano';
import { getPitchName, getOctaveNumber, isBlackKey } from './notes_api';

const FIRST_KEYBOARD_NOTE = MidiNumbers.fromNote('E2');
const LAST_KEYBOARD_NOTE = MidiNumbers.fromNote('C6'); // last note on a piano is C8

function NoteLabel({ midiNumber, color })
{
  return (
    <div style={{"color": color}} className="note-label-container unselectable-text" data-testid="note-label">
      <span className="note-label-name">{getPitchName(midiNumber)}</span> 
      <span className="note-label-octave"> {getOctaveNumber(midiNumber)} </span>
    </div>
  );
}

function KeyCover({ midiNumber, keyIsSelected })
{
  let style = {width: '100%', height: '100%'};
  if (keyIsSelected) {
    style.backgroundColor = 'red';
    style.borderRadius = '0 0 5px 5px';
  }

  return (
    <div style={style}>
        <NoteLabel
          midiNumber={midiNumber}
          color={isBlackKey(midiNumber) && !keyIsSelected ? "white" : "black"}
        />
    </div>
  );
}

export default function Keyboard({ selectedNotes, updateSelectedNotes }) 
{
  return (
    <Piano
      noteRange={{ first: FIRST_KEYBOARD_NOTE, last: LAST_KEYBOARD_NOTE }}
      stopNote={(midiNumber) => {}}
      playNote={(midiNumber) => {}}
      onPlayNoteInput={(midiNumber) => {updateSelectedNotes(midiNumber)}}
      renderNoteLabel={({ keyboardShortcut, midiNumber, isActive, isAccidental }) => {
        return (
          <KeyCover 
            midiNumber={midiNumber}
            keyWidthToHeight={0.5}
            keyIsSelected={!isActive && selectedNotes.includes(midiNumber)}
          >
          </KeyCover>
        );
      }}
    />
  );
}

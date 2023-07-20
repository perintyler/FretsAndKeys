/* Keyboard.jsx */

import 'react-piano/dist/styles.css';

import { useState, useEffect } from 'react';
import { Piano, MidiNumbers } from 'react-piano';
import { getPitchName, getOctaveNumber, isBlackKey } from './notes_api';

const KEY_HEIGHT = 80; // pixels

const KEYBOARD_CONTAINER_WIDTH_PERCENTAGE = 0.9; // 90% of window

const FIRST_KEYBOARD_NOTE = MidiNumbers.fromNote('E2');

function getWindowWidth() 
{
  const { innerWidth: width, innerHeight: height } = window;
  return width;
}

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
    style.backgroundColor = 'var(--tomato)';
    let borderRadius = isBlackKey(midiNumber) ? 3 : 5;
    style.borderRadius = `0 0 ${borderRadius}px ${borderRadius}px`;
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
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  useEffect(() => 
  {
    function handleResize() {
      setWindowWidth(getWindowWidth());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const keyWidthToHeightRatio = windowWidth < 500 ? 0.15 : 0.22;
  const keyWidth = KEY_HEIGHT*keyWidthToHeightRatio;
  let componentWidth = windowWidth*KEYBOARD_CONTAINER_WIDTH_PERCENTAGE;
  let numKeys = Math.floor(componentWidth / keyWidth);
  var lastNote = Math.min(
    MidiNumbers.fromNote('A5'),
    FIRST_KEYBOARD_NOTE + numKeys
  );

  return (
    <Piano
      noteRange={{first: FIRST_KEYBOARD_NOTE, last: lastNote}}
      stopNote={midiNumber => {}}
      playNote={midiNumber => updateSelectedNotes(midiNumber)}
      onPlayNoteInput={(midiNumber) => {}}
      renderNoteLabel={({ keyboardShortcut, midiNumber, isActive, isAccidental }) => {
        return (
          <KeyCover 
            midiNumber={midiNumber}
            keyWidthToHeight={keyWidthToHeightRatio}
            keyIsSelected={!isActive && selectedNotes.includes(midiNumber)}
          >
          </KeyCover>
        );
      }}
    />
  );
}

/* App.jsx */

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';

import Guitar from './Guitar';
import Keyboard from './Keyboard';
import HeaderBar from './HeaderBar';
import MuteSwitch from './MuteSwitch';
import ScaleSelection from './ScaleSelection';
import DetectedChordsList from './DetectedChordsList';

import { getNoteAsText, getMidiNumber } from './notes_api';
import { Scale } from "tonal";

import Button from 'react-bootstrap/Button';

import * as Tone from 'tone'; // can i use modern import for this

const synth = new Tone.Synth().toDestination();

const LAST_NOTE = getMidiNumber("G#", 5); // last fret on the fretboard

function ExplanationBox() {
  return (
    <div id="explanation-banner">
      Click on a fret or a key and the corresponding note will show up
      on the other instrument
    </div>
  );
}

function ClearNotesButton({ onClick })
{
  return (
      <Button 
        onClick={()=>onClick()} 
        className="vertical-center" 
        id="clear-notes-button"
        children="Clear Notes"
      />
  );
}

export default function App()
{
  var [selectedNotes, setSelectedNotes] = useState([]);
  var [isMuted, setIsMuted] = useState(false);

  function updateSelectedNotes(midiNumber) 
  {
    if (midiNumber <= LAST_NOTE) {
      var filteredNotes = selectedNotes.filter((selected) => midiNumber !== selected);
      if (selectedNotes.length !== filteredNotes.length) { // deselect a previously selected note
        setSelectedNotes(filteredNotes);
      } else { // select a new note
        if (!isMuted) {
          synth.triggerAttackRelease(getNoteAsText(midiNumber), "8n");
        }
        setSelectedNotes(selectedNotes.concat([midiNumber]));
      }
    }
  }

  function showScale(rootNote, scale) 
  {
    let pitches = Scale.get(`${rootNote.toLowerCase()} ${scale}`)['notes'];
    let midiNumbers = [2,3,4,5,6].map(octave => pitches.map(pitch => getMidiNumber(pitch, octave))).flat(1);
    setSelectedNotes(midiNumbers);
  }

  var guitar = (
    <Guitar 
      selectedNotes={selectedNotes} 
      updateSelectedNotes={(midiNumber)=>updateSelectedNotes(midiNumber)}
    />
  );

  var keyboard = (
    <Keyboard 
      selectedNotes={selectedNotes} 
      updateSelectedNotes={(midiNumber)=>updateSelectedNotes(midiNumber)}
    />
  );

  return (
    <div id="App">
      <HeaderBar />
      <div id="instruments-container">
        <ExplanationBox />
        <MuteSwitch onChange={() => setIsMuted(!isMuted)} />
        <div id="guitar-container">{guitar}</div>
        <div id="keyboard-container">{keyboard}</div>
        <div id="bottom-section">
            <div style={{display:"inline-block"}}>
              <ScaleSelection showScale={showScale}/>
            </div>
            <div id="detected-chords-card-container">
              <DetectedChordsList notes={selectedNotes}/>
            </div>
          <ClearNotesButton onClick={()=>setSelectedNotes([])} />
        </div>
      </div>
    </div>
  );
}

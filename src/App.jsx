/* App.jsx */

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect, useRef, useState } from 'react';

import Guitar from './Guitar';
import Keyboard from './Keyboard';
import HeaderBar from './HeaderBar';
import MuteSwitch from './MuteSwitch';
import ScaleSelection from './ScaleSelection';
import DetectedChordsList from './DetectedChordsList';

import { getNoteAsText, getMidiNumber, getPitchName } from './notes_api';
import { Chord, Scale } from "tonal";

import Button from 'react-bootstrap/Button';

import * as Tone from 'tone'; // can i use modern import for this

const synth = new Tone.Synth().toDestination();

function ClearNotesButton({ onClick })
{
  return (
    <Button 
      onClick={()=>onClick()} 
      className="center" 
      id="clear-notes-button"
      children="Clear Notes"
    />
  );
}

function Instruments()
{
  var [selectedNotes, setSelectedNotes] = useState([]);
  var [isMuted, setIsMuted] = useState(false);

  function updateSelectedNotes(midiNumber) {
    var filteredNotes = selectedNotes.filter((selected) => midiNumber !== selected);
    if (selectedNotes.length !== filteredNotes.length) { 
      // deselect a previously selected note
      setSelectedNotes(filteredNotes);
    } else { 
      // select a new note
      if (!isMuted) {
        synth.triggerAttackRelease(getNoteAsText(midiNumber), "8n");
      }
      setSelectedNotes(selectedNotes.concat([midiNumber]));
    }
  }

  function showScale(rootNote, scale) {
    console.log(rootNote, scale)
    let pitches = Scale.get(`${rootNote.toLowerCase()} ${scale}`)['notes'];
    let midiNumbers = [2,3,4,5,6].map(octave => pitches.map(pitch => getMidiNumber(pitch, octave))).flat(1);
    console.log(midiNumbers);
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

  var clearButton = <ClearNotesButton onClick={()=>setSelectedNotes([])} />;

  var muteButton = <MuteSwitch onChange={() => setIsMuted(!isMuted)} />

  var scaleSelection = <ScaleSelection showScale={showScale} />;

  var chordList = <DetectedChordsList notes={selectedNotes} />;

  return (
    <div id="instruments-container">
      <div>
        <ClearNotesButton onClick={()=>setSelectedNotes([])} />
        <MuteSwitch onChange={() => setIsMuted(!isMuted)} />
      </div>

      <div id="guitar-container">{guitar}</div>
      <div id="keyboard-container">{keyboard}</div>

      <DetectedChordsList notes={selectedNotes} />
      <div>{scaleSelection}</div>
    </div>
  );
}

function App() {
  return (
    <div id="App">
      <HeaderBar />
      <Instruments></Instruments>
    </div>
  );
}

export default App;

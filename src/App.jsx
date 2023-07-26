/* App.jsx */

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';

import Guitar from './Guitar';
import Keyboard from './Keyboard';
import HeaderBar from './HeaderBar';
import MuteSwitch from './MuteSwitch';
import ScaleSelection from './ScaleSelection';
import ChordsCard from './ChordsCard';
import ScalesCard from './ScalesCard';

import { getNoteAsText, getMidiNumber } from './notes_api';
import createSynth from './synth';

import { Scale } from "tonal";

import Button from 'react-bootstrap/Button';

const synth = createSynth();

function doesAudioContextExist()
{
  return synth !== null;
}

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
    var filteredNotes = selectedNotes.filter((selected) => midiNumber !== selected);
    if (selectedNotes.length !== filteredNotes.length) { // deselect a previously selected note
      setSelectedNotes(filteredNotes);
    } else { // select a new note
      if (doesAudioContextExist() && !isMuted) {
        synth.triggerAttackRelease(getNoteAsText(midiNumber), "8n");
      }
      setSelectedNotes(selectedNotes.concat([midiNumber]));
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
              <ChordsCard notes={selectedNotes}/>
            </div>
            <div id="detected-scales-card-container">
              <ScalesCard notes={selectedNotes} />
            </div>
          <ClearNotesButton onClick={()=>setSelectedNotes([])} />
        </div>
      </div>
    </div>
  );
}

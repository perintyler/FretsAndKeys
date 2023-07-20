/* App.jsx */

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Guitar from './Guitar';
import Keyboard from './Keyboard';
import { useEffect, useRef, useState } from 'react';
import {ReactComponent as GithubLogo} from './svg/github-logo.svg';
import {ReactComponent as MuteIcon} from './svg/mute-icon.svg';
import {ReactComponent as UnmuteIcon} from './svg/unmute-icon.svg';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import Button from 'react-bootstrap/Button';
import { getNoteAsText, getPitches, getMidiNumber, getPitchName } from './notes_api';

import * as Tone from 'tone'

import { Chord, Scale, ScaleType } from "tonal";

const synth = new Tone.Synth().toDestination();

const SCALE_NAMES = ScaleType.names();

function ScaleSelection({ showScale })
{
  var [selectedRootNote, setSelectedRootNote] = useState(getPitches()[0]);
  var [selectedScale, setSelectedScale] = useState(ScaleType.names()[0]);

  function updateRootNote(key) { setSelectedRootNote(getPitches()[key])}
  function updateScale(key) { setSelectedScale(ScaleType.names()[key])}

  let rootNoteDropdownOptions = getPitches().map((pitch, i) => <Dropdown.Item eventKey={i}>{pitch}</Dropdown.Item>);
  let scaleDropdownOptions = ScaleType.names().map((scale, i) => <Dropdown.Item eventKey={i}>{scale}</Dropdown.Item>);

  return (
    <div>
      <Button onClick={()=>{showScale(selectedRootNote, selectedScale)}}>Show Scale</Button>
      <DropdownButton onSelect={(key, event)=>{updateRootNote(key)}} id="dropdown-basic-button" title={`Root Note: ${selectedRootNote}`}>{rootNoteDropdownOptions}</DropdownButton>
      <DropdownButton onSelect={(key, event)=>{updateScale(key)}} id="dropdown-basic-button" title={`Scale Type: ${selectedScale}`}>{scaleDropdownOptions}</DropdownButton>
    </div>
  );
}

function Instruments()
{
  var [selectedNotes, setSelectedNotes] = useState([]);
  var [isMuted, setIsMuted] = useState(false);

  function updateSelectedNotes(midiNumber) {
    var filteredNotes = selectedNotes.filter((selected) => midiNumber !== selected);

    if (selectedNotes.length !== filteredNotes.length) { 
      // unselect note
      setSelectedNotes(filteredNotes);
    } else { 
      // select note
      setSelectedNotes(selectedNotes.concat([midiNumber]));

      if (!isMuted) {
        synth.triggerAttackRelease(getNoteAsText(midiNumber), "8n", Tone.now());
      }
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

  var clearButton = (
    <Button 
      onClick={()=>setSelectedNotes([])} 
      className="center" 
      id="clear-notes-button"
      children="Clear"
    />
  );

  var muteButton = (
    <div onClick={()=>setIsMuted(!isMuted)} id="mute-button">
      {isMuted ? <UnmuteIcon /> : <MuteIcon/>}
    </div>
  );

  var scaleSelection = <ScaleSelection showScale={showScale} />;

  let chords = Chord.detect(selectedNotes.map(getPitchName));
  let chordsString = chords.length > 0 ? chords.join(', ') : "N/A";
  var currentChord = <div><h3>Detected Chords: {chordsString}</h3></div>;

  return (
    <div id="instruments-container">
      <div id="guitar-container">{guitar}</div>
      <div id="keyboard-container">{keyboard}</div>
      <div style={{textAlign: "center", paddingTop: '20px'}}>{currentChord}</div>
      <div>{clearButton}{muteButton}{scaleSelection}</div>
    </div>
  );
}

function HeaderBar()
{
  return (
    <div id="header">
      <ul>
        <li><h1>FretsAndKeys.xyz</h1></li>
        <li><GithubLogo style={{textColor: 'black'}} /></li>
      </ul>
    </div>

  )
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

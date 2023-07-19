/* App.jsx */

import './App.css';

import Guitar from './Guitar';
import Keyboard from './Keyboard';
import { useEffect, useRef, useState } from 'react';
import {ReactComponent as GithubLogo} from './github-logo.svg';


function Instruments()
{
  var [selectedNotes, setSelectedNotes] = useState([]);

  function updateSelectedNotes(midiNumber) {
    var filteredNotes = selectedNotes.filter((selected) => midiNumber !== selected);

    if (selectedNotes.length !== filteredNotes.length) { 
      // unselect note
      setSelectedNotes(filteredNotes);
    } else { 
      // select note
      setSelectedNotes(selectedNotes.concat([midiNumber]));
    }
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
    <div>
      <div id="guitar-container">{guitar}</div>
      <div id="keyboard-container">{keyboard}</div>
    </div>
  );
}

function HeaderBar()
{
  return (
    <div id="header">
      <ul>
        <li><h1>FretsAndKeys.com</h1></li>
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

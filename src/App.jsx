/* App.jsx */

import './App.css';

import Guitar from './Guitar';
import Keyboard from './Keyboard';
import { useEffect, useRef, useState } from 'react';

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

function App() {
  return (
    <div id="App">
      <Instruments></Instruments>
    </div>
  );
}

export default App;

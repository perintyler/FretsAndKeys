/* Guitar.jsx */

import { useEffect, useRef, useState } from 'react';
import { Fretboard } from '@moonwave99/fretboard.js';
import { getMidiNumber, getMidiNumberFromFretAndString, getNoteAsText } from './notes_api'

function createFretboard() 
{
  return new Fretboard({
    el: '#fretboard',
    fretColor: 'black',
    dotFill: 'white',
    dotText: ({ note }) => note,
    dotStrokeColor: ({ moving }) => 'black',
  }).render();

  // fretboard.renderScale({type:"chromatic"}); // render all notes
  // fretboard.style({text: ({ note, octave }) => `${note}${octave}`}); // fretboard.js api doesn't support rendering react components in the 'get text' callback
  // fretboard.style({text: ({ note, octave }) => getMidiNumber(note, octave)}); // fretboard.js api doesn't support rendering react components in the 'get text' callback
}

function createFretboardJSDotObject(fret, string) 
{
  let midiNumber = getMidiNumberFromFretAndString(fret, string);
  let noteAsText = getNoteAsText(midiNumber);

  return {
    fret: fret,
    string: string,
    note: noteAsText,
  };
}

export default function Guitar() 
{
  var fretboardRef = useRef(null);
  var [selected, setSelectedNotes] = useState([]);

  function updateSelectedNotes(fret, string) 
  {
    var numNotesBeforeNewSelection = selected.length;

    selected = selected.filter(selected => fret !== selected.fret || string !== selected.string);
    if (selected.length === numNotesBeforeNewSelection) {
      selected.push({fret: fret, string: string});
    }

    const dots = selected.map((note) => createFretboardJSDotObject(note.fret, note.string));
    fretboardRef.current.setDots(dots).render();

    setSelectedNotes(selected);
  }

  useEffect(() => {
      if (fretboardRef.current === null) 
      {
        fretboardRef.current = new Fretboard({
          el: '#fretboard',
          fretColor: 'black',
          dotFill: 'white',
          dotText: ({ note }) => note,
          dotStrokeColor: ({ moving }) => 'black',
        }).render();

        fretboardRef.current.on('click', ({ fret, string }) => updateSelectedNotes(fret, string));
      }
  });

  return <figure id="fretboard"></figure>;
}

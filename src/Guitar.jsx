/* Guitar.jsx */

import { useEffect, useRef } from 'react';
import { Fretboard } from '@moonwave99/fretboard.js';
import { getMidiNumberFromFretAndString, getNoteAsText } from './notes_api'

const MIDI_NUMBER_TO_STRING_AND_FRET = (function() 
{
  let stringAndFretMap = {};
  for (var string = 1; string <= 6; string += 1) 
  {
    for (var fret = 0; fret <= 15; fret += 1) 
    {
      let midiNumber = getMidiNumberFromFretAndString(fret, string);
      let stringAndFret = { string: string, fret: fret };

      if (midiNumber in stringAndFretMap) {
        stringAndFretMap[midiNumber].push(stringAndFret);
      } else {
        stringAndFretMap[midiNumber] = [stringAndFret];
      }
    }
  }
  return stringAndFretMap;
})();

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

function createFretboard() 
{
  const fretboard = new Fretboard({
    el: '#fretboard',
    fretColor: 'black',
    dotFill: 'white',
    scaleFrets: true,
    leftPadding: true,
    rightPadding: true,
    dotText: ({ note }) => note,
    dotStrokeColor: ({ moving }) => 'black',
  });

  fretboard.render();

  return fretboard;
}

export default function Guitar({ selectedNotes, updateSelectedNotes }) 
{
  var fretboardRef = useRef(null);

  useEffect(() => {
      if (fretboardRef.current === null) {
        fretboardRef.current = createFretboard();
      } else {

        let dots = selectedNotes.filter(midiNumber => midiNumber in MIDI_NUMBER_TO_STRING_AND_FRET)
                                .map(midiNumber => MIDI_NUMBER_TO_STRING_AND_FRET[midiNumber])
                                .flat(1)
                                .map(note => createFretboardJSDotObject(note.fret, note.string));
        
        if (true || fretboardRef.current.dots.length !== dots.length) {
          fretboardRef.current.setDots(dots).render();
        }
      }

      fretboardRef.current.on('click', ({ fret, string }) => {
        let midiNumber = getMidiNumberFromFretAndString(fret, string);
        updateSelectedNotes(midiNumber);
      });
  
      return function cleanup() {
        fretboardRef.current.removeEventListeners();
        fretboardRef.current.clear();
      };
  });

  return (
    <div id="fretboard-container">
      <div id="open-string-dots-outer-container">
        <div id="open-string-dots-inner-container">
          <div className="open-string-dot" />
          <div className="open-string-dot" />
          <div className="open-string-dot" />
          <div className="open-string-dot" />
          <div className="open-string-dot" />
          <div className="open-string-dot" />
        </div>
      </div>
      <div id="strings-and-frets-outer-container">
        <div id="strings-and-frets-inner-container">
          <figure id="fretboard"></figure>
        </div>
      </div>
    </div>
  );
}

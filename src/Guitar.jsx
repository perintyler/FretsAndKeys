/* Guitar.jsx */

import { useEffect, useRef } from 'react';
import { Fretboard } from '@moonwave99/fretboard.js';

function createFretboard() {
  const fretboard = new Fretboard({
    el: '#fretboard',
    fretColor: 'blue',
    dotFill: 'red'
  });

  fretboard.renderScale({type:"chromatic"}); // render all notes

  fretboard.style({text: ({ note, octave }) => `${note}${octave}`}); // fretboard.js api doesn't support rendering react components in the 'get text' callback

  return fretboard;
}

export default function Guitar() {
  var fretboardRef = useRef(null);

  useEffect(() => {
      if (fretboardRef.current === null) {
        fretboardRef.current = createFretboard();
      }
  });

  return <figure id="fretboard"></figure>;
}

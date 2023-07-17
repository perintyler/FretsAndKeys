import './App.css';
import { useEffect } from 'react';
import { Fretboard } from '@moonwave99/fretboard.js';


function Guitar() {
  var fretboard = null;

  useEffect(() => {

      if (fretboard === null) {
        fretboard = new Fretboard({
          el: '#fretboard',
          fretColor: 'blue',
          dotFill: 'red'
        });
      }

      if (!fretboard.baseRendered) {
        fretboard.renderScale({type:"chromatic"});
        fretboard.style({text: ({ note }) => note}); // show note names
      }

  });

  return <figure id="fretboard"></figure>;
}


function App() {

  return (
    <div className="App">
      <Guitar></Guitar>
    </div>
  );

}

export default App;

/* App.jsx */

import './App.css';

import Guitar from './Guitar';
import Keyboard from './Keyboard';

function App() {

  return (
    <div id="App">
      <div id="guitar-container">
        <Guitar></Guitar>
      </div>
      <div id="keyboard-container">
        <Keyboard></Keyboard>
      </div>
    </div>
  );

}

export default App;

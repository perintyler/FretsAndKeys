/* DetectedChordList.jsx */

import { Chord } from "tonal";

import { getPitchName } from './notes_api'

import Card from 'react-bootstrap/Card';

export default function DetectedChordsList({ notes })
{
  let chords = Chord.detect(notes.map(getPitchName));

  var cardBody;
  if (chords.length === 0) {
    cardBody = (
      <div className="centered-text" style={{ paddingTop: "18px" }}>
        <div>No chords detected</div>
        <a href="https://en.wikipedia.org/wiki/Chord_(music)">Don't Understand? Click to learn more.</a>
      </div>
    );
  } else {
    let chordListItems = chords.map(chord => <li>{chord}</li>);
    cardBody = <ul>{ chordListItems }</ul>;
  }


  return (
    <Card id="detected-chords-card">
      <Card.Header>Detected Chords</Card.Header>
      <Card.Body>{ cardBody }</Card.Body>
    </Card>
  );
}
/* DetectedChordList.jsx */

import { Chord } from "tonal";

import { getPitchName } from './notes_api'

import Card from 'react-bootstrap/Card';

export default function DetectedChordsCard({ notes })
{
  let chords = Chord.detect(notes.map(getPitchName));

  var cardBody;
  if (chords.length === 0) {
    cardBody = (
      <div className="centered-text" style={{ paddingTop: "36px" }}>
        <h5>No chords detected</h5>
      </div>
    );
  } else {
    let chordListItems = chords.map((chord,i) => <li key={i}>{chord}</li>);
    cardBody = <ul>{ chordListItems }</ul>;
  }


  return (
    <Card id="detected-chords-card">
      <Card.Header>Detected Chords</Card.Header>
      <Card.Body>{ cardBody }</Card.Body>
    </Card>
  );
}
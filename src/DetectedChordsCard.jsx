/* DetectedChordList.jsx */

import { Chord } from "tonal";

import { getPitchName } from './notes_api'

import Card from 'react-bootstrap/Card';

import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

export default function DetectedChordsCard({ notes })
{
  let chords = Chord.detect(notes.map(getPitchName));

  var cardBody;
  if (chords.length === 0) {
    cardBody = (
      <div className="centered-text vertically-centered-text">
        <h5>No chords detected</h5>
      </div>
    );
  } else {
    let chordListItems = chords.map((chord,i) => <ListGroupItem key={i}>{chord}</ListGroupItem>);
    cardBody = <ListGroup>{ chordListItems }</ListGroup>;
  }

  return (
    <Card id="detected-chords-card">
      <Card.Header>Detected Chords</Card.Header>
      <Card.Body>{ cardBody }</Card.Body>
    </Card>
  );
}

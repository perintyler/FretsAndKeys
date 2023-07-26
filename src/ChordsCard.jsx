/* ChordsCard.jsx */

import { Chord } from "tonal";

import { getPitchName } from './notes_api'

import Card from 'react-bootstrap/Card';

import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

function ChordListItem({ chord })
{
  chord = chord.replace('M', 'major')
               .replace(/[m,](?=[^maj|major])/, 'minor'); // replace 'm' with 'minor' unless the 
                                                          // 'm' is part of 'maj' or 'major'
  var rootNote;
  var chordInfo;
  if (chord.charAt(1) === "#") { // root note is sharp
    rootNote = chord.slice(0, 2);
    rootNote = rootNote.replace('#', '♯');
    chordInfo = chord.slice(2);
  } else {
    rootNote = chord.slice(0, 1);
    chordInfo = chord.slice(1);
  }

  chordInfo = chordInfo.replace('b', '♭').replace('#', '♯');

  var bassNote;
  if (chordInfo.includes('/')) {
    bassNote = chordInfo.split('/')[1];
    chordInfo = chordInfo.split('/')[0];
  } else {
    bassNote = null;
  }

  return (
    <ListGroupItem className="chord-list-item" key={chord}>
      <span className="chord-root-note">{rootNote}</span>
      <span className="chord-info">{chordInfo}</span>
      <span className="chord-bass-note">{bassNote ? `/ ${bassNote}` : ""}</span>
    </ListGroupItem>
  );
}

export default function ChordsCard({ notes })
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
    let chordListItems = chords.map(chord => <ChordListItem chord={chord} />);
    cardBody = <ListGroup>{ chordListItems }</ListGroup>;
  }

  return (
    <Card id="detected-chords-card">
      <Card.Header>Chords</Card.Header>
      <Card.Body>{ cardBody }</Card.Body>
    </Card>
  );
}

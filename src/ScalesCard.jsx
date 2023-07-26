/* DetectedKeyCard.jsx */

import { getNoteAsText } from './notes_api';

import { Scale } from "tonal";

import Card from 'react-bootstrap/Card';

export default function ScalesCard({ notes })
{
  let pitches = notes.map(getNoteAsText);
  let scales = Scale.detect(pitches);

  var cardBody;
  if (scales.length === 0) {
    cardBody = (
      <div className="centered-text vertically-centered-text">
          <h5>No scales detected</h5>
      </div>
    );
  } else {
    let scaleListItems = scales.map(
      (scale,i) => <li className="scale-list-item" key={i}>{scale}</li>
    );
    cardBody = <ul>{ scaleListItems }</ul>;
  }

  return (
    <Card id="detected-scales-card">
      <Card.Header>Scales</Card.Header>
      <Card.Body>{ cardBody }</Card.Body>
    </Card>
  );
}

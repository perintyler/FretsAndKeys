/* ScaleSelection.jsx */

import { useState } from 'react';

import { getPitches } from './notes_api';

import { ScaleType } from "tonal";

import Card from 'react-bootstrap/Card';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';

export default function ScaleSelection({ showScale })
{
  var [selectedRootNote, setSelectedRootNote] = useState(getPitches()[0]);
  var [selectedScale, setSelectedScale] = useState(ScaleType.names()[0]);

  function updateRootNote(key) { 
    setSelectedRootNote(getPitches()[key]);
  }

  function updateScale(key) {
    setSelectedScale(ScaleType.names()[key]);
  }

  let rootNoteDropdownOptions = getPitches().map((pitch, i) => <Dropdown.Item key={i} eventKey={i}>{pitch}</Dropdown.Item>);
  let scaleDropdownOptions = ScaleType.names().map((scale, i) => <Dropdown.Item key={i} eventKey={i}>{scale}</Dropdown.Item>);

  return (
    <Card id="scale-selection-card">
      <Card.Header>Scale Selection</Card.Header>
      <Card.Body>
        <div id="scale-selection-inputs" className="full-width">
          <DropdownButton className="scale-selection-dropdown" onSelect={(key, event)=>{updateRootNote(key)}} title="Root Note">{rootNoteDropdownOptions}</DropdownButton>
          <DropdownButton className="scale-selection-dropdown" onSelect={(key, event)=>{updateScale(key)}} title="Scale Type">{scaleDropdownOptions}</DropdownButton>
        </div>
        <Button id="show-scale-button" onClick={()=>{showScale(selectedRootNote, selectedScale)}}>Show Scale</Button>
      </Card.Body>
    </Card>
  );
}

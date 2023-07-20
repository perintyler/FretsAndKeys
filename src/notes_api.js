/* notes_api.js */

const FIRST_MIDI_NUMBER = 12; // C0

const MIDI_NUMBER_OF_FIRST_FRET = 40; // e2

const NUMBER_OF_STRINGS = 6;

const OCTAVE_SIZE = 12;

const PITCH_NAMES = ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"];

const ALTERNATE_PITCH_NAMES = ["c", "db", "d", "eb", "e", "f", "gb", "g", "ab", "a", "bb", "b"];

const BLACK_NOTES = ["a#", "c#", "d#", "f#", "g#", "db", "eb", "gb", "ab", "bb"];

// -----------------------------------------------------------------

export function getPitchName(midiNumber) 
{
  return (PITCH_NAMES[(midiNumber-FIRST_MIDI_NUMBER) % OCTAVE_SIZE]).toUpperCase();
}

export function getOctaveNumber(midiNumber)
{
  return Math.floor((midiNumber-FIRST_MIDI_NUMBER) / OCTAVE_SIZE);
}

export function getNoteAsText(midiNumber, includeOctave = true) 
{
  let noteAsText = getPitchName(midiNumber);

  if (includeOctave) {
    noteAsText += getOctaveNumber(midiNumber);
  }

  return noteAsText;
}

export function isBlackKey(midiNumber) 
{
  return BLACK_NOTES.includes(getNoteAsText(midiNumber, false).toLowerCase());
}

export function getMidiNumber(noteName, octaveNumber)
{
  noteName = noteName.toLowerCase();

  var pitchIndex;
  if (PITCH_NAMES.includes(noteName)) {
    pitchIndex = PITCH_NAMES.indexOf(noteName);
  } else if (ALTERNATE_PITCH_NAMES.includes(noteName)) {
    pitchIndex = ALTERNATE_PITCH_NAMES.indexOf(noteName);
  } else {
    pitchIndex = 0;
    console.error('(getMidiNumber) invalid note name: ' + noteName);
  }

  return pitchIndex + octaveNumber*OCTAVE_SIZE + FIRST_MIDI_NUMBER;
}

export function getMidiNumberFromFretAndString(fret, string)
{
    return MIDI_NUMBER_OF_FIRST_FRET + fret + 5*(NUMBER_OF_STRINGS-string);
}

export function getPitches()
{
  return PITCH_NAMES.map(name => name.toUpperCase());
}

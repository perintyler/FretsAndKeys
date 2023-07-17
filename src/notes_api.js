/* notes_api.js */

const FIRST_MIDI_NUMBER = -21;

const PITCH_NAMES = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

const BLACK_NOTES = ["A#", "C#", "D#", "F#", "G#"];

const ALL_NOTE_NAMES = new Array(8).fill(PITCH_NAMES).map( // stops after the 8th octaves
  (pitches, octaveNumber) => pitches.map((pitch) => pitch+octaveNumber)
).flat(); // ["A0", "A#0", "B0", ... , "G#8]

// -----------------------------------------------------------------

export function getPitchName(midiNumber) 
{
  return PITCH_NAMES[(midiNumber+FIRST_MIDI_NUMBER) % 12];
} // -> str

export function getOctaveNumber(midiNumber)
{
  return Math.floor((midiNumber+FIRST_MIDI_NUMBER) / 12);
} // -> int

export function getNoteAsText(midiNumber, includeOctave = true) 
{
  let noteAsText = getPitchName(midiNumber);

  if (includeOctave) {
    noteAsText += getOctaveNumber(midiNumber);
  }

  return noteAsText;
} // -> str

export function isBlackKey(midiNumber) 
{
  return BLACK_NOTES.includes(getNoteAsText(midiNumber, false));
} // -> bool

export function getMidiNumber(noteName, octaveNumber)
{
  return PITCH_NAMES.indexOf(noteName) + octaveNumber*PITCH_NAMES.length - FIRST_MIDI_NUMBER;
} // -> int

export function getMidiNumberFromNoteName(noteName)
{
  return ALL_NOTE_NAMES.indexOf(noteName) + FIRST_MIDI_NUMBER;
} // -> int


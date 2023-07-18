/* notes_api.js */

const FIRST_MIDI_NUMBER = -12; // C0

const OCTAVE_SIZE = 12;

const PITCH_NAMES = ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"];

const ALTERNATE_PITCH_NAMES = ["c", "db", "d", "eb", "e", "f", "gb", "g", "ab", "a", "bb", "b"];

const BLACK_NOTES = ["A#", "C#", "D#", "F#", "G#"];

const ALL_NOTE_NAMES = new Array(8).fill(PITCH_NAMES).map( // stops after the 8th octaves
  (pitches, octaveNumber) => pitches.map((pitch) => pitch+octaveNumber)
).flat(); // ["A0", "A#0", "B0", ... , "G#8]

// -----------------------------------------------------------------

export function getPitchName(midiNumber) 
{
  return PITCH_NAMES[(midiNumber+FIRST_MIDI_NUMBER) % OCTAVE_SIZE];
} // -> str

export function getOctaveNumber(midiNumber)
{
  return Math.floor((midiNumber+FIRST_MIDI_NUMBER) / OCTAVE_SIZE);
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
} // -> int

export function getMidiNumberFromNoteName(noteName)
{
  return ALL_NOTE_NAMES.indexOf(noteName) + FIRST_MIDI_NUMBER;
} // -> int

export function getFretAndString(midiNumber)
{
  let fret = (midiNumber - MIDI_NUMBER_OF_FIRST_FRET) % 16;
  let string = -((midiNumber - MIDI_NUMBER_OF_FIRST_FRET - fret)/5 - 6)
  console.log(midiNumber, fret, string);

  return {'fret': fret, 'string': string};
}

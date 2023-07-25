/* notes_api.js */

const FIRST_MIDI_NUMBER = 12; // C0

const MIDI_NUMBER_OF_FIRST_FRET = 40; // e2

const NUMBER_OF_STRINGS = 6;

const OCTAVE_SIZE = 12;

const PITCH_NAMES = ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"];

const ALTERNATE_PITCH_NAMES = ["c", "db", "d", "eb", "e", "f", "gb", "g", "ab", "a", "bb", "b"];

const BLACK_NOTES = ["a#", "c#", "d#", "f#", "g#", "db", "eb", "gb", "ab", "bb"];

const DOUBLE_SHARP_NOTE_MAP = {
  "c##": "d",
  "d##": "e",
  "f##": "g",
  "g##": "a",
  "a##": "b",
  "e#": "f",
  "b#": "c"
};

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

function standardizePitch(pitch)
{
  pitch = pitch.toLowerCase();
  if (Object.keys(DOUBLE_SHARP_NOTE_MAP).includes(pitch)) {
    pitch = DOUBLE_SHARP_NOTE_MAP[pitch];
  }
  return pitch;
}

export function getMidiNumber(pitch, octaveNumber)
{
  pitch = standardizePitch(pitch);
  octaveNumber = parseFloat(octaveNumber);

  var pitchIndex;
  if (PITCH_NAMES.includes(pitch)) {
    pitchIndex = PITCH_NAMES.indexOf(pitch);
  } else if (ALTERNATE_PITCH_NAMES.includes(pitch)) {
    pitchIndex = ALTERNATE_PITCH_NAMES.indexOf(pitch);
  } else {
    pitchIndex = 0;
    console.error('(getMidiNumber) invalid pitch: ' + pitch);
  }

  return pitchIndex + octaveNumber*OCTAVE_SIZE + FIRST_MIDI_NUMBER;
}

export function getMidiNumberFromNote(note)
{
  console.assert(typeof note === "string");
  console.assert(note.length >= 1);

  note = note.toLowerCase();

  let pitch = note.slice(0, note.length-1);
  let octave = note.slice(note.length-1);

  console.assert(isNaN(parseFloat(octave)));
  console.assert(PITCH_NAMES.includes(pitch) || ALTERNATE_PITCH_NAMES.includes(pitch));

  return getMidiNumber(pitch, octave);
}

export function getMidiNumberFromFretAndString(fret, string)
{
  let midiNumberOfOpenString = MIDI_NUMBER_OF_FIRST_FRET
                             + 5*(NUMBER_OF_STRINGS-string) // every open string is 5 pitches away from the other
                             - (string <= 2 ? 1 : 0);       // except the 2nd and 3rd string, which are 4 pitches 
                                                            // away from eachother
  return midiNumberOfOpenString + fret;
}

export function getPitches()
{
  return PITCH_NAMES.map(name => name.toUpperCase());
}

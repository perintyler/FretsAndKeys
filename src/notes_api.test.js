/* Notes API Tests */

import { 
  getPitchName,
  getOctaveNumber,
  getNoteAsText,
  getMidiNumber, 
  getMidiNumberFromFretAndString, 
  isBlackKey,
  getPitches
} from './notes_api';

test('getPitchName', () => 
{
  expect(getPitchName(21)).toBe("A"); // A0
  expect(getPitchName(22)).toBe("A#"); // A#0
  expect(getPitchName(23)).toBe("B"); // B0
  expect(getPitchName(24)).toBe("C"); // C1
  expect(getPitchName(25)).toBe("C#"); // C#1
  expect(getPitchName(26)).toBe("D"); // D1
  expect(getPitchName(27)).toBe("D#"); // D#1
  expect(getPitchName(28)).toBe("E"); // E1
  expect(getPitchName(29)).toBe("F"); // F1
  expect(getPitchName(30)).toBe("F#"); // F#1
  expect(getPitchName(31)).toBe("G"); // G1
  expect(getPitchName(32)).toBe("G#"); // G#1
  expect(getPitchName(81)).toBe("A"); // A5
  expect(getPitchName(82)).toBe("A#"); // A#5
  expect(getPitchName(83)).toBe("B"); // B5
  expect(getPitchName(84)).toBe("C"); // C6
  expect(getPitchName(85)).toBe("C#"); // C#6
  expect(getPitchName(86)).toBe("D"); // D6
  expect(getPitchName(87)).toBe("D#"); // D#6
  expect(getPitchName(88)).toBe("E"); // E6
  expect(getPitchName(89)).toBe("F"); // F6
  expect(getPitchName(90)).toBe("F#"); // F#6
  expect(getPitchName(91)).toBe("G"); // G6
  expect(getPitchName(92)).toBe("G#"); // G#6
});

test('getOctaveNumber', () => 
{
  expect(getOctaveNumber(21)).toBe(0); // A0
  expect(getOctaveNumber(22)).toBe(0); // A#0
  expect(getOctaveNumber(23)).toBe(0); // B0

  expect(getOctaveNumber(24)).toBe(1); // C1
  expect(getOctaveNumber(25)).toBe(1); // C#1
  expect(getOctaveNumber(26)).toBe(1); // D1
  expect(getOctaveNumber(27)).toBe(1); // D#1
  expect(getOctaveNumber(28)).toBe(1); // E1
  expect(getOctaveNumber(29)).toBe(1); // F1
  expect(getOctaveNumber(30)).toBe(1); // F#1
  expect(getOctaveNumber(31)).toBe(1); // G1
  expect(getOctaveNumber(32)).toBe(1); // G#1

  expect(getOctaveNumber(81)).toBe(5); // A5
  expect(getOctaveNumber(82)).toBe(5); // A#5
  expect(getOctaveNumber(83)).toBe(5); // B5
});

test('getNoteAsText', () =>
{
  expect(getNoteAsText(40)).toBe("E2");
  expect(getNoteAsText(45)).toBe("A2");
  expect(getNoteAsText(50)).toBe("D3");
  expect(getNoteAsText(55)).toBe("G3");
  expect(getNoteAsText(59)).toBe("B3");
  expect(getNoteAsText(64)).toBe("E4");
});

test('getMidiNumber', () => 
{
  expect(getMidiNumber("A", 0)).toBe(21);
  expect(getMidiNumber("A#", 0)).toBe(22);
  expect(getMidiNumber("a#", 0)).toBe(22);
  expect(getMidiNumber("Bb", 0)).toBe(22);
  expect(getMidiNumber("bb", 0)).toBe(22);
  expect(getMidiNumber("B", 0)).toBe(23);
  expect(getMidiNumber("b", 0)).toBe(23);

  expect(getMidiNumber("A", 1)).toBe(33);
  expect(getMidiNumber("C", 1)).toBe(24);
  expect(getMidiNumber("C", 2)).toBe(36);

  // open notes for guitar string
  expect(getMidiNumber("E", 2)).toBe(40);
  expect(getMidiNumber("A", 2)).toBe(45);
  expect(getMidiNumber("D", 3)).toBe(50);
  expect(getMidiNumber("G", 3)).toBe(55);
  expect(getMidiNumber("B", 3)).toBe(59);
  expect(getMidiNumber("E", 4)).toBe(64);
});

test('getMidiNumberFromFretAndString', () => 
{
  expect(getMidiNumberFromFretAndString(0, 6)).toBe(40); // e2
  expect(getMidiNumberFromFretAndString(0, 5)).toBe(45); // a2
  expect(getMidiNumberFromFretAndString(0, 4)).toBe(50); // d3
  expect(getMidiNumberFromFretAndString(0, 3)).toBe(55); // g3
  expect(getMidiNumberFromFretAndString(0, 2)).toBe(59); // b3
  expect(getMidiNumberFromFretAndString(0, 1)).toBe(64); // e4

  // expect(getMidiNumberFromFretAndString(5, 6)).toBe(45);
  // expect(getMidiNumberFromFretAndString(15, 6)).toBe(55);

  // expect(getMidiNumberFromFretAndString(5, 5)).toBe(50);
  // expect(getMidiNumberFromFretAndString(15, 5)).toBe(60);

  // expect(getMidiNumberFromFretAndString(5, 1)).toBe(70);
  // expect(getMidiNumberFromFretAndString(15, 1)).toBe(80);
});

test('isBlackKey', () => 
{
  expect(isBlackKey(21)).toBe(false); // A0
  expect(isBlackKey(22)).toBe(true); // A#0
  expect(isBlackKey(23)).toBe(false); // B0
  expect(isBlackKey(24)).toBe(false); // C1
  expect(isBlackKey(25)).toBe(true); // C#1
  expect(isBlackKey(26)).toBe(false); // D1
  expect(isBlackKey(27)).toBe(true); // D#1
  expect(isBlackKey(28)).toBe(false); // E1
  expect(isBlackKey(29)).toBe(false); // F1
  expect(isBlackKey(30)).toBe(true); // F#1
  expect(isBlackKey(31)).toBe(false); // G1
  expect(isBlackKey(32)).toBe(true); // G#1


  expect(isBlackKey(81)).toBe(false); // A5
  expect(isBlackKey(82)).toBe(true); // A#5
  expect(isBlackKey(83)).toBe(false); // B5
  expect(isBlackKey(84)).toBe(false); // C6
  expect(isBlackKey(85)).toBe(true); // C#6
  expect(isBlackKey(86)).toBe(false); // D6
  expect(isBlackKey(87)).toBe(true); // D#6
  expect(isBlackKey(88)).toBe(false); // E6
  expect(isBlackKey(89)).toBe(false); // F6
  expect(isBlackKey(90)).toBe(true); // F#6
  expect(isBlackKey(91)).toBe(false); // G6
  expect(isBlackKey(92)).toBe(true); // G#6
});

test('getPitches', () => 
{
  expect(getPitches()).toStrictEqual(["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]);
});

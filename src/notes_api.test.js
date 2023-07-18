import { render, screen } from '@testing-library/react';
import { getMidiNumber } from './notes_api';

test('getMidiNumber', () => {
  expect(getMidiNumber("A", 0)).toBe(21);
  expect(getMidiNumber("A#", 0)).toBe(22);
  expect(getMidiNumber("a#", 0)).toBe(22);
  expect(getMidiNumber("Bb", 0)).toBe(22);
  expect(getMidiNumber("bb", 0)).toBe(22);
  expect(getMidiNumber("B", 0)).toBe(23);
  expect(getMidiNumber("b", 0)).toBe(23);

  expect(getMidiNumber("A", 1)).toBe(33); // 1st string
  expect(getMidiNumber("C", 1)).toBe(24);
  expect(getMidiNumber("C", 2)).toBe(36);

  // open notes for guitar string
  expect(getMidiNumber("E", 2)).toBe(40); // 1st string
  expect(getMidiNumber("A", 2)).toBe(45); // 2nd string
  expect(getMidiNumber("D", 3)).toBe(50); // 3rd string
  expect(getMidiNumber("G", 3)).toBe(55); // 4th string
  expect(getMidiNumber("B", 3)).toBe(59); // 5th string
  expect(getMidiNumber("E", 4)).toBe(64); // 6th string
});

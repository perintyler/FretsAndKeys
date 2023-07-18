import { render, screen } from '@testing-library/react';
import App from './App';

test('piano note labels are rendered', () => {
  render(<App />);

  let noteLabels = screen.getAllByTestId('note-label');
  expect(noteLabels).toHaveLength(88);
});


import { render, screen } from '@testing-library/react';
import { Dashboard } from '../Dashboard';

test('renders dashboard', () => {
  render(<Dashboard />);
  expect(screen.getByText(/Evolução temporal/i)).toBeInTheDocument();
});
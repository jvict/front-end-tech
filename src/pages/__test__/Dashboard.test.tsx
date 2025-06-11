import { render, screen } from '@testing-library/react';
import { Dashboard } from '../Dashboard';


// Mock do Axios (opcional: previne chamadas reais em ambiente de teste)
jest.mock('axios');

test('renders dashboard with filter form and table', () => {
  render(<Dashboard />);

  expect(screen.getByText(/Evolução temporal/i)).toBeInTheDocument();
  // Checa a presença do formulário
  expect(screen.getByTestId("filter-form")).toBeInTheDocument();
  // Checa a presença da tabela
  expect(screen.getByTestId("result-table")).toBeInTheDocument();
});
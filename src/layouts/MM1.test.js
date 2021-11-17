import { render, screen, act, fireEvent, getByLabelText } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import MM1 from './MM1';
import axios from 'axios';

jest.mock('axios');

describe('UI integrity', () => {

  test('renders title', () => {
    render(<MM1 />);
    expect(screen.getByText('Modelo M/M/1')).toBeInTheDocument();
  });
  
  test('inputs exist and work', async () => {
  
      render(<MM1 />);
      userEvent.type(screen.getByLabelText('lambda'), '2');
      expect(screen.getByLabelText('lambda')).toHaveValue(2);
  
      userEvent.type(screen.getByLabelText('miu'), '3');
      expect(screen.getByLabelText('miu')).toHaveValue(3);
  
      userEvent.type(screen.getByLabelText('n'), '3');
      expect(screen.getByLabelText('n')).toHaveValue(3);
  
      userEvent.type(screen.getByLabelText('Cw'), '15');
      expect(screen.getByLabelText('Cw')).toHaveValue(15);
  
      userEvent.type(screen.getByLabelText('Cs'), '12');
      expect(screen.getByLabelText('Cs')).toHaveValue(12);
      
    });
  
  test('response inputs exist and work', async () => {
  
      render(<MM1 />);
      expect(screen.getByLabelText('roh')).toHaveValue("");
  
      expect(screen.getByLabelText('P0')).toHaveValue("");
  
      expect(screen.getByLabelText('Lq')).toHaveValue("");
  
      expect(screen.getByLabelText('L')).toHaveValue("");
  
      expect(screen.getByLabelText('Wq')).toHaveValue("");
  
      expect(screen.getByLabelText('W')).toHaveValue("");
  
      expect(screen.getByLabelText('Pn')).toHaveValue("");
  
      expect(screen.getByLabelText('Ct')).toHaveValue("");
      
    });

});

describe('Test input validation', () => {
  test('negative numbers error', async () => {

    render(<MM1 />);
    userEvent.type(screen.getByLabelText('lambda'), '-1');

    userEvent.type(screen.getByLabelText('miu'), '-1');

    userEvent.click(screen.getByText('Calcular'))

    screen.getByText('Valores deben ser mayores a 0.')
    
  });

  test('lambda larger than miu error', async () => {

    render(<MM1 />);
    userEvent.type(screen.getByLabelText('lambda'), '2');

    userEvent.type(screen.getByLabelText('miu'), '1');

    userEvent.click(screen.getByText('Calcular'))

    screen.getByText('Miu debe ser mayor a lambda.')
  });

  test('negative numbers error n', async () => {

    render(<MM1 />);
    userEvent.type(screen.getByLabelText('n'), '-1');

    userEvent.click(screen.getByText('Calcular Pn'))

    screen.getByText('Valores deben ser positivos.')
    
  });

  test('negative numbers error costs', async () => {

    render(<MM1 />);
    userEvent.type(screen.getByLabelText('Cw'), '-1');
    userEvent.type(screen.getByLabelText('Cs'), '-1');

    userEvent.click(screen.getByText('Calcular CT'))

    screen.getByText('Valores deben ser positivos.')
    
  });

  test('no metrics befote costs error', async () => {

    render(<MM1 />);
    userEvent.type(screen.getByLabelText('Cw'), '1');
    userEvent.type(screen.getByLabelText('Cs'), '1');

    userEvent.click(screen.getByText('Calcular CT'))

    screen.getByText('Primero hay que introducir lambda y miu.')
    
  });
})

describe("Run cases", () => {
  test('test mock fetch', async () => {

    const vals = [
      { objectID: '1', title: 'Hello' },
    ];

    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: vals })
    );

    render(<MM1 />);
    userEvent.type(screen.getByLabelText('lambda'), '2');

    userEvent.type(screen.getByLabelText('miu'), '3');

    await userEvent.click(screen.getByText('Calcular'))

    expect(screen.getByLabelText('roh')).toHaveValue("2");
    expect(screen.getByLabelText('P0')).toHaveValue("2");
    expect(screen.getByLabelText('Lq')).toHaveValue("2");
    expect(screen.getByLabelText('L')).toHaveValue("2");
    expect(screen.getByLabelText('Wq')).toHaveValue("2");
    expect(screen.getByLabelText('W')).toHaveValue("2");
  });

  test('test Pn calculation', async () => {

    const vals = [
      { objectID: '1', title: 'Hello' },
    ];

    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: vals })
    );

    render(<MM1 />);
    userEvent.type(screen.getByLabelText('lambda'), '2');

    userEvent.type(screen.getByLabelText('miu'), '3');

    await userEvent.click(screen.getByText('Calcular'))

    userEvent.type(screen.getByText('n'), '2');

    userEvent.click(screen.getByText('Calcular Pn'))

    expect(screen.getByLabelText('Pn')).toHaveValue("8");
  });

  test('test costs calculation', async () => {

    const vals = [
      { objectID: '1', title: 'Hello' },
    ];

    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: vals })
    );

    render(<MM1 />);
    userEvent.type(screen.getByLabelText('lambda'), '2');

    userEvent.type(screen.getByLabelText('miu'), '3');

    await userEvent.click(screen.getByText('Calcular'))

    userEvent.type(screen.getByText('Cw'), '2');
    userEvent.type(screen.getByText('Cs'), '3');

    userEvent.click(screen.getByText('Calcular CT'))

    expect(screen.getByLabelText('Ct')).toHaveValue("7");
  });
});

  
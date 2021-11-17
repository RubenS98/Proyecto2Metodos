import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import MMS from './MMS';
import axios from 'axios';

jest.mock('axios');

describe('UI integrity', () => {

  test('renders title', () => {
    render(<MMS />);
    expect(screen.getByText('Modelo M/M/S')).toBeInTheDocument();
  });
  
  test('inputs exist and work', async () => {
  
      render(<MMS />);
      userEvent.type(screen.getByLabelText('lambda'), '2');
      expect(screen.getByLabelText('lambda')).toHaveValue(2);
  
      userEvent.type(screen.getByLabelText('miu'), '3');
      expect(screen.getByLabelText('miu')).toHaveValue(3);

      userEvent.type(screen.getByLabelText('s'), '2');
      expect(screen.getByLabelText('s')).toHaveValue(2);
  
      userEvent.type(screen.getByLabelText('n'), '3');
      expect(screen.getByLabelText('n')).toHaveValue(3);
  
      userEvent.type(screen.getByLabelText('Cw'), '15');
      expect(screen.getByLabelText('Cw')).toHaveValue(15);
  
      userEvent.type(screen.getByLabelText('Cs'), '12');
      expect(screen.getByLabelText('Cs')).toHaveValue(12);
      
    });
  
  test('response inputs exist and work', async () => {
  
      render(<MMS />);
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

    render(<MMS />);
    userEvent.type(screen.getByLabelText('lambda'), '-1');

    userEvent.type(screen.getByLabelText('miu'), '-1');

    userEvent.type(screen.getByLabelText('s'), '-1');

    userEvent.click(screen.getByText('Calcular'))

    screen.getByText('Valores deben ser mayores a 0.')
    
  });

  test('lambda larger than miu times s error', async () => {

    render(<MMS />);
    userEvent.type(screen.getByLabelText('lambda'), '2');

    userEvent.type(screen.getByLabelText('miu'), '1');

    userEvent.type(screen.getByLabelText('s'), '1');

    userEvent.click(screen.getByText('Calcular'))

    screen.getByText('Miu por s debe ser mayor a lambda.')
  });

  test('negative numbers error n', async () => {

    render(<MMS />);
    userEvent.type(screen.getByLabelText('n'), '-1');

    userEvent.click(screen.getByText('Calcular Pn'))

    screen.getByText('Valores deben ser positivos.')
    
  });

  test('negative numbers error costs', async () => {

    render(<MMS />);
    userEvent.type(screen.getByLabelText('Cw'), '-1');
    userEvent.type(screen.getByLabelText('Cs'), '-1');

    userEvent.click(screen.getByText('Calcular CT'))

    screen.getByText('Valores deben ser mayores a 0.')
    
  });

  test('no metrics befote costs error', async () => {

    render(<MMS />);
    userEvent.type(screen.getByLabelText('Cw'), '1');
    userEvent.type(screen.getByLabelText('Cs'), '1');

    userEvent.click(screen.getByText('Calcular CT'))

    screen.getByText('Primero hay que introducir lambda, miu y s.')
    
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

    let result = render(<MMS />);
    userEvent.type(screen.getByLabelText('lambda'), '2');

    userEvent.type(screen.getByLabelText('miu'), '3');

    userEvent.type(screen.getByLabelText('s'), '2');

    await userEvent.click(screen.getByText('Calcular'))

    expect(screen.getByLabelText('roh')).toHaveValue("2");
    expect(screen.getByLabelText('P0')).toHaveValue("2");
    expect(screen.getByLabelText('Lq')).toHaveValue("2");
    expect(screen.getByLabelText('L')).toHaveValue("2");
    expect(screen.getByLabelText('Wq')).toHaveValue("2");
    expect(screen.getByLabelText('W')).toHaveValue("2");
  });

  test('test Pn calculation n<s', async () => {

    const vals = [
      { objectID: '1', title: 'Hello' },
    ];

    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: vals })
    );

    render(<MMS />);
    userEvent.type(screen.getByLabelText('lambda'), '2');

    userEvent.type(screen.getByLabelText('miu'), '3');

    userEvent.type(screen.getByLabelText('s'), '2');

    await userEvent.click(screen.getByText('Calcular'))

    userEvent.type(screen.getByText('n'), '1');

    userEvent.click(screen.getByText('Calcular Pn'))

    expect(screen.getByLabelText('Pn')).toHaveValue("1.3333333333");
  });

  test('test Pn calculation n>=s', async () => {

    const vals = [
      { objectID: '1', title: 'Hello' },
    ];

    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: vals })
    );

    render(<MMS />);
    userEvent.type(screen.getByLabelText('lambda'), '2');

    userEvent.type(screen.getByLabelText('miu'), '3');

    userEvent.type(screen.getByLabelText('s'), '2');

    await userEvent.click(screen.getByText('Calcular'))

    userEvent.type(screen.getByText('n'), '2');

    userEvent.click(screen.getByText('Calcular Pn'))

    expect(screen.getByLabelText('Pn')).toHaveValue("0.4444444444");
  });

  test('test Pn calculation n>=s with s=3', async () => {

    const vals = [
      { objectID: '1', title: 'Hello' },
    ];

    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: vals })
    );

    render(<MMS />);
    userEvent.type(screen.getByLabelText('lambda'), '2');

    userEvent.type(screen.getByLabelText('miu'), '3');

    userEvent.type(screen.getByLabelText('s'), '3');

    await userEvent.click(screen.getByText('Calcular'))

    userEvent.type(screen.getByText('n'), '5');

    userEvent.click(screen.getByText('Calcular Pn'))

    expect(screen.getByLabelText('Pn')).toHaveValue("0.0048773053");
  });

  test('test costs calculation', async () => {

    const vals = [
      { objectID: '1', title: 'Hello' },
    ];

    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: vals })
    );

    render(<MMS />);
    userEvent.type(screen.getByLabelText('lambda'), '2');

    userEvent.type(screen.getByLabelText('miu'), '3');

    userEvent.type(screen.getByLabelText('s'), '2');

    await userEvent.click(screen.getByText('Calcular'))

    userEvent.type(screen.getByText('Cw'), '2');
    userEvent.type(screen.getByText('Cs'), '3');

    userEvent.click(screen.getByText('Calcular CT'))

    expect(screen.getByLabelText('Ct')).toHaveValue("10");
  });
});

  
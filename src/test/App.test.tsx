import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

jest.mock('../components/Navbar', () => () => <div>Navbar</div>);
jest.mock('../pages/BlogPost', () => () => <div>BlogPost Content</div>);

describe('App Component', () => {
  test('renders Navbar and BlogPost components', () => {
    render(<App />);
    
    expect(screen.getByText(/Navbar/i)).toBeInTheDocument();
    expect(screen.getByText(/BlogPost Content/i)).toBeInTheDocument();
  });
});
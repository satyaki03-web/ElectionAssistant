import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';

// Mock InteractiveMap so we don't have to deal with Leaflet in testing
vi.mock('../components/InteractiveMap', () => ({
  default: () => <div data-testid="mock-map">Map Component</div>
}));

describe('App Component', () => {
  it('renders the dashboard view initially', () => {
    render(<App />);
    expect(screen.getByText('Election Education Assistant')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Explore Timelines/i })).toBeInTheDocument();
  });

  it('navigates to app view when explore button is clicked', () => {
    render(<App />);
    const exploreBtn = screen.getByRole('button', { name: /Explore Timelines/i });
    fireEvent.click(exploreBtn);
    expect(screen.getByText('Election Timeline: India')).toBeInTheDocument();
  });

  it('allows country switching', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /Explore Timelines/i }));
    
    const usaBtn = screen.getByRole('button', { name: /USA/i });
    fireEvent.click(usaBtn);
    
    expect(screen.getByText('Election Timeline: USA')).toBeInTheDocument();
  });
});

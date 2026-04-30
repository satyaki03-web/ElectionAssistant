import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import InteractiveMap from '../components/InteractiveMap';
import { mapData } from '../data/mapData';

// Mock React-Leaflet components to avoid rendering actual map instances in tests
vi.mock('react-leaflet', () => {
  return {
    MapContainer: ({ children }) => <div data-testid="map-container">{children}</div>,
    TileLayer: () => <div data-testid="tile-layer"></div>,
    Marker: ({ children }) => <div data-testid="marker">{children}</div>,
    Popup: ({ children }) => <div data-testid="popup">{children}</div>,
    useMap: () => ({ flyTo: vi.fn() })
  };
});

describe('InteractiveMap Component', () => {
  it('renders the search input', () => {
    render(<InteractiveMap selectedCountry="India" />);
    expect(screen.getByPlaceholderText('Validate city or booth...')).toBeInTheDocument();
  });

  it('shows official station found when searching for a valid booth', () => {
    render(<InteractiveMap selectedCountry="India" />);
    const input = screen.getByPlaceholderText('Validate city or booth...');
    
    // Type a valid booth name from India's data
    fireEvent.change(input, { target: { value: 'Delhi' } });
    
    expect(screen.getByText('Official Station Found')).toBeInTheDocument();
  });

  it('shows no match found for invalid searches', () => {
    render(<InteractiveMap selectedCountry="India" />);
    const input = screen.getByPlaceholderText('Validate city or booth...');
    
    fireEvent.change(input, { target: { value: 'Invalid Booth 123' } });
    
    expect(screen.getByText('No official match found')).toBeInTheDocument();
  });
});

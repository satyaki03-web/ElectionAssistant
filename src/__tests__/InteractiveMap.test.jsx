import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import InteractiveMap from '../components/InteractiveMap';

// Mock Leaflet so we don't have to deal with the real map rendering in JSDOM
vi.mock('react-leaflet', () => {
  return {
    MapContainer: ({ children }) => <div data-testid="map-container">{children}</div>,
    TileLayer: () => <div data-testid="tile-layer" />,
    Marker: ({ children }) => <div data-testid="marker">{children}</div>,
    Popup: ({ children }) => <div data-testid="popup">{children}</div>,
    useMap: () => ({ flyTo: vi.fn() })
  };
});

describe('InteractiveMap Component', () => {
  it('renders the search input', () => {
    render(<InteractiveMap selectedCountry="India" />);
    expect(screen.getByPlaceholderText(/Validate city or booth.../i)).toBeInTheDocument();
  });

  it('shows no match when searching for an invalid booth', () => {
    render(<InteractiveMap selectedCountry="India" />);
    const input = screen.getByPlaceholderText(/Validate city or booth.../i);
    fireEvent.change(input, { target: { value: 'InvalidBoothName' } });
    
    expect(screen.getByText(/No official match found/i)).toBeInTheDocument();
  });

  it('shows official station when searching for a valid booth', () => {
    render(<InteractiveMap selectedCountry="India" />);
    const input = screen.getByPlaceholderText(/Validate city or booth.../i);
    // Assuming "Delhi" or "New Delhi" is in the India data
    fireEvent.change(input, { target: { value: 'Delhi' } });
    
    expect(screen.getByText(/Official Station Found/i)).toBeInTheDocument();
  });
});

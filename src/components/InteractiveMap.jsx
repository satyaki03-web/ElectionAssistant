import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { MapPin, Info, Search, CheckCircle, XCircle } from 'lucide-react';
import { mapData } from '../data/mapData';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Helper component to change map view
const MapUpdater = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, {
      duration: 1.5
    });
  }, [center, zoom, map]);

  return null;
};

const InteractiveMap = ({ selectedCountry }) => {
  const countryData = mapData[selectedCountry] || mapData['India'];
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null); 
  
  const [mapCenter, setMapCenter] = useState(countryData.center);
  const [mapZoom, setMapZoom] = useState(countryData.zoom);
  const markerRefs = useRef({});

  // Reset search when country changes
  useEffect(() => {
    setSearchQuery("");
    setSearchResult(null);
    setMapCenter(countryData.center);
    setMapZoom(countryData.zoom);
  }, [selectedCountry, countryData.center, countryData.zoom]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (!query.trim()) {
      setSearchResult(null);
      setMapCenter(countryData.center);
      setMapZoom(countryData.zoom);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const foundStation = countryData.centers.find(s => 
      s.name.toLowerCase().includes(lowerQuery) || 
      s.booth.toLowerCase().includes(lowerQuery) ||
      s.type.toLowerCase().includes(lowerQuery)
    );

    if (foundStation) {
      setSearchResult(foundStation);
      setMapCenter(foundStation.coords);
      setMapZoom(12); // Zoom in on the matched station
      
      // Open the popup for the matched marker after flying
      const marker = markerRefs.current[foundStation.name];
      if (marker) {
        setTimeout(() => marker.openPopup(), 1500);
      }
    } else {
      setSearchResult(false);
    }
  };

  return (
    <div className="map-wrapper animate-fade-in" style={{ height: '100%', width: '100%', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.3)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.05)', position: 'relative' }}>
      
      {/* Floating Search & Validator Panel */}
      <div style={{ position: 'absolute', top: '16px', left: '50px', zIndex: 1000, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', padding: '12px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', width: '300px' }}>
        <div style={{ display: 'flex', alignItems: 'center', background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '6px 10px' }}>
          <Search size={18} color="#6b7280" />
          <input 
            type="text" 
            placeholder="Validate city or booth..." 
            value={searchQuery}
            onChange={handleSearch}
            style={{ border: 'none', outline: 'none', width: '100%', padding: '4px 8px', fontSize: '0.95rem', background: 'transparent' }}
          />
        </div>
        
        {searchQuery.trim() && (
          <div style={{ marginTop: '10px', fontSize: '0.9rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px', color: searchResult ? '#15803d' : '#b91c1c' }}>
            {searchResult ? (
               <><CheckCircle size={16} /> Official Station Found</>
            ) : (
               <><XCircle size={16} /> No official match found</>
            )}
          </div>
        )}
      </div>

      <MapContainer 
        center={mapCenter} 
        zoom={mapZoom} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        <MapUpdater center={mapCenter} zoom={mapZoom} />

        {countryData.centers.map((station, index) => (
          <Marker 
            key={index} 
            position={station.coords}
            ref={(ref) => {
              if (ref) {
                markerRefs.current[station.name] = ref;
              }
            }}
          >
            <Popup className="custom-popup">
              <div style={{ padding: '4px' }}>
                <h3 style={{ margin: '0 0 8px 0', color: '#1e3a8a', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={16} /> {station.name}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4b5563', marginBottom: '4px' }}>
                  <Info size={14} /> <strong>{station.booth}</strong>
                </div>
                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                  Type: {station.type}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;

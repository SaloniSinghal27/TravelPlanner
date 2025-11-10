import React, { useState } from 'react';

const MapRouteViewer = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [mapUrl, setMapUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!source || !destination) return;

    const url = `https://maps.google.com/maps?q=${encodeURIComponent(source)}+to+${encodeURIComponent(
      destination
    )}&output=embed`;
    setMapUrl(url);
  };

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Left: Form Area (30%) */}
      <div
        style={{
          width: '30%',
          padding: '30px 20px',
          background: '#000',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          boxShadow: '2px 0 10px rgba(0, 0, 0, 0.5)'
        }}
      >
        <div
          style={{
            background: '#111',
            borderRadius: '12px',
            padding: '30px 25px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}
        >
          <h2 style={{ textAlign: 'center', marginBottom: '25px', fontWeight: 'bold', fontSize: '24px' }}>
            🚗 Route Finder
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ fontWeight: 'bold', marginBottom: '6px', display: 'block' }}>Source</label>
              <input
                type="text"
                placeholder="Enter starting point"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #444',
                  backgroundColor: '#222',
                  color: '#fff',
                  fontSize: '16px'
                }}
              />
            </div>

            <div>
              <label style={{ fontWeight: 'bold', marginBottom: '6px', display: 'block' }}>Destination</label>
              <input
                type="text"
                placeholder="Enter destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #444',
                  backgroundColor: '#222',
                  color: '#fff',
                  fontSize: '16px'
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                padding: '14px',
                backgroundColor: '#1e90ff',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background 0.3s'
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#0d6efd')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#1e90ff')}
            >
              Show Route
            </button>
          </form>
        </div>
      </div>

      {/* Right: Map Area (70%) */}
      <div style={{ width: '70%', height: '100%' }}>
        {mapUrl && (
          <iframe
            title="Route Map"
            src={mapUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
};

export default MapRouteViewer;
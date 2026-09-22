"use client";
import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet's default icon path issues
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Generate random points around Colombia
const generateRandomPoints = (count = 10) => {
  const points = [];
  for (let i = 0; i < count; i++) {
    const lat = 4.5709 + (Math.random() - 0.5) * 5;
    const lng = -74.2973 + (Math.random() - 0.5) * 5;
    points.push({ id: i, lat, lng });
  }
  return points;
};

const AmparoMapClient = () => {
  // Memoize random points so they don't regenerate on every render
  const points = useMemo(() => generateRandomPoints(15), []);
  const center: [number, number] = [4.5709, -74.2973];

  return (
    <MapContainer 
      center={center} 
      zoom={6} 
      className="w-full h-full z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.map((point) => (
        <Marker key={point.id} position={[point.lat, point.lng]} icon={customIcon}>
          <Popup>Punto Aleatorio {point.id + 1}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default AmparoMapClient;

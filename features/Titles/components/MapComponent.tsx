import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { TitleData } from '../types';
import { COLOR_PALETTE } from '@/shared/constants/colors';

// Fix Leaflet's default icon path issues with webpack/Next.js
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapComponentProps {
  titles: TitleData[];
  selectedTitleId: string | null;
  onSelectTitle: (id: string | null) => void;
}

// Component to handle automatic centering
const MapController = ({ selectedTitle, titles }: { selectedTitle: TitleData | null, titles: TitleData[] }) => {
  const map = useMap();
  
  useEffect(() => {
    if (selectedTitle && selectedTitle.coordinates) {
      map.flyTo([selectedTitle.coordinates.lat, selectedTitle.coordinates.lng], 12, {
        duration: 1.5
      });
    } else if (titles.length > 0) {
      // Fit all titles if no specific one is selected
      const bounds = L.latLngBounds(titles.map(t => [t.coordinates.lat, t.coordinates.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [selectedTitle, map, titles]);
  
  return null;
};

// Component to catch map clicks (background) to deselect
const MapEvents = ({ onSelectTitle }: { onSelectTitle: (id: string | null) => void }) => {
  useMap().on('click', () => {
    onSelectTitle(null);
  });
  return null;
};

const MapComponent = ({ titles, selectedTitleId, onSelectTitle }: MapComponentProps) => {
  const selectedTitle = titles.find(t => t.id === selectedTitleId) || null;
  
  // Default center if no titles (Colombia approx)
  const defaultCenter: [number, number] = titles.length > 0 
    ? [titles[0].coordinates.lat, titles[0].coordinates.lng] 
    : [4.5709, -74.2973];

  return (
    <MapContainer 
      center={defaultCenter} 
      zoom={6} 
      className="w-full h-full"
      style={{ zIndex: 1 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapController selectedTitle={selectedTitle} titles={titles} />
      <MapEvents onSelectTitle={onSelectTitle} />
      
      {titles.map((title) => {
        const isSelected = selectedTitleId === title.id;
        
        return (
          <React.Fragment key={title.id}>
            <Marker 
              position={[title.coordinates.lat, title.coordinates.lng]}
              icon={customIcon}
              eventHandlers={{
                click: () => onSelectTitle(title.id),
              }}
            >
              <Popup>
                <div className="font-bold">{title.placa}</div>
                <div>{title.titular}</div>
              </Popup>
            </Marker>
            
            {isSelected && title.polygon && (
              <Polygon 
                positions={title.polygon.map(p => [p.lat, p.lng] as [number, number])}
                pathOptions={{ 
                  color: title.color || COLOR_PALETTE.secondary, 
                  fillColor: title.color || COLOR_PALETTE.secondary,
                  fillOpacity: 0.3 
                }} 
              />
            )}
          </React.Fragment>
        );
      })}
    </MapContainer>
  );
};

export default MapComponent;

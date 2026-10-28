"use client";
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Lead } from '../types/lead';

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => { map.setView(center, map.getZoom()); }, [center, map]);
  return null;
}

interface MapProps {
  center: [number, number];
  leads: Lead[];
  radius: number; // Nova propriedade para o tamanho do círculo
}

export default function Map({ center, leads, radius }: MapProps) {
  return (
    <MapContainer center={center} zoom={12} className="w-full h-full z-0" zoomControl={false}>
      <TileLayer 
        attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
      />
      
      {/* Círculo azul do raio de busca */}
      <Circle center={center} radius={radius} pathOptions={{ color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 0.1, weight: 1.5 }} />
      
      {leads.map((lead) => (
        <Marker key={lead.id} position={[lead.lat, lead.lon]} icon={customIcon}>
          <Popup>
            <strong className="text-gray-900">{lead.name}</strong><br/>
            📞 {lead.phone}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
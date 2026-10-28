"use client";
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { getCoordinates } from '../services/nominatim';
import { fetchLeads } from '../services/overpass';
import { Lead } from '../types/lead';
import Sidebar from '../components/Sidebar';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

export default function Home() {
  const [city, setCity] = useState('Porto Alegre, RS');
  const [category, setCategory] = useState('amenity=clinic');
  const [radius, setRadius] = useState(20000);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [center, setCenter] = useState<[number, number]>([-30.0331, -51.23]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const coords = await getCoordinates(city);
    if (coords) {
      setCenter(coords);
      const results = await fetchLeads(coords[0], coords[1], radius, category);
      setLeads(results);
    } else {
      alert('Cidade não encontrada.');
    }
    setLoading(false);
  };

  return (
    // Removidas as margens (p-4) para o mapa colar nas bordas
    <div className="flex h-screen bg-white overflow-hidden font-sans">
      <Sidebar 
        city={city} setCity={setCity}
        category={category} setCategory={setCategory}
        radius={radius} setRadius={setRadius}
        loading={loading} handleSearch={handleSearch}
        leads={leads}
      />
      <div className="flex-1 relative z-0">
        <Map center={center} leads={leads} radius={radius} />
      </div>
    </div>
  );
}
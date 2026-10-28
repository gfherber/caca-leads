import axios from 'axios';
import { Lead } from '../types/lead';

export async function fetchLeads(lat: number, lon: number, radius: number, category: string): Promise<Lead[]> {
  // 1. Alterámos o final da query para "out center;" para forçar o cálculo do meio dos edifícios
  const query = `
    [out:json][timeout:25];
    (
      node[${category}](around:${radius},${lat},${lon});
      way[${category}](around:${radius},${lat},${lon});
    );
    out center;
  `;
  
  try {
    const res = await axios.post('https://overpass-api.de/api/interpreter', `data=${encodeURIComponent(query)}`);
    
    const leads: Lead[] = res.data.elements
      .filter((el: any) => el.tags?.name && !el.tags?.website && !el.tags?.['contact:website'])
      .map((el: any) => ({
        id: el.id,
        // Procura a lat/lon normal ou a centralizada (caso seja um edifício/way)
        lat: el.lat || el.center?.lat,
        lon: el.lon || el.center?.lon,
        name: el.tags.name,
        phone: el.tags.phone || el.tags['contact:phone'] || 'Sem telefone no mapa',
        address: el.tags['addr:street'] ? `${el.tags['addr:street']}, ${el.tags['addr:housenumber'] || ''}` : 'Endereço não especificado'
      }))
      // 2. Barreira de segurança: remove da lista final qualquer empresa que não tenha as coordenadas definidas
      .filter((lead: Lead) => lead.lat !== undefined && lead.lon !== undefined);
      
    return leads;
  } catch (error) {
    console.error("Erro no Overpass:", error);
    return [];
  }
}
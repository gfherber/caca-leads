"use client";
import { Lead } from '../types/lead';

// Lista de nichos mapeados com as tags corretas do OpenStreetMap
const CATEGORIAS_B2B = [
  { label: "Clínica Médica", value: "amenity=clinic" },
  { label: "Dentista", value: "amenity=dentist" },
  { label: "Farmácia", value: "amenity=pharmacy" },
  { label: "Restaurante", value: "amenity=restaurant" },
  { label: "Padaria", value: "shop=bakery" },
  { label: "Supermercado", value: "shop=supermarket" },
  { label: "Academia", value: "leisure=fitness_centre" },
  { label: "Oficina Mecânica", value: "shop=car_repair" },
  { label: "Salão de Beleza / Barbearia", value: "shop=beauty" },
  { label: "Pet Shop / Veterinário", value: "shop=pet" },
  { label: "Imobiliária", value: "office=estate_agent" },
  { label: "Escritório de Advocacia", value: "office=lawyer" },
  { label: "Escritório de Contabilidade", value: "office=accountant" },
  { label: "Hotel / Pousada", value: "tourism=hotel" },
  { label: "Loja de Roupas", value: "shop=clothes" },
  { label: "Material de Construção", value: "shop=doityourself" }
];

interface SidebarProps {
  city: string; setCity: (c: string) => void;
  category: string; setCategory: (c: string) => void;
  radius: number; setRadius: (r: number) => void;
  loading: boolean; handleSearch: () => void;
  leads: Lead[];
}

export default function Sidebar({ city, setCity, category, setCategory, radius, setRadius, loading, handleSearch, leads }: SidebarProps) {
  return (
    <div className="w-[420px] bg-[#f8fafc] h-full flex flex-col shadow-[4px_0_15px_rgba(0,0,0,0.05)] z-10 border-r border-gray-200">
      <div className="p-5 flex-1 overflow-y-auto">
        
        {/* Cabeçalho */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xl shadow-sm">🕵️‍♂️</div>
          <div>
            <h1 className="font-bold text-gray-800 text-lg leading-tight">Caça-Cliente</h1>
            <span className="text-xs text-gray-500">O radar de negócios sem site</span>
          </div>
        </div>

        {/* Formulário */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-4">
          
          {/* Dropdown de Categorias */}
          <select 
            value={category} 
            onChange={e => setCategory(e.target.value)} 
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm text-gray-800 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none mb-3 bg-white cursor-pointer"
          >
            {CATEGORIAS_B2B.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>

          <input type="text" value={city} onChange={e => setCity(e.target.value)} 
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm text-gray-800 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none mb-3" 
            placeholder="Cidade"
          />
          
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <label className="text-xs font-semibold text-gray-600">Raio de busca</label>
              <span className="text-xs font-bold text-gray-800">{radius / 1000} km</span>
            </div>
            <input type="range" min="1000" max="50000" step="1000" value={radius} onChange={e => setRadius(Number(e.target.value))} 
              className="w-full accent-[#1b8744]" 
            />
          </div>

          <button onClick={handleSearch} disabled={loading} 
            className="w-full bg-[#1b8744] hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors shadow-md disabled:opacity-70">
            {loading ? 'A pesquisar...' : 'Buscar leads sem site'}
          </button>
        </div>

        {/* Filtros e Exportação */}
        <div className="flex justify-between items-center text-xs text-gray-600 mb-3 px-1">
          <span className="font-semibold text-gray-800">{leads.length} sem site</span>
          <div className="flex gap-2 items-center">
            <span>Exportar:</span>
            <button className="border border-gray-300 bg-white px-3 py-1 rounded-full font-medium hover:bg-gray-50 transition">CSV</button>
          </div>
        </div>

        {/* Lista de Cards */}
        <div className="flex flex-col gap-3 pb-6">
          {leads.map(lead => {
            const numWhatsApp = lead.phone.replace(/\D/g, ''); 
            return (
              <div key={lead.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900 text-[15px] leading-tight pr-2">{lead.name}</h3>
                  <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-orange-200">
                    Quente
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-2 truncate">📍 {lead.address}</p>
                <p className="text-xs text-gray-700 mb-3 font-medium">📞 {lead.phone}</p>
                
                <div className="flex gap-2">
                  <a href={`https://wa.me/55${numWhatsApp}`} target="_blank" rel="noreferrer" 
                    className="flex-1 bg-[#25D366] hover:bg-[#1da851] text-white text-xs font-bold py-2 rounded-lg flex justify-center items-center gap-1 transition-colors shadow-sm">
                    WhatsApp
                  </a>
                  <button className="flex-1 bg-white border border-gray-300 text-gray-700 text-xs font-bold py-2 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                    Detalhes
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
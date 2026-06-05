import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Download } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: string;
  message: string;
  created_at: string;
}

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!supabase) return;
    supabase.from('consultation_requests').select('*').order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setLeads(data);
        setLoading(false);
      });
  }, []);

  const filtered = filter === 'all' ? leads : leads.filter(l => l.plan === filter);

  const exportCSV = () => {
    const headers = 'Nome,Email,Empresa,Plano,Mensagem,Data\n';
    const rows = filtered.map(l =>
      `"${l.name}","${l.email}","${l.company}","${l.plan}","${l.message.replace(/"/g, '""')}","${new Date(l.created_at).toLocaleDateString('pt-BR')}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <div className="py-12 text-center label-mono text-silver-400">Carregando leads...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium tracking-tight text-ink mb-1">Leads</h2>
          <p className="text-sm text-silver-500">{leads.length} solicitações recebidas.</p>
        </div>
        <button onClick={exportCSV} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-hairline text-sm text-ink hover:bg-bone transition">
          <Download className="w-3.5 h-3.5" />
          CSV
        </button>
      </div>

      <div className="flex gap-2">
        {['all', 'Individual', 'Grupo', 'Corporate'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
              filter === f ? 'bg-ink text-white' : 'bg-bone text-silver-600 hover:text-ink'
            }`}
          >
            {f === 'all' ? 'Todos' : f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-silver-400 text-sm">Nenhum lead encontrado.</div>
      ) : (
        <div className="space-y-3">
          {filtered.map(lead => (
            <div key={lead.id} className="bg-bone rounded-xl p-4 border border-hairline">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium text-ink text-sm">{lead.name}</div>
                  <div className="text-xs text-silver-500">{lead.email}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] bg-white border border-hairline px-2 py-0.5 rounded-full uppercase tracking-wider">{lead.plan}</span>
                  <span className="text-[10px] text-silver-400">{new Date(lead.created_at).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
              {lead.company && <div className="text-xs text-silver-600 mt-1">{lead.company}</div>}
              {lead.message && <p className="text-xs text-silver-500 mt-2 leading-relaxed">{lead.message}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

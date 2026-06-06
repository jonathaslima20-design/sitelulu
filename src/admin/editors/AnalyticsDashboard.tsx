import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { TrendingUp, Users, MousePointerClick, Calendar, ArrowUpRight, Loader2 } from 'lucide-react';

interface DayBucket { day: string; views: number }
interface Lead {
  id: string;
  name: string;
  email: string;
  business_type: string;
  created_at: string;
}

type DateRange = '7d' | '30d' | '90d' | 'custom';

const rangeOptions: { value: DateRange; label: string; days: number }[] = [
  { value: '7d', label: '7 dias', days: 7 },
  { value: '30d', label: '30 dias', days: 30 },
  { value: '90d', label: '90 dias', days: 90 },
];

export default function AnalyticsDashboard() {
  const [range, setRange] = useState<DateRange>('30d');
  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');

  const [views, setViews] = useState<DayBucket[]>([]);
  const [totalViews, setTotalViews] = useState(0);
  const [totalLeads, setTotalLeads] = useState(0);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const getDateRange = () => {
    if (range === 'custom' && customFrom && customTo) {
      return { from: new Date(customFrom), to: new Date(customTo + 'T23:59:59'), days: Math.ceil((new Date(customTo).getTime() - new Date(customFrom).getTime()) / 86400000) + 1 };
    }
    const days = rangeOptions.find(r => r.value === range)?.days || 30;
    return { from: new Date(Date.now() - days * 86400000), to: new Date(), days };
  };

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    if (range === 'custom' && (!customFrom || !customTo)) return;
    const client = supabase;
    setLoading(true);

    const { from, to, days } = getDateRange();

    const fetchAll = async () => {
      const [leadsCountRes, recentLeadsRes, rawViewsRes] = await Promise.all([
        client.from('consultation_requests').select('id', { count: 'exact', head: true }),
        client.from('consultation_requests').select('id, name, email, business_type, created_at').order('created_at', { ascending: false }).limit(5),
        client.from('page_views').select('created_at').gte('created_at', from.toISOString()).lte('created_at', to.toISOString()),
      ]);

      const rawViews = rawViewsRes.data;
      if (rawViews) {
        setTotalViews(rawViews.length);
        const buckets: Record<string, number> = {};
        rawViews.forEach(v => {
          const day = v.created_at.slice(0, 10);
          buckets[day] = (buckets[day] || 0) + 1;
        });
        const bucketList = Array.from({ length: days }, (_, i) => {
          const d = new Date(from.getTime() + i * 86400000);
          const key = d.toISOString().slice(0, 10);
          return { day: key, views: buckets[key] || 0 };
        });
        setViews(bucketList);
      }

      setTotalLeads(leadsCountRes.count || 0);
      if (recentLeadsRes.data) setRecentLeads(recentLeadsRes.data as Lead[]);
      setLoading(false);
    };

    fetchAll();
  }, [range, customFrom, customTo]);

  const conversionRate = totalViews > 0 ? ((totalLeads / totalViews) * 100).toFixed(1) : '0.0';
  const maxViews = Math.max(...views.map(v => v.views), 1);
  const midpoint = Math.floor(views.length / 2);
  const recentHalf = views.slice(midpoint).reduce((a, b) => a + b.views, 0);
  const prevHalf = views.slice(0, midpoint).reduce((a, b) => a + b.views, 0);
  const trend = prevHalf > 0 ? (((recentHalf - prevHalf) / prevHalf) * 100).toFixed(0) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-lg font-medium tracking-tight text-ink mb-1">Analytics</h2>
          <p className="text-sm text-silver-500">Visitas e leads da sua landing page.</p>
        </div>

        {/* Date filters */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {rangeOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => setRange(opt.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${range === opt.value ? 'bg-ink text-white' : 'bg-bone border border-hairline text-silver-600 hover:border-silver-400 hover:text-ink'}`}
            >
              {opt.label}
            </button>
          ))}
          <button
            onClick={() => setRange('custom')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${range === 'custom' ? 'bg-ink text-white' : 'bg-bone border border-hairline text-silver-600 hover:border-silver-400 hover:text-ink'}`}
          >
            Personalizado
          </button>
        </div>
      </div>

      {range === 'custom' && (
        <div className="flex gap-3 items-center">
          <div className="flex-1">
            <label className="text-[10px] uppercase tracking-wider text-silver-500 mb-1 block">De</label>
            <input type="date" value={customFrom} onChange={e => setCustomFrom(e.target.value)} className="w-full bg-bone border border-hairline rounded-lg px-3 py-2 text-ink text-sm focus:outline-none focus:border-ink" />
          </div>
          <div className="flex-1">
            <label className="text-[10px] uppercase tracking-wider text-silver-500 mb-1 block">Até</label>
            <input type="date" value={customTo} onChange={e => setCustomTo(e.target.value)} className="w-full bg-bone border border-hairline rounded-lg px-3 py-2 text-ink text-sm focus:outline-none focus:border-ink" />
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-5 h-5 text-silver-400 animate-spin" />
        </div>
      ) : (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-bone rounded-xl border border-hairline p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-silver-500">Visitas</span>
                <MousePointerClick className="w-4 h-4 text-silver-400" />
              </div>
              <div className="text-2xl font-medium tracking-tighter text-ink">{totalViews.toLocaleString('pt-BR')}</div>
              {trend && (
                <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${Number(trend) >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  <ArrowUpRight className={`w-3 h-3 ${Number(trend) < 0 ? 'rotate-90' : ''}`} />
                  {trend}% vs período anterior
                </div>
              )}
            </div>

            <div className="bg-bone rounded-xl border border-hairline p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-silver-500">Leads Totais</span>
                <Users className="w-4 h-4 text-silver-400" />
              </div>
              <div className="text-2xl font-medium tracking-tighter text-ink">{totalLeads}</div>
              <div className="text-xs text-silver-500 mt-1">formulários enviados</div>
            </div>

            <div className="bg-bone rounded-xl border border-hairline p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-silver-500">Taxa de Conversão</span>
                <TrendingUp className="w-4 h-4 text-silver-400" />
              </div>
              <div className="text-2xl font-medium tracking-tighter text-ink">{conversionRate}%</div>
              <div className="text-xs text-silver-500 mt-1">visitas → leads</div>
            </div>

            <div className="bg-bone rounded-xl border border-hairline p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-silver-500">Média Diária</span>
                <Calendar className="w-4 h-4 text-silver-400" />
              </div>
              <div className="text-2xl font-medium tracking-tighter text-ink">
                {views.length > 0 ? (totalViews / views.length).toFixed(1) : '0'}
              </div>
              <div className="text-xs text-silver-500 mt-1">visitas/dia</div>
            </div>
          </div>

          {/* Bar chart */}
          <div className="bg-bone rounded-xl border border-hairline p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-ink">Visitas por dia</span>
              <span className="label-mono text-silver-400 text-[9px]">{views[0]?.day} — {views[views.length - 1]?.day}</span>
            </div>
            {views.every(v => v.views === 0) ? (
              <div className="h-24 flex items-center justify-center text-sm text-silver-400">
                Nenhum dado de visita ainda.
              </div>
            ) : (
              <div className="flex items-end gap-px h-24">
                {views.map((v, i) => (
                  <div key={i} className="flex-1 group relative flex flex-col justify-end h-full">
                    <div
                      className="bg-ink rounded-t-sm transition-all duration-300"
                      style={{ height: `${(v.views / maxViews) * 100}%`, minHeight: v.views > 0 ? '2px' : '0' }}
                    />
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-ink text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition z-10">
                      {v.day.slice(5)}: {v.views}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent leads */}
          <div className="border-t border-hairline pt-6">
            <h3 className="text-sm font-medium text-ink mb-4">Leads Recentes</h3>
            {recentLeads.length === 0 ? (
              <div className="bg-bone rounded-xl border border-hairline p-6 text-center text-sm text-silver-400">
                Nenhum lead ainda.
              </div>
            ) : (
              <div className="space-y-2">
                {recentLeads.map(lead => (
                  <div key={lead.id} className="bg-bone rounded-xl border border-hairline px-4 py-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-ink truncate">{lead.name}</div>
                        <div className="text-xs text-silver-500 truncate">{lead.email}</div>
                        {lead.business_type && <div className="text-[10px] text-silver-400 mt-0.5">{lead.business_type}</div>}
                      </div>
                      <div className="text-[10px] text-silver-400 shrink-0 mt-0.5">
                        {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

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

export default function AnalyticsDashboard() {
  const [views, setViews] = useState<DayBucket[]>([]);
  const [totalViews, setTotalViews] = useState(0);
  const [totalLeads, setTotalLeads] = useState(0);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    const client = supabase;

    const fetchAll = async () => {
      const [leadsCountRes, recentLeadsRes] = await Promise.all([
        client.from('consultation_requests').select('id', { count: 'exact', head: true }),
        client.from('consultation_requests').select('id, name, email, business_type, created_at').order('created_at', { ascending: false }).limit(5),
      ]);

      const { data: rawViews } = await client
        .from('page_views')
        .select('created_at')
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

      if (rawViews) {
        setTotalViews(rawViews.length);
        const buckets: Record<string, number> = {};
        rawViews.forEach(v => {
          const day = v.created_at.slice(0, 10);
          buckets[day] = (buckets[day] || 0) + 1;
        });
        const last30 = Array.from({ length: 30 }, (_, i) => {
          const d = new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000);
          const key = d.toISOString().slice(0, 10);
          return { day: key, views: buckets[key] || 0 };
        });
        setViews(last30);
      }

      setTotalLeads(leadsCountRes.count || 0);
      if (recentLeadsRes.data) setRecentLeads(recentLeadsRes.data as Lead[]);
      setLoading(false);
    };

    fetchAll();
  }, []);

  const conversionRate = totalViews > 0 ? ((totalLeads / totalViews) * 100).toFixed(1) : '0.0';
  const maxViews = Math.max(...views.map(v => v.views), 1);
  const last7Views = views.slice(-7).reduce((a, b) => a + b.views, 0);
  const prev7Views = views.slice(-14, -7).reduce((a, b) => a + b.views, 0);
  const weekTrend = prev7Views > 0 ? (((last7Views - prev7Views) / prev7Views) * 100).toFixed(0) : null;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-5 h-5 text-silver-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium tracking-tight text-ink mb-1">Analytics</h2>
        <p className="text-sm text-silver-500">Visitas e leads da sua landing page nos últimos 30 dias.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-bone rounded-xl border border-hairline p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-silver-500">Visitas (30d)</span>
            <MousePointerClick className="w-4 h-4 text-silver-400" />
          </div>
          <div className="text-2xl font-medium tracking-tighter text-ink">{totalViews.toLocaleString('pt-BR')}</div>
          {weekTrend && (
            <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${Number(weekTrend) >= 0 ? 'text-green-600' : 'text-red-500'}`}>
              <ArrowUpRight className={`w-3 h-3 ${Number(weekTrend) < 0 ? 'rotate-90' : ''}`} />
              {weekTrend}% vs semana anterior
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
            <span className="text-xs text-silver-500">Esta Semana</span>
            <Calendar className="w-4 h-4 text-silver-400" />
          </div>
          <div className="text-2xl font-medium tracking-tighter text-ink">{last7Views}</div>
          <div className="text-xs text-silver-500 mt-1">visitas</div>
        </div>
      </div>

      {/* Sparkline chart */}
      <div className="bg-bone rounded-xl border border-hairline p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-ink">Visitas por dia (30 dias)</span>
          <span className="label-mono text-silver-400">{views[0]?.day} — {views[views.length - 1]?.day}</span>
        </div>
        {views.every(v => v.views === 0) ? (
          <div className="h-24 flex items-center justify-center text-sm text-silver-400">
            Nenhum dado de visita ainda.
          </div>
        ) : (
          <div className="flex items-end gap-0.5 h-24">
            {views.map((v, i) => (
              <div key={i} className="flex-1 group relative flex flex-col justify-end h-full">
                <div
                  className="bg-ink rounded-t-sm transition-all duration-300"
                  style={{ height: `${(v.views / maxViews) * 100}%`, minHeight: v.views > 0 ? '2px' : '0' }}
                />
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-ink text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition">
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
                    {lead.business_type && (
                      <div className="text-[10px] text-silver-400 mt-0.5">{lead.business_type}</div>
                    )}
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
    </div>
  );
}

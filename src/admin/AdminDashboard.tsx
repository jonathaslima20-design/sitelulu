import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { useSiteContent, SiteContent, Plan, Testimonial, Brand, Metric, Pillar } from '../hooks/useSiteContent';
import {
  LogOut, Save, LayoutDashboard, Type, Image, Palette, Users, Star,
  BarChart3, CreditCard, MessageSquare, Megaphone, Menu, X, Check, AlertCircle
} from 'lucide-react';
import AdminEditorHero from './editors/EditorHero';
import AdminEditorMarquee from './editors/EditorMarquee';
import AdminEditorClients from './editors/EditorClients';
import AdminEditorMethodology from './editors/EditorMethodology';
import AdminEditorFounder from './editors/EditorFounder';
import AdminEditorMetrics from './editors/EditorMetrics';
import AdminEditorPlans from './editors/EditorPlans';
import AdminEditorTestimonials from './editors/EditorTestimonials';
import AdminEditorCTA from './editors/EditorCTA';
import AdminEditorFooter from './editors/EditorFooter';
import AdminEditorTheme from './editors/EditorTheme';
import AdminLeads from './editors/AdminLeads';
import LivePreview from './LivePreview';

type Section = 'hero' | 'marquee' | 'clients' | 'methodology' | 'founder' | 'metrics' | 'plans' | 'testimonials' | 'cta' | 'footer' | 'theme' | 'leads';

const sections: { id: Section; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'hero', label: 'Hero', icon: Type },
  { id: 'marquee', label: 'Marquee', icon: Megaphone },
  { id: 'clients', label: 'Clientes', icon: Users },
  { id: 'methodology', label: 'Metodologia', icon: LayoutDashboard },
  { id: 'founder', label: 'Fundadora', icon: Star },
  { id: 'metrics', label: 'Métricas', icon: BarChart3 },
  { id: 'plans', label: 'Planos', icon: CreditCard },
  { id: 'testimonials', label: 'Depoimentos', icon: MessageSquare },
  { id: 'cta', label: 'CTA Final', icon: Megaphone },
  { id: 'footer', label: 'Footer', icon: Type },
  { id: 'theme', label: 'Tema', icon: Palette },
  { id: 'leads', label: 'Leads', icon: Users },
];

export default function AdminDashboard() {
  const { session, loading: authLoading, signOut } = useAuth(true);
  const siteData = useSiteContent();
  const [activeSection, setActiveSection] = useState<Section>('hero');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  const [draftContent, setDraftContent] = useState<SiteContent>({});
  const [draftPlans, setDraftPlans] = useState<Plan[]>([]);
  const [draftTestimonials, setDraftTestimonials] = useState<Testimonial[]>([]);
  const [draftBrands, setDraftBrands] = useState<Brand[]>([]);
  const [draftMetrics, setDraftMetrics] = useState<Metric[]>([]);
  const [draftPillars, setDraftPillars] = useState<Pillar[]>([]);

  useEffect(() => {
    if (!siteData.loading) {
      setDraftContent(siteData.content);
      setDraftPlans(siteData.plans);
      setDraftTestimonials(siteData.testimonials);
      setDraftBrands(siteData.brands);
      setDraftMetrics(siteData.metrics);
      setDraftPillars(siteData.pillars);
    }
  }, [siteData.loading]);

  const updateContent = useCallback((key: string, value: string) => {
    setDraftContent(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  }, []);

  const updatePlans = useCallback((plans: Plan[]) => {
    setDraftPlans(plans);
    setHasChanges(true);
  }, []);

  const updateTestimonials = useCallback((testimonials: Testimonial[]) => {
    setDraftTestimonials(testimonials);
    setHasChanges(true);
  }, []);

  const updateBrands = useCallback((brands: Brand[]) => {
    setDraftBrands(brands);
    setHasChanges(true);
  }, []);

  const updateMetrics = useCallback((metrics: Metric[]) => {
    setDraftMetrics(metrics);
    setHasChanges(true);
  }, []);

  const updatePillars = useCallback((pillars: Pillar[]) => {
    setDraftPillars(pillars);
    setHasChanges(true);
  }, []);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async () => {
    if (!supabase) return;
    setSaving(true);

    try {
      const contentRows = Object.entries(draftContent).map(([key, value]) => ({
        key,
        value,
        section: key.split('_')[0],
        updated_at: new Date().toISOString(),
      }));

      const { error: contentError } = await supabase
        .from('site_content')
        .upsert(contentRows, { onConflict: 'key' });
      if (contentError) throw contentError;

      for (const plan of draftPlans) {
        if (plan.id.length < 10) {
          const { error } = await supabase.from('plans').insert({
            name: plan.name,
            tagline: plan.tagline,
            price: plan.price,
            period: plan.period,
            features: plan.features,
            featured: plan.featured,
            sort_order: plan.sort_order,
          });
          if (error) throw error;
        } else {
          const { error } = await supabase.from('plans').update({
            name: plan.name,
            tagline: plan.tagline,
            price: plan.price,
            period: plan.period,
            features: plan.features,
            featured: plan.featured,
            sort_order: plan.sort_order,
          }).eq('id', plan.id);
          if (error) throw error;
        }
      }

      for (const t of draftTestimonials) {
        if (t.id.length < 10) {
          const { error } = await supabase.from('testimonials').insert({
            quote: t.quote, name: t.name, role: t.role, sort_order: t.sort_order,
          });
          if (error) throw error;
        } else {
          const { error } = await supabase.from('testimonials').update({
            quote: t.quote, name: t.name, role: t.role, sort_order: t.sort_order,
          }).eq('id', t.id);
          if (error) throw error;
        }
      }

      for (const b of draftBrands) {
        if (b.id.length < 10) {
          const { error } = await supabase.from('brands').insert({ name: b.name, sort_order: b.sort_order });
          if (error) throw error;
        } else {
          const { error } = await supabase.from('brands').update({ name: b.name, sort_order: b.sort_order }).eq('id', b.id);
          if (error) throw error;
        }
      }

      for (const m of draftMetrics) {
        if (m.id.length < 10) {
          const { error } = await supabase.from('metrics').insert({ number: m.number, description: m.description, sort_order: m.sort_order });
          if (error) throw error;
        } else {
          const { error } = await supabase.from('metrics').update({ number: m.number, description: m.description, sort_order: m.sort_order }).eq('id', m.id);
          if (error) throw error;
        }
      }

      for (const p of draftPillars) {
        if (p.id.length < 10) {
          const { error } = await supabase.from('methodology_pillars').insert({
            icon: p.icon, title: p.title, description: p.description, tag: p.tag, span: p.span, sort_order: p.sort_order,
          });
          if (error) throw error;
        } else {
          const { error } = await supabase.from('methodology_pillars').update({
            icon: p.icon, title: p.title, description: p.description, tag: p.tag, span: p.span, sort_order: p.sort_order,
          }).eq('id', p.id);
          if (error) throw error;
        }
      }

      setHasChanges(false);
      showToast('success', 'Alterações publicadas com sucesso!');
      siteData.refetch();
    } catch {
      showToast('error', 'Erro ao salvar. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || siteData.loading) {
    return (
      <div className="min-h-screen bg-bone flex items-center justify-center">
        <div className="animate-pulse text-silver-500 label-mono">Carregando...</div>
      </div>
    );
  }

  if (!session) return null;

  const renderEditor = () => {
    switch (activeSection) {
      case 'hero': return <AdminEditorHero content={draftContent} onChange={updateContent} />;
      case 'marquee': return <AdminEditorMarquee content={draftContent} onChange={updateContent} />;
      case 'clients': return <AdminEditorClients brands={draftBrands} content={draftContent} onChange={updateContent} onBrandsChange={updateBrands} />;
      case 'methodology': return <AdminEditorMethodology pillars={draftPillars} content={draftContent} onChange={updateContent} onPillarsChange={updatePillars} />;
      case 'founder': return <AdminEditorFounder content={draftContent} onChange={updateContent} />;
      case 'metrics': return <AdminEditorMetrics metrics={draftMetrics} content={draftContent} onChange={updateContent} onMetricsChange={updateMetrics} />;
      case 'plans': return <AdminEditorPlans plans={draftPlans} content={draftContent} onChange={updateContent} onPlansChange={updatePlans} />;
      case 'testimonials': return <AdminEditorTestimonials testimonials={draftTestimonials} content={draftContent} onChange={updateContent} onTestimonialsChange={updateTestimonials} />;
      case 'cta': return <AdminEditorCTA content={draftContent} onChange={updateContent} />;
      case 'footer': return <AdminEditorFooter content={draftContent} onChange={updateContent} />;
      case 'theme': return <AdminEditorTheme />;
      case 'leads': return <AdminLeads />;
    }
  };

  return (
    <div className="min-h-screen bg-bone flex">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-white border border-hairline rounded-lg flex items-center justify-center"
      >
        {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </button>

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-hairline flex flex-col transform transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-hairline">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-ink flex items-center justify-center">
              <span className="text-white font-mono text-[10px] tracking-widest">B</span>
            </div>
            <div>
              <div className="font-medium tracking-tightest text-ink text-sm">Admin Panel</div>
              <div className="text-[10px] text-silver-400 truncate">{session.user.email}</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => { setActiveSection(id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition mb-0.5 ${
                activeSection === id
                  ? 'bg-ink text-white'
                  : 'text-silver-600 hover:bg-bone hover:text-ink'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-hairline">
          <button
            onClick={signOut}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-silver-500 hover:text-ink rounded-lg hover:bg-bone transition"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-14 bg-white border-b border-hairline flex items-center justify-between px-6 sticky top-0 z-30">
          <h1 className="text-sm font-medium tracking-tight text-ink capitalize pl-12 lg:pl-0">
            {sections.find(s => s.id === activeSection)?.label}
          </h1>
          <div className="flex items-center gap-3">
            {hasChanges && (
              <span className="text-xs text-amber-600 font-medium">Alterações não salvas</span>
            )}
            <button
              onClick={handleSave}
              disabled={saving || !hasChanges}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
                hasChanges
                  ? 'cta-black'
                  : 'bg-silver-100 text-silver-400 cursor-not-allowed'
              }`}
            >
              <Save className="w-3.5 h-3.5" />
              {saving ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </header>

        {/* Content area with editor and preview */}
        <div className="flex-1 flex flex-col xl:flex-row overflow-hidden">
          {/* Editor panel */}
          <div className="xl:w-[480px] 2xl:w-[520px] overflow-y-auto p-6 border-r border-hairline bg-white">
            {renderEditor()}
          </div>

          {/* Live Preview */}
          <div className="flex-1 overflow-hidden bg-silver-100 hidden xl:block">
            <LivePreview
              content={draftContent}
              plans={draftPlans}
              testimonials={draftTestimonials}
              brands={draftBrands}
              metrics={draftMetrics}
              pillars={draftPillars}
            />
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium ${
          toast.type === 'success' ? 'bg-white border-green-200 text-green-700' : 'bg-white border-red-200 text-red-700'
        }`}>
          {toast.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {toast.message}
        </div>
      )}
    </div>
  );
}

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export interface SiteContent {
  [key: string]: string;
}

export interface Plan {
  id: string;
  name: string;
  tagline: string;
  price: string;
  period: string;
  features: string[];
  featured: boolean;
  sort_order: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar_url?: string;
  sort_order: number;
}

export interface Brand {
  id: string;
  name: string;
  sort_order: number;
}

export interface Metric {
  id: string;
  number: string;
  description: string;
  sort_order: number;
}

export interface Pillar {
  id: string;
  icon: string;
  title: string;
  description: string;
  tag: string;
  span: string;
  sort_order: number;
}

export interface SiteTheme {
  id: string;
  colors: Record<string, string>;
  fonts: Record<string, string>;
  effects: Record<string, boolean>;
}

export interface SectionVisibility {
  hero: boolean;
  marquee: boolean;
  social_proof: boolean;
  methodology: boolean;
  founder: boolean;
  metrics: boolean;
  plans: boolean;
  testimonials: boolean;
  cta: boolean;
}

export const defaultVisibility: SectionVisibility = {
  hero: true,
  marquee: true,
  social_proof: true,
  methodology: true,
  founder: true,
  metrics: true,
  plans: true,
  testimonials: true,
  cta: true,
};

export interface SiteData {
  content: SiteContent;
  plans: Plan[];
  testimonials: Testimonial[];
  brands: Brand[];
  metrics: Metric[];
  pillars: Pillar[];
  theme: SiteTheme | null;
}

const defaultContent: SiteContent = {
  hero_badge: 'BRANDING | COMUNICAÇÃO & MARKETING',
  hero_title_1: 'Transforme sua marca',
  hero_title_2: 'em uma autoridade',
  hero_title_3: 'inquestionável.',
  hero_paragraph: 'Consultoria estratégica que arquiteta posicionamento, narrativa e presença digital para marcas que recusam o lugar comum. Aceleramos a transição de fornecedor para referência.',
  hero_cta_primary: 'Agendar Consultoria Estratégica',
  hero_cta_secondary: 'Ver metodologia',
  hero_social_rating: '4.9 / 5.0',
  hero_social_text: 'Confiança de 200+ marcas em ascensão',
  hero_founder_name: 'Luana Lima',
  hero_founder_role: 'CEO · Estrategista de Marca',
  header_brand_name: 'Luana Azevedo',
  header_brand_suffix: 'Marketing',
  header_cta: 'Agendar Consultoria',
  marquee_items: 'POSICIONAMENTO,NARRATIVA,AUTORIDADE,PRESENÇA,DIFERENCIAÇÃO,EXPANSÃO',
  social_proof_label: 'CLIENTES SELECIONADOS',
  social_proof_title: 'Marcas que escolheram <span class="text-ink font-medium">deixar de competir por preço</span> e começaram a competir por autoridade.',
  methodology_label: 'METODOLOGIA · 04 PILARES',
  methodology_title: 'Um sistema operacional<br />para marcas que pretendem liderar.',
  methodology_paragraph: 'Não vendemos campanhas avulsas. Construímos a infraestrutura estratégica que faz a sua marca ser percebida como a única escolha óbvia no seu segmento.',
  founder_label: 'FUNDADORA · CEO',
  founder_name: 'Luana Lima.',
  founder_subtitle: 'Arquiteta de marcas que dominam.',
  founder_bio_1: 'Há mais de uma década, Luana lidera estratégias de posicionamento que transformam empresas medianas em referências de mercado. Sua abordagem combina análise comportamental, arquitetura de narrativa e execução de presença digital com um padrão de exigência raro.',
  founder_bio_2: 'À frente da Baratinhas Marketing, criou uma metodologia proprietária que já conduziu mais de 200 marcas — de pequenos negócios autorais a operações corporativas — para um patamar onde concorrer por preço deixa de ser necessário.',
  founder_quote: 'Posicionamento não é o que você diz sobre a sua marca. É o que o mercado decide quando você não está na sala.',
  founder_quote_author: '— LUANA LIMA',
  founder_stats: '[{"number":"12+","label":"Anos de mercado"},{"number":"200+","label":"Marcas posicionadas"},{"number":"38","label":"Setores atendidos"}]',
  metrics_label: 'RESULTADOS · MÉDIA DE 12 MESES',
  metrics_title: 'Números que medem a transição de fornecedor a referência.',
  plans_label: 'PLANOS DE CONSULTORIA',
  plans_title: 'Três níveis de entrega.',
  plans_subtitle: 'Um único padrão.',
  testimonials_label: 'DEPOIMENTOS',
  testimonials_title: 'A diferença é mensurável.',
  testimonials_subtitle: 'A percepção, ainda mais.',
  cta_label: 'PRÓXIMO PASSO',
  cta_title: 'Reserve uma conversa estratégica.',
  cta_paragraph: 'Avaliamos previamente cada solicitação. Apenas projetos com fit estratégico avançam para consultoria. Resposta em até 24 horas úteis.',
  cta_button: 'Solicitar Avaliação',
  cta_email: 'contato@baratinhas.com',
  footer_brand: 'Baratinhas',
  footer_suffix: 'Marketing',
  footer_copyright: '© 2026 · POSICIONAMENTO ESTRATÉGICO',
  footer_location: 'São Paulo · Brasil',
  footer_instagram: '',
  footer_whatsapp: '',
  footer_linkedin: '',
  sections_visibility: JSON.stringify(defaultVisibility),
  img_hero: '/photo_2026-06-05_17-56-07.jpg',
  img_founder: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=800',
  img_book: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=800',
};

const defaultPlans: Plan[] = [
  { id: '1', name: 'Individual', tagline: 'Para o profissional autoral.', price: 'A partir de R$ 4.800', period: '/ ciclo', features: ['Diagnóstico de marca pessoal', 'Posicionamento e arquitetura de narrativa', '8 sessões 1:1 com Luana', 'Plano de presença digital de 90 dias'], featured: false, sort_order: 1 },
  { id: '2', name: 'Grupo', tagline: 'Imersão estratégica em pequena escala.', price: 'R$ 12.500', period: '/ ciclo', features: ['Mentoria em grupo seleto (até 12)', 'Frameworks proprietários completos', 'Workshops práticos quinzenais', 'Comunidade privada de fundadores', 'Auditoria individual de marca'], featured: true, sort_order: 2 },
  { id: '3', name: 'Corporate', tagline: 'Reestruturação para operações estabelecidas.', price: 'Sob consulta', period: '', features: ['Imersão executiva on-site', 'Reposicionamento corporativo completo', 'Squad dedicado por 6 a 12 meses', 'Governança de marca e brand book', 'Acompanhamento pós-implementação'], featured: false, sort_order: 3 },
];

const defaultTestimonials: Testimonial[] = [
  { id: '1', quote: 'Saímos do leilão de preço. Em 9 meses, nossa marca passou a ser a referência citada espontaneamente em fóruns do setor.', name: 'Marina Albuquerque', role: 'Fundadora · Atelier Norhd', sort_order: 1 },
  { id: '2', quote: 'A Luana não vende marketing — ela vende clareza. Reescrevemos toda a narrativa da empresa em 6 sessões.', name: 'Rafael Mendoza', role: 'CEO · Vantage Group', sort_order: 2 },
  { id: '3', quote: 'O processo é cirúrgico. Pela primeira vez, nosso posicionamento é defensável.', name: 'Helena Cardoso', role: 'CMO · Meridian', sort_order: 3 },
];

const defaultBrands: Brand[] = [
  { id: '1', name: 'LUMEN', sort_order: 1 }, { id: '2', name: 'NORDH', sort_order: 2 },
  { id: '3', name: 'ATELIER', sort_order: 3 }, { id: '4', name: 'KAIROS', sort_order: 4 },
  { id: '5', name: 'MERIDIAN', sort_order: 5 }, { id: '6', name: 'OBSCURA', sort_order: 6 },
  { id: '7', name: 'VANTAGE', sort_order: 7 }, { id: '8', name: 'ARGENT', sort_order: 8 },
];

const defaultMetrics: Metric[] = [
  { id: '1', number: '+ 312%', description: 'Crescimento médio em demanda inbound qualificada', sort_order: 1 },
  { id: '2', number: '9.4×', description: 'Multiplicador de ticket médio pós reposicionamento', sort_order: 2 },
  { id: '3', number: '68%', description: 'Redução de dependência de mídia paga', sort_order: 3 },
];

const defaultPillars: Pillar[] = [
  { id: '1', icon: 'Compass', title: 'Diagnóstico de Marca', description: 'Auditoria 360° de percepção, narrativa e arquitetura. Mapeamos o que sua marca diz versus o que o mercado entende.', tag: '01', span: 'lg:col-span-2 lg:row-span-2', sort_order: 1 },
  { id: '2', icon: 'Crosshair', title: 'Diferenciação de Mercado', description: 'Engenharia de posicionamento. Crafting de uma promessa única, defensável e ressonante.', tag: '02', span: '', sort_order: 2 },
  { id: '3', icon: 'Sparkles', title: 'Presença Digital Elite', description: 'Identidade verbal e visual em todos os pontos de contato. Cada touchpoint comunica nível.', tag: '03', span: '', sort_order: 3 },
  { id: '4', icon: 'Globe2', title: 'Expansão de Autoridade', description: 'Campanhas, mídia e conteúdo orquestrados para transformar reconhecimento em demanda qualificada e recorrente.', tag: '04', span: 'lg:col-span-2', sort_order: 4 },
];

export function useSiteContent() {
  const [data, setData] = useState<SiteData>({
    content: defaultContent,
    plans: defaultPlans,
    testimonials: defaultTestimonials,
    brands: defaultBrands,
    metrics: defaultMetrics,
    pillars: defaultPillars,
    theme: null,
  });
  const [loading, setLoading] = useState(true);
  const [previewOverride, setPreviewOverride] = useState<SiteData | null>(null);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'PREVIEW_UPDATE') {
        setPreviewOverride(e.data.payload as SiteData);
        setLoading(false);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  const fetchAll = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const [contentRes, plansRes, testimonialsRes, brandsRes, metricsRes, pillarsRes, themeRes] = await Promise.all([
      supabase.from('site_content').select('key, value'),
      supabase.from('plans').select('*').order('sort_order'),
      supabase.from('testimonials').select('*').order('sort_order'),
      supabase.from('brands').select('*').order('sort_order'),
      supabase.from('metrics').select('*').order('sort_order'),
      supabase.from('methodology_pillars').select('*').order('sort_order'),
      supabase.from('site_theme').select('*').limit(1).maybeSingle(),
    ]);

    const content: SiteContent = { ...defaultContent };
    if (contentRes.data) {
      for (const row of contentRes.data) {
        content[row.key] = row.value;
      }
    }

    setData({
      content,
      plans: plansRes.data?.length ? plansRes.data : defaultPlans,
      testimonials: testimonialsRes.data?.length ? testimonialsRes.data : defaultTestimonials,
      brands: brandsRes.data?.length ? brandsRes.data : defaultBrands,
      metrics: metricsRes.data?.length ? metricsRes.data : defaultMetrics,
      pillars: pillarsRes.data?.length ? pillarsRes.data : defaultPillars,
      theme: themeRes.data || null,
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const active = previewOverride || data;
  return { ...active, loading, refetch: fetchAll };
}

import { SiteContent, Plan, Testimonial, Brand, Metric, Pillar, SectionVisibility, defaultVisibility } from '../hooks/useSiteContent';

interface Props {
  content: SiteContent;
  plans: Plan[];
  testimonials: Testimonial[];
  brands: Brand[];
  metrics: Metric[];
  pillars: Pillar[];
  colors?: Record<string, string>;
}

export default function LivePreview({ content, plans, testimonials, brands, metrics, pillars, colors }: Props) {
  const marqueeItems = (content.marquee_items || '').split(',').filter(Boolean);
  let founderStats: { number: string; label: string }[] = [];
  try { founderStats = JSON.parse(content.founder_stats || '[]'); } catch { /* empty */ }

  let visibility: SectionVisibility = { ...defaultVisibility };
  try { visibility = { ...defaultVisibility, ...JSON.parse(content.sections_visibility || '{}') }; } catch { /* empty */ }

  const inkColor = colors?.ink || '#1a2b4a';
  const boneColor = colors?.bone || '#F8F9FA';

  const imgHero = content.img_hero || '/photo_2026-06-05_17-56-07.jpg';
  const imgFounder = content.img_founder || 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=800';

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4">
        <div className="label-mono text-silver-400 mb-3 text-center">LIVE PREVIEW</div>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-hairline" style={{ transform: 'scale(0.55)', transformOrigin: 'top center', width: '182%', marginLeft: '-41%' }}>
          {/* Header Preview */}
          <div className="border-b border-hairline px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: inkColor }}>
                <span className="text-white text-[8px] font-bold">B</span>
              </div>
              <span className="font-medium text-sm tracking-tight" style={{ color: inkColor }}>
                {content.header_brand_name}<span className="text-silver-400">.</span>{' '}
                <span className="text-[10px] text-silver-500 uppercase tracking-wider">{content.header_brand_suffix}</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <nav className="flex items-center gap-4 text-[10px] text-silver-500">
                {visibility.methodology && <span>Metodologia</span>}
                {visibility.founder && <span>Fundadora</span>}
                {visibility.plans && <span>Planos</span>}
                {visibility.cta && <span>Contato</span>}
              </nav>
              <div className="text-white px-4 py-2 rounded-full text-xs font-medium" style={{ backgroundColor: inkColor }}>{content.header_cta}</div>
            </div>
          </div>

          {/* Hero Preview */}
          {visibility.hero && (
            <div className="px-10 py-16" style={{ backgroundColor: '#ffffff' }}>
              <div className="grid grid-cols-12 gap-8 items-center">
                <div className="col-span-7">
                  <div className="inline-flex items-center gap-2 border border-hairline rounded-full px-3 py-1 mb-6">
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: inkColor }} />
                    <span className="text-[10px] uppercase tracking-wider text-silver-600">{content.hero_badge}</span>
                  </div>
                  <h1 className="text-4xl font-medium tracking-tight leading-[0.95]" style={{ color: inkColor }}>
                    {content.hero_title_1}
                  </h1>
                  <h1 className="text-4xl font-medium tracking-tight leading-[0.95] mt-1" style={{ background: `linear-gradient(180deg, ${inkColor}cc 0%, ${inkColor} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {content.hero_title_2}
                  </h1>
                  <h1 className="text-4xl font-light tracking-tight leading-[0.95] italic text-silver-700 mt-1">
                    {content.hero_title_3}
                  </h1>
                  <p className="mt-6 text-sm text-silver-600 max-w-md leading-relaxed">{content.hero_paragraph}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-white px-5 py-3 rounded-full text-xs font-medium" style={{ backgroundColor: inkColor }}>
                    {content.hero_cta_primary}
                  </div>
                </div>
                <div className="col-span-5">
                  <div className="rounded-2xl overflow-hidden aspect-[4/5]">
                    <img src={imgHero} alt="" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Marquee Preview */}
          {visibility.marquee && (
            <div className="border-y border-hairline py-4 px-6 flex gap-6 overflow-hidden" style={{ backgroundColor: boneColor }}>
              {marqueeItems.map((item, i) => (
                <span key={i} className="text-[10px] uppercase tracking-wider text-silver-500 whitespace-nowrap">{item}</span>
              ))}
            </div>
          )}

          {/* Social Proof Preview */}
          {visibility.social_proof && (
            <div className="py-12 px-10 text-center">
              <div className="text-[10px] uppercase tracking-wider text-silver-600">{content.social_proof_label}</div>
              <div className="mt-6 flex flex-wrap justify-center gap-6">
                {brands.map(b => (
                  <span key={b.id} className="text-[10px] font-mono tracking-widest text-silver-400">{b.name}</span>
                ))}
              </div>
            </div>
          )}

          {/* Methodology Preview */}
          {visibility.methodology && (
            <div className="py-12 px-10 border-y border-hairline" style={{ backgroundColor: boneColor }}>
              <div className="text-[10px] uppercase tracking-wider text-silver-600">{content.methodology_label}</div>
              <h2 className="mt-3 text-xl font-medium tracking-tight" style={{ color: inkColor }} dangerouslySetInnerHTML={{ __html: content.methodology_title }} />
              <div className="mt-8 grid grid-cols-2 gap-3">
                {pillars.map(p => (
                  <div key={p.id} className="bg-white rounded-xl p-4 border border-hairline">
                    <div className="flex justify-between items-start">
                      <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: inkColor }} />
                      <span className="text-[9px] uppercase tracking-wider text-silver-500">{p.tag}</span>
                    </div>
                    <h3 className="mt-3 text-sm font-medium" style={{ color: inkColor }}>{p.title}</h3>
                    <p className="mt-1 text-[11px] text-silver-500 leading-relaxed">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Founder Preview */}
          {visibility.founder && (
            <div className="py-12 px-10">
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-4">
                  <div className="rounded-2xl overflow-hidden aspect-[4/5]">
                    <img src={imgFounder} alt="" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="col-span-8">
                  <div className="text-[10px] uppercase tracking-wider text-silver-600">{content.founder_label}</div>
                  <h2 className="mt-3 text-xl font-medium tracking-tight" style={{ color: inkColor }}>
                    {content.founder_name} <span className="text-silver-500 italic font-light">{content.founder_subtitle}</span>
                  </h2>
                  <p className="mt-4 text-xs text-silver-600 leading-relaxed">{content.founder_bio_1}</p>
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    {founderStats.map((s, i) => (
                      <div key={i} className="border-t border-hairline pt-3">
                        <div className="text-lg font-medium" style={{ color: inkColor }}>{s.number}</div>
                        <div className="text-[9px] uppercase tracking-wider text-silver-500">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Metrics Preview */}
          {visibility.metrics && (
            <div className="py-12 px-10 text-white" style={{ backgroundColor: inkColor }}>
              <div className="text-[10px] uppercase tracking-wider text-silver-400">{content.metrics_label}</div>
              <h2 className="mt-3 text-lg font-medium">{content.metrics_title}</h2>
              <div className="mt-6 grid grid-cols-3 gap-4">
                {metrics.map(m => (
                  <div key={m.id}>
                    <div className="text-2xl font-medium">{m.number}</div>
                    <p className="mt-1 text-[10px] text-silver-300">{m.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Plans Preview */}
          {visibility.plans && (
            <div className="py-12 px-10 border-y border-hairline" style={{ backgroundColor: boneColor }}>
              <div className="text-center">
                <div className="text-[10px] uppercase tracking-wider text-silver-600">{content.plans_label}</div>
                <h2 className="mt-3 text-xl font-medium tracking-tight" style={{ color: inkColor }}>
                  {content.plans_title} <span className="text-silver-500 italic font-light">{content.plans_subtitle}</span>
                </h2>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {plans.map(p => (
                  <div key={p.id} className={`rounded-xl p-4 ${p.featured ? 'text-white' : 'bg-white border border-hairline'}`} style={p.featured ? { backgroundColor: inkColor } : {}}>
                    <div className="text-[9px] uppercase tracking-wider text-silver-400">{p.name}</div>
                    <h3 className="mt-2 text-sm font-medium">{p.tagline}</h3>
                    <div className="mt-3 text-lg font-medium">{p.price}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Testimonials Preview */}
          {visibility.testimonials && (
            <div className="py-12 px-10">
              <div className="text-[10px] uppercase tracking-wider text-silver-600">{content.testimonials_label}</div>
              <h2 className="mt-3 text-xl font-medium tracking-tight" style={{ color: inkColor }}>
                {content.testimonials_title} <span className="text-silver-500 italic font-light">{content.testimonials_subtitle}</span>
              </h2>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {testimonials.map(t => (
                  <div key={t.id} className="bg-white rounded-xl p-4 border border-hairline">
                    <p className="text-[11px] leading-relaxed" style={{ color: inkColor }}>"{t.quote}"</p>
                    <div className="mt-3 pt-3 border-t border-hairline">
                      <div className="text-xs font-medium">{t.name}</div>
                      <div className="text-[9px] uppercase tracking-wider text-silver-500">{t.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Preview */}
          {visibility.cta && (
            <div className="py-12 px-10">
              <div className="text-white rounded-2xl p-8" style={{ backgroundColor: inkColor }}>
                <div className="text-[10px] uppercase tracking-wider text-silver-400">{content.cta_label}</div>
                <h2 className="mt-3 text-xl font-medium">{content.cta_title}</h2>
                <p className="mt-3 text-xs text-silver-300">{content.cta_paragraph}</p>
                <div className="mt-5 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-xs font-medium" style={{ color: inkColor }}>{content.cta_button}</div>
              </div>
            </div>
          )}

          {/* Footer Preview */}
          <div className="border-t border-hairline py-6 px-10 flex items-center justify-between text-[10px] text-silver-500">
            <span className="font-medium" style={{ color: inkColor }}>{content.footer_brand}<span className="text-silver-400">.</span> {content.footer_suffix}</span>
            <span>{content.footer_copyright}</span>
            <span>{content.footer_location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

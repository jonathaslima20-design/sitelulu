import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Compass, Check, Star, X, Quote } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

import CursorGlow from './components/CursorGlow';
import MagneticButton from './components/MagneticButton';
import Reveal, { StaggerGroup, StaggerItem } from './components/Reveal';
import ParallaxImage from './components/ParallaxImage';
import ConsultationForm from './components/ConsultationForm';
import { useSiteContent, SiteContent, Plan, Testimonial, Brand, Metric, Pillar, SectionVisibility, defaultVisibility } from './hooks/useSiteContent';
import { supabase } from './lib/supabase';

const IMG_PHONE = 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800';

function getPillarIcon(name: string): typeof Compass {
  return ((LucideIcons as Record<string, unknown>)[name] as typeof Compass) || Compass;
}

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPlan, setModalPlan] = useState('Individual');
  const [scrolled, setScrolled] = useState(false);
  const viewTracked = useRef(false);
  const { content, plans, testimonials, brands, metrics, pillars, theme, loading } = useSiteContent();

  // Apply theme colors as CSS variables
  useEffect(() => {
    if (theme?.colors) {
      const root = document.documentElement;
      Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value as string);
      });
    }
  }, [theme]);

  // Apply fonts dynamically from Google Fonts
  useEffect(() => {
    const bodyFont = content.font_body;
    const headingFont = content.font_heading;
    const fonts = [...new Set([bodyFont, headingFont].filter(Boolean))];
    if (!fonts.length) return;

    const url = `https://fonts.googleapis.com/css2?${fonts.map(f => `family=${encodeURIComponent(f!).replace(/%20/g, '+')}:wght@300;400;500;600;700&`).join('')}display=swap`;
    const existingLink = document.getElementById('gfonts-dynamic');
    if (existingLink) existingLink.remove();
    const link = document.createElement('link');
    link.id = 'gfonts-dynamic';
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);

    const root = document.documentElement;
    if (headingFont) root.style.setProperty('--font-heading', `'${headingFont}', sans-serif`);
    if (bodyFont) root.style.setProperty('--font-body', `'${bodyFont}', sans-serif`);
  }, [content.font_body, content.font_heading]);

  // Apply SEO meta tags + favicon + OG tags
  useEffect(() => {
    if (content.seo_title) document.title = content.seo_title;
    const setMeta = (name: string, value: string, prop?: string) => {
      const sel = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(sel) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        prop ? el.setAttribute('property', name) : el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };
    if (content.seo_description) setMeta('description', content.seo_description);
    if (content.og_title || content.seo_title) setMeta('og:title', content.og_title || content.seo_title || '', 'og:title');
    if (content.og_description || content.seo_description) setMeta('og:description', content.og_description || content.seo_description || '', 'og:description');
    if (content.og_image) setMeta('og:image', content.og_image, 'og:image');
    if (content.og_site_name) setMeta('og:site_name', content.og_site_name, 'og:site_name');
    if (content.canonical_url) setMeta('og:url', content.canonical_url, 'og:url');
    if (content.favicon_url) {
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
      if (!link) { link = document.createElement('link'); link.rel = 'icon'; document.head.appendChild(link); }

      if (content.favicon_url.startsWith('lucide:')) {
        const iconName = content.favicon_url.replace('lucide:', '');
        // Render Lucide icon as inline SVG favicon via data URI
        const lucideAttrs = 'xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="%231a2b4a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
        // Fetch SVG path from Lucide CDN and set as favicon
        fetch(`https://unpkg.com/lucide-static@latest/icons/${iconName.replace(/([A-Z])/g, m => `-${m.toLowerCase()}`).replace(/^-/, '')}.svg`)
          .then(r => r.text())
          .then(svgText => {
            const encoded = encodeURIComponent(svgText.replace(/\s+/g, ' ').replace(/currentColor/g, '%231a2b4a'));
            link!.href = `data:image/svg+xml,${encoded}`;
            link!.type = 'image/svg+xml';
          })
          .catch(() => {
            // Fallback: simple square
            const fallback = `<svg ${lucideAttrs}><rect x="3" y="3" width="18" height="18" rx="3"/></svg>`;
            link!.href = `data:image/svg+xml,${encodeURIComponent(fallback)}`;
          });
      } else {
        link.href = content.favicon_url;
        link.type = '';
      }
    }
  }, [content.seo_title, content.seo_description, content.og_image, content.og_title, content.og_description, content.og_site_name, content.canonical_url, content.favicon_url]);

  // Inject tracking scripts
  useEffect(() => {
    if (content.meta_pixel_id) {
      const existing = document.getElementById('meta-pixel');
      if (!existing) {
        const s = document.createElement('script');
        s.id = 'meta-pixel';
        s.innerHTML = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${content.meta_pixel_id}');fbq('track','PageView');`;
        document.head.appendChild(s);
      }
    }
    if (content.gtm_id) {
      const existing = document.getElementById('gtm-script');
      if (!existing) {
        const s = document.createElement('script');
        s.id = 'gtm-script';
        s.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${content.gtm_id}');`;
        document.head.appendChild(s);
      }
    }
    if (content.ga4_id && !content.gtm_id) {
      const existing = document.getElementById('ga4-script');
      if (!existing) {
        const s = document.createElement('script');
        s.id = 'ga4-script';
        s.async = true;
        s.src = `https://www.googletagmanager.com/gtag/js?id=${content.ga4_id}`;
        document.head.appendChild(s);
        const s2 = document.createElement('script');
        s2.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${content.ga4_id}');`;
        document.head.appendChild(s2);
      }
    }
  }, [content.meta_pixel_id, content.gtm_id, content.ga4_id]);

  // Track page view in Supabase (once per session)
  useEffect(() => {
    if (!supabase || viewTracked.current || loading) return;
    const isPreview = new URLSearchParams(window.location.search).has('preview');
    if (isPreview) return;
    viewTracked.current = true;
    const sessionId = sessionStorage.getItem('_sid') || (() => {
      const id = Math.random().toString(36).slice(2);
      sessionStorage.setItem('_sid', id);
      return id;
    })();
    const device = window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop';
    supabase.from('page_views').insert({ session_id: sessionId, referrer: document.referrer || null, device }).then(() => {});
  }, [loading]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openModal = (plan = 'Individual') => {
    setModalPlan(plan);
    setModalOpen(true);
  };

  const showCursorGlow = theme?.effects?.cursorGlow !== false;
  const showGrain = theme?.effects?.grain !== false;

  let visibility: SectionVisibility = defaultVisibility;
  try { visibility = JSON.parse(content.sections_visibility || '{}'); } catch { /* use default */ }

  const imgHero = content.img_hero || '/photo_2026-06-05_17-56-07.jpg';
  const imgFounder = content.img_founder || 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=800';
  const imgBook = content.img_book || 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=800';

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-silver-500 label-mono">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white text-ink overflow-x-hidden">
      {showCursorGlow && <CursorGlow />}

      <Header scrolled={scrolled} onCta={() => openModal('Individual')} content={content} visibility={visibility} />

      <main className="relative z-10">
        {visibility.hero && <Hero onCta={() => openModal('Individual')} content={content} showGrain={showGrain} imgHero={imgHero} />}
        {visibility.marquee && <MarqueeSection content={content} />}
        {visibility.social_proof && <SocialProof content={content} brands={brands} />}
        {visibility.methodology && <MethodologySection content={content} pillars={pillars} showGrain={showGrain} />}
        {visibility.founder && <FounderSection content={content} imgFounder={imgFounder} imgBook={imgBook} />}
        {visibility.metrics && <MetricsSection content={content} metrics={metrics} />}
        {visibility.plans && <PlansSection onSelect={openModal} content={content} plans={plans} />}
        {visibility.testimonials && <TestimonialsSection content={content} testimonials={testimonials} />}
        {visibility.cta && <FinalCTA onCta={() => openModal('Corporate')} content={content} />}
      </main>

      <FooterSection content={content} />

      <AnimatePresence>
        {modalOpen && (
          <Modal onClose={() => setModalOpen(false)} brandName={content.header_brand_name || 'Consultoria'}>
            <ConsultationForm defaultPlan={modalPlan} onClose={() => setModalOpen(false)} />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

function Header({ scrolled, onCta, content, visibility }: { scrolled: boolean; onCta: () => void; content: SiteContent; visibility: SectionVisibility }) {
  const LogoIcon = getPillarIcon(content.header_logo_icon || 'TrendingUp');
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-hairline' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-14 md:h-16 flex items-center justify-between gap-3">
        <a href="#top" className="flex items-center gap-2 shrink-0 min-w-0">
          <div className="w-7 h-7 rounded-md bg-ink flex items-center justify-center shrink-0">
            <LogoIcon className="w-4 h-4 text-white" />
          </div>
          <span className="font-medium tracking-tightest text-ink text-sm sm:text-base truncate max-w-[140px] sm:max-w-none">
            {content.header_brand_name}<span className="text-silver-400 font-light">.</span>
            <span className="label-mono ml-2 align-middle hidden sm:inline">{content.header_brand_suffix}</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-9 text-sm text-silver-600">
          {visibility.methodology && <a href="#metodologia" className="hover:text-ink transition">{content.header_nav_methodology || 'Metodologia'}</a>}
          {visibility.founder && <a href="#fundadora" className="hover:text-ink transition">{content.header_nav_founder || 'Fundadora'}</a>}
          {visibility.plans && <a href="#planos" className="hover:text-ink transition">{content.header_nav_plans || 'Planos'}</a>}
          {visibility.cta && <a href="#contato" className="hover:text-ink transition">{content.header_nav_contact || 'Contato'}</a>}
        </nav>
        <MagneticButton
          onClick={onCta}
          className="cta-black rounded-full px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium tracking-tight inline-flex items-center gap-1.5 shrink-0"
        >
          <span className="hidden xs:inline sm:inline">{content.header_cta}</span>
          <span className="xs:hidden sm:hidden">Agendar</span>
          <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </MagneticButton>
      </div>
    </motion.header>
  );
}

function Hero({ onCta, content, showGrain, imgHero }: { onCta: () => void; content: SiteContent; showGrain: boolean; imgHero: string }) {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 80]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.06]);

  return (
    <section id="top" className={`relative pt-36 pb-24 lg:pt-44 lg:pb-32 ${showGrain ? 'grain' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <Reveal>
            <div className="inline-flex items-center gap-2 border border-hairline rounded-full px-3.5 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-ink animate-pulse" />
              <span className="label-mono">{content.hero_badge}</span>
            </div>
          </Reveal>

          <StaggerGroup className="mt-7" delay={0.07}>
            <StaggerItem>
              <h1 className="font-medium tracking-tightest leading-[0.95] text-[clamp(2.6rem,6.4vw,5.6rem)]">
                {content.hero_title_1}
              </h1>
            </StaggerItem>
            <StaggerItem>
              <h1 className="font-medium tracking-tightest leading-[0.95] text-[clamp(2.6rem,6.4vw,5.6rem)] chrome-text">
                {content.hero_title_2}
              </h1>
            </StaggerItem>
            <StaggerItem>
              <h1 className="font-medium tracking-tightest leading-[0.95] text-[clamp(2.6rem,6.4vw,5.6rem)] italic font-light text-silver-700">
                {content.hero_title_3}
              </h1>
            </StaggerItem>
          </StaggerGroup>

          <Reveal delay={0.4}>
            <p className="mt-8 max-w-xl text-lg leading-[1.55] text-silver-600">
              {content.hero_paragraph}
            </p>
          </Reveal>

          <Reveal delay={0.55}>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <MagneticButton
                onClick={onCta}
                className="cta-black rounded-full px-7 py-4 text-[15px] font-medium tracking-tight inline-flex items-center gap-2.5"
              >
                {content.hero_cta_primary}
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
              <a href="#metodologia" className="group inline-flex items-center gap-2 text-sm text-ink">
                <span className="border-b border-ink pb-0.5">{content.hero_cta_secondary}</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.7}>
            <div className="mt-14 flex items-center gap-6 text-silver-500">
              <div className="flex -space-x-2">
                {[content.img_founder || '', imgHero, IMG_PHONE].map((s, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-white overflow-hidden bg-silver-200">
                    <img src={s} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1 text-ink">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-ink" />)}
                  <span className="ml-2 font-medium">{content.hero_social_rating}</span>
                </div>
                <p className="text-silver-500 text-xs mt-0.5">{content.hero_social_text}</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5 relative">
          <motion.div style={{ y: heroY, scale: heroScale }} className="relative">
            <div className="photo-frame aspect-[4/5] relative">
              <img src={imgHero} alt="Luana Lima — CEO Baratinhas Marketing" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute -bottom-6 -left-6 glass-light rounded-2xl p-5 max-w-[260px]"
            >
              <div className="label-mono">FUNDADORA</div>
              <div className="mt-1 text-base font-medium tracking-tight text-ink">{content.hero_founder_name}</div>
              <div className="text-xs text-silver-500 mt-0.5">{content.hero_founder_role}</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MarqueeSection({ content }: { content: SiteContent }) {
  const items = (content.marquee_items || '').split(',').filter(Boolean);
  const row = [...items, ...items, ...items];
  return (
    <div className="border-y border-hairline bg-bone overflow-hidden">
      <motion.div
        className="flex gap-12 py-5 whitespace-nowrap"
        animate={{ x: ['0%', '-33.333%'] }}
        transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
      >
        {row.map((t, i) => (
          <span key={i} className="label-mono text-silver-500 inline-flex items-center gap-12">
            {t}
            <span className="w-1 h-1 rounded-full bg-silver-300" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function SocialProof({ content, brands }: { content: SiteContent; brands: Brand[] }) {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <div className="text-center">
            <div className="label-mono">{content.social_proof_label}</div>
            <h2 className="mt-4 text-2xl md:text-3xl tracking-tightest text-silver-700 font-light max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: content.social_proof_title }} />
          </div>
        </Reveal>

        <StaggerGroup className="mt-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-y-10 gap-x-6">
          {brands.map((b) => (
            <StaggerItem key={b.id}>
              <div className="flex items-center justify-center text-silver-400 font-mono text-sm tracking-[0.25em] opacity-50 hover:opacity-100 hover:text-ink transition-all duration-500 cursor-default">
                {b.name}
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

function MethodologySection({ content, pillars, showGrain }: { content: SiteContent; pillars: Pillar[]; showGrain: boolean }) {
  return (
    <section id="metodologia" className={`py-24 lg:py-32 bg-bone border-y border-hairline relative ${showGrain ? 'grain' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-14">
          <Reveal className="lg:col-span-7">
            <div className="label-mono">{content.methodology_label}</div>
            <h2 className="mt-4 font-medium tracking-tightest leading-[1.02] text-[clamp(2rem,4.4vw,3.6rem)]" dangerouslySetInnerHTML={{ __html: content.methodology_title }} />
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-5">
            <p className="text-silver-600 leading-relaxed">{content.methodology_paragraph}</p>
          </Reveal>
        </div>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:auto-rows-[260px]">
          {pillars.map(({ icon, title, description, tag, span }) => {
            const Icon = getPillarIcon(icon);
            return (
              <StaggerItem key={tag} className={span}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="group glass-light rounded-2xl p-7 h-full flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-radial from-silver-200/40 to-transparent rounded-full blur-3xl pointer-events-none" />
                  <div className="flex items-start justify-between relative">
                    <div className="w-11 h-11 rounded-xl bg-ink text-white flex items-center justify-center">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <span className="label-mono">{tag}</span>
                  </div>
                  <div className="relative">
                    <h3 className="text-xl md:text-2xl tracking-tightest font-medium text-ink">{title}</h3>
                    <p className="mt-3 text-silver-600 leading-relaxed text-[15px]">{description}</p>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}

function FounderSection({ content, imgFounder, imgBook }: { content: SiteContent; imgFounder: string; imgBook: string }) {
  let stats: { number: string; label: string }[] = [];
  try { stats = JSON.parse(content.founder_stats || '[]'); } catch { /* empty */ }

  return (
    <section id="fundadora" className="py-24 lg:py-36 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 relative">
          <ParallaxImage src={imgFounder} alt="Luana Lima" className="aspect-[4/5]" />
          <div className="hidden lg:block absolute -bottom-8 -right-8 w-48">
            <ParallaxImage src={imgBook} alt="Estratégia de marca" className="aspect-[3/4]" range={30} />
          </div>
        </div>

        <div className="lg:col-span-7 lg:pl-8">
          <Reveal>
            <div className="label-mono">{content.founder_label}</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-medium tracking-tightest leading-[1.02] text-[clamp(2rem,4.6vw,3.8rem)]">
              {content.founder_name}
              <br />
              <span className="text-silver-500 italic font-light">{content.founder_subtitle}</span>
            </h2>
          </Reveal>

          <StaggerGroup className="mt-8 space-y-5 text-[17px] leading-[1.65] text-silver-700 max-w-2xl">
            <StaggerItem><p>{content.founder_bio_1}</p></StaggerItem>
            <StaggerItem><p>{content.founder_bio_2}</p></StaggerItem>
          </StaggerGroup>

          <StaggerGroup className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-6 max-w-xl" delay={0.06}>
            {stats.map(({ number: n, label: l }) => (
              <StaggerItem key={l}>
                <div className="border-t border-hairline pt-4">
                  <div className="text-3xl font-medium tracking-tightest text-ink">{n}</div>
                  <div className="label-mono mt-1.5">{l}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.4}>
            <blockquote className="mt-12 border-l-2 border-ink pl-5 max-w-xl">
              <Quote className="w-5 h-5 text-ink mb-3" />
              <p className="text-lg italic text-ink leading-relaxed font-light">{content.founder_quote}</p>
              <footer className="mt-3 label-mono">{content.founder_quote_author}</footer>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MetricsSection({ content, metrics }: { content: SiteContent; metrics: Metric[] }) {
  return (
    <section className="py-24 bg-ink text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.6), transparent 40%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.4), transparent 40%)'
      }} />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <Reveal>
          <div className="label-mono text-silver-400">{content.metrics_label}</div>
          <h2 className="mt-4 font-medium tracking-tightest leading-[1.02] text-[clamp(1.8rem,3.6vw,3rem)] max-w-3xl">
            {content.metrics_title}
          </h2>
        </Reveal>

        <StaggerGroup className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-px bg-silver-700" delay={0.1}>
          {metrics.map((m) => (
            <StaggerItem key={m.id} className="bg-ink p-8 lg:p-10">
              <div className="text-5xl lg:text-6xl font-medium tracking-tightest" style={{
                backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #cccccc 50%, #888888 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                {m.number}
              </div>
              <p className="mt-5 text-silver-300 leading-relaxed max-w-xs">{m.description}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

function PlansSection({ onSelect, content, plans }: { onSelect: (plan: string) => void; content: SiteContent; plans: Plan[] }) {
  return (
    <section id="planos" className="py-24 lg:py-32 bg-bone border-y border-hairline">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <div className="label-mono">{content.plans_label}</div>
            <h2 className="mt-4 font-medium tracking-tightest leading-[1.04] text-[clamp(2rem,4.4vw,3.6rem)]">
              {content.plans_title}<br />
              <span className="text-silver-500 italic font-light">{content.plans_subtitle}</span>
            </h2>
          </div>
        </Reveal>

        <StaggerGroup className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch" delay={0.08}>
          {plans.map((p) => (
            <StaggerItem key={p.id}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`relative h-full rounded-3xl p-8 lg:p-10 flex flex-col ${
                  p.featured
                    ? 'bg-ink text-white border border-ink shadow-2xl lg:scale-[1.03]'
                    : 'glass-light text-ink'
                }`}
              >
                {p.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-ink px-3 py-1 rounded-full label-mono border border-hairline">
                    PREMIUM
                  </div>
                )}
                <div>
                  <div className={`label-mono ${p.featured ? 'text-silver-400' : ''}`}>{p.name.toUpperCase()}</div>
                  <h3 className="mt-3 text-2xl lg:text-3xl tracking-tightest font-medium">{p.tagline}</h3>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-3xl lg:text-4xl font-medium tracking-tightest">{p.price}</span>
                    {p.period && (
                      <span className={`text-sm ${p.featured ? 'text-silver-400' : 'text-silver-500'}`}>{p.period}</span>
                    )}
                  </div>
                </div>
                <ul className="mt-8 space-y-3.5 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className={`w-4 h-4 mt-1 shrink-0 ${p.featured ? 'text-white' : 'text-ink'}`} strokeWidth={2.5} />
                      <span className={`text-[15px] leading-relaxed ${p.featured ? 'text-silver-200' : 'text-silver-700'}`}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => onSelect(p.name)}
                  className={`mt-10 rounded-full py-3.5 font-medium tracking-tight inline-flex items-center justify-center gap-2 transition ${
                    p.featured
                      ? 'bg-white text-ink hover:bg-silver-200'
                      : 'cta-black'
                  }`}
                >
                  Escolher {p.name}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

function TestimonialsSection({ content, testimonials }: { content: SiteContent; testimonials: Testimonial[] }) {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <div className="grid lg:grid-cols-12 gap-8 items-end mb-14">
            <div className="lg:col-span-7">
              <div className="label-mono">{content.testimonials_label}</div>
              <h2 className="mt-4 font-medium tracking-tightest leading-[1.04] text-[clamp(2rem,4.4vw,3.6rem)]">
                {content.testimonials_title}<br />
                <span className="text-silver-500 italic font-light">{content.testimonials_subtitle}</span>
              </h2>
            </div>
          </div>
        </Reveal>

        <StaggerGroup className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <StaggerItem key={t.id}>
              <div className="glass-light rounded-2xl p-7 h-full flex flex-col">
                <Quote className="w-5 h-5 text-ink" />
                <p className="mt-5 text-[16px] leading-[1.65] text-ink flex-1">"{t.quote}"</p>
                <div className="mt-6 pt-6 border-t border-hairline flex items-center gap-3">
                  {t.avatar_url ? (
                    <img src={t.avatar_url} alt={t.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-ink/10 flex items-center justify-center shrink-0 text-xs font-medium text-ink">
                      {t.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="font-medium text-ink">{t.name}</div>
                    <div className="label-mono mt-0.5">{t.role}</div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

function FinalCTA({ onCta, content }: { onCta: () => void; content: SiteContent }) {
  return (
    <section id="contato" className="py-24 lg:py-32 relative">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[28px] border border-hairline bg-ink text-white p-10 lg:p-16">
          <div className="absolute inset-0 pointer-events-none opacity-30" style={{
            backgroundImage: 'radial-gradient(circle at 80% 0%, rgba(255,255,255,0.18), transparent 40%), radial-gradient(circle at 0% 100%, rgba(255,255,255,0.12), transparent 40%)'
          }} />
          <Reveal>
            <div className="label-mono text-silver-400">{content.cta_label}</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-medium tracking-tightest leading-[1.0] text-[clamp(2rem,5vw,4.4rem)] max-w-3xl">
              {content.cta_title}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-silver-300 max-w-xl leading-relaxed">{content.cta_paragraph}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <MagneticButton
                onClick={onCta}
                className="bg-white text-ink rounded-full px-7 py-4 text-[15px] font-medium tracking-tight inline-flex items-center gap-2.5 hover:bg-silver-200 transition"
              >
                {content.cta_button}
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
              <a href={`mailto:${content.cta_email}`} className="text-sm text-silver-300 hover:text-white transition border-b border-silver-600 pb-0.5">
                {content.cta_email}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FooterSection({ content }: { content: SiteContent }) {
  return (
    <footer className="border-t border-hairline py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-3 gap-8 items-center">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-ink flex items-center justify-center">
            <span className="text-white font-mono text-[10px] tracking-widest">B</span>
          </div>
          <span className="font-medium tracking-tightest text-ink">
            {content.footer_brand}<span className="text-silver-400 font-light">.</span> {content.footer_suffix}
          </span>
        </div>
        <div className="text-center label-mono">{content.footer_copyright}</div>
        <div className="md:text-right text-sm text-silver-500">{content.footer_location}</div>
      </div>
    </footer>
  );
}

function Modal({ children, onClose, brandName }: { children: React.ReactNode; onClose: () => void; brandName: string }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
      style={{ backgroundColor: 'color-mix(in srgb, var(--color-ink) 40%, transparent)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, y: 12, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.96, y: 12, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white rounded-3xl border border-hairline shadow-2xl p-8 lg:p-10"
      >
        <button onClick={onClose} className="absolute top-5 right-5 w-9 h-9 rounded-full hover:bg-bone flex items-center justify-center transition">
          <X className="w-4 h-4" />
        </button>
        <div className="label-mono">CONSULTORIA · {brandName.toUpperCase()}</div>
        <h3 className="mt-2 text-2xl tracking-tightest font-medium text-ink">Agendar avaliação estratégica</h3>
        <p className="mt-2 text-sm text-silver-500">Resposta em até 24h úteis.</p>
        <div className="mt-7">{children}</div>
      </motion.div>
    </motion.div>
  );
}

export default App;

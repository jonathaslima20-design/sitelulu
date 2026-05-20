import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Compass, Crosshair, Sparkles, Globe as Globe2, Check, Star, X, Quote } from 'lucide-react';

import CursorGlow from './components/CursorGlow';
import MagneticButton from './components/MagneticButton';
import Reveal, { StaggerGroup, StaggerItem } from './components/Reveal';
import ParallaxImage from './components/ParallaxImage';
import ConsultationForm from './components/ConsultationForm';

import IMG_HERO from './assets/IMG_4793.jpg';
import IMG_BOOK from './assets/IMG_4701_(1).jpg';
import IMG_FOUNDER from './assets/IMG_4884.jpg';
import IMG_PHONE from './assets/IMG_4813.jpg';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPlan, setModalPlan] = useState('Individual');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openModal = (plan = 'Individual') => {
    setModalPlan(plan);
    setModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-white text-ink overflow-x-hidden">
      <CursorGlow />

      <Header scrolled={scrolled} onCta={() => openModal('Individual')} />

      <main className="relative z-10">
        <Hero onCta={() => openModal('Individual')} />
        <Marquee />
        <SocialProof />
        <Methodology />
        <FounderSection />
        <Metrics />
        <Plans onSelect={openModal} />
        <Testimonials />
        <FinalCTA onCta={() => openModal('Corporate')} />
      </main>

      <Footer />

      <AnimatePresence>
        {modalOpen && (
          <Modal onClose={() => setModalOpen(false)}>
            <ConsultationForm defaultPlan={modalPlan} onClose={() => setModalOpen(false)} />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------------------- HEADER ---------------------------- */

function Header({ scrolled, onCta }: { scrolled: boolean; onCta: () => void }) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-hairline' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-ink flex items-center justify-center">
            <span className="text-white font-mono text-[10px] tracking-widest">B</span>
          </div>
          <span className="font-medium tracking-tightest text-ink">
            Baratinhas<span className="text-silver-400 font-light">.</span>
            <span className="label-mono ml-2 align-middle">Marketing</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-9 text-sm text-silver-600">
          <a href="#metodologia" className="hover:text-ink transition">Metodologia</a>
          <a href="#fundadora" className="hover:text-ink transition">Fundadora</a>
          <a href="#planos" className="hover:text-ink transition">Planos</a>
          <a href="#contato" className="hover:text-ink transition">Contato</a>
        </nav>
        <MagneticButton
          onClick={onCta}
          className="cta-black rounded-full px-5 py-2.5 text-sm font-medium tracking-tight inline-flex items-center gap-2"
        >
          Agendar Consultoria
          <ArrowRight className="w-3.5 h-3.5" />
        </MagneticButton>
      </div>
    </motion.header>
  );
}

/* ---------------------------- HERO ---------------------------- */

function Hero({ onCta }: { onCta: () => void }) {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 80]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.06]);

  return (
    <section id="top" className="relative pt-36 pb-24 lg:pt-44 lg:pb-32 grain">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <Reveal>
            <div className="inline-flex items-center gap-2 border border-hairline rounded-full px-3.5 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-ink animate-pulse" />
              <span className="label-mono">CONSULTORIA · POSICIONAMENTO · 2026</span>
            </div>
          </Reveal>

          <StaggerGroup className="mt-7" delay={0.07}>
            <StaggerItem>
              <h1 className="font-medium tracking-tightest leading-[0.95] text-[clamp(2.6rem,6.4vw,5.6rem)]">
                Transforme sua marca
              </h1>
            </StaggerItem>
            <StaggerItem>
              <h1 className="font-medium tracking-tightest leading-[0.95] text-[clamp(2.6rem,6.4vw,5.6rem)] chrome-text">
                em uma autoridade
              </h1>
            </StaggerItem>
            <StaggerItem>
              <h1 className="font-medium tracking-tightest leading-[0.95] text-[clamp(2.6rem,6.4vw,5.6rem)] italic font-light text-silver-700">
                inquestionável.
              </h1>
            </StaggerItem>
          </StaggerGroup>

          <Reveal delay={0.4}>
            <p className="mt-8 max-w-xl text-lg leading-[1.55] text-silver-600">
              Consultoria estratégica que arquiteta posicionamento, narrativa e presença digital
              para marcas que recusam o lugar comum. Aceleramos a transição de fornecedor para referência.
            </p>
          </Reveal>

          <Reveal delay={0.55}>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <MagneticButton
                onClick={onCta}
                className="cta-black rounded-full px-7 py-4 text-[15px] font-medium tracking-tight inline-flex items-center gap-2.5"
              >
                Agendar Consultoria Estratégica
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
              <a href="#metodologia" className="group inline-flex items-center gap-2 text-sm text-ink">
                <span className="border-b border-ink pb-0.5">Ver metodologia</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.7}>
            <div className="mt-14 flex items-center gap-6 text-silver-500">
              <div className="flex -space-x-2">
                {[IMG_FOUNDER, IMG_HERO, IMG_PHONE].map((s, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-white overflow-hidden bg-silver-200">
                    <img src={s} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1 text-ink">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-ink" />)}
                  <span className="ml-2 font-medium">4.9 / 5.0</span>
                </div>
                <p className="text-silver-500 text-xs mt-0.5">Confiança de 200+ marcas em ascensão</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5 relative">
          <motion.div style={{ y: heroY, scale: heroScale }} className="relative">
            <div className="photo-frame aspect-[4/5] relative">
              <img src={IMG_HERO} alt="Luana Lima — CEO Baratinhas Marketing" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute -bottom-6 -left-6 glass-light rounded-2xl p-5 max-w-[260px]"
            >
              <div className="label-mono">FUNDADORA</div>
              <div className="mt-1 text-base font-medium tracking-tight text-ink">Luana Lima</div>
              <div className="text-xs text-silver-500 mt-0.5">CEO · Estrategista de Marca</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.8 }}
              className="absolute -top-5 -right-4 glass-light rounded-2xl px-4 py-3 flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <div className="text-xs">
                <div className="font-medium text-ink">Vagas Q1 2026</div>
                <div className="text-silver-500">3 lugares restantes</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- MARQUEE ---------------------------- */

function Marquee() {
  const items = ['POSICIONAMENTO', 'NARRATIVA', 'AUTORIDADE', 'PRESENÇA', 'DIFERENCIAÇÃO', 'EXPANSÃO'];
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

/* ---------------------------- SOCIAL PROOF ---------------------------- */

function SocialProof() {
  const brands = ['LUMEN', 'NORDH', 'ATELIER', 'KAIROS', 'MERIDIAN', 'OBSCURA', 'VANTAGE', 'ARGENT'];
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <div className="text-center">
            <div className="label-mono">CLIENTES SELECIONADOS</div>
            <h2 className="mt-4 text-2xl md:text-3xl tracking-tightest text-silver-700 font-light max-w-2xl mx-auto">
              Marcas que escolheram <span className="text-ink font-medium">deixar de competir por preço</span> e começaram a competir por autoridade.
            </h2>
          </div>
        </Reveal>

        <StaggerGroup className="mt-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-y-10 gap-x-6">
          {brands.map((b) => (
            <StaggerItem key={b}>
              <div className="flex items-center justify-center text-silver-400 font-mono text-sm tracking-[0.25em] opacity-50 hover:opacity-100 hover:text-ink transition-all duration-500 cursor-default">
                {b}
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

/* ---------------------------- METHODOLOGY (BENTO) ---------------------------- */

function Methodology() {
  const pillars = [
    {
      icon: Compass,
      title: 'Diagnóstico de Marca',
      copy: 'Auditoria 360° de percepção, narrativa e arquitetura. Mapeamos o que sua marca diz versus o que o mercado entende.',
      tag: '01',
      span: 'lg:col-span-2 lg:row-span-2',
    },
    {
      icon: Crosshair,
      title: 'Diferenciação de Mercado',
      copy: 'Engenharia de posicionamento. Crafting de uma promessa única, defensável e ressonante.',
      tag: '02',
      span: '',
    },
    {
      icon: Sparkles,
      title: 'Presença Digital Elite',
      copy: 'Identidade verbal e visual em todos os pontos de contato. Cada touchpoint comunica nível.',
      tag: '03',
      span: '',
    },
    {
      icon: Globe2,
      title: 'Expansão de Autoridade',
      copy: 'Campanhas, mídia e conteúdo orquestrados para transformar reconhecimento em demanda qualificada e recorrente.',
      tag: '04',
      span: 'lg:col-span-2',
    },
  ];

  return (
    <section id="metodologia" className="py-24 lg:py-32 bg-bone border-y border-hairline relative grain">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-14">
          <Reveal className="lg:col-span-7">
            <div className="label-mono">METODOLOGIA · 04 PILARES</div>
            <h2 className="mt-4 font-medium tracking-tightest leading-[1.02] text-[clamp(2rem,4.4vw,3.6rem)]">
              Um sistema operacional<br />para marcas que pretendem liderar.
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-5">
            <p className="text-silver-600 leading-relaxed">
              Não vendemos campanhas avulsas. Construímos a infraestrutura estratégica que faz a sua marca
              ser percebida como a única escolha óbvia no seu segmento.
            </p>
          </Reveal>
        </div>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:auto-rows-[260px]">
          {pillars.map(({ icon: Icon, title, copy, tag, span }) => (
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
                  <p className="mt-3 text-silver-600 leading-relaxed text-[15px]">{copy}</p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

/* ---------------------------- FOUNDER ---------------------------- */

function FounderSection() {
  return (
    <section id="fundadora" className="py-24 lg:py-36 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 relative">
          <ParallaxImage src={IMG_FOUNDER} alt="Luana Lima" className="aspect-[4/5]" />
          <div className="hidden lg:block absolute -bottom-8 -right-8 w-48">
            <ParallaxImage src={IMG_BOOK} alt="Estratégia de marca" className="aspect-[3/4]" range={30} />
          </div>
        </div>

        <div className="lg:col-span-7 lg:pl-8">
          <Reveal>
            <div className="label-mono">FUNDADORA · CEO</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-medium tracking-tightest leading-[1.02] text-[clamp(2rem,4.6vw,3.8rem)]">
              Luana Lima.
              <br />
              <span className="text-silver-500 italic font-light">Arquiteta de marcas que dominam.</span>
            </h2>
          </Reveal>

          <StaggerGroup className="mt-8 space-y-5 text-[17px] leading-[1.65] text-silver-700 max-w-2xl">
            <StaggerItem>
              <p>
                Há mais de uma década, Luana lidera estratégias de posicionamento que transformam empresas
                medianas em referências de mercado. Sua abordagem combina análise comportamental,
                arquitetura de narrativa e execução de presença digital com um padrão de exigência raro.
              </p>
            </StaggerItem>
            <StaggerItem>
              <p>
                À frente da Baratinhas Marketing, criou uma metodologia proprietária que já conduziu mais
                de 200 marcas — de pequenos negócios autorais a operações corporativas — para um patamar
                onde concorrer por preço deixa de ser necessário.
              </p>
            </StaggerItem>
          </StaggerGroup>

          <StaggerGroup className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-6 max-w-xl" delay={0.06}>
            {[
              ['12+', 'Anos de mercado'],
              ['200+', 'Marcas posicionadas'],
              ['38', 'Setores atendidos'],
            ].map(([n, l]) => (
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
              <p className="text-lg italic text-ink leading-relaxed font-light">
                Posicionamento não é o que você diz sobre a sua marca.
                É o que o mercado decide quando você não está na sala.
              </p>
              <footer className="mt-3 label-mono">— LUANA LIMA</footer>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- METRICS ---------------------------- */

function Metrics() {
  const data = [
    ['+ 312%', 'Crescimento médio em demanda inbound qualificada'],
    ['9.4×', 'Multiplicador de ticket médio pós reposicionamento'],
    ['68%', 'Redução de dependência de mídia paga'],
  ];
  return (
    <section className="py-24 bg-ink text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.6), transparent 40%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.4), transparent 40%)'
      }} />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <Reveal>
          <div className="label-mono text-silver-400">RESULTADOS · MÉDIA DE 12 MESES</div>
          <h2 className="mt-4 font-medium tracking-tightest leading-[1.02] text-[clamp(1.8rem,3.6vw,3rem)] max-w-3xl">
            Números que medem a transição de fornecedor a referência.
          </h2>
        </Reveal>

        <StaggerGroup className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-px bg-silver-700" delay={0.1}>
          {data.map(([n, l]) => (
            <StaggerItem key={l} className="bg-ink p-8 lg:p-10">
              <div className="text-5xl lg:text-6xl font-medium tracking-tightest chrome-text" style={{
                backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #cccccc 50%, #888888 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                {n}
              </div>
              <p className="mt-5 text-silver-300 leading-relaxed max-w-xs">{l}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

/* ---------------------------- PLANS ---------------------------- */

function Plans({ onSelect }: { onSelect: (plan: string) => void }) {
  const plans = [
    {
      name: 'Individual',
      tagline: 'Para o profissional autoral.',
      price: 'A partir de R$ 4.800',
      period: '/ ciclo',
      features: [
        'Diagnóstico de marca pessoal',
        'Posicionamento e arquitetura de narrativa',
        '8 sessões 1:1 com Luana',
        'Plano de presença digital de 90 dias',
      ],
      featured: false,
    },
    {
      name: 'Grupo',
      tagline: 'Imersão estratégica em pequena escala.',
      price: 'R$ 12.500',
      period: '/ ciclo',
      features: [
        'Mentoria em grupo seleto (até 12)',
        'Frameworks proprietários completos',
        'Workshops práticos quinzenais',
        'Comunidade privada de fundadores',
        'Auditoria individual de marca',
      ],
      featured: true,
    },
    {
      name: 'Corporate',
      tagline: 'Reestruturação para operações estabelecidas.',
      price: 'Sob consulta',
      period: '',
      features: [
        'Imersão executiva on-site',
        'Reposicionamento corporativo completo',
        'Squad dedicado por 6 a 12 meses',
        'Governança de marca e brand book',
        'Acompanhamento pós-implementação',
      ],
      featured: false,
    },
  ];

  return (
    <section id="planos" className="py-24 lg:py-32 bg-bone border-y border-hairline">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <div className="label-mono">PLANOS DE CONSULTORIA</div>
            <h2 className="mt-4 font-medium tracking-tightest leading-[1.04] text-[clamp(2rem,4.4vw,3.6rem)]">
              Três níveis de entrega.<br />
              <span className="text-silver-500 italic font-light">Um único padrão.</span>
            </h2>
          </div>
        </Reveal>

        <StaggerGroup className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch" delay={0.08}>
          {plans.map((p) => (
            <StaggerItem key={p.name}>
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

/* ---------------------------- TESTIMONIALS ---------------------------- */

function Testimonials() {
  const items = [
    {
      quote: 'Saímos do leilão de preço. Em 9 meses, nossa marca passou a ser a referência citada espontaneamente em fóruns do setor.',
      name: 'Marina Albuquerque',
      role: 'Fundadora · Atelier Norhd',
    },
    {
      quote: 'A Luana não vende marketing — ela vende clareza. Reescrevemos toda a narrativa da empresa em 6 sessões.',
      name: 'Rafael Mendoza',
      role: 'CEO · Vantage Group',
    },
    {
      quote: 'O processo é cirúrgico. Pela primeira vez, nosso posicionamento é defensável.',
      name: 'Helena Cardoso',
      role: 'CMO · Meridian',
    },
  ];
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <div className="grid lg:grid-cols-12 gap-8 items-end mb-14">
            <div className="lg:col-span-7">
              <div className="label-mono">DEPOIMENTOS</div>
              <h2 className="mt-4 font-medium tracking-tightest leading-[1.04] text-[clamp(2rem,4.4vw,3.6rem)]">
                A diferença é mensurável.<br />
                <span className="text-silver-500 italic font-light">A percepção, ainda mais.</span>
              </h2>
            </div>
          </div>
        </Reveal>

        <StaggerGroup className="grid md:grid-cols-3 gap-5">
          {items.map((t) => (
            <StaggerItem key={t.name}>
              <div className="glass-light rounded-2xl p-7 h-full flex flex-col">
                <Quote className="w-5 h-5 text-ink" />
                <p className="mt-5 text-[16px] leading-[1.65] text-ink flex-1">"{t.quote}"</p>
                <div className="mt-6 pt-6 border-t border-hairline">
                  <div className="font-medium text-ink">{t.name}</div>
                  <div className="label-mono mt-1">{t.role}</div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

/* ---------------------------- FINAL CTA ---------------------------- */

function FinalCTA({ onCta }: { onCta: () => void }) {
  return (
    <section id="contato" className="py-24 lg:py-32 relative">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[28px] border border-hairline bg-ink text-white p-10 lg:p-16">
          <div className="absolute inset-0 pointer-events-none opacity-30" style={{
            backgroundImage: 'radial-gradient(circle at 80% 0%, rgba(255,255,255,0.18), transparent 40%), radial-gradient(circle at 0% 100%, rgba(255,255,255,0.12), transparent 40%)'
          }} />
          <Reveal>
            <div className="label-mono text-silver-400">PRÓXIMO PASSO</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-medium tracking-tightest leading-[1.0] text-[clamp(2rem,5vw,4.4rem)] max-w-3xl">
              Reserve uma conversa estratégica.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-silver-300 max-w-xl leading-relaxed">
              Avaliamos previamente cada solicitação. Apenas projetos com fit estratégico avançam para
              consultoria. Resposta em até 24 horas úteis.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <MagneticButton
                onClick={onCta}
                className="bg-white text-ink rounded-full px-7 py-4 text-[15px] font-medium tracking-tight inline-flex items-center gap-2.5 hover:bg-silver-200 transition"
              >
                Solicitar Avaliação
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
              <a href="mailto:contato@baratinhas.com" className="text-sm text-silver-300 hover:text-white transition border-b border-silver-600 pb-0.5">
                contato@baratinhas.com
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- FOOTER ---------------------------- */

function Footer() {
  return (
    <footer className="border-t border-hairline py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-3 gap-8 items-center">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-ink flex items-center justify-center">
            <span className="text-white font-mono text-[10px] tracking-widest">B</span>
          </div>
          <span className="font-medium tracking-tightest text-ink">
            Baratinhas<span className="text-silver-400 font-light">.</span> Marketing
          </span>
        </div>
        <div className="text-center label-mono">
          © 2026 · POSICIONAMENTO ESTRATÉGICO
        </div>
        <div className="md:text-right text-sm text-silver-500">
          São Paulo · Brasil
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------- MODAL ---------------------------- */

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm"
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
        <div className="label-mono">CONSULTORIA · BARATINHAS</div>
        <h3 className="mt-2 text-2xl tracking-tightest font-medium text-ink">Agendar avaliação estratégica</h3>
        <p className="mt-2 text-sm text-silver-500">Resposta em até 24h úteis.</p>
        <div className="mt-7">{children}</div>
      </motion.div>
    </motion.div>
  );
}

export default App;

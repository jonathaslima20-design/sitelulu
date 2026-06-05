import { SiteContent, SectionVisibility, defaultVisibility } from '../../hooks/useSiteContent';
import { Eye, EyeOff } from 'lucide-react';

interface Props {
  content: SiteContent;
  onChange: (key: string, value: string) => void;
}

const sectionLabels: { key: keyof SectionVisibility; label: string }[] = [
  { key: 'hero', label: 'Hero' },
  { key: 'marquee', label: 'Marquee' },
  { key: 'social_proof', label: 'Social Proof / Clientes' },
  { key: 'methodology', label: 'Metodologia' },
  { key: 'founder', label: 'Fundadora' },
  { key: 'metrics', label: 'Métricas' },
  { key: 'plans', label: 'Planos' },
  { key: 'testimonials', label: 'Depoimentos' },
  { key: 'cta', label: 'CTA Final' },
];

export default function EditorVisibility({ content, onChange }: Props) {
  let visibility: SectionVisibility = { ...defaultVisibility };
  try { visibility = { ...defaultVisibility, ...JSON.parse(content.sections_visibility || '{}') }; } catch { /* empty */ }

  const toggle = (key: keyof SectionVisibility) => {
    const updated = { ...visibility, [key]: !visibility[key] };
    onChange('sections_visibility', JSON.stringify(updated));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium tracking-tight text-ink mb-1">Visibilidade</h2>
        <p className="text-sm text-silver-500">Ative ou desative seções da landing page. Seções ocultas também somem do menu de navegação.</p>
      </div>

      <div className="space-y-2">
        {sectionLabels.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => toggle(key)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition ${
              visibility[key]
                ? 'bg-white border-hairline hover:border-ink'
                : 'bg-silver-100 border-silver-200 opacity-60'
            }`}
          >
            <div className="flex items-center gap-3">
              {visibility[key] ? (
                <Eye className="w-4 h-4 text-ink" />
              ) : (
                <EyeOff className="w-4 h-4 text-silver-400" />
              )}
              <span className={`text-sm font-medium ${visibility[key] ? 'text-ink' : 'text-silver-400'}`}>
                {label}
              </span>
            </div>
            <div className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${
              visibility[key] ? 'bg-ink' : 'bg-silver-200'
            }`}>
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                visibility[key] ? 'left-5' : 'left-1'
              }`} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

import { SiteContent } from '../../hooks/useSiteContent';
import { Type } from 'lucide-react';

interface Props {
  content: SiteContent;
  onChange: (key: string, value: string) => void;
}

const fontOptions = [
  { value: 'Inter Tight', label: 'Inter Tight', sample: 'Aa', category: 'Sans-serif' },
  { value: 'Inter', label: 'Inter', sample: 'Aa', category: 'Sans-serif' },
  { value: 'DM Sans', label: 'DM Sans', sample: 'Aa', category: 'Sans-serif' },
  { value: 'Plus Jakarta Sans', label: 'Plus Jakarta Sans', sample: 'Aa', category: 'Sans-serif' },
  { value: 'Outfit', label: 'Outfit', sample: 'Aa', category: 'Sans-serif' },
  { value: 'Sora', label: 'Sora', sample: 'Aa', category: 'Sans-serif' },
  { value: 'Nunito Sans', label: 'Nunito Sans', sample: 'Aa', category: 'Sans-serif' },
  { value: 'Lato', label: 'Lato', sample: 'Aa', category: 'Sans-serif' },
  { value: 'Poppins', label: 'Poppins', sample: 'Aa', category: 'Sans-serif' },
  { value: 'Raleway', label: 'Raleway', sample: 'Aa', category: 'Sans-serif' },
  { value: 'Montserrat', label: 'Montserrat', sample: 'Aa', category: 'Sans-serif' },
  { value: 'Work Sans', label: 'Work Sans', sample: 'Aa', category: 'Sans-serif' },
  { value: 'Playfair Display', label: 'Playfair Display', sample: 'Aa', category: 'Serif' },
  { value: 'Cormorant Garamond', label: 'Cormorant Garamond', sample: 'Aa', category: 'Serif' },
  { value: 'Libre Baskerville', label: 'Libre Baskerville', sample: 'Aa', category: 'Serif' },
  { value: 'Lora', label: 'Lora', sample: 'Aa', category: 'Serif' },
  { value: 'Merriweather', label: 'Merriweather', sample: 'Aa', category: 'Serif' },
  { value: 'EB Garamond', label: 'EB Garamond', sample: 'Aa', category: 'Serif' },
];

function FontCard({ font, selected, onClick }: { font: typeof fontOptions[0]; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-xl border p-4 transition ${selected ? 'border-ink bg-ink text-white' : 'border-hairline bg-bone hover:border-silver-400'}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className={`text-xs font-medium ${selected ? 'text-white' : 'text-ink'}`}>{font.label}</span>
        <span className={`text-[10px] ${selected ? 'text-white/60' : 'text-silver-400'}`}>{font.category}</span>
      </div>
      <div
        className={`text-2xl leading-tight ${selected ? 'text-white' : 'text-ink'}`}
        style={{ fontFamily: `'${font.value}', sans-serif` }}
      >
        O futuro da sua marca começa aqui.
      </div>
    </button>
  );
}

export default function EditorFonts({ content, onChange }: Props) {
  const bodyFont = content.font_body || 'Inter Tight';
  const headingFont = content.font_heading || 'Inter Tight';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium tracking-tight text-ink mb-1">Tipografia</h2>
        <p className="text-sm text-silver-500">Escolha as fontes usadas em títulos e textos. As fontes são carregadas do Google Fonts.</p>
      </div>

      <div className="border-t border-hairline pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Type className="w-4 h-4 text-silver-500" />
          <h3 className="text-sm font-medium text-ink">Fonte de Títulos</h3>
        </div>
        <p className="text-xs text-silver-500 mb-3">Usada em h1, h2, h3 e textos de destaque.</p>
        <div className="space-y-2">
          {fontOptions.map(font => (
            <FontCard
              key={`h-${font.value}`}
              font={font}
              selected={headingFont === font.value}
              onClick={() => onChange('font_heading', font.value)}
            />
          ))}
        </div>
      </div>

      <div className="border-t border-hairline pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Type className="w-4 h-4 text-silver-500" />
          <h3 className="text-sm font-medium text-ink">Fonte de Corpo</h3>
        </div>
        <p className="text-xs text-silver-500 mb-3">Usada em parágrafos, labels e textos menores.</p>
        <div className="space-y-2">
          {fontOptions.map(font => (
            <FontCard
              key={`b-${font.value}`}
              font={font}
              selected={bodyFont === font.value}
              onClick={() => onChange('font_body', font.value)}
            />
          ))}
        </div>
      </div>

      <div className="pt-2">
        <p className="text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-4 py-3">
          As alterações de fonte são salvas junto com o botão "Salvar" da barra superior. Após salvar, a landing page usará a nova fonte.
        </p>
      </div>
    </div>
  );
}

import { useEffect } from 'react';
import { SiteContent } from '../../hooks/useSiteContent';

interface Props {
  content: SiteContent;
  onChange: (key: string, value: string) => void;
}

const fontOptions = [
  { value: 'Inter Tight', label: 'Inter Tight', category: 'Sans-serif' },
  { value: 'Inter', label: 'Inter', category: 'Sans-serif' },
  { value: 'DM Sans', label: 'DM Sans', category: 'Sans-serif' },
  { value: 'Plus Jakarta Sans', label: 'Plus Jakarta Sans', category: 'Sans-serif' },
  { value: 'Outfit', label: 'Outfit', category: 'Sans-serif' },
  { value: 'Sora', label: 'Sora', category: 'Sans-serif' },
  { value: 'Nunito Sans', label: 'Nunito Sans', category: 'Sans-serif' },
  { value: 'Lato', label: 'Lato', category: 'Sans-serif' },
  { value: 'Poppins', label: 'Poppins', category: 'Sans-serif' },
  { value: 'Raleway', label: 'Raleway', category: 'Sans-serif' },
  { value: 'Montserrat', label: 'Montserrat', category: 'Sans-serif' },
  { value: 'Work Sans', label: 'Work Sans', category: 'Sans-serif' },
  { value: 'Playfair Display', label: 'Playfair Display', category: 'Serif' },
  { value: 'Cormorant Garamond', label: 'Cormorant Garamond', category: 'Serif' },
  { value: 'Libre Baskerville', label: 'Libre Baskerville', category: 'Serif' },
  { value: 'Lora', label: 'Lora', category: 'Serif' },
  { value: 'Merriweather', label: 'Merriweather', category: 'Serif' },
  { value: 'EB Garamond', label: 'EB Garamond', category: 'Serif' },
];

const SAMPLE = 'O futuro da sua marca começa aqui.';

export default function EditorFonts({ content, onChange }: Props) {
  const bodyFont = content.font_body || 'Inter Tight';
  const headingFont = content.font_heading || 'Inter Tight';

  // Pre-load all Google Fonts for the preview
  useEffect(() => {
    const families = fontOptions.map(f => `family=${encodeURIComponent(f.value).replace(/%20/g, '+')}:wght@400;600`).join('&');
    const url = `https://fonts.googleapis.com/css2?${families}&display=swap`;
    const id = 'gfonts-editor-preview';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = url;
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium tracking-tight text-ink mb-1">Tipografia</h2>
        <p className="text-sm text-silver-500">Escolha as fontes usadas na landing page. As alterações são refletidas no preview imediatamente.</p>
      </div>

      {/* Heading font selector */}
      <div className="border-t border-hairline pt-6 space-y-3">
        <div>
          <label className="label-mono mb-2 block">Fonte de Títulos</label>
          <p className="text-xs text-silver-500 mb-3">Usada em h1, h2, h3 e textos de destaque.</p>
          <select
            value={headingFont}
            onChange={e => onChange('font_heading', e.target.value)}
            className="w-full bg-bone border border-hairline rounded-xl px-4 py-3 text-ink text-sm focus:outline-none focus:border-ink transition"
          >
            <optgroup label="Sans-serif">
              {fontOptions.filter(f => f.category === 'Sans-serif').map(f => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </optgroup>
            <optgroup label="Serif">
              {fontOptions.filter(f => f.category === 'Serif').map(f => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </optgroup>
          </select>
        </div>
        <div
          className="bg-bone border border-hairline rounded-xl px-5 py-4 text-2xl leading-tight text-ink"
          style={{ fontFamily: `'${headingFont}', sans-serif` }}
        >
          {SAMPLE}
        </div>
      </div>

      {/* Body font selector */}
      <div className="border-t border-hairline pt-6 space-y-3">
        <div>
          <label className="label-mono mb-2 block">Fonte de Corpo</label>
          <p className="text-xs text-silver-500 mb-3">Usada em parágrafos, labels e textos menores.</p>
          <select
            value={bodyFont}
            onChange={e => onChange('font_body', e.target.value)}
            className="w-full bg-bone border border-hairline rounded-xl px-4 py-3 text-ink text-sm focus:outline-none focus:border-ink transition"
          >
            <optgroup label="Sans-serif">
              {fontOptions.filter(f => f.category === 'Sans-serif').map(f => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </optgroup>
            <optgroup label="Serif">
              {fontOptions.filter(f => f.category === 'Serif').map(f => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </optgroup>
          </select>
        </div>
        <div
          className="bg-bone border border-hairline rounded-xl px-5 py-4 text-sm leading-relaxed text-silver-600"
          style={{ fontFamily: `'${bodyFont}', sans-serif` }}
        >
          Estratégia de marca que transforma negócios em referências incontestáveis do seu mercado. Cada detalhe construído com precisão para criar autoridade duradoura.
        </div>
      </div>

      <div className="pt-2">
        <p className="text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-4 py-3">
          Salve para aplicar as fontes na landing page publicada.
        </p>
      </div>
    </div>
  );
}

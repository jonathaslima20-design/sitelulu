import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Check } from 'lucide-react';

interface Props {
  onColorsChange?: (colors: Record<string, string>) => void;
}

const colorDefinitions: { key: string; label: string; description: string; preview: string }[] = [
  {
    key: 'ink',
    label: 'Cor Principal (Ink)',
    description: 'Textos, titulos, botoes, navbar, fundo da secao de metricas e CTA.',
    preview: 'bg-ink text-white',
  },
  {
    key: 'bone',
    label: 'Fundo Claro (Bone)',
    description: 'Background das secoes alternadas: hero, metodologia, planos e footer.',
    preview: 'bg-bone text-ink border',
  },
  {
    key: 'hairline',
    label: 'Bordas (Hairline)',
    description: 'Linhas divisorias, bordas de cards, separadores entre secoes.',
    preview: 'bg-hairline text-ink',
  },
];

export default function EditorTheme({ onColorsChange }: Props) {
  const [colors, setColors] = useState<Record<string, string>>({
    ink: '#1a2b4a', bone: '#F8F9FA', hairline: '#E4E4E7',
  });
  const [effects, setEffects] = useState<Record<string, boolean>>({
    cursorGlow: true, parallax: true, grain: true,
  });
  const [themeId, setThemeId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    supabase.from('site_theme').select('*').limit(1).maybeSingle().then(({ data }) => {
      if (data) {
        setThemeId(data.id);
        if (data.colors) {
          const c = data.colors as Record<string, string>;
          setColors(c);
          onColorsChange?.(c);
        }
        if (data.effects) setEffects(data.effects as Record<string, boolean>);
      }
    });
  }, []);

  const updateColor = (key: string, value: string) => {
    const updated = { ...colors, [key]: value };
    setColors(updated);
    onColorsChange?.(updated);
  };

  const handleSave = async () => {
    if (!supabase || !themeId) return;
    setSaving(true);
    await supabase.from('site_theme').update({
      colors,
      effects,
      updated_at: new Date().toISOString(),
    }).eq('id', themeId);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const effectDescriptions: Record<string, string> = {
    cursorGlow: 'Brilho que segue o cursor do mouse na pagina',
    parallax: 'Efeito de profundidade nas imagens ao rolar',
    grain: 'Textura granulada sutil no fundo da pagina',
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium tracking-tight text-ink mb-1">Tema</h2>
        <p className="text-sm text-silver-500">Personalize cores e efeitos visuais. As alteracoes aparecem no preview em tempo real.</p>
      </div>

      <div className="border-t border-hairline pt-6">
        <h3 className="text-sm font-medium text-ink mb-4">Cores</h3>
        <div className="space-y-4">
          {colorDefinitions.map(({ key, label, description }) => (
            <div key={key} className="bg-bone rounded-xl border border-hairline p-4">
              <div className="flex items-start gap-3">
                <div className="relative">
                  <input
                    type="color"
                    value={colors[key] || '#000000'}
                    onChange={(e) => updateColor(key, e.target.value)}
                    className="w-12 h-12 rounded-xl border border-hairline cursor-pointer appearance-none [&::-webkit-color-swatch-wrapper]:p-0.5 [&::-webkit-color-swatch]:rounded-lg [&::-webkit-color-swatch]:border-0"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-ink">{label}</div>
                  <div className="text-[11px] text-silver-500 mt-0.5 leading-relaxed">{description}</div>
                  <div className="text-[10px] font-mono text-silver-400 mt-1">{colors[key]}</div>
                </div>
              </div>
              {/* Mini preview bar */}
              <div className="mt-3 flex items-center gap-2 text-[10px]">
                <span className="text-silver-400">Preview:</span>
                <div
                  className="h-6 flex-1 rounded-md flex items-center justify-center text-[9px] font-medium"
                  style={{
                    backgroundColor: key === 'ink' ? colors[key] : key === 'bone' ? colors[key] : '#fff',
                    color: key === 'ink' ? '#fff' : colors.ink || '#1a2b4a',
                    border: key === 'hairline' ? `2px solid ${colors[key]}` : '1px solid transparent',
                  }}
                >
                  {key === 'ink' && 'Texto sobre este fundo'}
                  {key === 'bone' && 'Secao com este fundo'}
                  {key === 'hairline' && 'Borda / divisoria'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-hairline pt-6">
        <h3 className="text-sm font-medium text-ink mb-4">Efeitos Visuais</h3>
        <div className="space-y-2">
          {Object.entries(effects).map(([key, enabled]) => (
            <label key={key} className="flex items-center justify-between cursor-pointer p-3 rounded-xl bg-bone border border-hairline hover:border-silver-300 transition">
              <div>
                <span className="text-sm font-medium text-ink block">
                  {key === 'cursorGlow' ? 'Cursor Glow' : key === 'parallax' ? 'Parallax' : 'Grain'}
                </span>
                <span className="text-[11px] text-silver-500">{effectDescriptions[key]}</span>
              </div>
              <div className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ml-3 ${enabled ? 'bg-ink' : 'bg-silver-200'}`}
                onClick={() => setEffects(prev => ({ ...prev, [key]: !enabled }))}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${enabled ? 'left-6' : 'left-1'}`} />
              </div>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="cta-black w-full rounded-full py-3 font-medium tracking-tight inline-flex items-center justify-center gap-2"
      >
        {saved ? <><Check className="w-4 h-4" /> Salvo!</> : <><Save className="w-4 h-4" /> {saving ? 'Salvando...' : 'Salvar Tema'}</>}
      </button>
    </div>
  );
}

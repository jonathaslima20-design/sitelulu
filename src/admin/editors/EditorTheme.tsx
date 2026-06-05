import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Check } from 'lucide-react';

interface Props {
  onColorsChange?: (colors: Record<string, string>) => void;
}

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
        if (data.colors) setColors(data.colors as Record<string, string>);
        if (data.effects) setEffects(data.effects as Record<string, boolean>);
      }
    });
  }, []);

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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium tracking-tight text-ink mb-1">Tema</h2>
        <p className="text-sm text-silver-500">Cores e efeitos visuais globais.</p>
      </div>

      <div className="border-t border-hairline pt-6">
        <h3 className="text-sm font-medium text-ink mb-4">Cores</h3>
        <div className="space-y-3">
          {Object.entries(colors).map(([key, value]) => (
            <div key={key} className="flex items-center gap-3">
              <input
                type="color"
                value={value}
                onChange={(e) => {
                  const updated = { ...colors, [key]: e.target.value };
                  setColors(updated);
                  onColorsChange?.(updated);
                }}
                className="w-10 h-10 rounded-lg border border-hairline cursor-pointer"
              />
              <div className="flex-1">
                <div className="text-xs font-medium text-ink">{key}</div>
                <div className="text-[10px] text-silver-500 font-mono">{value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-hairline pt-6">
        <h3 className="text-sm font-medium text-ink mb-4">Efeitos</h3>
        <div className="space-y-3">
          {Object.entries(effects).map(([key, enabled]) => (
            <label key={key} className="flex items-center justify-between cursor-pointer p-3 rounded-lg hover:bg-bone transition">
              <span className="text-sm text-ink capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
              <div className={`w-10 h-6 rounded-full transition-colors relative ${enabled ? 'bg-ink' : 'bg-silver-200'}`}
                onClick={() => setEffects(prev => ({ ...prev, [key]: !enabled }))}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${enabled ? 'left-5' : 'left-1'}`} />
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

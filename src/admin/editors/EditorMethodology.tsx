import { SiteContent, Pillar } from '../../hooks/useSiteContent';
import { Plus, X } from 'lucide-react';

interface Props {
  pillars: Pillar[];
  content: SiteContent;
  onChange: (key: string, value: string) => void;
  onPillarsChange: (pillars: Pillar[]) => void;
}

const iconOptions = ['Compass', 'Crosshair', 'Sparkles', 'Globe2', 'Target', 'Zap', 'Lightbulb', 'Rocket', 'Award', 'Shield'];

export default function EditorMethodology({ pillars, content, onChange, onPillarsChange }: Props) {
  const addPillar = () => {
    onPillarsChange([...pillars, {
      id: String(Date.now()),
      icon: 'Compass',
      title: 'Novo Pilar',
      description: 'Descrição do pilar.',
      tag: String(pillars.length + 1).padStart(2, '0'),
      span: '',
      sort_order: pillars.length + 1,
    }]);
  };

  const removePillar = (idx: number) => {
    onPillarsChange(pillars.filter((_, i) => i !== idx));
  };

  const updatePillar = (idx: number, field: keyof Pillar, value: string) => {
    const updated = [...pillars];
    updated[idx] = { ...updated[idx], [field]: value };
    onPillarsChange(updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium tracking-tight text-ink mb-1">Metodologia</h2>
        <p className="text-sm text-silver-500">Pilares da metodologia exibidos em cards.</p>
      </div>

      <div>
        <label className="label-mono mb-2 block">Label</label>
        <input type="text" value={content.methodology_label || ''} onChange={(e) => onChange('methodology_label', e.target.value)} className="w-full bg-bone border border-hairline rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-ink transition" />
      </div>
      <div>
        <label className="label-mono mb-2 block">Título (HTML permitido)</label>
        <input type="text" value={content.methodology_title || ''} onChange={(e) => onChange('methodology_title', e.target.value)} className="w-full bg-bone border border-hairline rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-ink transition" />
      </div>
      <div>
        <label className="label-mono mb-2 block">Parágrafo</label>
        <textarea rows={3} value={content.methodology_paragraph || ''} onChange={(e) => onChange('methodology_paragraph', e.target.value)} className="w-full bg-bone border border-hairline rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-ink transition resize-none" />
      </div>

      <div className="border-t border-hairline pt-6">
        <h3 className="text-sm font-medium text-ink mb-4">Pilares</h3>
        <div className="space-y-4">
          {pillars.map((pillar, i) => (
            <div key={pillar.id} className="bg-bone rounded-xl p-4 border border-hairline">
              <div className="flex items-center justify-between mb-3">
                <span className="label-mono">Pilar {pillar.tag}</span>
                <button onClick={() => removePillar(i)} className="w-7 h-7 rounded hover:bg-red-50 text-silver-400 hover:text-red-500 flex items-center justify-center transition">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-silver-500 mb-1 block">Ícone</label>
                    <select value={pillar.icon} onChange={(e) => updatePillar(i, 'icon', e.target.value)} className="w-full bg-white border border-hairline rounded-lg px-3 py-2 text-ink text-sm focus:outline-none focus:border-ink">
                      {iconOptions.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-silver-500 mb-1 block">Tag</label>
                    <input type="text" value={pillar.tag} onChange={(e) => updatePillar(i, 'tag', e.target.value)} className="w-full bg-white border border-hairline rounded-lg px-3 py-2 text-ink text-sm focus:outline-none focus:border-ink" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-silver-500 mb-1 block">Título</label>
                  <input type="text" value={pillar.title} onChange={(e) => updatePillar(i, 'title', e.target.value)} className="w-full bg-white border border-hairline rounded-lg px-3 py-2 text-ink text-sm focus:outline-none focus:border-ink" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-silver-500 mb-1 block">Descrição</label>
                  <textarea rows={2} value={pillar.description} onChange={(e) => updatePillar(i, 'description', e.target.value)} className="w-full bg-white border border-hairline rounded-lg px-3 py-2 text-ink text-sm focus:outline-none focus:border-ink resize-none" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={addPillar} className="mt-3 inline-flex items-center gap-2 text-sm text-ink hover:text-silver-700 transition">
          <Plus className="w-4 h-4" />
          Adicionar pilar
        </button>
      </div>
    </div>
  );
}

import { SiteContent } from '../../hooks/useSiteContent';

interface Props {
  content: SiteContent;
  onChange: (key: string, value: string) => void;
}

export default function EditorFounder({ content, onChange }: Props) {
  let stats: { number: string; label: string }[] = [];
  try { stats = JSON.parse(content.founder_stats || '[]'); } catch { /* empty */ }

  const updateStats = (newStats: { number: string; label: string }[]) => {
    onChange('founder_stats', JSON.stringify(newStats));
  };

  const addStat = () => updateStats([...stats, { number: '0', label: 'Novo stat' }]);
  const removeStat = (idx: number) => updateStats(stats.filter((_, i) => i !== idx));
  const editStat = (idx: number, field: 'number' | 'label', val: string) => {
    const updated = [...stats];
    updated[idx] = { ...updated[idx], [field]: val };
    updateStats(updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium tracking-tight text-ink mb-1">Fundadora</h2>
        <p className="text-sm text-silver-500">Seção sobre a fundadora e CEO.</p>
      </div>

      <Field label="Label" value={content.founder_label || ''} onChange={(v) => onChange('founder_label', v)} />
      <Field label="Nome" value={content.founder_name || ''} onChange={(v) => onChange('founder_name', v)} />
      <Field label="Subtítulo" value={content.founder_subtitle || ''} onChange={(v) => onChange('founder_subtitle', v)} />
      <Field label="Biografia (parágrafo 1)" value={content.founder_bio_1 || ''} onChange={(v) => onChange('founder_bio_1', v)} multiline />
      <Field label="Biografia (parágrafo 2)" value={content.founder_bio_2 || ''} onChange={(v) => onChange('founder_bio_2', v)} multiline />
      <Field label="Citação" value={content.founder_quote || ''} onChange={(v) => onChange('founder_quote', v)} multiline />
      <Field label="Autor da Citação" value={content.founder_quote_author || ''} onChange={(v) => onChange('founder_quote_author', v)} />

      <div className="border-t border-hairline pt-6">
        <h3 className="text-sm font-medium text-ink mb-4">Estatísticas</h3>
        <div className="space-y-3">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={stat.number}
                onChange={(e) => editStat(i, 'number', e.target.value)}
                placeholder="Número"
                className="w-24 bg-bone border border-hairline rounded-lg px-3 py-2.5 text-ink text-sm focus:outline-none focus:border-ink transition"
              />
              <input
                type="text"
                value={stat.label}
                onChange={(e) => editStat(i, 'label', e.target.value)}
                placeholder="Label"
                className="flex-1 bg-bone border border-hairline rounded-lg px-3 py-2.5 text-ink text-sm focus:outline-none focus:border-ink transition"
              />
              <button onClick={() => removeStat(i)} className="w-8 h-8 rounded-lg hover:bg-red-50 text-silver-400 hover:text-red-500 flex items-center justify-center transition">
                <span className="text-lg">&times;</span>
              </button>
            </div>
          ))}
        </div>
        <button onClick={addStat} className="mt-3 inline-flex items-center gap-2 text-sm text-ink hover:text-silver-700 transition">
          + Adicionar stat
        </button>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, multiline }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  return (
    <div>
      <label className="label-mono mb-2 block">{label}</label>
      {multiline ? (
        <textarea rows={4} value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-bone border border-hairline rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-ink transition resize-none" />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-bone border border-hairline rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-ink transition" />
      )}
    </div>
  );
}

import { SiteContent, Metric } from '../../hooks/useSiteContent';
import { Plus, X } from 'lucide-react';

interface Props {
  metrics: Metric[];
  content: SiteContent;
  onChange: (key: string, value: string) => void;
  onMetricsChange: (metrics: Metric[]) => void;
}

export default function EditorMetrics({ metrics, content, onChange, onMetricsChange }: Props) {
  const addMetric = () => {
    onMetricsChange([...metrics, { id: String(Date.now()), number: '0', description: 'Nova métrica', sort_order: metrics.length + 1 }]);
  };

  const removeMetric = (idx: number) => onMetricsChange(metrics.filter((_, i) => i !== idx));

  const updateMetric = (idx: number, field: 'number' | 'description', value: string) => {
    const updated = [...metrics];
    updated[idx] = { ...updated[idx], [field]: value };
    onMetricsChange(updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium tracking-tight text-ink mb-1">Métricas</h2>
        <p className="text-sm text-silver-500">Números e resultados exibidos na seção escura.</p>
      </div>

      <div>
        <label className="label-mono mb-2 block">Label</label>
        <input type="text" value={content.metrics_label || ''} onChange={(e) => onChange('metrics_label', e.target.value)} className="w-full bg-bone border border-hairline rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-ink transition" />
      </div>
      <div>
        <label className="label-mono mb-2 block">Título</label>
        <input type="text" value={content.metrics_title || ''} onChange={(e) => onChange('metrics_title', e.target.value)} className="w-full bg-bone border border-hairline rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-ink transition" />
      </div>

      <div className="border-t border-hairline pt-6">
        <h3 className="text-sm font-medium text-ink mb-4">Métricas</h3>
        <div className="space-y-3">
          {metrics.map((metric, i) => (
            <div key={metric.id} className="bg-bone rounded-xl p-4 border border-hairline">
              <div className="flex items-center justify-between mb-3">
                <span className="label-mono">Métrica {i + 1}</span>
                <button onClick={() => removeMetric(i)} className="w-7 h-7 rounded hover:bg-red-50 text-silver-400 hover:text-red-500 flex items-center justify-center transition">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-silver-500 mb-1 block">Número</label>
                  <input type="text" value={metric.number} onChange={(e) => updateMetric(i, 'number', e.target.value)} className="w-full bg-white border border-hairline rounded-lg px-3 py-2 text-ink text-sm focus:outline-none focus:border-ink" />
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] uppercase tracking-wider text-silver-500 mb-1 block">Descrição</label>
                  <input type="text" value={metric.description} onChange={(e) => updateMetric(i, 'description', e.target.value)} className="w-full bg-white border border-hairline rounded-lg px-3 py-2 text-ink text-sm focus:outline-none focus:border-ink" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={addMetric} className="mt-3 inline-flex items-center gap-2 text-sm text-ink hover:text-silver-700 transition">
          <Plus className="w-4 h-4" />
          Adicionar métrica
        </button>
      </div>
    </div>
  );
}

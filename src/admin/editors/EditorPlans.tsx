import { SiteContent, Plan } from '../../hooks/useSiteContent';
import { Plus, X } from 'lucide-react';

interface Props {
  plans: Plan[];
  content: SiteContent;
  onChange: (key: string, value: string) => void;
  onPlansChange: (plans: Plan[]) => void;
}

export default function EditorPlans({ plans, content, onChange, onPlansChange }: Props) {
  const addPlan = () => {
    onPlansChange([...plans, {
      id: String(Date.now()),
      name: 'Novo Plano',
      tagline: 'Descrição curta.',
      price: 'R$ 0',
      period: '/ ciclo',
      features: ['Feature 1'],
      featured: false,
      sort_order: plans.length + 1,
    }]);
  };

  const removePlan = (idx: number) => onPlansChange(plans.filter((_, i) => i !== idx));

  const updatePlan = (idx: number, field: keyof Plan, value: unknown) => {
    const updated = [...plans];
    updated[idx] = { ...updated[idx], [field]: value };
    onPlansChange(updated);
  };

  const addFeature = (planIdx: number) => {
    const updated = [...plans];
    updated[planIdx] = { ...updated[planIdx], features: [...updated[planIdx].features, 'Nova feature'] };
    onPlansChange(updated);
  };

  const removeFeature = (planIdx: number, featIdx: number) => {
    const updated = [...plans];
    updated[planIdx] = { ...updated[planIdx], features: updated[planIdx].features.filter((_, i) => i !== featIdx) };
    onPlansChange(updated);
  };

  const editFeature = (planIdx: number, featIdx: number, val: string) => {
    const updated = [...plans];
    const features = [...updated[planIdx].features];
    features[featIdx] = val;
    updated[planIdx] = { ...updated[planIdx], features };
    onPlansChange(updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium tracking-tight text-ink mb-1">Planos</h2>
        <p className="text-sm text-silver-500">Planos de consultoria exibidos na seção de preços.</p>
      </div>

      <div>
        <label className="label-mono mb-2 block">Label</label>
        <input type="text" value={content.plans_label || ''} onChange={(e) => onChange('plans_label', e.target.value)} className="w-full bg-bone border border-hairline rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-ink transition" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label-mono mb-2 block">Título</label>
          <input type="text" value={content.plans_title || ''} onChange={(e) => onChange('plans_title', e.target.value)} className="w-full bg-bone border border-hairline rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-ink transition" />
        </div>
        <div>
          <label className="label-mono mb-2 block">Subtítulo</label>
          <input type="text" value={content.plans_subtitle || ''} onChange={(e) => onChange('plans_subtitle', e.target.value)} className="w-full bg-bone border border-hairline rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-ink transition" />
        </div>
      </div>

      <div className="border-t border-hairline pt-6 space-y-4">
        {plans.map((plan, i) => (
          <div key={plan.id} className="bg-bone rounded-xl p-4 border border-hairline">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="label-mono">{plan.name}</span>
                {plan.featured && <span className="text-[9px] bg-ink text-white px-2 py-0.5 rounded-full">DESTAQUE</span>}
              </div>
              <button onClick={() => removePlan(i)} className="w-7 h-7 rounded hover:bg-red-50 text-silver-400 hover:text-red-500 flex items-center justify-center transition">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-silver-500 mb-1 block">Nome</label>
                  <input type="text" value={plan.name} onChange={(e) => updatePlan(i, 'name', e.target.value)} className="w-full bg-white border border-hairline rounded-lg px-3 py-2 text-ink text-sm focus:outline-none focus:border-ink" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-silver-500 mb-1 block">Preço</label>
                  <input type="text" value={plan.price} onChange={(e) => updatePlan(i, 'price', e.target.value)} className="w-full bg-white border border-hairline rounded-lg px-3 py-2 text-ink text-sm focus:outline-none focus:border-ink" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-silver-500 mb-1 block">Período</label>
                  <input type="text" value={plan.period} onChange={(e) => updatePlan(i, 'period', e.target.value)} className="w-full bg-white border border-hairline rounded-lg px-3 py-2 text-ink text-sm focus:outline-none focus:border-ink" />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={plan.featured} onChange={(e) => updatePlan(i, 'featured', e.target.checked)} className="rounded border-hairline" />
                    <span className="text-xs text-silver-600">Destaque</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-silver-500 mb-1 block">Tagline</label>
                <input type="text" value={plan.tagline} onChange={(e) => updatePlan(i, 'tagline', e.target.value)} className="w-full bg-white border border-hairline rounded-lg px-3 py-2 text-ink text-sm focus:outline-none focus:border-ink" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-silver-500 mb-1 block">Features</label>
                <div className="space-y-1.5">
                  {plan.features.map((f, fi) => (
                    <div key={fi} className="flex items-center gap-1.5">
                      <input type="text" value={f} onChange={(e) => editFeature(i, fi, e.target.value)} className="flex-1 bg-white border border-hairline rounded-lg px-3 py-1.5 text-ink text-xs focus:outline-none focus:border-ink" />
                      <button onClick={() => removeFeature(i, fi)} className="text-silver-400 hover:text-red-500 text-xs">&times;</button>
                    </div>
                  ))}
                  <button onClick={() => addFeature(i)} className="text-xs text-ink hover:text-silver-700">+ Feature</button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <button onClick={addPlan} className="inline-flex items-center gap-2 text-sm text-ink hover:text-silver-700 transition">
          <Plus className="w-4 h-4" />
          Adicionar plano
        </button>
      </div>
    </div>
  );
}

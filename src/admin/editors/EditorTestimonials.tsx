import { SiteContent, Testimonial } from '../../hooks/useSiteContent';
import { Plus, X } from 'lucide-react';

interface Props {
  testimonials: Testimonial[];
  content: SiteContent;
  onChange: (key: string, value: string) => void;
  onTestimonialsChange: (testimonials: Testimonial[]) => void;
}

export default function EditorTestimonials({ testimonials, content, onChange, onTestimonialsChange }: Props) {
  const addTestimonial = () => {
    onTestimonialsChange([...testimonials, {
      id: String(Date.now()),
      quote: 'Novo depoimento.',
      name: 'Nome',
      role: 'Cargo · Empresa',
      sort_order: testimonials.length + 1,
    }]);
  };

  const removeTestimonial = (idx: number) => onTestimonialsChange(testimonials.filter((_, i) => i !== idx));

  const updateTestimonial = (idx: number, field: keyof Testimonial, value: string) => {
    const updated = [...testimonials];
    updated[idx] = { ...updated[idx], [field]: value };
    onTestimonialsChange(updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium tracking-tight text-ink mb-1">Depoimentos</h2>
        <p className="text-sm text-silver-500">Citações de clientes satisfeitos.</p>
      </div>

      <div>
        <label className="label-mono mb-2 block">Label</label>
        <input type="text" value={content.testimonials_label || ''} onChange={(e) => onChange('testimonials_label', e.target.value)} className="w-full bg-bone border border-hairline rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-ink transition" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label-mono mb-2 block">Título</label>
          <input type="text" value={content.testimonials_title || ''} onChange={(e) => onChange('testimonials_title', e.target.value)} className="w-full bg-bone border border-hairline rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-ink transition" />
        </div>
        <div>
          <label className="label-mono mb-2 block">Subtítulo</label>
          <input type="text" value={content.testimonials_subtitle || ''} onChange={(e) => onChange('testimonials_subtitle', e.target.value)} className="w-full bg-bone border border-hairline rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-ink transition" />
        </div>
      </div>

      <div className="border-t border-hairline pt-6 space-y-4">
        {testimonials.map((t, i) => (
          <div key={t.id} className="bg-bone rounded-xl p-4 border border-hairline">
            <div className="flex items-center justify-between mb-3">
              <span className="label-mono">{t.name || `Depoimento ${i + 1}`}</span>
              <button onClick={() => removeTestimonial(i)} className="w-7 h-7 rounded hover:bg-red-50 text-silver-400 hover:text-red-500 flex items-center justify-center transition">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-silver-500 mb-1 block">Citação</label>
                <textarea rows={3} value={t.quote} onChange={(e) => updateTestimonial(i, 'quote', e.target.value)} className="w-full bg-white border border-hairline rounded-lg px-3 py-2 text-ink text-sm focus:outline-none focus:border-ink resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-silver-500 mb-1 block">Nome</label>
                  <input type="text" value={t.name} onChange={(e) => updateTestimonial(i, 'name', e.target.value)} className="w-full bg-white border border-hairline rounded-lg px-3 py-2 text-ink text-sm focus:outline-none focus:border-ink" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-silver-500 mb-1 block">Cargo</label>
                  <input type="text" value={t.role} onChange={(e) => updateTestimonial(i, 'role', e.target.value)} className="w-full bg-white border border-hairline rounded-lg px-3 py-2 text-ink text-sm focus:outline-none focus:border-ink" />
                </div>
              </div>
            </div>
          </div>
        ))}
        <button onClick={addTestimonial} className="inline-flex items-center gap-2 text-sm text-ink hover:text-silver-700 transition">
          <Plus className="w-4 h-4" />
          Adicionar depoimento
        </button>
      </div>
    </div>
  );
}

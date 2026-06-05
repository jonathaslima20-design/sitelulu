import { SiteContent, Brand } from '../../hooks/useSiteContent';
import { Plus, X } from 'lucide-react';

interface Props {
  brands: Brand[];
  content: SiteContent;
  onChange: (key: string, value: string) => void;
  onBrandsChange: (brands: Brand[]) => void;
}

export default function EditorClients({ brands, content, onChange, onBrandsChange }: Props) {
  const addBrand = () => {
    onBrandsChange([...brands, { id: String(Date.now()), name: 'NOVA MARCA', sort_order: brands.length + 1 }]);
  };

  const removeBrand = (idx: number) => {
    onBrandsChange(brands.filter((_, i) => i !== idx));
  };

  const editBrand = (idx: number, name: string) => {
    const updated = [...brands];
    updated[idx] = { ...updated[idx], name };
    onBrandsChange(updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium tracking-tight text-ink mb-1">Clientes / Social Proof</h2>
        <p className="text-sm text-silver-500">Marcas que aparecem na seção de credibilidade.</p>
      </div>

      <div>
        <label className="label-mono mb-2 block">Label</label>
        <input
          type="text"
          value={content.social_proof_label || ''}
          onChange={(e) => onChange('social_proof_label', e.target.value)}
          className="w-full bg-bone border border-hairline rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-ink transition"
        />
      </div>

      <div>
        <label className="label-mono mb-2 block">Título (HTML permitido)</label>
        <textarea
          rows={3}
          value={content.social_proof_title || ''}
          onChange={(e) => onChange('social_proof_title', e.target.value)}
          className="w-full bg-bone border border-hairline rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-ink transition resize-none"
        />
      </div>

      <div className="border-t border-hairline pt-6">
        <h3 className="text-sm font-medium text-ink mb-4">Marcas</h3>
        <div className="space-y-2">
          {brands.map((brand, i) => (
            <div key={brand.id} className="flex items-center gap-2">
              <span className="label-mono w-6 text-center">{i + 1}</span>
              <input
                type="text"
                value={brand.name}
                onChange={(e) => editBrand(i, e.target.value)}
                className="flex-1 bg-bone border border-hairline rounded-lg px-4 py-2.5 text-ink text-sm focus:outline-none focus:border-ink transition"
              />
              <button onClick={() => removeBrand(i)} className="w-8 h-8 rounded-lg hover:bg-red-50 text-silver-400 hover:text-red-500 flex items-center justify-center transition">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button onClick={addBrand} className="mt-3 inline-flex items-center gap-2 text-sm text-ink hover:text-silver-700 transition">
          <Plus className="w-4 h-4" />
          Adicionar marca
        </button>
      </div>
    </div>
  );
}

import { SiteContent } from '../../hooks/useSiteContent';
import { Plus, X } from 'lucide-react';

interface Props {
  content: SiteContent;
  onChange: (key: string, value: string) => void;
}

export default function EditorMarquee({ content, onChange }: Props) {
  const items = (content.marquee_items || '').split(',').filter(Boolean);

  const updateItems = (newItems: string[]) => {
    onChange('marquee_items', newItems.join(','));
  };

  const addItem = () => updateItems([...items, 'NOVO ITEM']);
  const removeItem = (idx: number) => updateItems(items.filter((_, i) => i !== idx));
  const editItem = (idx: number, val: string) => {
    const updated = [...items];
    updated[idx] = val;
    updateItems(updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium tracking-tight text-ink mb-1">Marquee</h2>
        <p className="text-sm text-silver-500">Palavras que rolam horizontalmente na faixa.</p>
      </div>

      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => editItem(i, e.target.value)}
              className="flex-1 bg-bone border border-hairline rounded-lg px-4 py-2.5 text-ink text-sm focus:outline-none focus:border-ink transition"
            />
            <button onClick={() => removeItem(i)} className="w-8 h-8 rounded-lg hover:bg-red-50 text-silver-400 hover:text-red-500 flex items-center justify-center transition">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <button onClick={addItem} className="inline-flex items-center gap-2 text-sm text-ink hover:text-silver-700 transition">
        <Plus className="w-4 h-4" />
        Adicionar palavra
      </button>
    </div>
  );
}

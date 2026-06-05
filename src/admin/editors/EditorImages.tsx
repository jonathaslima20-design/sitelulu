import { useState, useRef } from 'react';
import { SiteContent } from '../../hooks/useSiteContent';
import { supabase } from '../../lib/supabase';
import { Upload, Image as ImageIcon, Loader2 } from 'lucide-react';

interface Props {
  content: SiteContent;
  onChange: (key: string, value: string) => void;
}

const imageSlots = [
  { key: 'img_hero', label: 'Foto Hero (principal)', description: 'Imagem principal exibida na seção hero.' },
  { key: 'img_founder', label: 'Foto Fundadora', description: 'Retrato da fundadora na seção sobre.' },
  { key: 'img_book', label: 'Foto Secundária', description: 'Imagem menor ao lado da fundadora.' },
];

export default function EditorImages({ content, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium tracking-tight text-ink mb-1">Imagens</h2>
        <p className="text-sm text-silver-500">Altere as fotos da landing page. Arraste ou clique para enviar.</p>
      </div>

      <div className="space-y-5">
        {imageSlots.map(slot => (
          <ImageSlot
            key={slot.key}
            label={slot.label}
            description={slot.description}
            currentUrl={content[slot.key] || ''}
            onUploaded={(url) => onChange(slot.key, url)}
          />
        ))}
      </div>
    </div>
  );
}

function ImageSlot({ label, description, currentUrl, onUploaded }: {
  label: string;
  description: string;
  currentUrl: string;
  onUploaded: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    if (!supabase) return;
    setUploading(true);

    const ext = file.name.split('.').pop();
    const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error } = await supabase.storage.from('site-assets').upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });

    if (!error) {
      const { data: { publicUrl } } = supabase.storage.from('site-assets').getPublicUrl(path);
      onUploaded(publicUrl);
    }

    setUploading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      upload(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) upload(file);
  };

  return (
    <div className="bg-bone rounded-xl border border-hairline p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-sm font-medium text-ink">{label}</div>
          <div className="text-[11px] text-silver-500">{description}</div>
        </div>
        <ImageIcon className="w-4 h-4 text-silver-400" />
      </div>

      {currentUrl && (
        <div className="mb-3 rounded-lg overflow-hidden border border-hairline bg-white aspect-[16/9]">
          <img src={currentUrl} alt={label} className="w-full h-full object-cover" />
        </div>
      )}

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        className={`relative rounded-lg border-2 border-dashed p-4 text-center cursor-pointer transition ${
          dragOver ? 'border-ink bg-white' : 'border-hairline hover:border-silver-400'
        }`}
      >
        {uploading ? (
          <div className="flex items-center justify-center gap-2 text-sm text-silver-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            Enviando...
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-sm text-silver-500">
            <Upload className="w-4 h-4" />
            Arraste ou clique para enviar
          </div>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}

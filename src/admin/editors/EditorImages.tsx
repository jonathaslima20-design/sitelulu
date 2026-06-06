import { useState, useRef } from 'react';
import { SiteContent } from '../../hooks/useSiteContent';
import { supabase } from '../../lib/supabase';
import { Upload, Image as ImageIcon, Loader2, Crop } from 'lucide-react';

interface Props {
  content: SiteContent;
  onChange: (key: string, value: string) => void;
}

const imageSlots = [
  { key: 'img_hero', label: 'Foto Hero (principal)', description: 'Imagem principal exibida na seção hero.', aspect: '4:5', aspectClass: 'aspect-[4/5]', width: 800, height: 1000 },
  { key: 'img_founder', label: 'Foto Fundadora', description: 'Retrato da fundadora na seção sobre.', aspect: '4:5', aspectClass: 'aspect-[4/5]', width: 800, height: 1000 },
  { key: 'img_book', label: 'Foto Secundária', description: 'Imagem menor ao lado da fundadora.', aspect: '3:4', aspectClass: 'aspect-[3/4]', width: 600, height: 800 },
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
            aspect={slot.aspect}
            aspectClass={slot.aspectClass}
            width={slot.width}
            height={slot.height}
            currentUrl={content[slot.key] || ''}
            onUploaded={(url) => onChange(slot.key, url)}
          />
        ))}
      </div>
    </div>
  );
}

function ImageSlot({ label, description, aspect, aspectClass, width, height, currentUrl, onUploaded }: {
  label: string;
  description: string;
  aspect: string;
  aspectClass: string;
  width: number;
  height: number;
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

      {/* Aspect ratio / crop guide */}
      <div className="mb-3 flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-hairline">
        <Crop className="w-3.5 h-3.5 text-silver-500" />
        <span className="text-[11px] text-silver-600 font-medium">
          Proporcao: <span className="font-mono text-ink">{aspect}</span>
        </span>
        <span className="text-[10px] text-silver-400 ml-auto">
          Recomendado: {width} x {height}px
        </span>
      </div>

      {currentUrl && (
        <div className={`mb-3 rounded-lg overflow-hidden border border-hairline bg-white relative max-w-[200px] mx-auto`}>
          <div className={aspectClass + ' relative'}>
            <img src={currentUrl} alt={label} className="absolute inset-0 w-full h-full object-cover" />
            {/* Crop overlay grid */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 border border-white/30" />
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                <div className="border-r border-b border-white/20" />
                <div className="border-r border-b border-white/20" />
                <div className="border-b border-white/20" />
                <div className="border-r border-b border-white/20" />
                <div className="border-r border-b border-white/20" />
                <div className="border-b border-white/20" />
                <div className="border-r border-white/20" />
                <div className="border-r border-white/20" />
                <div />
              </div>
              {/* Corner marks */}
              <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-white/70 rounded-tl-sm" />
              <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-white/70 rounded-tr-sm" />
              <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-white/70 rounded-bl-sm" />
              <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-white/70 rounded-br-sm" />
            </div>
            {/* Aspect label */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white text-[9px] font-mono px-2 py-0.5 rounded-full">
              {aspect}
            </div>
          </div>
        </div>
      )}

      {!currentUrl && (
        <div className={`mb-3 rounded-lg border border-dashed border-hairline bg-white relative max-w-[200px] mx-auto`}>
          <div className={aspectClass + ' flex items-center justify-center'}>
            <div className="text-center">
              <div className="text-[10px] text-silver-400 font-mono">{aspect}</div>
              <div className="text-[9px] text-silver-300 mt-0.5">{width}x{height}</div>
            </div>
            {/* Corner marks for empty state */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-silver-300 rounded-tl-sm" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-silver-300 rounded-tr-sm" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-silver-300 rounded-bl-sm" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-silver-300 rounded-br-sm" />
          </div>
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

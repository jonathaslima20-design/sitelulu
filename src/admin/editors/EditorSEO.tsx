import { useRef, useState } from 'react';
import { SiteContent } from '../../hooks/useSiteContent';
import { Globe, Image, Tag, Link, Upload, Pencil, X } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { supabase } from '../../lib/supabase';
import IconPicker from '../IconPicker';

interface Props {
  content: SiteContent;
  onChange: (key: string, value: string) => void;
}

type FaviconMode = 'icon' | 'image';

function LucideIconPreview({ name, size = 18 }: { name: string; size?: number }) {
  const Icon = (LucideIcons as Record<string, unknown>)[name] as React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  if (!Icon) return null;
  return <Icon style={{ width: size, height: size }} />;
}

function ImageUploadField({
  label,
  value,
  onChange,
  hint,
  aspectHint,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  hint?: string;
  aspectHint?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    if (!supabase) return;
    setUploading(true);
    const ext = file.name.split('.').pop();
    const path = `seo/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('site-media').upload(path, file, { upsert: true });
    if (!error) {
      const { data } = supabase.storage.from('site-media').getPublicUrl(path);
      onChange(data.publicUrl);
    }
    setUploading(false);
  };

  return (
    <div>
      <label className="label-mono mb-2 block">{label}</label>
      {value && !value.startsWith('lucide:') && (
        <div className="relative mb-3 rounded-xl overflow-hidden border border-hairline bg-bone group">
          <img src={value} alt="" className={`w-full object-cover ${aspectHint === '1:1' ? 'h-24 w-24 mx-auto' : 'h-36'}`} />
          <button
            onClick={() => onChange('')}
            className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
          >
            <X className="w-3 h-3 text-ink" />
          </button>
        </div>
      )}
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }}
        />
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 text-xs text-ink border border-hairline rounded-lg px-3 py-2 hover:bg-bone transition disabled:opacity-50 shrink-0"
        >
          <Upload className="w-3 h-3" />
          {uploading ? 'Enviando...' : 'Upload'}
        </button>
        <input
          type="url"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="https://... ou cole URL"
          className="flex-1 bg-bone border border-hairline rounded-lg px-3 py-2 text-ink text-xs focus:outline-none focus:border-ink transition"
        />
      </div>
      {hint && <p className="text-[10px] text-silver-400 mt-1">{hint}</p>}
    </div>
  );
}

export default function EditorSEO({ content, onChange }: Props) {
  const rawFavicon = content.favicon_url || '';
  const isLucideFavicon = rawFavicon.startsWith('lucide:');
  const [faviconMode, setFaviconMode] = useState<FaviconMode>(isLucideFavicon ? 'icon' : 'image');
  const [iconPickerOpen, setIconPickerOpen] = useState(false);

  const faviconIconName = isLucideFavicon ? rawFavicon.replace('lucide:', '') : 'TrendingUp';

  const handleFaviconModeChange = (mode: FaviconMode) => {
    setFaviconMode(mode);
    if (mode === 'icon') {
      onChange('favicon_url', `lucide:${faviconIconName}`);
    } else {
      onChange('favicon_url', '');
    }
  };

  return (
    <div className="space-y-6">
      {iconPickerOpen && (
        <IconPicker
          value={faviconIconName}
          onChange={icon => { onChange('favicon_url', `lucide:${icon}`); setIconPickerOpen(false); }}
          onClose={() => setIconPickerOpen(false)}
        />
      )}

      <div>
        <h2 className="text-lg font-medium tracking-tight text-ink mb-1">SEO & Preview</h2>
        <p className="text-sm text-silver-500">Configure como o site aparece em buscadores e ao ser compartilhado nas redes sociais.</p>
      </div>

      {/* Browser tab */}
      <div className="border-t border-hairline pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Tag className="w-4 h-4 text-silver-500" />
          <h3 className="text-sm font-medium text-ink">Aba do Navegador</h3>
        </div>
        <div className="space-y-5">
          <div>
            <label className="label-mono mb-2 block">Título da Aba (Title Tag)</label>
            <input
              type="text"
              value={content.seo_title || ''}
              onChange={e => onChange('seo_title', e.target.value)}
              placeholder="Ex: Luana Marques · Estratégia de Marca"
              className="w-full bg-bone border border-hairline rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-ink transition"
            />
            <p className="text-[10px] text-silver-400 mt-1">Recomendado: 50–60 caracteres. Atual: {(content.seo_title || '').length}</p>
          </div>

          {/* Favicon */}
          <div>
            <label className="label-mono mb-3 block">Favicon</label>

            {/* Mode tabs */}
            <div className="flex gap-1 mb-4 bg-bone border border-hairline rounded-xl p-1 w-fit">
              <button
                onClick={() => handleFaviconModeChange('icon')}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition ${faviconMode === 'icon' ? 'bg-white shadow-sm text-ink border border-hairline' : 'text-silver-500 hover:text-ink'}`}
              >
                Ícone Lucide
              </button>
              <button
                onClick={() => handleFaviconModeChange('image')}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition ${faviconMode === 'image' ? 'bg-white shadow-sm text-ink border border-hairline' : 'text-silver-500 hover:text-ink'}`}
              >
                Imagem / URL
              </button>
            </div>

            {faviconMode === 'icon' ? (
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  {/* Favicon browser mock */}
                  <div className="flex items-center gap-1.5 bg-bone border border-hairline rounded-lg px-3 py-2 shrink-0">
                    <div className="w-4 h-4 flex items-center justify-center text-ink">
                      <LucideIconPreview name={faviconIconName} size={14} />
                    </div>
                    <span className="text-[10px] text-silver-600 truncate max-w-[80px]">{content.seo_title || 'Seu site'}</span>
                  </div>
                  <button
                    onClick={() => setIconPickerOpen(true)}
                    className="flex items-center gap-2 text-sm text-ink border border-hairline rounded-lg px-4 py-2 hover:bg-bone transition"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Trocar ícone
                    <span className="text-silver-400 text-xs">({faviconIconName})</span>
                  </button>
                </div>
                <p className="text-[10px] text-silver-400">O ícone será renderizado como SVG e aplicado como favicon na aba do navegador.</p>
              </div>
            ) : (
              <ImageUploadField
                label=""
                value={isLucideFavicon ? '' : rawFavicon}
                onChange={url => onChange('favicon_url', url)}
                hint="Recomendado: .png ou .ico de 32×32px ou 64×64px."
                aspectHint="1:1"
              />
            )}
          </div>
        </div>
      </div>

      {/* Meta description */}
      <div className="border-t border-hairline pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-4 h-4 text-silver-500" />
          <h3 className="text-sm font-medium text-ink">Google / Buscadores</h3>
        </div>
        <div>
          <label className="label-mono mb-2 block">Meta Descrição</label>
          <textarea
            rows={3}
            value={content.seo_description || ''}
            onChange={e => onChange('seo_description', e.target.value)}
            placeholder="Breve descrição do site para o Google..."
            className="w-full bg-bone border border-hairline rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-ink transition resize-none"
          />
          <p className="text-[10px] text-silver-400 mt-1">Recomendado: 120–160 caracteres. Atual: {(content.seo_description || '').length}</p>
        </div>
      </div>

      {/* OG / Social card */}
      <div className="border-t border-hairline pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Image className="w-4 h-4 text-silver-500" />
          <h3 className="text-sm font-medium text-ink">Card de Compartilhamento (Open Graph)</h3>
        </div>
        <p className="text-xs text-silver-400 mb-4">Aparece quando o link é colado no WhatsApp, LinkedIn, Twitter, etc.</p>

        {/* OG Preview */}
        <div className="mb-5 rounded-xl overflow-hidden border border-hairline bg-bone">
          {content.og_image ? (
            <img src={content.og_image} alt="" className="w-full h-36 object-cover" />
          ) : (
            <div className="w-full h-36 bg-silver-100 flex items-center justify-center">
              <Image className="w-8 h-8 text-silver-300" />
            </div>
          )}
          <div className="p-3 border-t border-hairline">
            <div className="text-[10px] uppercase tracking-wider text-silver-400 mb-0.5">{content.og_site_name || content.canonical_url || 'seusite.com'}</div>
            <div className="text-sm font-medium text-ink line-clamp-1">{content.og_title || content.seo_title || 'Título da página'}</div>
            <div className="text-xs text-silver-500 line-clamp-2 mt-0.5">{content.og_description || content.seo_description || 'Descrição da página...'}</div>
          </div>
        </div>

        <div className="space-y-4">
          <ImageUploadField
            label="OG Image"
            value={content.og_image || ''}
            onChange={url => onChange('og_image', url)}
            hint="Recomendado: 1200×630px. Exibida no WhatsApp, LinkedIn, Twitter."
          />
          <div>
            <label className="label-mono mb-2 block">OG Título</label>
            <input
              type="text"
              value={content.og_title || ''}
              onChange={e => onChange('og_title', e.target.value)}
              placeholder="Deixe vazio para usar o Título da Aba"
              className="w-full bg-bone border border-hairline rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-ink transition"
            />
          </div>
          <div>
            <label className="label-mono mb-2 block">OG Descrição</label>
            <textarea
              rows={2}
              value={content.og_description || ''}
              onChange={e => onChange('og_description', e.target.value)}
              placeholder="Deixe vazio para usar a Meta Descrição"
              className="w-full bg-bone border border-hairline rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-ink transition resize-none"
            />
          </div>
          <div>
            <label className="label-mono mb-2 block">Nome do Site</label>
            <input
              type="text"
              value={content.og_site_name || ''}
              onChange={e => onChange('og_site_name', e.target.value)}
              placeholder="Ex: Luana Marques"
              className="w-full bg-bone border border-hairline rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-ink transition"
            />
          </div>
        </div>
      </div>

      {/* Canonical URL */}
      <div className="border-t border-hairline pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Link className="w-4 h-4 text-silver-500" />
          <h3 className="text-sm font-medium text-ink">URL Canônica</h3>
        </div>
        <input
          type="url"
          value={content.canonical_url || ''}
          onChange={e => onChange('canonical_url', e.target.value)}
          placeholder="https://seudominio.com"
          className="w-full bg-bone border border-hairline rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-ink transition"
        />
        <p className="text-[10px] text-silver-400 mt-1">URL principal do site, sem barra no final.</p>
      </div>

      <div className="pt-2">
        <p className="text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-4 py-3">
          As alterações de SEO são salvas junto com o botão "Salvar" da barra superior.
        </p>
      </div>
    </div>
  );
}

import { SiteContent } from '../../hooks/useSiteContent';
import { Globe, Image, Tag, Link } from 'lucide-react';

interface Props {
  content: SiteContent;
  onChange: (key: string, value: string) => void;
}

export default function EditorSEO({ content, onChange }: Props) {

  return (
    <div className="space-y-6">
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
        <div className="space-y-3">
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
          <div>
            <label className="label-mono mb-2 block">Favicon URL</label>
            <input
              type="url"
              value={content.favicon_url || ''}
              onChange={e => onChange('favicon_url', e.target.value)}
              placeholder="https://... (32x32px ou 64x64px .png/.ico)"
              className="w-full bg-bone border border-hairline rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-ink transition"
            />
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
        {(content.og_image || content.seo_title) && (
          <div className="mb-4 rounded-xl overflow-hidden border border-hairline bg-bone">
            {content.og_image && (
              <img src={content.og_image} alt="" className="w-full h-36 object-cover" />
            )}
            <div className="p-3 border-t border-hairline">
              <div className="text-[10px] uppercase tracking-wider text-silver-400 mb-0.5">{content.og_site_name || window.location.hostname}</div>
              <div className="text-sm font-medium text-ink line-clamp-1">{content.og_title || content.seo_title || 'Título'}</div>
              <div className="text-xs text-silver-500 line-clamp-2 mt-0.5">{content.og_description || content.seo_description || 'Descrição'}</div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <div>
            <label className="label-mono mb-2 block">OG Image URL</label>
            <input
              type="url"
              value={content.og_image || ''}
              onChange={e => onChange('og_image', e.target.value)}
              placeholder="https://... (1200x630px recomendado)"
              className="w-full bg-bone border border-hairline rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-ink transition"
            />
          </div>
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

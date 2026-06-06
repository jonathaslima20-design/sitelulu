import { SiteContent } from '../../hooks/useSiteContent';
import { Facebook, Tag, Info } from 'lucide-react';

interface Props {
  content: SiteContent;
  onChange: (key: string, value: string) => void;
}

export default function EditorIntegrations({ content, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium tracking-tight text-ink mb-1">Integrações</h2>
        <p className="text-sm text-silver-500">Conecte ferramentas de rastreamento e analytics à landing page.</p>
      </div>

      {/* Meta Pixel */}
      <div className="border-t border-hairline pt-6">
        <div className="flex items-center gap-2 mb-1">
          <Facebook className="w-4 h-4 text-[#1877F2]" />
          <h3 className="text-sm font-medium text-ink">Meta Pixel (Facebook Ads)</h3>
        </div>
        <p className="text-xs text-silver-500 mb-4">Rastreia visitantes e conversões para otimizar seus anúncios no Facebook e Instagram.</p>
        <div className="space-y-3">
          <div>
            <label className="label-mono mb-2 block">Pixel ID</label>
            <input
              type="text"
              value={content.meta_pixel_id || ''}
              onChange={e => onChange('meta_pixel_id', e.target.value)}
              placeholder="Ex: 1234567890123456"
              className="w-full bg-bone border border-hairline rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-ink transition font-mono"
            />
            <p className="text-[10px] text-silver-400 mt-1">Encontre no Gerenciador de Eventos do Meta Business.</p>
          </div>
          <div>
            <label className="label-mono mb-2 block">Access Token (API de Conversões)</label>
            <input
              type="password"
              value={content.meta_capi_token || ''}
              onChange={e => onChange('meta_capi_token', e.target.value)}
              placeholder="Token gerado no Meta Events Manager"
              className="w-full bg-bone border border-hairline rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-ink transition font-mono"
            />
            <p className="text-[10px] text-silver-400 mt-1">Opcional. Permite rastreamento server-side (mais preciso que o pixel client-side).</p>
          </div>
        </div>

        <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-3 flex gap-2.5">
          <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <div className="text-xs text-blue-700 leading-relaxed">
            <strong>Eventos rastreados automaticamente:</strong> PageView (ao carregar), Lead (ao enviar formulário de consulta).
          </div>
        </div>
      </div>

      {/* Google Tag Manager / GA4 */}
      <div className="border-t border-hairline pt-6">
        <div className="flex items-center gap-2 mb-1">
          <Tag className="w-4 h-4 text-[#F9AB00]" />
          <h3 className="text-sm font-medium text-ink">Google Tag Manager / GA4</h3>
        </div>
        <p className="text-xs text-silver-500 mb-4">Rastreie visitas, comportamento e conversões no Google Analytics.</p>
        <div className="space-y-3">
          <div>
            <label className="label-mono mb-2 block">GTM Container ID</label>
            <input
              type="text"
              value={content.gtm_id || ''}
              onChange={e => onChange('gtm_id', e.target.value)}
              placeholder="Ex: GTM-XXXXXXX"
              className="w-full bg-bone border border-hairline rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-ink transition font-mono"
            />
            <p className="text-[10px] text-silver-400 mt-1">No formato GTM-XXXXXXX. Encontre no painel do Google Tag Manager.</p>
          </div>
          <div>
            <label className="label-mono mb-2 block">GA4 Measurement ID (opcional)</label>
            <input
              type="text"
              value={content.ga4_id || ''}
              onChange={e => onChange('ga4_id', e.target.value)}
              placeholder="Ex: G-XXXXXXXXXX"
              className="w-full bg-bone border border-hairline rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-ink transition font-mono"
            />
            <p className="text-[10px] text-silver-400 mt-1">Use se preferir GA4 direto sem o GTM. No formato G-XXXXXXXXXX.</p>
          </div>
        </div>

        <div className="mt-4 bg-amber-50 border border-amber-100 rounded-xl p-3 flex gap-2.5">
          <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-700 leading-relaxed">
            <strong>Eventos enviados:</strong> page_view (automático), generate_lead (formulário de consulta enviado).
          </div>
        </div>
      </div>

      <div className="pt-2">
        <p className="text-xs text-silver-500 bg-bone border border-hairline rounded-lg px-4 py-3">
          Os scripts são injetados automaticamente após salvar. Nenhuma alteração no código é necessária.
        </p>
      </div>
    </div>
  );
}

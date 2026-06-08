import { SiteContent } from '../../hooks/useSiteContent';

interface Props {
  content: SiteContent;
  onChange: (key: string, value: string) => void;
}

export default function EditorFooter({ content, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium tracking-tight text-ink mb-1">Footer</h2>
        <p className="text-sm text-silver-500">Rodapé da página.</p>
      </div>

      <Field label="Nome da Marca" value={content.footer_brand || ''} onChange={(v) => onChange('footer_brand', v)} />
      <Field label="Sufixo" value={content.footer_suffix || ''} onChange={(v) => onChange('footer_suffix', v)} />
      <Field label="Copyright" value={content.footer_copyright || ''} onChange={(v) => onChange('footer_copyright', v)} />
      <Field label="Localização" value={content.footer_location || ''} onChange={(v) => onChange('footer_location', v)} />

      <div className="pt-4 border-t border-hairline">
        <h3 className="text-sm font-medium text-ink mb-4">Redes Sociais</h3>
        <div className="space-y-4">
          <Field label="Instagram (URL)" value={content.footer_instagram || ''} onChange={(v) => onChange('footer_instagram', v)} placeholder="https://instagram.com/seu_perfil" />
          <Field label="WhatsApp (Número com DDI)" value={content.footer_whatsapp || ''} onChange={(v) => onChange('footer_whatsapp', v)} placeholder="5511999999999" />
          <Field label="LinkedIn (URL)" value={content.footer_linkedin || ''} onChange={(v) => onChange('footer_linkedin', v)} placeholder="https://linkedin.com/in/seu_perfil" />
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="label-mono mb-2 block">{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-bone border border-hairline rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-ink transition placeholder:text-silver-400" />
    </div>
  );
}

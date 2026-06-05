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
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="label-mono mb-2 block">{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-bone border border-hairline rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-ink transition" />
    </div>
  );
}

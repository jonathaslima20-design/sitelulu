import { SiteContent } from '../../hooks/useSiteContent';

interface Props {
  content: SiteContent;
  onChange: (key: string, value: string) => void;
}

export default function EditorCTA({ content, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium tracking-tight text-ink mb-1">CTA Final</h2>
        <p className="text-sm text-silver-500">Seção de call-to-action no final da página.</p>
      </div>

      <Field label="Label" value={content.cta_label || ''} onChange={(v) => onChange('cta_label', v)} />
      <Field label="Título" value={content.cta_title || ''} onChange={(v) => onChange('cta_title', v)} />
      <Field label="Parágrafo" value={content.cta_paragraph || ''} onChange={(v) => onChange('cta_paragraph', v)} multiline />
      <Field label="Texto do Botão" value={content.cta_button || ''} onChange={(v) => onChange('cta_button', v)} />
      <Field label="Email de Contato" value={content.cta_email || ''} onChange={(v) => onChange('cta_email', v)} />
    </div>
  );
}

function Field({ label, value, onChange, multiline }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  return (
    <div>
      <label className="label-mono mb-2 block">{label}</label>
      {multiline ? (
        <textarea rows={4} value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-bone border border-hairline rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-ink transition resize-none" />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-bone border border-hairline rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-ink transition" />
      )}
    </div>
  );
}

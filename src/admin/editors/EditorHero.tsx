import { SiteContent } from '../../hooks/useSiteContent';

interface Props {
  content: SiteContent;
  onChange: (key: string, value: string) => void;
}

export default function EditorHero({ content, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium tracking-tight text-ink mb-1">Hero</h2>
        <p className="text-sm text-silver-500">Seção principal da landing page.</p>
      </div>

      <Field label="Badge" value={content.hero_badge || ''} onChange={(v) => onChange('hero_badge', v)} />
      <Field label="Título - Linha 1" value={content.hero_title_1 || ''} onChange={(v) => onChange('hero_title_1', v)} />
      <Field label="Título - Linha 2 (chrome)" value={content.hero_title_2 || ''} onChange={(v) => onChange('hero_title_2', v)} />
      <Field label="Título - Linha 3 (italic)" value={content.hero_title_3 || ''} onChange={(v) => onChange('hero_title_3', v)} />
      <Field label="Parágrafo" value={content.hero_paragraph || ''} onChange={(v) => onChange('hero_paragraph', v)} multiline />
      <Field label="CTA Principal" value={content.hero_cta_primary || ''} onChange={(v) => onChange('hero_cta_primary', v)} />
      <Field label="Link Secundário" value={content.hero_cta_secondary || ''} onChange={(v) => onChange('hero_cta_secondary', v)} />

      <div className="border-t border-hairline pt-6">
        <h3 className="text-sm font-medium text-ink mb-4">Social Proof</h3>
        <Field label="Nota" value={content.hero_social_rating || ''} onChange={(v) => onChange('hero_social_rating', v)} />
        <div className="mt-4">
          <Field label="Texto" value={content.hero_social_text || ''} onChange={(v) => onChange('hero_social_text', v)} />
        </div>
      </div>

      <div className="border-t border-hairline pt-6">
        <h3 className="text-sm font-medium text-ink mb-4">Badge Fundadora</h3>
        <Field label="Nome" value={content.hero_founder_name || ''} onChange={(v) => onChange('hero_founder_name', v)} />
        <div className="mt-4">
          <Field label="Cargo" value={content.hero_founder_role || ''} onChange={(v) => onChange('hero_founder_role', v)} />
        </div>
      </div>

      <div className="border-t border-hairline pt-6">
        <h3 className="text-sm font-medium text-ink mb-4">Header</h3>
        <Field label="Nome da Marca" value={content.header_brand_name || ''} onChange={(v) => onChange('header_brand_name', v)} />
        <div className="mt-4">
          <Field label="Sufixo" value={content.header_brand_suffix || ''} onChange={(v) => onChange('header_brand_suffix', v)} />
        </div>
        <div className="mt-4">
          <Field label="CTA Header" value={content.header_cta || ''} onChange={(v) => onChange('header_cta', v)} />
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, multiline }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  return (
    <div>
      <label className="label-mono mb-2 block">{label}</label>
      {multiline ? (
        <textarea
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-bone border border-hairline rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-ink transition resize-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-bone border border-hairline rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-ink transition"
        />
      )}
    </div>
  );
}

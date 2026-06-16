import { useState } from 'react';
import { SiteContent } from '../../hooks/useSiteContent';
import { Pencil } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import IconPicker from '../IconPicker';

interface Props {
  content: SiteContent;
  onChange: (key: string, value: string) => void;
}

function LogoIconPreview({ name }: { name: string }) {
  const Icon = (LucideIcons as Record<string, unknown>)[name] as React.ComponentType<{ className?: string }>;
  if (!Icon) return null;
  return <Icon className="w-4 h-4 text-white" />;
}

export default function EditorFooter({ content, onChange }: Props) {
  const [iconPickerOpen, setIconPickerOpen] = useState(false);
  const logoIcon = content.footer_logo_icon || 'TrendingUp';

  return (
    <div className="space-y-6">
      {iconPickerOpen && (
        <IconPicker
          value={logoIcon}
          onChange={icon => onChange('footer_logo_icon', icon)}
          onClose={() => setIconPickerOpen(false)}
        />
      )}

      <div>
        <h2 className="text-lg font-medium tracking-tight text-ink mb-1">Footer</h2>
        <p className="text-sm text-silver-500">Rodapé da página.</p>
      </div>

      <div className="border-b border-hairline pb-6">
        <h3 className="text-sm font-medium text-ink mb-4">Ícone da Logo</h3>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-ink flex items-center justify-center shrink-0">
            <LogoIconPreview name={logoIcon} />
          </div>
          <button
            onClick={() => setIconPickerOpen(true)}
            className="flex items-center gap-2 text-sm text-ink border border-hairline rounded-lg px-4 py-2 hover:bg-bone transition"
          >
            <Pencil className="w-3.5 h-3.5" />
            Trocar ícone ({logoIcon})
          </button>
        </div>
        <div className="mt-4 bg-bone rounded-xl border border-hairline px-4 py-3">
          <p className="text-[10px] uppercase tracking-wider text-silver-400 mb-2">Preview</p>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-ink flex items-center justify-center shrink-0">
              <LogoIconPreview name={logoIcon} />
            </div>
            <span className="font-medium tracking-tightest text-ink text-sm">
              {content.footer_brand || 'Marca'}
              <span className="text-silver-400 font-light">.</span> {content.footer_suffix || 'Sufixo'}
            </span>
          </div>
        </div>
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

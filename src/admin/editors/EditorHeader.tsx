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

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="label-mono mb-2 block">{label}</label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-bone border border-hairline rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-ink transition"
      />
    </div>
  );
}

const NAV_LINKS = [
  { key: 'header_nav_methodology', defaultLabel: 'Metodologia', anchor: '#metodologia' },
  { key: 'header_nav_founder', defaultLabel: 'Fundadora', anchor: '#fundadora' },
  { key: 'header_nav_plans', defaultLabel: 'Planos', anchor: '#planos' },
  { key: 'header_nav_contact', defaultLabel: 'Contato', anchor: '#contato' },
];

export default function EditorHeader({ content, onChange }: Props) {
  const [iconPickerOpen, setIconPickerOpen] = useState(false);
  const logoIcon = content.header_logo_icon || 'TrendingUp';

  return (
    <div className="space-y-6">
      {iconPickerOpen && (
        <IconPicker
          value={logoIcon}
          onChange={icon => onChange('header_logo_icon', icon)}
          onClose={() => setIconPickerOpen(false)}
        />
      )}

      <div>
        <h2 className="text-lg font-medium tracking-tight text-ink mb-1">Header</h2>
        <p className="text-sm text-silver-500">Barra de navegação exibida no topo da landing page.</p>
      </div>

      {/* Logo */}
      <div className="border-t border-hairline pt-6">
        <h3 className="text-sm font-medium text-ink mb-4">Logo & Marca</h3>
        <div className="space-y-4">
          <div>
            <label className="label-mono mb-2 block">Ícone da Logo</label>
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
          </div>

          <Field
            label="Nome da Marca"
            value={content.header_brand_name || ''}
            onChange={v => onChange('header_brand_name', v)}
            placeholder="Ex: Luana Azevedo"
          />
          <Field
            label="Sufixo da Marca"
            value={content.header_brand_suffix || ''}
            onChange={v => onChange('header_brand_suffix', v)}
            placeholder="Ex: Marketing"
          />
        </div>

        {/* Live logo preview */}
        <div className="mt-4 bg-bone rounded-xl border border-hairline px-4 py-3">
          <p className="text-[10px] uppercase tracking-wider text-silver-400 mb-2">Preview</p>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-ink flex items-center justify-center shrink-0">
              <LogoIconPreview name={logoIcon} />
            </div>
            <span className="font-medium tracking-tightest text-ink text-sm">
              {content.header_brand_name || 'Nome da Marca'}
              <span className="text-silver-400 font-light">.</span>
              <span className="text-[9px] uppercase tracking-[0.12em] font-semibold text-silver-500 ml-2 align-middle">
                {content.header_brand_suffix || 'Sufixo'}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <div className="border-t border-hairline pt-6">
        <h3 className="text-sm font-medium text-ink mb-1">Links de Navegação</h3>
        <p className="text-xs text-silver-500 mb-4">Texto exibido nos links do menu. Os links só aparecem quando a seção correspondente está visível.</p>
        <div className="space-y-3">
          {NAV_LINKS.map(link => (
            <div key={link.key} className="flex items-center gap-3">
              <div className="text-[10px] font-mono text-silver-400 w-24 shrink-0">{link.anchor}</div>
              <input
                type="text"
                value={content[link.key] || link.defaultLabel}
                onChange={e => onChange(link.key, e.target.value)}
                className="flex-1 bg-bone border border-hairline rounded-lg px-3 py-2 text-ink text-sm focus:outline-none focus:border-ink transition"
              />
            </div>
          ))}
        </div>
      </div>

      {/* CTA button */}
      <div className="border-t border-hairline pt-6">
        <h3 className="text-sm font-medium text-ink mb-4">Botão CTA</h3>
        <Field
          label="Texto do Botão"
          value={content.header_cta || ''}
          onChange={v => onChange('header_cta', v)}
          placeholder="Ex: Agendar Consultoria"
        />
        <div className="mt-4 bg-bone rounded-xl border border-hairline px-4 py-3">
          <p className="text-[10px] uppercase tracking-wider text-silver-400 mb-2">Preview</p>
          <button className="cta-black rounded-full px-5 py-2.5 text-sm font-medium tracking-tight inline-flex items-center gap-2 pointer-events-none">
            {content.header_cta || 'Agendar Consultoria'}
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';

type Props = { defaultPlan?: string; onClose?: () => void };

export default function ConsultationForm({ defaultPlan = 'Individual', onClose }: Props) {
  const [form, setForm] = useState({ name: '', email: '', company: '', plan: defaultPlan, message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');
    const { error } = await supabase.from('consultation_requests').insert({
      name: form.name,
      email: form.email,
      company: form.company,
      plan: form.plan,
      message: form.message,
    });
    if (error) {
      setStatus('error');
      setError('Não foi possível enviar. Tente novamente.');
      return;
    }
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div className="text-center py-10">
        <div className="mx-auto w-12 h-12 rounded-full bg-ink text-white flex items-center justify-center mb-5">
          <Check className="w-5 h-5" strokeWidth={2.5} />
        </div>
        <h3 className="text-2xl tracking-tightest text-ink">Solicitação recebida</h3>
        <p className="text-silver-600 mt-2 leading-relaxed">
          Nossa equipe estratégica entrará em contato em até 24 horas úteis.
        </p>
        {onClose && (
          <button onClick={onClose} className="mt-6 label-mono hover:text-ink transition">
            Fechar
          </button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Nome" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
        <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Empresa" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
        <div>
          <label className="label-mono mb-2 block">Plano de Interesse</label>
          <select
            value={form.plan}
            onChange={(e) => setForm({ ...form, plan: e.target.value })}
            className="w-full bg-white border border-hairline rounded-lg px-4 py-3 text-ink focus:outline-none focus:border-ink transition"
          >
            <option>Individual</option>
            <option>Grupo</option>
            <option>Corporate</option>
          </select>
        </div>
      </div>
      <div>
        <label className="label-mono mb-2 block">Sobre seu projeto</label>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full bg-white border border-hairline rounded-lg px-4 py-3 text-ink focus:outline-none focus:border-ink transition resize-none"
          placeholder="Conte-nos sobre o estágio atual da sua marca..."
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="cta-black w-full rounded-full py-4 font-medium tracking-tight inline-flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {status === 'loading' ? 'Enviando...' : 'Solicitar Consultoria'}
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="label-mono mb-2 block">{label}{required && ' *'}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white border border-hairline rounded-lg px-4 py-3 text-ink focus:outline-none focus:border-ink transition"
      />
    </div>
  );
}

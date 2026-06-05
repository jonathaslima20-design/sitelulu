import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { TrendingUp, ArrowRight, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setError('Serviço indisponível.');
      return;
    }
    setLoading(true);
    setError('');

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      if (signInError.message.includes('Invalid login')) {
        setError('Email ou senha incorretos.');
      } else {
        setError('Erro ao fazer login. Tente novamente.');
      }
      setLoading(false);
      return;
    }

    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 rounded-xl bg-ink flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <span className="font-medium tracking-tightest text-ink text-lg">
            Luana Azevedo<span className="text-silver-400 font-light">.</span>
          </span>
          <span className="label-mono mt-1">Marketing</span>
        </div>

        <div className="glass-light rounded-2xl p-8">
          <h1 className="text-xl font-medium tracking-tightest text-ink text-center">
            Painel Administrativo
          </h1>
          <p className="text-sm text-silver-500 text-center mt-2 mb-6">
            Acesse para gerenciar o conteúdo do site.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label-mono mb-2 block">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-hairline rounded-lg px-4 py-3 text-ink focus:outline-none focus:border-ink transition"
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <label className="label-mono mb-2 block">Senha</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-hairline rounded-lg px-4 py-3 text-ink focus:outline-none focus:border-ink transition"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="cta-black w-full rounded-full py-3.5 font-medium tracking-tight inline-flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
            >
              {loading ? 'Entrando...' : 'Entrar'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-silver-400 mt-6">
          Acesso restrito a administradores.
        </p>
      </div>
    </div>
  );
}

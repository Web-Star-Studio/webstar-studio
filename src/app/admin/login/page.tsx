import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function LoginPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (data?.user) {
    redirect('/admin/dashboard');
  }

  return (
    <div className="flex w-full items-center justify-center min-h-[80vh] relative">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-neon-lime/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-md p-10 bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <h1 className="relative z-10 text-2xl font-display mb-2 uppercase text-white">WSS <span className="text-neon-lime">Admin</span></h1>
        <p className="text-sm text-white/40 mb-8">Faça login para acessar o painel de controle e IA.</p>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-xs uppercase tracking-widest text-white/60">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="seu@email.com"
              className="bg-black/50 border border-white/10 p-3 rounded-lg text-white text-sm focus:outline-none focus:border-neon-lime/50 transition-colors backdrop-blur-sm"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-xs uppercase tracking-widest text-white/60">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="bg-black/50 border border-white/10 p-3 rounded-lg text-white text-sm focus:outline-none focus:border-neon-lime/50 transition-colors backdrop-blur-sm"
            />
          </div>

          <button
            formAction={async (formData) => {
              'use server';
              const email = formData.get('email') as string;
              const password = formData.get('password') as string;
              const supabase = await createClient();

              const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
              });

              if (error) {
                return redirect('/admin/login?message=Não foi possível autenticar');
              }
              return redirect('/admin/dashboard');
            }}
            className="mt-4 bg-neon-lime text-black font-bold uppercase tracking-widest text-xs py-4 rounded hover:bg-white transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

import Image from 'next/image';
import { createClient } from '@/utils/supabase/server';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen bg-[#030305] text-white antialiased relative overflow-hidden font-[family-name:var(--font-inter)]" style={{ WebkitFontSmoothing: 'antialiased', textRendering: 'optimizeLegibility' }}>

      {/* ═══ Ambient light — gives glass depth to refract ═══ */}
      <div className="fixed pointer-events-none z-0" style={{ top: '0%', right: '-5%', width: '1000px', height: '800px', background: 'radial-gradient(ellipse at 60% 40%, rgba(255,255,255,0.06) 0%, rgba(200,210,230,0.025) 35%, transparent 65%)', filter: 'blur(40px)' }} />
      <div className="fixed pointer-events-none z-0" style={{ bottom: '-10%', left: '-10%', width: '900px', height: '700px', background: 'radial-gradient(ellipse at 40% 60%, rgba(255,255,255,0.045) 0%, rgba(180,190,210,0.02) 35%, transparent 65%)', filter: 'blur(50px)' }} />
      <div className="fixed pointer-events-none z-0" style={{ top: '35%', left: '30%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(255,255,255,0.035) 0%, transparent 55%)', filter: 'blur(40px)' }} />

      {/* Subtle grid texture — adds perceived resolution */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.012]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      {/* Radial vignette */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, transparent 30%, rgba(3,3,5,0.5) 100%)' }} />

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 px-4 py-3.5 flex items-center justify-between" style={{ background: 'rgba(16,16,20,0.6)', backdropFilter: 'blur(60px) saturate(200%)', WebkitBackdropFilter: 'blur(60px) saturate(200%)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <Image src="/webstar-logo.svg" alt="Webstar" width={500} height={500} unoptimized className="w-[160px] h-[40px] brightness-0 invert opacity-90" style={{ objectFit: 'cover', objectPosition: 'center 46%' }} />
        <a href="/admin/dashboard" className="text-[11px] text-white/35 border border-white/[0.08] px-3 py-1.5 rounded-lg tracking-wide font-mono uppercase">Menu</a>
      </div>

      {/* Sidebar — same glass treatment */}
      <aside className="relative z-10 w-[220px] shrink-0 hidden md:flex flex-col overflow-hidden" style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 30%), rgba(16,16,20,0.55)',
        backdropFilter: 'blur(60px) saturate(200%) brightness(1.05)',
        WebkitBackdropFilter: 'blur(60px) saturate(200%) brightness(1.05)',
        borderRight: '1px solid rgba(255,255,255,0.08)',
      }}>
        {/* Top edge specular */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent z-20" />

        <div className="relative z-10 p-5 pb-4">
          <Image src="/webstar-logo.svg" alt="Webstar" width={500} height={500} unoptimized className="w-[185px] h-[44px] brightness-0 invert opacity-90" style={{ objectFit: 'cover', objectPosition: 'center 46%' }} />
          <p className="text-[9px] font-mono text-white/20 mt-1.5 tracking-[0.2em] uppercase">Admin Console</p>
        </div>
        <div className="relative z-10 mx-4 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <nav className="relative z-10 flex-1 px-2.5 py-3 flex flex-col gap-0.5">
          <NavLink href="/admin/dashboard" label="DASHBOARD" />
          <NavLink href="/admin/projects" label="PROJETOS" />
          <NavLink href="/admin/ai-scanner" label="AI SCANNER" badge="β" />
          <NavLink href="/admin/blog" label="BLOG" />
          <NavLink href="/admin/messages" label="LEADS" dot />
          <div className="my-3 mx-2 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
          <NavLink href="/admin/settings" label="CONFIGURAÇÕES" muted />
        </nav>
        <div className="relative z-10 mx-4 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="relative z-10 p-4 flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-[10px] text-white/60 font-mono">
            {user?.email?.charAt(0).toUpperCase() || 'A'}
          </div>
          <form action="/auth/signout" method="post">
            <button type="submit" className="text-[9px] text-white/20 hover:text-white/50 transition-colors font-mono uppercase tracking-[0.1em]">Sair</button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <main className="relative z-10 flex-1 flex flex-col p-4 pt-16 md:p-7 lg:p-9 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

function NavLink({ href, label, badge, dot, muted }: { href: string; label: string; badge?: string; dot?: boolean; muted?: boolean }) {
  return (
    <a
      href={href}
      className={`px-3 py-2 rounded-lg text-[10px] font-mono tracking-[0.08em] flex items-center justify-between transition-all ${
        muted ? 'text-white/15 hover:text-white/40 hover:bg-white/[0.03]' : 'text-white/35 hover:text-white/80 hover:bg-white/[0.05]'
      }`}
    >
      {label}
      {badge && <span className="text-[8px] text-white/25 bg-white/[0.04] border border-white/[0.06] px-1.5 py-0.5 rounded font-mono tracking-wider">{badge}</span>}
      {dot && <span className="w-[5px] h-[5px] rounded-full bg-white/40" />}
    </a>
  );
}

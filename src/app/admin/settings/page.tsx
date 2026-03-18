'use client';

import { useState } from 'react';
import { Blocks, Sliders, KeySquare, Shield, Eye, EyeOff, Save } from 'lucide-react';

const TABS = [
  { id: 'general', label: 'Studio', icon: Blocks },
  { id: 'ai', label: 'IA', icon: Sliders },
  { id: 'api', label: 'APIs', icon: KeySquare },
  { id: 'access', label: 'Acessos', icon: Shield },
];

export default function AdminSettingsPage() {
  const [tab, setTab] = useState('general');
  const [showKey, setShowKey] = useState(false);
  const [chatbot, setChatbot] = useState(true);
  const [autoPublish, setAutoPublish] = useState(false);

  return (
    <div className="w-full w-full flex flex-col gap-4">
      <div>
        <h1 className="text-[26px] font-semibold chrome-text tracking-tight">Configurações</h1>
        <p className="text-[13px] text-white/40 mt-1">Parâmetros operacionais e integrações.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        
        {/* Tabs */}
        <div className="lg:col-span-1 flex flex-col gap-1">
          {TABS.map(t => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-[13px] text-left transition-all ${
                  tab === t.id ? 'admin-glass text-white/95' : 'text-white/40 hover:text-white/50 hover:bg-white/[0.03]'
                }`}
              >
                <Icon size={14} /> {t.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="lg:col-span-4 flex flex-col gap-4">

          {tab === 'general' && (
            <>
              <Card title="Identidade corporativa">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Nome operacional" value="Web Star Studio" />
                  <Field label="Email padrão" value="hello@webstar.studio" />
                </div>
                <div className="mt-4">
                  <FieldArea label="Meta description (SEO)" value="Studio Internacional de Design e Desenvolvimento focado em projetos complexos Web, Ecossistemas SaaS, Interfaces Inovadoras e Automações baseadas em IA para clientes globais." />
                </div>
              </Card>
              <Card title="Escritórios">
                <Office flag="🇧🇷" city="São Paulo" tz="BRT (UTC-3)" badge="Sede" />
                <Office flag="🇮🇪" city="Dublin" tz="GMT (UTC+0)" badge="Filial" />
              </Card>
            </>
          )}

          {tab === 'ai' && (
            <Card title="Comportamento da IA">
              <Toggle label="Chatbot público ativo" desc="Permite respostas automáticas no site." on={chatbot} onChange={() => setChatbot(!chatbot)} />
              <Toggle label="Auto-publicar artigos IA" desc="Publica automaticamente sem revisão." on={autoPublish} onChange={() => setAutoPublish(!autoPublish)} />
              <FieldArea label="System prompt" value="Você é o assistente da Web Star Studio. Nossos pilares são: Estratégia Orientada por Dados, Automação com IA, e Design com Propósito. NÃO somos uma agência de marketing." mono />
              <div className="mt-2">
                <label className="text-[12px] text-white/45 mb-1.5 block">Modelo LLM</label>
                <select className="w-full bg-white/[0.04] border border-white/[0.08] p-3 rounded-xl text-[13px] text-white/70 focus:outline-none appearance-none">
                  <option className="bg-[#0a0a0a]">Claude 3.5 Sonnet</option>
                  <option className="bg-[#0a0a0a]">Claude 3 Opus</option>
                  <option className="bg-[#0a0a0a]">GPT-4o</option>
                </select>
              </div>
            </Card>
          )}

          {tab === 'api' && (
            <Card title="API Keys & Integrações">
              <Field label="Supabase URL" value="https://xxxxxxx.supabase.co" mono />
              <div className="mt-4 flex flex-col gap-1.5">
                <label className="text-[12px] text-white/45">Supabase Anon Key</label>
                <div className="relative">
                  <input type={showKey ? 'text' : 'password'} defaultValue="eyJhbGciOiJIUzI1NiJ9.placeholder" className="w-full bg-white/[0.04] border border-white/[0.08] p-3 pr-10 rounded-xl text-[13px] text-white/70 font-mono focus:outline-none focus:border-white/[0.2]" />
                  <button onClick={() => setShowKey(!showKey)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/50 transition-colors">
                    {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <Field label="Claude API Key" value="sk-ant-api03-placeholder" type="password" mono />
              </div>
            </Card>
          )}

          {tab === 'access' && (
            <Card title="Administradores">
              <AdminRow initials="FA" name="Felipe Antunes" email="felipe@webstar.studio" role="Founder" accent />
              <AdminRow initials="DG" name="David Gomes" email="david@webstar.studio" role="Developer" />
            </Card>
          )}

          <div className="flex justify-end">
            <button className="chrome-surface text-white/95 px-5 py-2.5 rounded-full text-[13px] font-medium hover:brightness-125 transition-all border border-white/[0.12] flex items-center gap-1.5">
              <Save size={14} /> Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="admin-glass p-6">
      <p className="text-[14px] text-white/95 font-medium mb-5">{title}</p>
      {children}
    </div>
  );
}

function Field({ label, value, type = 'text', mono }: { label: string; value: string; type?: string; mono?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12px] text-white/45">{label}</label>
      <input type={type} defaultValue={value} className={`bg-white/[0.04] border border-white/[0.08] p-3 rounded-xl text-[13px] text-white/70 focus:outline-none focus:border-white/[0.2] ${mono ? 'font-mono' : ''}`} />
    </div>
  );
}

function FieldArea({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12px] text-white/45">{label}</label>
      <textarea rows={3} defaultValue={value} className={`bg-white/[0.04] border border-white/[0.08] p-3 rounded-xl text-[13px] text-white/70 focus:outline-none focus:border-white/[0.2] resize-none leading-relaxed ${mono ? 'font-mono text-[12px]' : ''}`} />
    </div>
  );
}

function Toggle({ label, desc, on, onChange }: { label: string; desc: string; on: boolean; onChange: () => void }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/[0.05] last:border-0">
      <div>
        <p className="text-[13px] text-white/70">{label}</p>
        <p className="text-[11px] text-white/30 mt-0.5">{desc}</p>
      </div>
      <button
        onClick={onChange}
        className={`w-[44px] h-[24px] rounded-full transition-colors relative ${on ? 'bg-white/30' : 'bg-white/10'}`}
      >
        <span className={`absolute top-[2px] w-[20px] h-[20px] rounded-full bg-white transition-all ${on ? 'left-[22px]' : 'left-[2px]'}`} />
      </button>
    </div>
  );
}

function Office({ flag, city, tz, badge }: { flag: string; city: string; tz: string; badge: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/[0.05] last:border-0">
      <div className="flex items-center gap-3">
        <span className="text-lg">{flag}</span>
        <div>
          <p className="text-[13px] text-white/70">{city}</p>
          <p className="text-[11px] text-white/30">{tz}</p>
        </div>
      </div>
      <span className="text-[11px] text-white/45 bg-white/[0.05] border border-white/[0.06] px-2.5 py-0.5 rounded-full">{badge}</span>
    </div>
  );
}

function AdminRow({ initials, name, email, role, accent }: { initials: string; name: string; email: string; role: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/[0.05] last:border-0">
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-medium border ${accent ? 'chrome-surface text-white/80 border-white/[0.1]' : 'bg-white/[0.04] text-white/40 border-white/[0.06]'}`}>
          {initials}
        </div>
        <div>
          <p className="text-[13px] text-white/70">{name}</p>
          <p className="text-[11px] text-white/30">{email}</p>
        </div>
      </div>
      <span className="text-[11px] text-white/45 bg-white/[0.05] border border-white/[0.06] px-2.5 py-0.5 rounded-full">{role}</span>
    </div>
  );
}

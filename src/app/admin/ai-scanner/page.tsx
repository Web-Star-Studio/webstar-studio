'use client';

import { useState } from 'react';
import { ArrowRight, Globe, Loader2, Sparkles, Database, Server, RefreshCw } from 'lucide-react';

const LOADING_STEPS = [
  'Acessando o site...',
  'Capturando screenshots...',
  'Extraindo metadados...',
  'IA analisando conteúdo...',
  'Gerando projeto no portfólio...',
];

export default function AIScannerPage() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  const [currentStep, setCurrentStep] = useState(0);

  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    challenge: '',
    solution: '',
    segment: '',
    technologies: '',
  });

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setStatus('scanning');
    setCurrentStep(0);

    for (let i = 0; i < LOADING_STEPS.length; i++) {
      setCurrentStep(i);
      await new Promise((r) => setTimeout(r, 1200));
    }

    setProjectData({
      title: 'Transgabardo Logistics Platform',
      description: 'Uma plataforma escalável para gestão de frota e rastreamento em tempo real.',
      challenge: 'O cliente sofria com planilhas manuais e gargalos operacionais na gestão de motoristas, resultando em latência e perda de dados nas entregas.',
      solution: 'Criamos um ecossistema digital com painéis gerenciais e automações webhook, reduzindo o tempo de fechamento de frota em 80%.',
      segment: 'Logística',
      technologies: 'Next.js, Supabase, Tailwind, PostGIS',
    });

    setStatus('success');
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div>
        <h1 className="text-[26px] font-semibold chrome-text tracking-tight flex items-center gap-3">
          AI Scanner <Sparkles size={20} className="text-white/40" />
        </h1>
        <p className="text-[13px] text-white/40 mt-1">Analise uma URL para auto-gerar um case de estudo no portfólio usando Claude API.</p>
      </div>

      {/* Idle — URL Input */}
      {status === 'idle' && (
        <form onSubmit={handleScan} className="admin-glass p-6 md:p-8 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="url" className="text-[11px] text-white/30 uppercase tracking-wider">URL do Projeto</label>
            <div className="flex bg-white/[0.04] border border-white/[0.08] rounded-xl focus-within:border-white/[0.2] transition-colors overflow-hidden">
              <div className="flex items-center justify-center pl-4 pr-2 text-white/25">
                <Globe size={16} />
              </div>
              <input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://exemplo.com.br"
                required
                className="w-full bg-transparent p-3.5 text-[13px] text-white/80 focus:outline-none placeholder:text-white/20"
              />
              <button
                type="submit"
                className="chrome-surface text-white/90 font-medium text-[12px] px-6 hover:brightness-125 transition-all flex items-center gap-2 shrink-0 border-l border-white/[0.08]"
              >
                Analisar <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Feature hints */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {[
              { icon: Globe, label: 'Crawling', desc: 'Extrai conteúdo, imagens e meta' },
              { icon: Sparkles, label: 'Análise IA', desc: 'Claude gera copy profissional' },
              { icon: Database, label: 'Portfolio', desc: 'Salva como case pronto' },
            ].map(f => {
              const Icon = f.icon;
              return (
                <div key={f.label} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <Icon size={14} className="text-white/25 mt-0.5" />
                  <div>
                    <p className="text-[12px] text-white/60 font-medium">{f.label}</p>
                    <p className="text-[11px] text-white/25">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </form>
      )}

      {/* Scanning — Loading Steps */}
      {status === 'scanning' && (
        <div className="admin-glass p-8 md:p-12 flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-14 h-14 rounded-full border-2 border-white/10 border-t-white/70 animate-spin mb-8" />
          <h2 className="text-[16px] font-medium text-white/90 mb-8 tracking-wide">Processando Entidade</h2>

          <div className="flex flex-col gap-4 w-full max-w-sm">
            {LOADING_STEPS.map((step, index) => {
              const isActive = index === currentStep;
              const isDone = index < currentStep;

              return (
                <div key={step} className={`flex items-center gap-3 transition-opacity duration-300 ${isActive || isDone ? 'opacity-100' : 'opacity-30'}`}>
                  {isDone ? (
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  ) : isActive ? (
                    <Loader2 size={20} className="text-white/70 animate-spin shrink-0" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-white/15 shrink-0" />
                  )}
                  <span className={`text-[13px] ${isActive ? 'text-white/80' : isDone ? 'text-white/50' : 'text-white/30'}`}>{step}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Success — Edit + Preview */}
      {status === 'success' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">

          {/* Edit Form */}
          <div className="admin-glass p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
              <h3 className="text-[13px] text-white/50 uppercase tracking-wider">Editar Dados</h3>
              <button onClick={() => setStatus('idle')} className="text-[12px] text-white/30 hover:text-white/60 flex items-center gap-1 transition-colors">
                <RefreshCw size={12} /> Refazer
              </button>
            </div>

            <ScanField label="Título" value={projectData.title} onChange={(v) => setProjectData({ ...projectData, title: v })} />
            <div className="grid grid-cols-2 gap-3">
              <ScanField label="Segmento" value={projectData.segment} onChange={(v) => setProjectData({ ...projectData, segment: v })} />
              <ScanField label="Stack" value={projectData.technologies} onChange={(v) => setProjectData({ ...projectData, technologies: v })} />
            </div>
            <ScanArea label="Descrição" value={projectData.description} onChange={(v) => setProjectData({ ...projectData, description: v })} rows={2} />
            <ScanArea label="O Desafio" value={projectData.challenge} onChange={(v) => setProjectData({ ...projectData, challenge: v })} rows={3} />
            <ScanArea label="A Solução" value={projectData.solution} onChange={(v) => setProjectData({ ...projectData, solution: v })} rows={3} />

            <div className="flex gap-3 mt-2">
              <button className="flex-1 bg-white/[0.04] hover:bg-white/[0.07] text-white/60 text-[12px] py-3 rounded-full transition-colors border border-white/[0.06]">
                Salvar Rascunho
              </button>
              <button className="flex-1 chrome-surface text-white/90 font-medium text-[12px] py-3 rounded-full hover:brightness-125 transition-all border border-white/[0.12]">
                Publicar Agora
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="admin-glass p-6 flex flex-col gap-5">
            <h3 className="text-[13px] text-white/50 uppercase tracking-wider flex items-center gap-2 border-b border-white/[0.06] pb-4">
              <Sparkles size={12} className="text-white/30" /> Preview Dinâmico
            </h3>

            <div>
              <p className="text-[10px] text-white/25 uppercase tracking-wider mb-1">{projectData.segment}</p>
              <h4 className="text-[20px] font-semibold chrome-text mb-3">{projectData.title}</h4>
              <p className="text-[13px] text-white/50 leading-relaxed">{projectData.description}</p>
            </div>

            <div className="admin-glass-subtle p-4">
              <h5 className="text-[10px] text-white/30 uppercase tracking-wider mb-2 flex items-center gap-2"><Database size={12} /> O Desafio</h5>
              <p className="text-[12px] text-white/60 leading-relaxed">{projectData.challenge}</p>
            </div>

            <div className="admin-glass-subtle p-4">
              <h5 className="text-[10px] text-white/30 uppercase tracking-wider mb-2 flex items-center gap-2"><Server size={12} /> A Solução</h5>
              <p className="text-[12px] text-white/60 leading-relaxed">{projectData.solution}</p>
            </div>

            <div className="pt-3 border-t border-white/[0.05]">
              <h5 className="text-[10px] text-white/25 uppercase tracking-wider mb-2">Tech Stack Detectada</h5>
              <div className="flex gap-2 flex-wrap">
                {projectData.technologies.split(',').map(t => (
                  <span key={t} className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.08] rounded-full text-[10px] text-white/50 tracking-wider">{t.trim()}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ScanField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] text-white/30 uppercase tracking-wider">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white/[0.04] border border-white/[0.08] p-3 rounded-xl text-[13px] text-white/70 focus:outline-none focus:border-white/[0.2] transition-colors"
      />
    </div>
  );
}

function ScanArea({ label, value, onChange, rows }: { label: string; value: string; onChange: (v: string) => void; rows: number }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] text-white/30 uppercase tracking-wider">{label}</label>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white/[0.04] border border-white/[0.08] p-3 rounded-xl text-[13px] text-white/70 focus:outline-none focus:border-white/[0.2] resize-none leading-relaxed transition-colors"
      />
    </div>
  );
}

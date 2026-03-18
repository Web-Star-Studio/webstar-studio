'use client';

import { useState } from 'react';
import { Sparkles, PenTool, LayoutTemplate, Eye, Edit2, Trash2 } from 'lucide-react';

const ARTICLES = [
  { id: 1, title: 'O Futuro das Aplicações Web em Plataformas B2B de Logística', source: 'ia', status: 'draft', category: 'Automação', read: '8 min', views: 342, date: 'Hoje' },
  { id: 2, title: 'Design com Propósito: O que aprendemos em 2025', source: 'manual', status: 'published', category: 'Design', read: '5 min', views: 1280, date: '3d' },
  { id: 3, title: 'Escalando Infraestrutura SaaS com Edge Functions', source: 'ia', status: 'published', category: 'Engenharia', read: '12 min', views: 890, date: '1 sem' },
  { id: 4, title: 'ESG Digital: Tecnologia e Sustentabilidade', source: 'ia', status: 'draft', category: 'ESG', read: '6 min', views: 0, date: '2 sem' },
];

export default function AdminBlogPage() {
  const [tab, setTab] = useState<'all' | 'published' | 'draft'>('all');
  const filtered = ARTICLES.filter(a => tab === 'all' || a.status === tab);

  return (
    <div className="w-full w-full flex flex-col gap-4">
      <div>
        <h1 className="text-[26px] font-semibold chrome-text tracking-tight">Blog</h1>
        <p className="text-[13px] text-white/40 mt-1">Crie e gerencie artigos com assistência de IA.</p>
      </div>

      {/* Create */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { icon: Sparkles, title: 'Artigo via IA', desc: 'Claude gera outline completo, corpo e SEO.', accent: true },
          { icon: LayoutTemplate, title: 'Template de Case', desc: 'Artigo baseado em um projeto do portfólio.' },
          { icon: PenTool, title: 'Escrita manual', desc: 'Editor em branco, sem assistência.' },
        ].map(opt => {
          const Icon = opt.icon;
          return (
            <button key={opt.title} className="admin-glass p-5 text-left group hover:scale-[1.01] transition-transform">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${opt.accent ? 'chrome-surface text-white/80 border border-white/[0.1]' : 'bg-white/[0.04] text-white/40 border border-white/[0.06]'}`}>
                <Icon size={18} />
              </div>
              <p className="text-[14px] text-white/95 font-medium mb-1">{opt.title}</p>
              <p className="text-[12px] text-white/45 leading-relaxed">{opt.desc}</p>
            </button>
          );
        })}
      </div>

      {/* List */}
      <div className="admin-glass overflow-hidden">
        <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex bg-white/[0.04] rounded-full p-0.5 border border-white/[0.06]">
            {(['all', 'published', 'draft'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3.5 py-1.5 rounded-full text-[12px] transition-all ${
                  tab === t ? 'bg-white/[0.1] text-white/95' : 'text-white/40 hover:text-white/50'
                }`}
              >
                {t === 'all' ? `Todos (${ARTICLES.length})` : t === 'published' ? 'Publicados' : 'Rascunhos'}
              </button>
            ))}
          </div>
          <span className="text-[11px] text-white/45">{filtered.length} artigos</span>
        </div>

        {filtered.map(a => (
          <div key={a.id} className="flex items-center px-5 py-3.5 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.03] transition-colors group">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  a.status === 'published' ? 'text-white/70 bg-white/[0.06]' : 'text-white/45 bg-white/[0.04]'
                }`}>
                  {a.status === 'published' ? 'Pub' : 'Draft'}
                </span>
                {a.source === 'ia' && (
                  <span className="text-[10px] text-white/30 flex items-center gap-1"><Sparkles size={9} /> IA</span>
                )}
                <span className="text-[10px] text-white/15">{a.category}</span>
              </div>
              <p className="text-[13px] text-white/70 group-hover:text-white/95 transition-colors truncate">{a.title}</p>
            </div>
            <span className="text-[11px] text-white/45 w-12 text-right">{a.read}</span>
            <span className="text-[11px] text-white/45 w-16 text-right">{a.views.toLocaleString()}</span>
            <span className="text-[11px] text-white/15 w-12 text-right ml-2">{a.date}</span>
            <div className="flex gap-2 ml-4 text-white/15 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="hover:text-white/50 transition-colors"><Eye size={14} /></button>
              <button className="hover:text-white/50 transition-colors"><Edit2 size={14} /></button>
              <button className="hover:text-white/40 transition-colors"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

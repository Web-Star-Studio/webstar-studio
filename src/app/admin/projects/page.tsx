'use client';

import { useState } from 'react';
import { Plus, Search, Eye, Edit2, Trash2, ExternalLink } from 'lucide-react';

const PROJECTS = [
  { id: 1, title: 'Transgabardo Logistics', status: 'published', segment: 'Logística', region: '🇧🇷', stack: 'Next.js · Supabase', views: 1240, date: 'Out 2024' },
  { id: 2, title: 'Worton ESG Platform', status: 'published', segment: 'ESG & Compliance', region: '🇧🇷', stack: 'React · Node.js', views: 890, date: 'Nov 2024' },
  { id: 3, title: 'Rankey.ai', status: 'draft', segment: 'SaaS / IA', region: '🌐', stack: 'Next.js · Claude API', views: 0, date: 'Jan 2025' },
  { id: 4, title: 'Affordable Granite FL', status: 'published', segment: 'Home Services', region: '🇺🇸', stack: 'WordPress · WooCommerce', views: 2100, date: 'Fev 2025' },
  { id: 5, title: 'Lestro Fitness', status: 'archived', segment: 'Fitness & Saúde', region: '🇮🇪', stack: 'Shopify · Liquid', views: 560, date: 'Mar 2025' },
  { id: 6, title: 'NovaTech Dashboard', status: 'draft', segment: 'Enterprise SaaS', region: '🇺🇸', stack: 'React · GraphQL', views: 0, date: 'Mar 2025' },
  { id: 7, title: 'Eco Transforma', status: 'published', segment: 'ESG & Compliance', region: '🇧🇷', stack: 'Next.js · PostgreSQL', views: 340, date: 'Mar 2025' },
];

export default function AdminProjectsPage() {
  const [filter, setFilter] = useState<'all' | 'published' | 'draft' | 'archived'>('all');
  const [search, setSearch] = useState('');

  const filtered = PROJECTS.filter(p => {
    const matchesFilter = filter === 'all' || p.status === filter;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.segment.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const counts = {
    total: PROJECTS.length,
    published: PROJECTS.filter(p => p.status === 'published').length,
    draft: PROJECTS.filter(p => p.status === 'draft').length,
    views: PROJECTS.reduce((a, p) => a + p.views, 0),
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-[26px] font-semibold chrome-text tracking-tight">Projetos</h1>
          <p className="text-[13px] text-white/40 mt-1">Gerencie e edite os cases do portfólio.</p>
        </div>
        <div className="flex items-center gap-2">
          <a href="/admin/ai-scanner" className="text-[13px] text-white/40 px-4 py-2 rounded-full border border-white/[0.08] hover:border-white/[0.15] hover:text-white/70 transition-all">
            Importar via IA
          </a>
          <button className="chrome-surface text-white/95 px-4 py-2 rounded-full text-[13px] font-medium hover:brightness-125 transition-all border border-white/[0.12] flex items-center gap-1.5">
            <Plus size={14} /> Novo
          </button>
        </div>
      </div>

      {/* Counters */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { l: 'Total', v: counts.total },
          { l: 'Publicados', v: counts.published },
          { l: 'Rascunhos', v: counts.draft },
          { l: 'Views totais', v: counts.views.toLocaleString() },
        ].map(c => (
          <div key={c.l} className="admin-glass p-4">
            <p className="text-[10px] text-white/30 mb-2 uppercase tracking-wider">{c.l}</p>
            <p className="text-[22px] font-semibold chrome-text">{c.v}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="admin-glass overflow-hidden">
        <div className="p-4 border-b border-white/[0.06] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 max-w-xs w-full bg-white/[0.04] border border-white/[0.08] rounded-full px-3.5 py-2">
            <Search size={14} className="text-white/30" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar…"
              className="bg-transparent text-[13px] text-white/80 w-full focus:outline-none placeholder:text-white/45"
            />
          </div>
          <div className="flex bg-white/[0.04] rounded-full p-0.5 border border-white/[0.06]">
            {(['all', 'published', 'draft', 'archived'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3.5 py-1.5 rounded-full text-[12px] transition-all ${
                  filter === f ? 'bg-white/[0.1] text-white/95' : 'text-white/40 hover:text-white/50'
                }`}
              >
                {f === 'all' ? 'Todos' : f === 'published' ? 'Pub' : f === 'draft' ? 'Draft' : 'Arq'}
              </button>
            ))}
          </div>
        </div>

        {filtered.map(p => (
          <div key={p.id} className="flex items-center px-5 py-3.5 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.03] transition-colors group">
            <span className="text-sm w-8">{p.region}</span>
            <div className="flex-1 ml-3 min-w-0">
              <p className="text-[13px] text-white/70 group-hover:text-white/95 transition-colors truncate">{p.title}</p>
              <p className="text-[11px] text-white/45 mt-0.5">{p.stack}</p>
            </div>
            <span className={`text-[11px] px-2.5 py-0.5 rounded-full mr-6 ${
              p.status === 'published' ? 'text-white/70 bg-white/[0.06]' :
              p.status === 'draft' ? 'text-white/45 bg-white/[0.04]' :
              'text-white/30 bg-white/[0.03]'
            }`}>
              {p.status === 'published' ? 'Publicado' : p.status === 'draft' ? 'Rascunho' : 'Arquivado'}
            </span>
            <span className="text-[11px] text-white/45 w-20 text-right mr-4">{p.views.toLocaleString()} views</span>
            <span className="text-[11px] text-white/15 w-16 text-right mr-4">{p.date}</span>
            <div className="flex gap-2 text-white/15 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="hover:text-white/50 transition-colors"><Eye size={14} /></button>
              <button className="hover:text-white/50 transition-colors"><Edit2 size={14} /></button>
              <button className="hover:text-white/50 transition-colors"><ExternalLink size={14} /></button>
              <button className="hover:text-white/40 transition-colors"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

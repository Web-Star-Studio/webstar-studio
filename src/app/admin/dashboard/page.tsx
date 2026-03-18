'use client';

import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell
} from 'recharts';
import type { LucideIcon } from 'lucide-react';
import { 
  Bot, MessageSquare, Globe, Eye, FileText, Sparkles, 
  Users, MousePointerClick,
  Zap, BrainCircuit, ScanLine, PenTool, Search
} from 'lucide-react';

/* ═══════════════════════════════════════
   DATA
   ═══════════════════════════════════════ */

const FUNNEL = [
  { stage: 'VISITANTES', value: 12840, pct: 100 },
  { stage: 'ENGAJADOS', value: 3200, pct: 24.9 },
  { stage: 'LEAD', value: 186, pct: 1.45 },
  { stage: 'QUALIFICADO', value: 42, pct: 0.33 },
  { stage: 'PROPOSTA', value: 18, pct: 0.14 },
  { stage: 'FECHADO', value: 7, pct: 0.05 },
];

const TRAFFIC_WEEKLY = [
  { d: 'SEG', visitors: 1420, engaged: 380, leads: 6 },
  { d: 'TER', visitors: 1810, engaged: 490, leads: 9 },
  { d: 'QUA', visitors: 1650, engaged: 420, leads: 7 },
  { d: 'QUI', visitors: 2290, engaged: 610, leads: 12 },
  { d: 'SEX', visitors: 1930, engaged: 520, leads: 8 },
  { d: 'SAB', visitors: 890, engaged: 210, leads: 3 },
  { d: 'DOM', visitors: 850, engaged: 190, leads: 2 },
];

const TOP_PAGES = [
  { page: '/', label: 'HOME', views: 4210, bounce: '32%' },
  { page: '/portfolio', label: 'PORTFÓLIO', views: 2840, bounce: '18%' },
  { page: '/services', label: 'SERVIÇOS', views: 1920, bounce: '25%' },
  { page: '/contact', label: 'CONTATO', views: 1180, bounce: '12%' },
  { page: '/about', label: 'SOBRE', views: 890, bounce: '40%' },
  { page: '/portfolio/transgabardo', label: 'CASE: TRANSGABARDO', views: 620, bounce: '15%' },
];

const GEO = [
  { country: '🇧🇷', name: 'BRASIL', pct: 48, visitors: 6163 },
  { country: '🇺🇸', name: 'ESTADOS UNIDOS', pct: 22, visitors: 2825 },
  { country: '🇮🇪', name: 'IRLANDA', pct: 12, visitors: 1541 },
  { country: '🇵🇹', name: 'PORTUGAL', pct: 8, visitors: 1027 },
  { country: '🌐', name: 'OUTROS', pct: 10, visitors: 1284 },
];

const LEAD_SOURCES = [
  { name: 'ORGÂNICO', value: 42 },
  { name: 'CHATBOT IA', value: 31 },
  { name: 'LINKEDIN', value: 15 },
  { name: 'REFERRAL', value: 12 },
];

const CHATBOT_DAILY = [
  { d: 'SEG', conversations: 14, conversions: 2 },
  { d: 'TER', conversations: 22, conversions: 4 },
  { d: 'QUA', conversations: 18, conversions: 3 },
  { d: 'QUI', conversations: 31, conversions: 6 },
  { d: 'SEX', conversations: 25, conversions: 4 },
  { d: 'SAB', conversations: 8, conversions: 1 },
  { d: 'DOM', conversations: 6, conversions: 0 },
];

const CHATBOT_INTENTS = [
  { intent: 'ORÇAMENTO / PROPOSTA', count: 34, pct: 27 },
  { intent: 'DESENVOLVIMENTO WEB', count: 28, pct: 22 },
  { intent: 'SAAS / PLATAFORMA', count: 22, pct: 18 },
  { intent: 'LOGÍSTICA / TRACKING', count: 18, pct: 14 },
  { intent: 'UI/UX REDESIGN', count: 12, pct: 10 },
  { intent: 'OUTROS', count: 10, pct: 9 },
];

const AI_ACTIVITY = [
  { type: 'chatbot', text: 'LEAD #491 QUALIFICADO COMO B2B LOGISTICS → PROPOSTA ENVIADA', time: '12 MIN', icon: Bot },
  { type: 'scanner', text: 'AI SCANNER PROCESSOU WORTON.COM.BR — CASE GERADO', time: '45 MIN', icon: ScanLine },
  { type: 'content', text: 'ARTIGO "ESCALANDO INFRAESTRUTURA SAAS" GERADO VIA CLAUDE', time: '2H', icon: PenTool },
  { type: 'chatbot', text: 'VISITANTE PERGUNTOU SOBRE INTEGRAÇÃO POSTGIS → CONTEXTO ATIVADO', time: '3H', icon: Bot },
  { type: 'seo', text: 'SEO AUDIT: 3 PÁGINAS OTIMIZADAS, META DESCRIPTIONS ATUALIZADAS', time: '5H', icon: Search },
  { type: 'content', text: 'NEWSLETTER SEMANAL MONTADA COM 2 CASES + 1 ARTIGO IA', time: '1D', icon: FileText },
  { type: 'scanner', text: 'AI SCANNER: LESTRO.IE ANALISADO, STACK SHOPIFY DETECTADA', time: '1D', icon: ScanLine },
];

const VISITOR_ENGAGEMENT = [
  { section: 'HERO / GLOBE', avgTime: '8.2s', interactions: 3420, scroll: '92%' },
  { section: 'SERVICES', avgTime: '12.4s', interactions: 2180, scroll: '78%' },
  { section: 'PORTFOLIO', avgTime: '18.6s', interactions: 2840, scroll: '71%' },
  { section: 'CHATBOT', avgTime: '45.2s', interactions: 890, scroll: '—' },
  { section: 'CONTACT', avgTime: '32.1s', interactions: 420, scroll: '—' },
  { section: 'FOOTER', avgTime: '3.1s', interactions: 640, scroll: '100%' },
];

const SPARK_UP = [{ v: 3 }, { v: 5 }, { v: 4 }, { v: 7 }, { v: 6 }, { v: 8 }, { v: 9 }];
const SPARK_DN = [{ v: 8 }, { v: 6 }, { v: 7 }, { v: 5 }, { v: 4 }, { v: 6 }, { v: 3 }];

/* ═══════════════════════════════════════
   TYPOGRAPHY CLASSES
   t-display  — Oswald, large, uppercase
   t-section  — Small caps label
   t-tag      — Monospace bracketed [01]
   t-mono     — Monospace body
   ═══════════════════════════════════════ */

const tDisplay = "font-display uppercase";
const tSection = "uppercase tracking-[0.25em] text-white/25";
const tTag = "font-mono tabular-nums text-white/20";
const tMono = "font-mono uppercase tracking-[0.08em]";
const tValue = "font-bebas tabular-nums";

/* ═══════════════════════════════════════
   DASHBOARD
   ═══════════════════════════════════════ */

export default function DashboardPage() {
  return (
    <div className="w-full flex flex-col gap-5">

      {/* Header + Inline KPIs */}
      <div className="flex flex-col gap-3 mb-2">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <p className={`text-[10px] ${tSection} mb-2`}>[01] CENTRO DE OPERAÇÕES</p>
            <h1 className={`text-[36px] font-medium ${tDisplay} text-white leading-none tracking-wide`}>DASHBOARD</h1>
          </div>
          <div className="flex items-center gap-5 lg:gap-6">
            <KPIInline label="VISITANTES" value="12.8K" change="+18.2%" up />
            <div className="w-px h-6 bg-white/[0.06]" />
            <KPIInline label="LEADS" value="186" change="+24.1%" up />
            <div className="w-px h-6 bg-white/[0.06]" />
            <KPIInline label="IA" value="31" change="+42%" up />
            <div className="w-px h-6 bg-white/[0.06]" />
            <KPIInline label="ENGAJ." value="24.9%" change="+3.2%" up />
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] ml-2">
              <span className="w-[6px] h-[6px] rounded-full bg-emerald-400/80 shadow-[0_0_6px_rgba(52,211,153,0.4)]" />
              <span className={`text-[10px] ${tMono} text-white/35`}>247 ONLINE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row: Traffic + Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* Traffic */}
        <div className="lg:col-span-7 admin-glass p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <p className={`text-[10px] ${tTag} mb-1.5`}>[02]</p>
              <p className={`text-[16px] ${tDisplay} text-white/90 font-medium tracking-wide`}>TRÁFEGO</p>
              <p className={`text-[9px] ${tSection} mt-1`}>ÚLTIMOS 7 DIAS</p>
            </div>
            <div className="flex gap-5">
              <span className={`flex items-center gap-2 text-[9px] ${tMono} text-white/30`}><span className="w-[10px] h-[3px] rounded-full bg-white/60" /> VISITANTES</span>
              <span className={`flex items-center gap-2 text-[9px] ${tMono} text-white/30`}><span className="w-[10px] h-[3px] rounded-full bg-white/25" /> ENGAJADOS</span>
            </div>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TRAFFIC_WEEKLY} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="gV" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fff" stopOpacity={0.06} />
                    <stop offset="100%" stopColor="#fff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis dataKey="d" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 9, fontFamily: 'monospace' }} dy={8} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.1)', fontSize: 9, fontFamily: 'monospace' }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="visitors" stroke="rgba(255,255,255,0.6)" strokeWidth={1.5} fill="url(#gV)" />
                <Area type="monotone" dataKey="engaged" stroke="rgba(255,255,255,0.25)" strokeWidth={1} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Funnel */}
        <div className="lg:col-span-5 admin-glass p-6">
          <p className={`text-[10px] ${tTag} mb-1.5`}>[03]</p>
          <p className={`text-[16px] ${tDisplay} text-white/90 font-medium tracking-wide mb-1`}>FUNIL DE CONVERSÃO</p>
          <p className={`text-[9px] ${tSection} mb-5`}>ESTE MÊS · 6 ETAPAS</p>
          <div className="flex flex-col gap-2">
            {FUNNEL.map((s, i) => (
              <div key={s.stage} className="flex items-center gap-3">
                <span className={`text-[9px] ${tMono} text-white/30 w-[80px] shrink-0 truncate`}>{s.stage}</span>
                <div className="flex-1 h-[20px] rounded-sm bg-white/[0.03] overflow-hidden relative">
                  <div className="h-full transition-all" style={{ width: `${Math.max(s.pct, 3)}%`, background: `rgba(255,255,255,${0.12 - i * 0.015})` }} />
                </div>
                <span className={`text-[10px] ${tTag} w-[50px] text-right`}>{s.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-white/[0.05] flex justify-between">
            <span className={`text-[9px] ${tMono} text-white/20`}>CONVERSÃO: <span className="text-white/50">0.05%</span></span>
            <span className={`text-[9px] ${tMono} text-white/20`}>META: <span className="text-white/50">0.08%</span></span>
          </div>
        </div>
      </div>

      {/* Row: Chatbot + Sources + Intents */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">

        {/* Chatbot */}
        <div className="lg:col-span-5 admin-glass p-6">
          <div className="flex items-center gap-2.5 mb-1">
            <Bot size={14} className="text-white/25" />
            <p className={`text-[10px] ${tTag}`}>[04]</p>
          </div>
          <p className={`text-[16px] ${tDisplay} text-white/90 font-medium tracking-wide`}>CHATBOT IA</p>
          <p className={`text-[9px] ${tSection} mt-1 mb-5`}>CONVERSAS E CONVERSÕES · 7 DIAS</p>
          <div className="h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHATBOT_DAILY} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" vertical={false} />
                <XAxis dataKey="d" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 9, fontFamily: 'monospace' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.1)', fontSize: 9, fontFamily: 'monospace' }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="conversations" fill="rgba(255,255,255,0.08)" radius={[2, 2, 0, 0]} />
                <Bar dataKey="conversions" fill="rgba(255,255,255,0.2)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-5 mt-3 pt-3 border-t border-white/[0.05]">
            <Stat label="CONVERSAS" value="124" />
            <Stat label="LEADS" value="20" />
            <Stat label="CONVERSÃO" value="16.1%" />
          </div>
        </div>

        {/* Sources */}
        <div className="lg:col-span-3 admin-glass p-6 flex flex-col">
          <p className={`text-[10px] ${tTag} mb-1.5`}>[05]</p>
          <p className={`text-[16px] ${tDisplay} text-white/90 font-medium tracking-wide mb-1`}>FONTES</p>
          <p className={`text-[9px] ${tSection} mb-4`}>DISTRIBUIÇÃO</p>
          <div className="h-[140px] flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={LEAD_SOURCES} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value" stroke="none">
                  {LEAD_SOURCES.map((_, i) => (
                    <Cell key={i} fill={`rgba(255,255,255,${0.22 - i * 0.04})`} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-1.5 mt-2">
            {LEAD_SOURCES.map((s, i) => (
              <div key={s.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: `rgba(255,255,255,${0.22 - i * 0.04})` }} />
                  <span className={`text-[9px] ${tMono} text-white/35`}>{s.name}</span>
                </div>
                <span className={`text-[10px] ${tTag}`}>{s.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Intents */}
        <div className="lg:col-span-4 admin-glass p-6">
          <div className="flex items-center gap-2.5 mb-1">
            <BrainCircuit size={14} className="text-white/25" />
            <p className={`text-[10px] ${tTag}`}>[06]</p>
          </div>
          <p className={`text-[16px] ${tDisplay} text-white/90 font-medium tracking-wide`}>INTENÇÕES</p>
          <p className={`text-[9px] ${tSection} mt-1 mb-5`}>CHATBOT NLP · TOP TÓPICOS</p>
          <div className="flex flex-col gap-2.5">
            {CHATBOT_INTENTS.map(i => (
              <div key={i.intent} className="flex items-center gap-3">
                <span className={`text-[9px] ${tMono} text-white/30 w-[120px] shrink-0 truncate`}>{i.intent}</span>
                <div className="flex-1 h-[6px] rounded-sm bg-white/[0.03] overflow-hidden">
                  <div className="h-full bg-white/[0.10]" style={{ width: `${i.pct}%` }} />
                </div>
                <span className={`text-[10px] ${tTag} w-8 text-right`}>{i.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row: Pages + Geo + Engagement */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">

        {/* Pages */}
        <div className="lg:col-span-4 admin-glass p-6">
          <div className="flex items-center gap-2.5 mb-1">
            <Eye size={14} className="text-white/25" />
            <p className={`text-[10px] ${tTag}`}>[07]</p>
          </div>
          <p className={`text-[16px] ${tDisplay} text-white/90 font-medium tracking-wide`}>PÁGINAS</p>
          <p className={`text-[9px] ${tSection} mt-1 mb-4`}>MAIS VISITADAS · ESTE MÊS</p>
          <div className="flex flex-col">
            {TOP_PAGES.map((p, i) => (
              <div key={p.page} className={`flex items-center justify-between py-2.5 ${i < TOP_PAGES.length - 1 ? 'border-b border-white/[0.04]' : ''}`}>
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={`text-[9px] ${tTag} w-4`}>{String(i + 1).padStart(2, '0')}</span>
                  <div className="min-w-0">
                    <p className={`text-[10px] ${tMono} text-white/50 truncate`}>{p.label}</p>
                    <p className="text-[9px] font-mono text-white/15">{p.page}</p>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <p className={`text-[11px] ${tTag}`}>{p.views.toLocaleString()}</p>
                  <p className="text-[8px] font-mono text-white/15 uppercase">BOUNCE {p.bounce}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geo */}
        <div className="lg:col-span-4 admin-glass p-6">
          <div className="flex items-center gap-2.5 mb-1">
            <Globe size={14} className="text-white/25" />
            <p className={`text-[10px] ${tTag}`}>[08]</p>
          </div>
          <p className={`text-[16px] ${tDisplay} text-white/90 font-medium tracking-wide`}>GEOGRÁFICO</p>
          <p className={`text-[9px] ${tSection} mt-1 mb-4`}>ORIGEM DOS VISITANTES</p>
          <div className="flex flex-col gap-2.5">
            {GEO.map(g => (
              <div key={g.name} className="flex items-center gap-3">
                <span className="text-sm w-5">{g.country}</span>
                <span className={`text-[9px] ${tMono} text-white/40 w-[90px] truncate`}>{g.name}</span>
                <div className="flex-1 h-[5px] rounded-sm bg-white/[0.03] overflow-hidden">
                  <div className="h-full bg-white/[0.12]" style={{ width: `${g.pct}%` }} />
                </div>
                <span className={`text-[10px] ${tTag} w-10 text-right`}>{g.pct}%</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-white/[0.05] flex justify-between">
            <span className={`text-[9px] ${tMono} text-white/20`}>ESCRITÓRIOS: <span className="text-white/40">SP · DUB</span></span>
            <span className={`text-[9px] ${tTag}`}>{GEO.reduce((a, g) => a + g.visitors, 0).toLocaleString()}</span>
          </div>
        </div>

        {/* Engagement */}
        <div className="lg:col-span-4 admin-glass p-6">
          <div className="flex items-center gap-2.5 mb-1">
            <MousePointerClick size={14} className="text-white/25" />
            <p className={`text-[10px] ${tTag}`}>[09]</p>
          </div>
          <p className={`text-[16px] ${tDisplay} text-white/90 font-medium tracking-wide`}>ENGAJAMENTO</p>
          <p className={`text-[9px] ${tSection} mt-1 mb-4`}>POR SEÇÃO · TEMPO MÉDIO</p>
          <div className="flex flex-col">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.04]">
              <span className={`text-[8px] ${tSection}`}>SEÇÃO</span>
              <div className="flex">
                <span className={`text-[8px] ${tSection} w-14 text-right`}>TEMPO</span>
                <span className={`text-[8px] ${tSection} w-14 text-right`}>AÇÕES</span>
              </div>
            </div>
            {VISITOR_ENGAGEMENT.map((v, i) => (
              <div key={v.section} className={`flex items-center justify-between py-2 ${i < VISITOR_ENGAGEMENT.length - 1 ? 'border-b border-white/[0.04]' : ''}`}>
                <span className={`text-[9px] ${tMono} text-white/40 truncate flex-1 min-w-0`}>{v.section}</span>
                <span className={`text-[10px] ${tTag} w-14 text-right`}>{v.avgTime}</span>
                <span className={`text-[10px] ${tTag} w-14 text-right`}>{v.interactions.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row: AI Activity + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* Activity */}
        <div className="lg:col-span-7 admin-glass p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <Zap size={14} className="text-white/25" />
              <p className={`text-[10px] ${tTag}`}>[10]</p>
              <p className={`text-[16px] ${tDisplay} text-white/90 font-medium tracking-wide`}>ATIVIDADE IA</p>
            </div>
            <span className={`text-[9px] ${tMono} text-white/15`}>{AI_ACTIVITY.length} AÇÕES</span>
          </div>
          <div className="flex flex-col">
            {AI_ACTIVITY.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} className={`flex items-start gap-3.5 py-3 ${i < AI_ACTIVITY.length - 1 ? 'border-b border-white/[0.04]' : ''}`}>
                  <div className="w-7 h-7 rounded bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={12} className="text-white/25" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[9px] ${tMono} text-white/45 leading-[1.8]`}>{a.text}</p>
                  </div>
                  <span className={`text-[9px] ${tTag} shrink-0 pt-0.5`}>{a.time}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="admin-glass p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <Sparkles size={14} className="text-white/25" />
              <p className={`text-[10px] ${tTag}`}>[11]</p>
              <p className={`text-[16px] ${tDisplay} text-white/90 font-medium tracking-wide`}>AÇÕES RÁPIDAS</p>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { icon: ScanLine, label: 'ESCANEAR URL', desc: 'GERAR CASE VIA IA' },
                { icon: PenTool, label: 'NOVO ARTIGO', desc: 'CLAUDE ESCREVE O DRAFT' },
                { icon: Search, label: 'SEO AUDIT', desc: 'ANALISAR TODAS AS PÁGINAS' },
                { icon: Bot, label: 'TREINAR BOT', desc: 'ATUALIZAR CONTEXTO' },
              ].map(a => {
                const Icon = a.icon;
                return (
                  <button key={a.label} className="admin-glass-subtle p-3.5 text-left group">
                    <Icon size={14} className="text-white/20 mb-2.5 group-hover:text-white/50 transition-colors" />
                    <p className={`text-[10px] ${tMono} text-white/50 group-hover:text-white/80 transition-colors`}>{a.label}</p>
                    <p className={`text-[8px] ${tMono} text-white/15 mt-1`}>{a.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Directive */}
          <div className="admin-glass p-6 flex-1">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <BrainCircuit size={14} className="text-white/25" />
                <p className={`text-[10px] ${tTag}`}>[12]</p>
                <p className={`text-[16px] ${tDisplay} text-white/90 font-medium tracking-wide`}>DIRECTIVA</p>
              </div>
              <span className={`text-[8px] ${tMono} text-white/20 bg-white/[0.03] border border-white/[0.06] px-2.5 py-1 rounded`}>SEMANAL</span>
            </div>
            <p className={`text-[10px] ${tMono} text-white/40 leading-[2]`}>
              SETOR LOGÍSTICO EM ALTA — <span className="text-white/80">3 LEADS B2B</span> BUSCARAM TRACKING E AUTOMAÇÃO DE FROTAS.
              CASE TRANSGABARDO GERANDO TRÁFEGO QUALIFICADO.
            </p>
            <div className="flex gap-3 mt-4 pt-3 border-t border-white/[0.05]">
              <button className={`bg-white/[0.08] border border-white/[0.10] text-white/80 flex-1 py-2.5 rounded text-[10px] ${tMono} hover:bg-white/[0.12] transition-all`}>
                GERAR CONTEÚDO
              </button>
              <button className={`text-white/25 flex-1 py-2.5 rounded text-[10px] ${tMono} border border-white/[0.05] hover:border-white/[0.10] hover:text-white/45 transition-all`}>
                DISPENSAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══ Sub-components ═══ */

const tooltipStyle = {
  background: 'rgba(0,0,0,0.9)',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: '4px',
  fontSize: '9px',
  fontFamily: 'monospace',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.08em',
  color: 'rgba(255,255,255,0.7)',
  padding: '6px 10px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
};

function KPI({ icon: Icon, label, value, change, up, spark }: { icon: LucideIcon; label: string; value: string; change: string; up: boolean; spark: { v: number }[] }) {
  return (
    <div className="admin-glass p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="w-7 h-7 rounded bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
          <Icon size={13} className="text-white/25" />
        </div>
        <div className="w-[60px] h-[24px] opacity-25">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={spark}><Line type="monotone" dataKey="v" stroke="rgba(255,255,255,0.5)" strokeWidth={1.5} dot={false} /></LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <p className={`text-[28px] font-medium ${tValue} text-white/90 leading-none`}>{value}</p>
      <div className="flex items-center justify-between mt-2">
        <p className={`text-[9px] ${tMono} text-white/25`}>{label}</p>
        <p className={`text-[10px] font-mono tabular-nums ${up ? 'text-emerald-400/50' : 'text-amber-400/50'}`}>{up ? '↑' : '↓'} {change}</p>
      </div>
    </div>
  );
}

function KPIInline({ label, value, change, up }: { label: string; value: string; change: string; up: boolean }) {
  return (
    <div className="flex flex-col items-start">
      <p className={`text-[8px] ${tMono} text-white/20 mb-0.5`}>{label}</p>
      <div className="flex items-baseline gap-1.5">
        <p className={`text-[16px] ${tValue} text-white/80 leading-none`}>{value}</p>
        <p className={`text-[9px] font-mono tabular-nums ${up ? 'text-emerald-400/50' : 'text-amber-400/50'}`}>{change}</p>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className={`text-[8px] ${tMono} text-white/20 mb-1`}>{label}</p>
      <p className={`text-[18px] ${tValue} text-white/70 font-medium leading-none`}>{value}</p>
    </div>
  );
}

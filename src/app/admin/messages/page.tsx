import { Bot, Mail, CheckCircle, Clock } from 'lucide-react';

const MESSAGES = [
  { id: 1, type: 'bot', name: 'Lead Corporativo #491', intent: 'Desenvolvimento Software', preview: 'Olá, gostaria de saber se vocês constroem sistemas para logística de transporte pesado?', time: '10 min', status: 'new' },
  { id: 2, type: 'form', name: 'Sarah O\'Connor', intent: 'Redesign UI/UX', preview: 'Temos um SaaS interno e precisamos de um update visual completo.', time: '2h', status: 'new' },
  { id: 3, type: 'bot', name: 'Lead Indefinido #812', intent: 'Redes Sociais', preview: 'Vcs cuidam de instagram e fazem posts de marketing tbm?', time: 'Ontem', status: 'handled' },
];

export default function AdminMessagesPage() {
  return (
    <div className="w-full w-full flex flex-col h-[calc(100vh-5rem)] gap-4">
      <div>
        <h1 className="text-[26px] font-semibold chrome-text tracking-tight">Leads & Mensagens</h1>
        <p className="text-[13px] text-white/40 mt-1">Caixa de entrada do Form de Contato e Chatbot IA.</p>
      </div>

      <div className="flex-1 admin-glass overflow-hidden flex min-h-0">
        
        {/* List */}
        <div className="w-[300px] border-r border-white/[0.06] flex flex-col shrink-0">
          <div className="p-3 border-b border-white/[0.06]">
            <div className="flex bg-white/[0.04] rounded-full p-0.5 border border-white/[0.06]">
              <button className="flex-1 py-1.5 rounded-full text-[12px] text-center bg-white/[0.1] text-white/95">Pendentes</button>
              <button className="flex-1 py-1.5 rounded-full text-[12px] text-center text-white/40">Todos</button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {MESSAGES.map((m, i) => (
              <div key={m.id} className={`px-4 py-3.5 border-b border-white/[0.04] cursor-pointer transition-colors ${
                i === 0 ? 'bg-white/[0.04] border-l-2 border-l-white/40' : 'hover:bg-white/[0.03]'
              }`}>
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[13px] text-white/70 truncate flex items-center gap-1.5">
                    {m.type === 'bot' ? <Bot size={12} className="text-white/40" /> : <Mail size={12} className="text-white/30" />}
                    {m.name}
                  </span>
                  <span className="text-[10px] text-white/45 shrink-0">{m.time}</span>
                </div>
                <p className="text-[11px] text-white/45 mb-1">{m.intent}</p>
                <p className="text-[11px] text-white/45 line-clamp-2">{m.preview}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="px-5 py-3.5 border-b border-white/[0.06] flex justify-between items-center">
            <div>
              <p className="text-[14px] text-white/95 flex items-center gap-1.5">
                <Bot size={14} className="text-white/40" /> Lead Corporativo #491
              </p>
              <p className="text-[11px] text-white/30 mt-0.5">Via chatbot público</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[12px] text-white/40 border border-white/[0.08] hover:border-white/[0.15] hover:text-white/50 transition-all">
                <Clock size={12} /> Adiar
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[12px] text-white/70 bg-white/[0.06] hover:bg-white/[0.1] transition-colors border border-white/[0.08]">
                <CheckCircle size={12} /> Respondido
              </button>
            </div>
          </div>

          <div className="flex-1 px-5 py-5 overflow-y-auto flex flex-col gap-4">
            <ChatBubble side="left" initials="US" text="Olá, gostaria de saber se vocês constroem sistemas para logística de transporte pesado? Li o case da Transgabardo e parece o que precisamos." />
            <ChatBubble side="right" bot text="Sim, a Web Star Studio é especializada na criação de ecossistemas digitais escaláveis. Logística com rastreamento pesado é uma de nossas expertises. Gostaria de agendar um diagnóstico com nossos engenheiros?" />
            <ChatBubble side="left" initials="US" text="Quero sim, pode me chamar no email: director@logcorpexample.com" />
          </div>

          <div className="px-4 py-3 border-t border-white/[0.06]">
            <div className="relative">
              <textarea placeholder="Responder diretamente…" className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-[13px] text-white/80 focus:outline-none focus:border-white/[0.2] resize-none h-16 placeholder:text-white/45 transition-colors" />
              <button className="absolute bottom-3 right-3 chrome-surface text-white/95 text-[12px] font-medium px-3.5 py-1.5 rounded-full border border-white/[0.12] hover:brightness-125 transition-all">Enviar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ side, initials, bot, text }: { side: 'left' | 'right'; initials?: string; bot?: boolean; text: string }) {
  const isLeft = side === 'left';
  return (
    <div className={`flex gap-2.5 max-w-md ${isLeft ? '' : 'self-end flex-row-reverse'}`}>
      <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-[10px] border ${
        bot ? 'chrome-surface text-white/80 border-white/[0.1]' : 'bg-white/[0.04] text-white/40 border-white/[0.06]'
      }`}>
        {bot ? <Bot size={12} /> : initials}
      </div>
      <div className={`px-4 py-3 rounded-2xl ${
        isLeft
          ? 'bg-white/[0.04] border border-white/[0.07] rounded-tl-sm'
          : 'bg-white/[0.07] border border-white/[0.1] rounded-tr-sm'
      }`}>
        <p className="text-[13px] text-white/70 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

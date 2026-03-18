# 🚀 MEGA-PROMPT — CONSTRUÇÃO DO SITE DO STUDIO DE DESENVOLVIMENTO (SOFTWARE HOUSE)
## Para uso no Google Antigravity IDE + Claude Code + Gemini 3.1

---

## 📋 CONTEXTO GERAL E DIRETRIZES DA MARCA

Você é um time de engenheiros seniores e designers de produto trabalhando no ecossistema digital institucional de um **Studio Internacional de Design e Desenvolvimento** de softwares e soluções digitais empresariais. 
**NÃO chame a empresa de "agência web". NÃO use termos de agência de marketing.** O posicionamento é de uma "Software House Sofisticada", que desenvolve robôs, portais, SaaS, automações e integrações.

A empresa é orientada por três pilares inegociáveis que devem guiar toda decisão técnica e de design:
1. **Estratégia Orientada por Dados**: Cada entrega técnica tem um objetivo de negócio claro.
2. **Automação com Inteligência Artificial**: Sistemas que evoluem com o cliente.
3. **Design com Propósito**: UI/UX estratégico, sem pontas soltas. Design é função.

**O studio já possui +25 projetos entregues** para clientes em segmentos complexos (ESG & Sustentabilidade, SaaS, E-commerce, Saúde & Medicina, Jurídico, Arquitetura, etc.) atuando no Brasil, Europa (Irlanda) e outros 6 países.

> ⚠️ IMPORTANTE: O tom de voz da comunicação deve ser **Confiante, Sofisticado, Direto e Técnico com contexto de Negócio**. Nunca arrogante, raso, hermético ou apelando para buzzwords de marketing. Todas as decisões visuais devem respeitar a premissa de **Minimalismo Sofisticado e Tipografia Forte**.

---

## 🏗️ ARQUITETURA TÉCNICA

### Stack Obrigatória
- **Framework:** Next.js 15+ (App Router) com TypeScript
- **Styling:** Tailwind CSS 4 + CSS custom properties para temas
- **Animações:** GSAP 3 (ScrollTrigger, SplitText, Flip) + Framer Motion para transições de página
- **3D/WebGL:** Three.js ou React Three Fiber (para hero section e elementos imersivos)
- **CMS/Backend:** Supabase (banco de dados PostgreSQL + Auth + Storage + Edge Functions)
- **IA Backend:** API Anthropic (Claude) + API Google (Gemini) via Edge Functions
- **Deploy:** Vercel (com ISR/SSG para performance)
- **Analytics:** Vercel Analytics + PostHog (open-source)
- **Monitoramento:** Sentry para error tracking

### Estrutura de Pastas
```
/src
  /app
    /(site)          → Páginas públicas do site
      /page.tsx      → Home
      /about/
      /services/
      /portfolio/
        /[slug]/     → Página individual de projeto
      /blog/
      /contact/
    /(admin)         → Dashboard administrativo (protegido por auth)
      /dashboard/
      /projects/
      /ai-scanner/
      /settings/
  /components
    /ui/             → Componentes base (Button, Input, etc.)
    /sections/       → Seções reutilizáveis do site
    /animations/     → Wrappers de animação (FadeIn, Parallax, MagneticButton, etc.)
    /three/          → Componentes 3D/WebGL
    /admin/          → Componentes do dashboard
  /lib
    /supabase.ts     → Cliente Supabase
    /ai.ts           → Funções de integração com Claude/Gemini
    /scraper.ts      → Lógica de scraping e análise de sites
    /utils.ts
  /hooks             → Custom hooks
  /styles            → Estilos globais e variáveis CSS
  /types             → Tipos TypeScript
```

---

## 🎨 DIRETRIZES DE DESIGN (AWWWARDS-LEVEL)

### Princípios Visuais da Marca (Awwwards-Level)
1. **Minimalismo Sofisticado e Layout Dinâmico** — Evitar grids convencionais. "Menos é mais. Espaço em branco é elegância, não ausência de conteúdo."
2. **Tipografia como protagonista (Forte)** — Headers com tipografia display ultra-bold (ex: Clash Display, Satoshi, General Sans). O "primeiro sinal de qualidade técnica de um studio de design" é a tipografia. Texto animado com split por caractere/palavra.
3. **Cursor customizado** — Cursor magnético que reage aos elementos, muda de forma (dot → circle → texto) dependendo do contexto.
4. **Scroll-driven storytelling** — Cada seção revela conteúdo conforme o scroll (parallax em camadas, pin de elementos, transformações 3D). O site conta como construímos ecossistemas digitais.
5. **Transições de página cinematográficas** — Page transitions avançadas.
6. **Paleta contida e proposital** — Dark mode padrão com seções claras estratégicas. Evitar excesso de cores. Máximo de 2 cores principais + neutros.
7. **Microinterações em tudo** — Hover states elaborados, validando a excelência técnica através dos detalhes.
8. **Imagens com propósito (Sem bancos de dados genéricos)** — Nenhuma imagem deve parecer "banco de fotos" sem conexão real com a tecnologia. Texturas fotográficas autênticas (Grain/noise).
9. **Smooth scrolling** — Implementar Lenis (ou similar) para scroll suave nativo.
10. **Loading screen premium** — Preloader animado com logo + reveal dramático.

### Elementos Obrigatórios de Interação
- **Magnetic buttons** que atraem o cursor
- **Marquee infinita** com logos de tecnologias/clientes
- **Text reveal on scroll** (palavra por palavra ou linha por linha)
- **Image parallax** em diferentes velocidades
- **Sticky horizontal scroll** para seção de serviços ou portfólio
- **Morph/blend** entre seções usando clip-path
- **Hover de cards de portfólio** revelando vídeo preview ou mockup animado

---

## 📄 ESTRUTURA DE PÁGINAS

### 1. HOME (/)
**Objetivo:** Impressionar em 3 segundos. Comunicar que somos um partner estratégico que desenvolve máquinas de crescimento, não "apenas mais uma" empresa genérica.

**Seções (em ordem de scroll):**

**1.1 — Preloader**
- Logo animado (SVG path drawing)
- Barra de progresso estilizada ou contagem numérica
- Ao completar: reveal com clip-path expandindo do centro

**1.2 — Hero Section**
- Título gigante animado: ex. "Construímos infraestruturas digitais que transformam empresas em máquinas de crescimento previsíveis." (Focar no tom do manifesto).
- Subtítulo menor com foco em Automação + Inteligência Artificial + Design Elegante.
- Background: cena 3D interativa (partículas, mesh gradient, ou composição abstrata que reage ao mouse)
- CTA: "Explore our work" com magnetic button
- Nav fixa transparente com blur

**1.3 — Reel / Showreel**
- Vídeo de destaque dos melhores projetos (ou composição de mockups animados)
- Autoplay on scroll com controls customizados
- Border radius grande, margem lateral generosa

**1.4 — Portfólio Destaque (3-5 projetos)**
- Grid assimétrico com imagens que fazem parallax
- Ao hover: revelar nome do projeto + categoria + preview animado
- Clicar leva à página individual do projeto
- Badge de país (🇧🇷 🇮🇪 etc.)

**1.5 — Sobre Nós (Resumo, o Manifesto)**
- Split layout: texto à esquerda com o manifesto ("A intersecção entre engenharia de software, inteligência artificial e design estratégico"), números à direita.
- Stats animados contando: "+15 Anos de experiência global", "+200 projetos entregues", "Presente em 8 países".
- Scroll reveal elegante.

**1.6 — Serviços / Atuação**
- Horizontal scroll ou accordion premium
- Cada serviço com ícone técnico e futurista animado, foco em "Ecossistemas", "Plataformas", "Inteligência Artificial".
- Serviços (de acordo com o manual): Desenvolvimento de Plataformas e Sistemas Web, Automação de Processos com IA, Design Estratégico de Interfaces (UI/UX), Arquitetura de Ecossistemas Digitais. *NUNCA* colocar marketing, redes sociais ou campanhas.

**1.7 — Depoimentos / Social Proof**
- Carrossel horizontal infinito com quotes de clientes
- Avatar, nome, empresa, texto
- Design card com glassmorphism ou blur

**1.8 — CTA Final**
- Título grande: "Ready to build something extraordinary?"
- Formulário de contato simplificado OU botão para página de contato
- Background com gradiente ou cena 3D

**1.9 — Footer**
- Links de navegação
- Redes sociais
- Newsletter signup
- Texto com hora local do escritório (BR e IE)
- Efeito: footer revelado por baixo da seção anterior (sticky reveal)

---

### 2. PORTFÓLIO (/portfolio)
**Objetivo:** Mostrar todos os projetos com filtros inteligentes.

- **Filtros** por: País (Brasil 🇧🇷, Irlanda 🇮🇪, EUA 🇺🇸, etc.), Segmento (Saúde, Jurídico, E-commerce, SaaS, etc.), Tecnologia, Ano
- **Grid masonry** responsivo com animações de entrada staggered
- **Hover**: mockup 3D tilt, preview em vídeo, ou color shift
- **Cada card mostra**: thumbnail (screenshot real do site), nome do projeto, segmento, país, tags de tecnologia
- **Infinite scroll** ou paginação elegante

### 2.1 — Página Individual do Projeto (/portfolio/[slug])
- Hero full-width com mockup do site (desktop + mobile)
- Seção "Overview": cliente, segmento, país, ano, link do site ao vivo, tecnologias usadas
- Seção "O Desafio": descrição do problema/briefing
- Seção "A Solução": como abordamos o projeto
- Galeria de screenshots (scroll horizontal ou lightbox)
- Seção de métricas/resultados (se aplicável)
- CTA: "Próximo projeto" com preview do seguinte

---

### 3. SOBRE (/about)
- Manifesto: A visão de unir estratégia de dados, IA e design estratégico.
- Timeline visual interativa da consolidação em 8 países.
- O Fundador: Seção de destaque sobre **Felipe Antunes** (Fundador e Diretor Executivo). 
  - *Contexto obrigatório para a página:* "Felipe combina profundidade técnica e visão estratégica, com formação em Direito, Administração e MBA em Inteligência Artificial para Negócios. Mais de 15 anos projetando ecossistemas digitais globais. Sócio-fundador da Innovation Business Alliance (IBA)".
- Presença geográfica (mapa interativo destacando BR, Irlanda, EUA, Reino Unido, Canadá, etc.).

### 4. SERVIÇOS (/services)
- Cada serviço com detalhamento, ícones, cases relacionados
- Accordion ou tabs com animação

### 5. BLOG (/blog)
- Grid de artigos com filtros por categoria
- SEO otimizado com metadata dinâmica
- Leitor limpo com typography profissional

### 6. CONTATO (/contact)
- Formulário multi-step com validação e feedback visual
- Integração com Supabase + email notification
- Mapa interativo dos escritórios
- Chat widget com IA (Claude) para atendimento inicial

---

## 🤖 SISTEMA DE INTELIGÊNCIA ARTIFICIAL

### 3.1 — AI Portfolio Scanner (Feature Principal)
**O que faz:** O admin insere a URL de um site do portfólio. A IA visita o site, analisa, e auto-gera o projeto no portfólio.

**Fluxo técnico:**
```
1. Admin insere URL no dashboard
2. Edge Function dispara scraping (Puppeteer/Playwright headless no server)
   - Captura screenshots (desktop, tablet, mobile)
   - Extrai metadata (title, description, og:image, favicon, cores predominantes)
   - Extrai textos e estrutura da página
3. Screenshots são armazenadas no Supabase Storage
4. Os dados extraídos são enviados para a API Claude/Gemini com o seguinte prompt estrito para IA:
   "Analise os dados deste site e gere as informações de portfólio para importação. **Regra Absoluta:** Mantenha um tom profissional, técnico e voltado a resultados de negócio. Evite superlativos vazios ("O melhor site gerado").
    - Nome do projeto
    - Descrição curta (1 linha focada na solução técnica) e longa (2-3 parágrafos)
    - Segmento/indústria do cliente
    - País de origem (inferir)
    - Tecnologias identificadas
    - Paleta de cores extraída
    - Para 'O Desafio': Foque em identificar o gargalo operacional, falta de escalabilidade ou debito técnico da versão anterior do cliente.
    - Para 'A Solução': Explique como o ecossistema digital criado resolveu o problema (focar em automação, fluxos ou ui/ux estratégico)."
5. A IA retorna JSON estruturado
6. O admin revisa, edita se necessário, e publica
7. O projeto aparece automaticamente no portfólio público
```

**Tabela Supabase `projects`:**
```sql
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  description_short TEXT,
  description_long TEXT,
  challenge TEXT,
  solution TEXT,
  country TEXT,           -- 'BR', 'IE', 'US', etc.
  segment TEXT,           -- 'healthcare', 'legal', 'ecommerce', etc.
  technologies TEXT[],    -- ['Next.js', 'Wix', 'React', etc.]
  tags TEXT[],
  color_palette TEXT[],   -- hex colors extraídas
  year INTEGER,
  is_featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'draft',  -- 'draft', 'published', 'archived'
  screenshots JSONB,      -- { desktop: url, tablet: url, mobile: url }
  thumbnail_url TEXT,
  metadata JSONB,         -- dados extras do scraping
  ai_generated BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### 3.2 — Chat Widget com IA (Público)
- Chatbot no site público usando API Claude
- Treinado no contexto da Web Star Studio (serviços de desenvolvimento, ecossistemas, automação).
- **Comando Estrito de IA:** Se um usuário pedir por "redes sociais, posts ou tráfego pago", o bot deve polidamente explicar: *"Nós somos um studio de desenvolvimento construtor de ecossistemas digitais. Nosso foco é software, portal web e IA, e não realizamos o serviço de redes sociais."*
- Salva leads no Supabase automaticamente
- Fallback: direciona para o calendário ou envia formulário técnico.

### 3.3 — AI Blog Assistant (Admin)
- No dashboard, a IA ajuda a gerar artigos de blog
- Input: tema ou keyword
- Output: título, outline, artigo completo, meta description, tags SEO
- Editor WYSIWYG com sugestões da IA inline

### 3.4 — AI Analytics Summary (Admin)
- Dashboard mostra métricas do site (visitas, leads, etc.)
- IA gera resumo semanal em linguagem natural
- Ex: "Esta semana tiveram 340 visitas, 12% mais que a anterior. A página de portfólio teve o maior engajamento."

---

## 🔧 DASHBOARD ADMIN (/admin)

### Autenticação
- Login via Supabase Auth (email + magic link)
- Proteção de rotas com middleware Next.js
- Role-based access (admin, editor)

### Telas do Dashboard

**4.1 — Dashboard Home**
- Cards de métricas: total de projetos, visitas (7d), leads recebidos, artigos publicados
- Gráfico de visitas (últimos 30 dias)
- Últimos leads/mensagens
- AI weekly summary

**4.2 — Projetos (/admin/projects)**
- Lista de todos os projetos com status (draft/published/archived)
- Filtros e busca
- Ações: editar, publicar, arquivar, deletar
- Botão "➕ Novo Projeto" abre wizard:
  - Opção A: "Adicionar com IA" → insere URL → AI Scanner processa
  - Opção B: "Adicionar manualmente" → formulário completo

**4.3 — AI Scanner (/admin/ai-scanner)**
- Campo de URL
- Botão "Analisar com IA"
- Loading state com steps visíveis:
  1. "Acessando o site..."
  2. "Capturando screenshots..."
  3. "Extraindo informações..."
  4. "IA analisando conteúdo..."
  5. "Gerando projeto..."
- Preview do resultado gerado pela IA
- Formulário de edição lado a lado com o preview
- Botão "Salvar como rascunho" ou "Publicar agora"

**4.4 — Blog Manager (/admin/blog)**
- CRUD de artigos
- Editor rich text (Tiptap ou similar)
- Botão "Gerar com IA"
- Preview ao vivo

**4.5 — Leads/Mensagens (/admin/messages)**
- Lista de mensagens do formulário de contato + chatbot
- Status: novo, respondido, arquivado
- Responder diretamente pelo dashboard (integração email)

**4.6 — Settings (/admin/settings)**
- Dados do studio (nome, logo, redes sociais)
- Configurações do chatbot IA
- API keys management
- Customização de SEO global

---

## 🌐 PORTFÓLIO INICIAL — PROJETOS PARA IMPORTAR VIA AI SCANNER

Estes são os sites do portfólio atual. Devem ser importados usando o AI Scanner na primeira carga:

### 🇧🇷 Brasil
| # | URL | Segmento Provável |
|---|-----|--------------------|
| 1 | transgabardo.com.br | Logística/Transporte |
| 2 | worton.com.br | ESG & Sustentabilidade |
| 3 | daton.com.br | SaaS / Plataforma ESG |
| 4 | premiads.com.br | Marketing / AdTech |
| 5 | artpe.art.br | Arte & Cultura |
| 6 | desh.life | SaaS / Produtividade |
| 7 | pontualarquitetos.com.br | Arquitetura |
| 8 | luizvieira.com | Portfólio Pessoal |
| 9 | clicaseguros.com | Seguros |
| 10 | drguilhermemaia.com.br | Saúde / Medicina |
| 11 | cpb.adv.br | Jurídico / Advocacia |
| 12 | perolapadilhaclinicspa.com | Saúde / Estética |
| 13 | ativagestaocontabil.com.br | Contabilidade |
| 14 | verannebrand.com.br | E-commerce / Moda |
| 15 | brandln.com.br | E-commerce / Beleza |
| 16 | baronesadaserra.com.br | Gastronomia / Hospitalidade |

### 🇮🇪 Irlanda
| # | URL | Segmento Provável |
|---|-----|--------------------|
| 17 | kmstyle.ie | Beleza / Estética |
| 18 | ciranda.ie | Restaurante / Gastronomia |
| 19 | blossomdublin.com | Florista / Decoração |
| 20 | foxdelivery.ie | Food Delivery / Logística |
| 21 | momentodublin.ie | Gastronomia |
| 22 | lisheenspringsgolfclub.ie | Esporte / Golf |
| 23 | lestrofitness.com | Fitness / Academia |

### 🇺🇸 EUA
| # | URL | Segmento Provável |
|---|-----|--------------------|
| 24 | affordablegraniteflorida.com | Home Improvement |

### 🌐 Global / SaaS
| # | URL | Segmento Provável |
|---|-----|--------------------|
| 25 | rankey.ai | SaaS / IA / SEO |

---

## ⚡ PERFORMANCE & SEO

- **Core Web Vitals:** LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Lighthouse Score:** 90+ em todas as categorias
- **Imagens:** Next/Image com WebP/AVIF, lazy loading, blur placeholder
- **Fonts:** next/font com subset e display swap
- **Code splitting:** Dynamic imports para Three.js e componentes pesados
- **SEO:** Metadata dinâmica por página, Open Graph, Twitter Cards, JSON-LD structured data, sitemap.xml, robots.txt
- **i18n:** Suporte a PT-BR e EN (com toggle no site) — usar next-intl
- **Acessibilidade:** WCAG 2.1 AA, keyboard navigation, skip links, aria labels, reduced motion media query (desabilitar animações pesadas se prefers-reduced-motion)

---

## 📱 RESPONSIVIDADE

- **Mobile-first** com breakpoints: 375px, 768px, 1024px, 1440px, 1920px
- Animações simplificadas no mobile (sem parallax pesado, sem Three.js — fallback estático)
- Touch-friendly: botões mínimo 44x44px, swipe gestures para carrosséis
- Menu mobile: fullscreen overlay com animação de entrada staggered

---

## 🔒 SEGURANÇA

- Supabase RLS (Row Level Security) para todas as tabelas
- Rate limiting nas Edge Functions (especialmente no AI Scanner e chatbot)
- Sanitização de inputs (XSS prevention)
- CSRF protection
- Environment variables para todas as API keys (nunca expor no client)
- Headers de segurança (CSP, X-Frame-Options, etc.)

---

## 📦 PRIORIDADE DE IMPLEMENTAÇÃO

### Fase 1 — Fundação (Semana 1-2)
- [ ] Setup do projeto Next.js + Tailwind + TypeScript
- [ ] Configurar Supabase (tabelas, auth, storage)
- [ ] Layout base (nav, footer, page transitions)
- [ ] Preloader
- [ ] Sistema de animações (GSAP + Framer Motion)
- [ ] Smooth scroll (Lenis)
- [ ] Custom cursor

### Fase 2 — Páginas Públicas (Semana 2-4)
- [ ] Home page completa (todas as seções)
- [ ] Hero 3D interativo
- [ ] Página de portfólio com filtros
- [ ] Página individual de projeto
- [ ] Página Sobre
- [ ] Página Serviços
- [ ] Página Contato com formulário
- [ ] Footer premium
- [ ] Responsividade completa
- [ ] i18n (PT-BR + EN)

### Fase 3 — Dashboard Admin (Semana 4-6)
- [ ] Auth system (login/logout)
- [ ] Layout do dashboard
- [ ] CRUD de projetos (manual)
- [ ] AI Scanner — scraping + screenshots
- [ ] AI Scanner — integração Claude/Gemini para análise
- [ ] Preview e edição do conteúdo gerado
- [ ] Blog manager + editor
- [ ] Gerenciamento de leads/mensagens

### Fase 4 — IA & Polish (Semana 6-8)
- [ ] Chat widget com Claude no site público
- [ ] AI Blog Assistant
- [ ] AI Analytics Summary
- [ ] SEO final (metadata, sitemap, structured data)
- [ ] Performance optimization
- [ ] Testes (unitários + e2e com Playwright)
- [ ] Deploy em produção
- [ ] Importar portfólio completo via AI Scanner

---

## 🎯 REFERÊNCIAS DE DESIGN (Sites Awwwards para inspiração de UX/UI)
- https://www.thibaultguignand.com/en
- https://neverhack.com/en
- https://estrela.studio/
- https://letitrippictures.com/
- https://www.sutera.ch/
- https://www.ose-engineering.fr/en

**Princípio:** Inspirar-se na qualidade de interação e storytelling desses sites, mas criar algo ORIGINAL e estritamente fiel ao *Manual de Marca da Web Star Studio*, assegurando a posição técnica de um studio de desenvolvimento (sem visual "marqueteiro" e com foco em alta performance institucional de negócios focados em engenharia de dados/software). e so adicionar em cima/melhorar o que ja criamos e temos agora.

---

## ✅ CHECKLIST DE QUALIDADE FINAL

- [ ] Todas as animações rodam a 60fps
- [ ] Nenhum layout shift visível
- [ ] Funciona em Chrome, Firefox, Safari, Edge
- [ ] Mobile perfeitamente responsivo
- [ ] Prefers-reduced-motion respeitado
- [ ] Lighthouse 90+ em todas as categorias
- [ ] Todos os projetos importados via AI Scanner
- [ ] Dashboard admin funcional e intuitivo
- [ ] Chatbot IA respondendo adequadamente
- [ ] Deploy em produção com domínio final
- [ ] SSL ativo
- [ ] Analytics configurado

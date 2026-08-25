# Diretrizes e Regras do Projeto — Batata Mania (365 Versículos)

Este arquivo define os princípios mandatórios, diretrizes visuais, regras de copywriting e padrões de código para o desenvolvimento deste projeto. Qualquer agente ou desenvolvedor deve seguir rigorosamente estas instruções.

---

## 1. Princípios Fundamentais de UI/UX & Design Visual

- **Priorize 100% a Estética Visual & Whitespace Generoso:**  
  Espaçamento amplo e respiro visual são prioridades máximas. Nunca amontoe elements. Use espaçamentos confortáveis (`py-16` a `py-24`, `gap-6` a `gap-12`) para permitir que a interface respire.
- **Hierarquia Visual Limpa e Instantânea:**  
  O olho do usuário deve captar a mensagem principal em menos de 3 segundos através de contrastes de peso tipográfico, cores de destaque e separação lógica em cards e seções.
- **Cantos Arredondados e Bordas Sutis:**  
  Utilize `rounded-xl`, `rounded-2xl` ou `rounded-full`. Evite cantos retos pontiagudos ou sombras pesadas e escuras. Prefira bordas delicadas de 1px com tons translúcidos ou terrosos suaves (`border-[#E8DFD5]` ou `border-amber-900/10`).
- **Experiência Mobile Como Prioridade, Sem Negligenciar o Desktop:**  
  Embora o foco principal seja a conversão em smartphones (otimizando cirurgicamente tamanhos de fonte, espaçamentos, áreas de toque de no mínimo 48x48px e velocidade de carregamento para telas de 360px a 430px), a versão desktop **não deve ser deixada de lado**. Garanta que o layout em telas grandes seja elegante, bem distribuído, com alinhamento refinado e aproveitamento harmonioso do espaço, evitando que elementos fiquem esticados ou desproporcionais. Ambas as versões devem oferecer uma estética visual impecável.

---

## 2. Diretrizes de Copywriting & Comunicação

- **NÃO GERE BLOCOS DENSOS DE COPY OU PARÁGRAFOS PROLIXOS:**  
  Proibido textos longos em blocos contínuos. Quebre informações em cards visuais, tópicos com ícones, badges e microcopy direta.
- **Títulos Curtos e de Alto Impacto:**  
  Use headlines objetivas, magnéticas e emocionais. Combine a autoridade clássica com o benefício prático imediato.
- **Microcopys Sucintas e Focadas em Ação:**  
  Subtítulos, legendas e textos de apoio devem ter no máximo 2 a 3 linhas curtas, transmitindo valor imediato com elegância e clareza.
- **Escaneabilidade Máxima:**  
  Utilize destaques em negrito nas palavras-chave, pills informativas, tags de benefício e listas com ícones (*checkmarks*, estrelas, badges).

---

## 3. Identidade Visual & Design System

### Paleta de Cores (Warm & Craft)
| Token | Cor Hex | Uso Principal |
| :--- | :--- | :--- |
| **Primary (CTA / Destaque)** | `#E1AD01` / `#C79801` | Botões principais de conversão, preços em destaque, badges de oferta especial. |
| **Secondary (Texto / Estrutura)** | `#4B3621` | Títulos, tipografia principal, bordas estruturais e elementos de autoridade terrosa. |
| **Surface (Fundo Principal)** | `#F2EBE3` | Fundo geral da página (Bege Creme / Kraft Claro). Traz calor e aconchego. |
| **Surface-Variant (Cards)** | `#FAF6F0` | Fundo de cards, caixas de bônus, depoimentos e modais. |
| **On-Primary** | `#2B1D12` | Texto sobre botões e elementos primários dourados. |
| **Success / Garantia** | `#2E7D32` | Selos de garantia incondicional, ícones de confirmação e compra segura. |
| **Error / Urgência** | `#D32F2F` | Microcopy de escassez, cronômetro de oferta e avisos importantes. |

> **Atenção:** Proibido o uso de fundos em branco puro (`#FFFFFF`) estéreis ou cinzas frios corporativos/azulados. Mantenha sempre a atmosfera acolhedora, artesanal e calorosa (*warm & craft*).

### Tipografia
- **Headlines (H1, H2, H3):** `Playfair Display` (Serifada, Pesos 700 e 900) — Elegância, sofisticação, tom editorial e bíblico.
- **Corpo, Subtítulos e UI:** `Plus Jakarta Sans` (Sans-Serif, Pesos 400, 500, 600, 700) — Clareza moderna, alta legibilidade e fluidez.

---

## 4. Stack Técnica & Padrões de Código

- **Frontend:** React 19 + TypeScript + Tailwind CSS v4 + Vite.
- **Ícones:** `lucide-react` (utilize traços finos e elegantes, `size={18}` a `size={24}`).
- **Animações:** `motion` (Framer Motion) com transições suaves (fade-in, scale sutil, stagger suave). Evite animações espalhafatosas ou lentas.
- **Tipagem Estrita:** Sempre declare interfaces e types TypeScript para props, estados e estruturas de dados.
- **Componentização Modular:** Mantenha componentes autocontidos, desacoplados e organizados dentro de `src/components/`.

---

## 5. Tabela de Do's and Don'ts (O que Fazer vs O que Evitar)

| O que FAZER (Do) | O que NUNCA FAZER (Don't) |
| :--- | :--- |
| **Espaçamento generoso** e respiro entre blocos de conteúdo | Criar layouts entulhados ou com elementos colados |
| **Títulos curtos**, diretos e cartões visuais com ícones | Textos longos, parágrafos monolíticos e prolixos |
| **Botões de CTA em Dourado/Mostarda** (`#E1AD01`) com alto contraste | Botões apagados, genéricos ou com cores fora do tema |
| **Tons quentes**, bege artesanal e marrom terroso | Fundos brancos hospitalares ou cinzas frios |
| **Tipografia estrita** (`Playfair Display` + `Plus Jakarta Sans`) | Fontes decorativas aleatórias ou genéricas (ex: Arial, Comic) |
| **Micro-interações suaves** e feedback visual em hovers/cliques | Animações pesadas que causem lentidão ou distração |

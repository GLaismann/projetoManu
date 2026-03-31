# ❤️ Nossa História - 3 Meses de Namoro

Um site interativo, romântico e personalizado criado para celebrar 3 meses de namoro. Este projeto foi desenvolvido para ser um presente inesquecível, reunindo memórias, planos para o futuro e declarações de amor em uma experiência web moderna e fluida.

## ✨ Funcionalidades

*   **⏱️ Contador de Tempo ao Vivo:** Calcula automaticamente os dias, horas e meses desde o início do relacionamento.
*   **✨ Efeitos Visuais (Partículas):** Animação de fundo com partículas flutuantes que dão um toque mágico e cinematográfico à tela inicial.
*   **📖 Linha do Tempo (Jornada):** Uma seção para destacar os marcos mais importantes de cada mês.
*   **🃏 Cards Interativos (Motivos):** Cartões com efeito 3D (Flip) que revelam os motivos pelos quais você ama a pessoa.
*   **✅ Nossa Bucket List:** Uma lista de metas e sonhos interativa com barra de progresso animada.
*   **💌 Carta de Amor:** Um espaço dedicado para uma declaração em texto.
*   **📸 Galeria de Fotos:** Um grid de imagens com um visualizador em tela cheia (Lightbox) com suporte a navegação por teclado.
*   **🎵 Trilha Sonora:** Um card elegante que redireciona para a playlist oficial do casal no YouTube.

## 🛠️ Tecnologias Utilizadas

*   [React 18](https://react.dev/)
*   [TypeScript](https://www.typescriptlang.org/)
*   [Vite](https://vitejs.dev/)
*   [Tailwind CSS](https://tailwindcss.com/) (Estilização)
*   [Framer Motion](https://www.framer.com/motion/) (Animações fluidas e interações)
*   [Lucide React](https://lucide.dev/) (Ícones)

## 🚀 Como rodar o projeto localmente

1. Certifique-se de ter o [Node.js](https://nodejs.org/) instalado na sua máquina.
2. Clone este repositório:
   ```bash
   git clone <URL_DO_SEU_REPOSITORIO>
   ```
3. Acesse a pasta do projeto:
   ```bash
   cd <NOME_DA_PASTA>
   ```
4. Instale as dependências:
   ```bash
   npm install
   ```
5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
6. Abra o navegador no endereço indicado (geralmente `http://localhost:5173`).

## 🎨 Como personalizar (Para o futuro)

Se você quiser atualizar o site para os próximos meses ou anos, é muito fácil:

*   **Fotos:** Substitua as imagens na pasta `public/photos/` mantendo os mesmos nomes, ou altere os caminhos no arquivo `src/App.tsx`.
*   **Data de Início:** No arquivo `src/App.tsx`, procure por `const startDate = new Date("2026-01-01T00:00:00");` e ajuste para a data exata do início do namoro.
*   **Textos e Motivos:** Todos os textos, itens da Bucket List e os "Motivos" estão nos arquivos `src/App.tsx`, `src/components/BucketList.tsx` e `src/components/Reasons.tsx`. Basta editar os textos entre aspas.
*   **Playlist do YouTube:** No arquivo `src/App.tsx`, procure pelo componente `<MusicPlayer playlistId="..." />` e troque o ID da playlist.

## 📦 Como fazer o Deploy (Publicar)

Como você está usando o GitHub, a maneira mais fácil de publicar este site de graça é usando a **Vercel** ou o **Netlify**:

1. Crie uma conta na [Vercel](https://vercel.com/) ou [Netlify](https://www.netlify.com/).
2. Clique em "Add New Project" ou "Import from Git".
3. Conecte sua conta do GitHub e selecione este repositório.
4. As configurações padrão do Vite (`npm run build` e pasta `dist`) serão detectadas automaticamente.
5. Clique em **Deploy** e em menos de 2 minutos seu site estará no ar com um link público!

---
*Feito com muito ❤️ para celebrar o amor.*

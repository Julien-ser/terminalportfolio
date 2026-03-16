# Terminal Portfolio

Aesthetic portfolio website with a terminal interface, featuring projects, achievements, and a RAG-powered chatbot for interview questions.

## Tech Stack

- **React 18** + **Vite** - Fast build tool with instant hot reload and optimal development experience
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **React Router v6** - Declarative routing for single-page applications
- **Vercel** - Zero-config deployment platform with preview deployments

### Why this stack?

- **Vite** provides lightning-fast development server and optimized production builds
- **TypeScript** catches errors at compile time and improves code maintainability
- **Tailwind CSS** allows building custom designs without leaving HTML/JSX
- **React Router** is the standard for React routing with excellent TypeScript support
- **Vercel** offers seamless CI/CD integration and automatic preview deployments

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
   - Edit `.env.local` and add your API keys:
     ```
     VITE_OPENAI_API_KEY=sk-your-actual-openai-api-key-here
     PINECONE_API_KEY=your-pinecone-api-key-here
     PINECONE_INDEX_NAME=terminalportfolio
     ```
   - **Note:** The OpenAI API key is required for the RAG chatbot. Get one at [platform.openai.com](https://platform.openai.com).
   - **Pinecone Setup:** Create a free account at [pinecone.io](https://pinecone.io), create an index, and get your API key. The index will be created automatically when you run `npm run create-index`.

3. **Generate embeddings for RAG (one-time or when content changes):**
   ```bash
   npm run ingest
   ```
   This processes the markdown documents in `src/data/docs/`, chunks them, generates embeddings using OpenAI's `text-embedding-ada-002`, and creates `src/data/embeddings.json`. The embeddings are used by the chatbot to answer questions based on your portfolio content.

4. **Create Pinecone vector index and upload embeddings:**
   ```bash
   npm run create-index
   ```
   This script reads `src/data/embeddings.json` and uploads the vectors to Pinecone. It will create the index if it doesn't exist and output the `VITE_PINECONE_INDEX_HOST` value. Add this host to your `.env.local` file as shown in the on-screen instructions.

5. **Start development server:**
   ```bash
   npm run dev
   ```

6. **Build for production:**
   ```bash
   npm run build
   ```

7. **Preview production build:**
   ```bash
   npm run preview
   ```

8. **Production Environment Variables:**
   - For Vercel deployment, set the following in Vercel project settings (Environment Variables section):
     - `VITE_OPENAI_API_KEY`
     - `VITE_PINECONE_INDEX_HOST`
     - `PINECONE_API_KEY` (only needed if you run `create-index` in CI)
   - GitHub Actions will automatically use these during build.
   - **Important:** The ingest step (`npm run ingest`) and `npm run create-index` should be run locally before committing the `embeddings.json` file, or you can add them as pre-build steps in CI/CD.

## Performance Optimization

This project implements several performance best practices to ensure fast load times and smooth user experience:

### Implemented Optimizations

- **Code Splitting**: Routes are lazy-loaded using `React.lazy()` and `Suspense`, reducing initial bundle size. Page components are only loaded when navigated to.
- **Image Lazy Loading**: All images use `loading="lazy"` attribute to defer offscreen images, improving initial page load.
- **Preconnect Hints**: `index.html` includes `preconnect` and `dns-prefetch` for Google Fonts to reduce connection latency.
- **Build Optimization**:
  - Deterministic chunk filenames with content hashes for long-term caching
  - Minification via esbuild (CSS and JS)
  - Gzip compression computed during build
  - Pre-bundling of dependencies for faster冷启动
- **Responsive Images**: Images are sized appropriately with Tailwind CSS responsive classes.
- **Font Display Swap**: Google Fonts uses `display=swap` for non-blocking font rendering.

### Lighthouse Scores

Audit the site using Chrome DevTools Lighthouse:
1. Open the site in Chrome
2. Open DevTools (F12) → Lighthouse tab
3. Select all categories (Performance, Accessibility, Best Practices, SEO)
4. Click "Analyze" (or use "Start" in newer versions)
5. Expected scores: **>90** for all categories

### Manual Performance Testing

- Run production build locally: `npm run build && npm run preview`
- Use Chrome DevTools Network tab to verify:
  - Assets are gzipped
  - Images lazy load when scrolling
  - Bundle sizes are reasonable (main bundle ~230KB gzipped)
  - No render-blocking resources

## Current Progress

### Phase 1: Planning & Setup ✓
- **Task 1**: Tech stack chosen and project initialized (React/Vite + TypeScript + Tailwind + React Router)
- **Task 2**: Data model defined with JSON schemas (`projects`, `achievements`, `contact`, `personal`)
- **Task 3**: Wireframes and terminal command specification documented in `docs/`
- **Task 4**: CI/CD pipeline configured with GitHub Actions and Vercel integration

### Phase 2: Core Infrastructure ✓
- **Task 1**: Terminal UI component ✓
  - Built `Terminal.tsx` with Tailwind CSS styling
  - Implemented `useTerminal` hook for state management
  - Created `commandParser.ts` for command parsing and validation
  - Features: command history, auto-completion, keyboard navigation, error handling
- **Task 2**: Client-side routing with React Router v6 ✓
  - Created `App.tsx` with React Router v6 routes
  - Built responsive `Navbar` component with navigation links
  - Implemented static pages: About, Projects, Achievements, Contact
  - Terminal stays on `/` route with global navigation
- **Task 3**: Content Pages ✓
  - About page: personal bio, skills, experience, education, languages
  - Projects page: responsive grid with project cards, tags, and links
  - Achievements page: timeline of certifications, awards, accomplishments
  - Contact page: contact form and social links
- **Task 4**: Global state with Zustand ✓
  - Created `usePortfolioStore.ts` with TypeScript interfaces and Zustand
  - Integrated store into all pages and terminal
  - Added loading states and error handling throughout

### Phase 3: RAG Implementation ✓
- **Task 1**: LLM service integration ✓
  - Created `src/services/llmService.ts` with `streamChat()` function
  - Supports GPT-4-turbo and GPT-3.5-turbo models
  - Streaming response handler with callbacks for real-time output
  - Environment variable management via `.env.local` with `VITE_OPENAI_API_KEY`
- **Task 2**: Document ingestion pipeline ✓
  - Created `src/data/docs/` with markdown versions of portfolio content
  - Implemented `embeddingService.ts` with chunking and embedding functions
  - Created `scripts/ingest.js` that generates `embeddings.json`
  - Added `npm run ingest` script and updated README
- **Task 3**: Vector database setup ✓
  - Integrated Pinecone as cloud vector database
  - Created `src/services/vectorService.ts` with `search(query, topK)` function
  - Created `scripts/create-index.js` to upload embeddings to Pinecone
  - Added Pinecone configuration to `.env.example`
- **Task 4**: RAG chatbot in terminal ✓
  - Created `src/services/chatService.ts` with `ChatService` class
  - Implemented multi-turn conversation with context retrieval and streaming
  - Integrated chat mode into terminal (`chat` command)
  - Added support for `/exit` to leave chat mode
  - Handles token limits via history pruning (last 3 exchanges)

### Phase 4: UI/UX Polish & Deployment (In Progress)
- **Task 1**: Terminal aesthetics enhancement ✓ *Completed*
  - Added CRT scanline overlay with subtle flicker animation
  - Implemented text glow effect for prompts and output
  - Added typing animation for newly rendered output
  - Created custom retro-style scrollbar (green on black)
  - Integrated Fira Code monospace font from Google Fonts
  - Applied retro green/amber color palette with black background
  - Added retro border glow effect to terminal container
- **Task 2**: Responsive design ✓ *Completed*
  - Applied responsive Tailwind breakpoints across all pages (xs, sm, md)
  - Adjusted font sizes for mobile, tablet, and desktop viewports
  - Made padding and spacing responsive (p-4 sm:p-6, gap-4 sm:gap-6, etc.)
  - Ensured terminal container adapts to viewport height using `dvh` unit
  - Fixed horizontal overflow with `overflow-x-hidden` on all major containers
  - Made grid layouts responsive (single column on mobile, multi-column on larger screens)
  - Adjusted image heights and form inputs for touch-friendly mobile experience
  - Maintained retro aesthetic while ensuring usability on all devices
- **Task 3**: Keyboard navigation and accessibility (pending)
- **Task 4**: Final performance optimization (pending)

## Latest Implementation: Terminal Component

The terminal interface is the heart of the portfolio, providing an interactive command-line experience:

### Features
- **Real-time command parsing** with argument and option support
- **Auto-completion** with Tab key for commands
- **Command history** navigation with ↑/↓ arrows
- **Clean output formatting** with color-coded messages (success, error, info)
- **Welcome message** on first load
- **Fully responsive** design

### Retro Terminal Aesthetics

The terminal interface features authentic CRT monitor effects for a nostalgic command-line experience:

- **CRT Scanline Overlay**: Horizontal scanlines with subtle flicker animation mimicking old CRT displays
- **Text Glow**: Neon glow effect applied to prompt and output text using CSS text-shadow
- **Typing Animation**: Smooth fade-in effect for new output, simulating typewriter-like appearance
- **Custom Scrollbar**: Retro-styled green scrollbar with dark track, matching the terminal theme
- **Fira Code Font**: Modern monospace font with excellent readability for code and terminal text
- **Retro Color Palette**: Classic green-on-black terminal colors with optional amber accents
- **Border Glow**: Subtle glowing border around terminal container
- **Cursor Blink**: Natural cursor blinking animation on input field

All styles are defined in `src/components/Terminal.css` with CSS animations and Tailwind utility classes.

### Structure
- `src/components/Terminal.tsx` - Main terminal UI component
- `src/hooks/useTerminal.ts` - State management and command execution logic
- `src/utils/commandParser.ts` - Command parsing, validation, and auto-completion utilities

### Supported Commands
- `help` - Display available commands
- `clear` - Clear terminal screen
- `exit` - Exit terminal session
- `about` - Show personal information (bio, skills, experience, education, languages)
- `projects` - List all portfolio projects with descriptions and links
- `achievements` - Show achievements and certifications
- `contact` - Display contact information (email, phone, location, social media)
- `email` - Show email address directly
- `chat` - Start interactive RAG-powered chat mode (type `/exit` to leave)

### Usage
The terminal is rendered on the homepage (`/`). Simply start typing commands and press Enter. Use Tab for suggestions and arrow keys to navigate command history.

## Deployment

This project is configured for automatic deployment to Vercel via GitHub Actions.

### Setting up Vercel

1. **Import project to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "New Project" and import your GitHub repository
   - Vercel will automatically detect the Vite framework and configure build settings

2. **Configure GitHub Secrets**
   - In your GitHub repository, go to Settings → Secrets and variables → Actions
   - Add the following repository secrets:
     - `VERCEL_TOKEN`: Your Vercel API token (create at https://vercel.com/account/tokens)
     - `VERCEL_ORG_ID`: Your Vercel organization ID (found in Vercel dashboard)
     - `VERCEL_PROJECT_ID`: Your Vercel project ID (found in project settings)

3. **Automatic Deployments**
   - Push to `main` branch: Deploys to production
   - Create PR to `main`: Creates preview deployment with URL commented on PR

### Manual Deployment

You can also manually trigger deployments using:
```bash
npm run build
vercel --prod
```

## Project Structure

```
src/
├── components/
│   ├── Terminal.tsx    # Main terminal UI with command input/output
│   └── Navbar.tsx      # Navigation bar for static pages
├── pages/
│   ├── About.tsx       # Personal bio, skills, experience, education
│   ├── Projects.tsx    # Project showcase grid
│   ├── Achievements.tsx # Certifications, awards timeline
│   └── Contact.tsx     # Contact form and social links
├── services/           # API and business logic (for RAG)
│   ├── llmService.ts   # OpenAI streaming chat
│   ├── embeddingService.ts # Chunking and embedding generation
│   └── vectorService.ts  # Pinecone vector search
├── store/              # Zustand state management
├── utils/
│   └── commandParser.ts # Command parsing, validation, auto-completion
├── data/               # JSON data files
│   ├── personal.json
│   ├── projects.json
│   ├── achievements.json
│   ├── contact.json
│   └── docs/           # Markdown source documents for RAG
├── hooks/
│   └── useTerminal.ts  # Terminal state management
├── App.tsx             # Main app with React Router routes
├── main.tsx            # Entry point
└── index.css           # Global styles and Tailwind
```

## License

MIT

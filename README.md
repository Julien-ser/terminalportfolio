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

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Preview production build:
   ```bash
   npm run preview
   ```

## Current Progress

### Phase 1: Planning & Setup ✓
- **Task 1**: Tech stack chosen and project initialized (React/Vite + TypeScript + Tailwind + React Router)
- **Task 2**: Data model defined with JSON schemas (`projects`, `achievements`, `contact`, `personal`)
- **Task 3**: Wireframes and terminal command specification documented in `docs/`
- **Task 4**: CI/CD pipeline configured with GitHub Actions and Vercel integration

### Phase 2: Core Infrastructure (In Progress)
- **Task 1**: Terminal UI component ✓
  - Built `Terminal.tsx` with Tailwind CSS styling
  - Implemented `useTerminal` hook for state management
  - Created `commandParser.ts` for command parsing and validation
  - Features: command history, auto-completion, keyboard navigation, error handling
- **Task 2**: Client-side routing with React Router ✓
  - Created `App.tsx` with React Router v6 routes
  - Built responsive `Navbar` component with navigation links
  - Implemented static pages: About, Projects, Achievements, Contact
  - Terminal stays on `/` route with global navigation
- **Task 3**: Content Pages ✓
  - About page: personal bio, skills, experience, education, languages
  - Projects page: responsive grid with project cards, tags, and links
  - Achievements page: timeline of certifications, awards, accomplishments
  - Contact page: contact form, social links, email, phone, location
- **Task 4**: Global state with Zustand (pending)

## Latest Implementation: Terminal Component

The terminal interface is the heart of the portfolio, providing an interactive command-line experience:

### Features
- **Real-time command parsing** with argument and option support
- **Auto-completion** with Tab key for commands
- **Command history** navigation with ↑/↓ arrows
- **Clean output formatting** with color-coded messages (success, error, info)
- **Welcome message** on first load
- **Fully responsive** design

### Structure
- `src/components/Terminal.tsx` - Main terminal UI component
- `src/hooks/useTerminal.ts` - State management and command execution logic
- `src/utils/commandParser.ts` - Command parsing, validation, and auto-completion utilities

### Supported Commands (Core)
- `help` - Display available commands
- `clear` - Clear terminal screen
- `exit` - Exit terminal session
- More commands (about, projects, achievements, contact, email, chat) to be implemented in subsequent tasks

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

### Task 3 Deliverables Completed

- Command specification: `docs/commands.md` - Complete reference for all terminal commands
- Wireframes: `docs/wireframes.md` - Detailed UI/UX design for terminal and static pages
- Command set defined: `help`, `about`, `projects`, `achievements`, `contact`, `email`, `chat`, `clear`, `exit`
- Terminal interface designed with CRT effects, color themes, and input/output states
- Static page wireframes for About, Projects, Achievements, Contact
- Responsive breakpoints and accessibility considerations documented

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
├── store/              # Zustand state management (pending)
├── utils/
│   └── commandParser.ts # Command parsing, validation, auto-completion
├── data/               # JSON data files
│   ├── personal.json
│   ├── projects.json
│   ├── achievements.json
│   └── contact.json
├── hooks/
│   └── useTerminal.ts  # Terminal state management
├── App.tsx             # Main app with React Router routes
├── main.tsx            # Entry point
└── index.css           # Global styles and Tailwind
```

## License

MIT
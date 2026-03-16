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

- **Phase 1 Task 1**: Project setup and tech stack configuration ✓
- **Phase 1 Task 2**: Data model and sample JSON files ✓
- **Phase 1 Task 3**: Wireframes and command documentation ✓
- **Phase 1 Task 4**: CI/CD pipeline configuration (pending)

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
├── components/     # Reusable UI components
├── pages/         # Page components
├── services/      # API and business logic
├── store/         # Zustand state management
├── utils/         # Helper functions
├── data/          # JSON data files
└── hooks/         # Custom React hooks
```

## License

MIT
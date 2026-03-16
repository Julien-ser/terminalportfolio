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
- **Phase 1 Task 4**: CI/CD pipeline configuration ✓

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
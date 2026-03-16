# Iteration 32 - terminalportfolio

**Timestamp:** Mon Mar 16 01:37:28 PM EDT 2026
**Task:** **Task 3:** Add keyboard navigation and accessibility: tab order, ARIA labels for elements, focus rings, skip-to-content link, high-contrast mode toggle. Run Lighthouse audit. *Deliverable:* Accessibility improvements merged, Lighthouse scores >90.

## Prompt Sent

```
# Project Agent Instructions (Step 3.5 Flash)

## ROLE DETECTION

**CRITICAL**: Before reading further, check your role:
```bash
cat .agent_role
```

**If your role is one of these SPECIALISTS:**
- `devops-engineer` → **STOP & LOAD**: `../../../agents/devops-engineer.md`
- `qa-specialist` → **STOP & LOAD**: `../../../agents/qa-specialist.md`
- `release-manager` → **STOP & LOAD**: `../../../agents/release-manager.md`
- `documentation-specialist` → **STOP & LOAD**: `../../../agents/documentation-specialist.md`
- `project-orchestrator` → **STOP & LOAD**: `../../../agents/project-orchestrator.md`

**If your role is:**
- `generic` → Continue reading this prompt (you're the full-stack developer)

---

**Available specialized agents** (description only, see full prompts in `/agents/`):
- `generic` - Full-stack developer, implement everything
- `devops-engineer` - CI/CD, infrastructure, GitHub Actions
- `qa-specialist` - Testing, quality assurance, test automation
- `release-manager` - Versioning, releases, deployment coordination
- `documentation-specialist` - Docs, READMEs, technical writing
- `project-orchestrator` - Coordination, task assignment, blocking issues

---

## GENERIC DEVELOPER MODE

## CORE MISSION
1. Read `TASKS.md`
2. Complete ONE task per iteration
3. Update `TASKS.md` with progress: Mark completed tasks with `[x]`
4. Commit & push to GitHub
5. Repeat until all tasks done

## CRITICAL: ALWAYS DO FIRST

**Task 0: GitHub Actions Workflow Setup** (Do before Task 1)

Detect tech stack from these files:
| File | Language |
|------|----------|
| `package.json` | Node.js |
| `pyproject.toml` or `requirements.txt` | Python |
| `go.mod` or `go.sum` | Go |
| `Cargo.toml` | Rust |
| `Gemfile` | Ruby |
| `pom.xml` or `build.gradle` | Java |
| `Dockerfile` (only) | Docker |
| None | Shell/Unknown |

Create `.github/workflows/test.yml` using the correct template:

<details>
<summary>Node.js Template</summary>

```yaml
name: Test & Validate (Node.js)
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: ['18.x', '20.x']
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    - run: npm ci
    - run: npm run lint || true
      continue-on-error: true
    - run: npm run build || true
      continue-on-error: true
    - run: npm test || true
      continue-on-error: true
```
</details>

<details>
<summary>Python Template</summary>

```yaml
name: Test & Validate (Python)
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ['3.11', '3.12']
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-python@v4
      with:
        python-version: ${{ matrix.python-version }}
    - run: pip install uv && uv pip install -e . || uv pip install -r requirements.txt
    - run: pip install pytest && pytest tests/ -v || true
      continue-on-error: true
```
</details>

<details>
<summary>Go Template</summary>

```yaml
name: Test & Validate (Go)
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        go-version: ['1.21', '1.22']
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-go@v4
      with:
        go-version: ${{ matrix.go-version }}
    - run: go mod download
    - run: go test -v ./...
```
</details>

<details>
<summary>Rust Template</summary>

```yaml
name: Test & Validate (Rust)
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions-rs/toolchain@v1
      with:
        toolchain: stable
    - run: cargo fmt -- --check
    - run: cargo test
```
</details>

**Then commit IMMEDIATELY:**
```bash
git add .github/workflows/test.yml TASKS.md
git commit -m "ci: setup github actions workflow"
git push origin main
```

## WORKFLOW (Every Iteration)

1. **Read the current task** from TASKS.md
2. **Understand requirements** - Ask clarifying questions if blocked
3. **Implement** - Write code/docs
4. **Test locally** - Verify it works
5. **Commit** - `git add . && git commit -m "Feature: description" && git push`
6. **Update TASKS.md** - Mark `[x]` when DONE
7. **Next iteration** - Move to next task

## CONSTRAINTS

- ❌ NO virtual environments (`venv`, `virtualenv`, `.venv`) unless absolutely necessary
- ❌ NO docker containers unless absolutely necessary
- ✅ Use system Python/Node.js directly
- ✅ Keep dependencies minimal
- ✅ Write tests alongside code
- ✅ Document all public functions
- ✅ Update README with usage examples

## FILE STRUCTURE
```
.
├── README.md          # How to run the project
├── TASKS.md          # Task list (you update this)
├── .github/workflows/test.yml  # CI pipeline you create
├── requirements.txt / package.json  # Dependencies
└── src/              # Your code
```

## SUCCESS CRITERIA (For Each Task)

✅ Code compiles/runs without errors  
✅ Tests pass locally  
✅ Documented (code comments + README update)  
✅ Committed to GitHub  
✅ Task marked `[x]` in TASKS.md  

## IF YOU GET STUCK

1. **Document the issue** in TASKS.md as a note
2. **Move to next task** - don't block progress
3. **Continue** - come back to it later
4. **Never delete tasks** - mark as blocked with explanation

## GIT WORKFLOW (Exact Commands)

```bash
# After making changes:
git add .
git commit -m "Feature: [brief description]"
git push origin main

# Push any new branches:
git push origin [branch-name]

# Force update after rebasing (only if needed):
git push origin main --force-with-lease
```

## EXECUTION MODE

- Process ONE task per iteration
- Be efficient - no lengthy explanations
- Prefer code over documentation
- Use short, descriptive commit messages
- Push to GitHub after every task completion

---

## ROLE-SPECIFIC QUICK START

### If `.agent_role = qa-specialist`
Load full instructions: `../../../agents/qa-specialist.md`

**Quick mission:**
1. Review TASKS.md for testing-related tasks
2. Create/enhance test files (`tests/`, `__tests__/`, `spec/`)
3. Run test suites locally and validate coverage
4. Update `.github/workflows/test.yml` with test steps
5. Document test setup in README
6. Commit: `git commit -m "test: [what tests you added]"`

### If `.agent_role = devops-engineer`
Load full instructions: `../../../agents/devops-engineer.md`

**Quick mission:**
1. Review TASKS.md for CI/CD and infra tasks
2. Create/enhance `.github/workflows/test.yml` and `deploy-*.yml`
3. Set up GitHub environments if needed
4. Test workflows locally with `act` tool (optional)
5. Document deployment process in README
6. Commit: `git commit -m "ci: [workflow changes]"`

### If `.agent_role = release-manager`
Load full instructions: `../../../agents/release-manager.md`

**Quick mission:**
1. Review TASKS.md for version/release tasks
2. Update version numbers in files (`package.json`, `setup.py`, etc.)
3. Create/update CHANGELOG or release notes
4. Tag releases: `git tag -a v1.0.0 -m "Release 1.0.0"`
5. Push tags: `git push origin --tags`
6. Commit: `git commit -m "chore: bump version to v1.0.0"`

### If `.agent_role = documentation-specialist`
Load full instructions: `../../../agents/documentation-specialist.md`

**Quick mission:**
1. Review TASKS.md for docs-related tasks
2. Update/expand README.md with usage examples
3. Add API/function documentation (docstrings)
4. Create/update CONTRIBUTING.md, SETUP.md, TROUBLESHOOTING.md
5. Validate all code examples work
6. Commit: `git commit -m "docs: [what documentation you added]"`

### If `.agent_role = project-orchestrator`
Load full instructions: `../../../agents/project-orchestrator.md`

**Quick mission:**
1. Review TASKS.md and identify blockers/dependencies
2. Plan which tasks can run in parallel
3. Assign work to specialists (update `.agent_role` as needed)
4. Track progress and update status
5. Escalate blockers and risks
6. Commit: `git commit -m "chore: priority update - [what changed]"`

---

## CALLING SPECIALIZED AGENTS

If a task needs a specialist you can't handle alone, update `.agent_role`:

```bash
# Switch to a specialist for specific work
echo "devops-engineer" > .agent_role
git add .agent_role
git commit -m "ops: switch to devops-engineer for CI/CD setup"
git push origin main
```

After switching, the next iteration will load that agent's expertise.

**Common task-to-agent mappings:**
- Implementing feature → Stay as `generic`
- Need tests? → Switch to `qa-specialist`
- Ready to release? → Switch to `release-manager`
- Need better docs? → Switch to `documentation-specialist`
- Complex multi-part work? → Switch to `project-orchestrator`
- Setting up CI/CD? → Switch to `devops-engineer`

Switch back to `generic` when the specialist work is done.

---

**Now start: Check `.agent_role` and read TASKS.md**

---

### ⚠️ CRITICAL TOKEN CONSTRAINTS:
- Iteration: 32 / 64k Token Budget
- Attempt: 2 (previous attempts may have partial progress)
- **Mandate:** Operate efficiently. Use partial edits, not full file rewrites when possible.
- **Output:** Be concise and action-oriented.


## CURRENT PROJECT STATE (Iteration 32)

```
# terminalportfolio
**Mission:** create an aesthetic portfolio website template with projects, achievements and many pages, but homepage is a terminal interface that allows the user to read more about the person, like contact info, email, and mainly a chatbot/rag implmentation for answering interview or general questions as well!

## Phase 1: Planning & Setup
- [x] **Task 1:** Choose tech stack (React/Vite + TypeScript + Tailwind CSS + React Router + Vercel), justify choices in README. Install Node.js v18+, create repository, and commit initial scaffold. *Deliverable:* `package.json` with dependencies, `.gitignore`, `README.md` with stack rationale.
- [x] **Task 2:** Design data model for portfolio: define JSON schemas for `projects`, `achievements`, `contact`, and `personal_info`. Create sample data files under `src/data/`. *Deliverable:* `src/data/projects.json`, `achievements.json`, `contact.json`, `personal.json` with realistic dummy content.
- [x] **Task 3:** Create wireframes for terminal interface and all static pages (About, Projects, Achievements, Contact). Define terminal command set (e.g., `help`, `about`, `projects`, `achievements`, `contact`, `email`, `chat`, `clear`, `exit`). Document command syntax and help text. *Deliverable:* Wireframes (Figma/draw.io) and `docs/commands.md`.
- [x] **Task 4:** Configure CI/CD pipeline using GitHub Actions to build and deploy preview on push to `main`. Set up Vercel project and link repository. *Deliverable:* `.github/workflows/vercel-deploy.yml`, Vercel project live URL.

## Phase 2: Core Infrastructure
- [x] **Task 1:** Build Terminal UI component: input line with prompt, command history output, and auto-completion for commands using Tailwind CSS. Implement command parser with validation. *Deliverable:* `src/components/Terminal.tsx`, `src/hooks/useTerminal.ts`, and `src/utils/commandParser.ts`.
- [x] **Task 2:** Implement client-side routing with React Router v6 for static pages and ensure terminal stays on `/` route. Create layout with navigation bar linking to pages (except terminal). *Deliverable:* `src/App.tsx` with routes, `src/components/Navbar.tsx`.
- [x] **Task 3:** Develop Content Pages: About (personal bio + skills), Projects (grid with cards, tags, links), Achievements (timeline/list), Contact (email form/links). Use data from JSON. *Deliverable:* `src/pages/About.tsx`, `Projects.tsx`, `Achievements.tsx`, `Contact.tsx`.
- [x] **Task 4:** Set up global state with Zustand to load portfolio data once and share across pages and terminal. Add loading states and error handling. *Deliverable:* `src/store/usePortfolioStore.ts`, updated pages/terminal consuming store.

## Phase 3: RAG Implementation
- [x] **Task 1:** Integrate LLM service using OpenAI API (`gpt-4-turbo` or `gpt-3.5-turbo`). Create streaming response handler with `fetch`. Manage API key via env (`.env.local`). *Deliverable:* `src/services/llmService.ts` with `streamChat(messages)` function. ✓ Completed: `llmService.ts` with streaming support, TypeScript types, and error handling. Added `vite-env.d.ts` for environment variable typing. Updated `.env.example` and README.md with setup instructions.
- [x] **Task 2:** Build document ingestion pipeline: load portfolio markdown/text (from `src/data/docs/`), chunk using LangChain's `RecursiveCharacterTextSplitter`, generate embeddings via `text-embedding-ada-002`. *Deliverable:* `src/services/embeddingService.ts`, `scripts/ingest.js` to produce `embeddings.json`. ✓ Completed: Created markdown files in `src/data/docs/` (about.md, projects.md, achievements.md, contact.md). Implemented `embeddingService.ts` with chunking and embedding functions. Created `scripts/ingest.js` that generates `embeddings.json`. Added `npm run ingest` script and updated README.
- [x] **Task 3:** Set up vector database: use Chroma (local) or Pinecone (cloud). Create index from embeddings, storing metadata (source, chunk id). Implement `search(query, topK)` function. *Deliverable:* `src/services/vectorService.ts`, `scripts/create-index.js`, index files or Pinecone index.
- [x] **Task 4:** Implement RAG-powered chatbot within terminal: add `chat` command that enters multi-turn mode. Retrieve relevant context, construct prompt with history, stream LLM response. Handle token limits and context pruning. *Deliverable:* `src/services/chatService.ts` with `ragConversation()`, terminal updates to support interactive chat.

## Phase 4: UI/UX Polish & Deployment
- [x] **Task 1:** Enhance terminal aesthetics: add CRT scanline overlay, text glow, typing animation for output, custom scrollbar, monospace font (Fira Code). Use a retro palette (green/amber on black). *Deliverable:* `src/components/Terminal.css` with animations, updated `Terminal.tsx` applying effects.
- [x] **Task 2:** Ensure responsive design: adapt terminal and pages for mobile/tablet via Tailwind breakpoints. Test on device emulation. Remove horizontal overflow, adjust font sizes. *Deliverable:* Responsive styles applied, verified on Chrome DevTools.
- [ ] **Task 3:** Add keyboard navigation and accessibility: tab order, ARIA labels for elements, focus rings, skip-to-content link, high-contrast mode toggle. Run Lighthouse audit. *Deliverable:* Accessibility improvements merged, Lighthouse scores >90.
- [ ] **Task 4:** Final performance optimization: code splitting with React.lazy, image lazy loading, preconnect to font/CDN, compress assets. Deploy to production, run end-to-end tests, fix any issues. *Deliverable:* Live production URL, Lighthouse scores >90 performance, `README.md` with setup and deployment instructions.
```
```

## NEXT TASK TO COMPLETE:
**Task 3:** Add keyboard navigation and accessibility: tab order, ARIA labels for elements, focus rings, skip-to-content link, high-contrast mode toggle. Run Lighthouse audit. *Deliverable:* Accessibility improvements merged, Lighthouse scores >90.

**Instructions:** Complete this task. Mark [x] in TASKS.md when done. Create, modify, or delete files as needed. Execute commands as needed. Also update README.md to match this project (name, setup instructions, current progress). No permission needed—just act.
```

## OpenCode Output

```
[0m
> build · stepfun/step-3.5-flash:free
[0m
I'll help you complete Task 3: Add keyboard navigation and accessibility improvements. Let me start by exploring the current codebase to understand what needs to be enhanced.
[0m→ [0mRead TASKS.md
[0m
[0m$ [0mls -la
total 292
drwxr-xr-x  10 julien julien   4096 Mar 16 12:51 .
drwxr-xr-x  24 julien julien   4096 Mar 16 11:36 ..
-rw-r--r--   1 julien julien      8 Mar 16 11:35 .agent_role
drwxr-xr-x   3 julien julien   4096 Mar 16 13:37 dist
drwxr-xr-x   2 julien julien   4096 Mar 16 11:30 docs
-rw-r--r--   1 julien julien    725 Mar 16 13:07 .env.example
drwxr-xr-x   7 julien julien   4096 Mar 16 13:30 .git
drwxr-xr-x   3 julien julien   4096 Mar 16 11:22 .github
-rw-r--r--   1 julien julien    371 Mar 16 11:25 .gitignore
-rw-r--r--   1 julien julien    628 Mar 16 13:17 index.html
drwxr-xr-x   2 julien julien   4096 Mar 16 13:37 logs
drwxr-xr-x 250 julien julien  12288 Mar 16 13:07 node_modules
-rw-r--r--   1 julien julien   1142 Mar 16 13:07 package.json
-rw-r--r--   1 julien julien 166608 Mar 16 13:07 package-lock.json
-rw-r--r--   1 julien julien   9218 Mar 16 11:22 prompt.txt
-rw-r--r--   1 julien julien  12250 Mar 16 13:30 README.md
drwxr-xr-x   2 julien julien   4096 Mar 16 13:06 scripts
drwxr-xr-x  10 julien julien   4096 Mar 16 13:32 src
-rw-r--r--   1 julien julien    260 Mar 16 13:17 tailwind.config.js
-rw-r--r--   1 julien julien   5620 Mar 16 13:30 TASKS.md
-rw-r--r--   1 julien julien   5113 Mar 16 11:23 TASKS_original.md
-rw-r--r--   1 julien julien    627 Mar 16 11:49 tsconfig.json
-rw-r--r--   1 julien julien    233 Mar 16 11:49 tsconfig.node.json
-rw-r--r--   1 julien julien    668 Mar 16 11:37 vercel.json
-rw-r--r--   1 julien julien      6 Mar 16 11:35 .worker_persistent_mode
[0m
[0m→ [0mRead src
[0m✱ [0mGlob "src/**/*.tsx"[90m 9 matches[0m
[0m✱ [0mGlob "src/**/*.ts"[90m 8 matches[0m
[0m→ [0mRead src/contexts/AccessibilityContext.tsx
[0m→ [0mRead src/components/Terminal.tsx
[0m→ [0mRead src/components/Navbar.tsx
[0m→ [0mRead src/App.tsx
Let me examine the existing components and accessibility context:
Let me now check the page components and CSS to see what additional accessibility improvements are needed:
[0m→ [0mRead src/pages/About.tsx
[0m→ [0mRead src/pages/Projects.tsx
[0m→ [0mRead src/index.css
[0m→ [0mRead src/pages/Contact.tsx
[0m→ [0mRead src/pages/Achievements.tsx
Let me check the Terminal.css to ensure focus styles are properly defined:
[0m→ [0mRead src/components/Terminal.css
[0m→ [0mRead README.md[90m [limit=100][0m
Now let me check the current README to understand the project setup:
[0m
[0m# [0mTodos
[ ] Add semantic HTML landmarks to all pages (main, article, section roles)
[ ] Improve form accessibility with aria-describedby and error associations
[ ] Add prefers-reduced-motion support for animations
[ ] Implement focus trap for terminal chat mode
[ ] Improve skip-to-content link behavior for terminal
[ ] Add keyboard shortcuts documentation in README and help command
[ ] Build project and run Lighthouse audit
[ ] Fix any Lighthouse issues and verify scores >90
[ ] Update TASKS.md to mark Task 3 as complete
[0m
Now let me create a todo list to track the accessibility improvements needed:
[0m# [0mTodos
[ ] Add semantic HTML landmarks to all pages (main, article, section roles)
[ ] Improve form accessibility with aria-describedby and error associations
[ ] Add prefers-reduced-motion support for animations
[ ] Implement focus trap for terminal chat mode
[ ] Improve skip-to-content link behavior for terminal
[ ] Add keyboard shortcuts documentation in README and help command
[ ] Build project and run Lighthouse audit
[ ] Fix any Lighthouse issues and verify scores >90
[ ] Update TASKS.md to mark Task 3 as complete
[0m
Let me start by improving semantic HTML and landmarks on the pages. I'll update each page to use proper semantic elements and ARIA roles:
[0m← [0mEdit src/pages/About.tsx
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/terminalportfolio/src/pages/About.tsx
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/terminalportfolio/src/pages/About.tsx
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/terminalportfolio/src/pages/About.tsx
@@ -31,73 +31,70 @@
 const { name, title, bio, avatar, resumeUrl, skills, languages, education, experience } = personal;
 
 return (
   <div className="min-h-screen bg-black text-gray-300 p-4 sm:p-6 overflow-x-hidden">
-    <div className="max-w-4xl mx-auto">
+    <div className="max-w-4xl mx-auto" role="main">
       <header className="mb-6 sm:mb-8">
         <h1 className="text-2xl sm:text-4xl font-bold text-green-400 mb-2">{name}</h1>
         <p className="text-base sm:text-xl text-gray-400">{title}</p>
       </header>
 
-      <div className="grid md:grid-cols-3 gap-4 sm:gap-8 mb-6 sm:mb-8">
-        <div className="md:col-span-1">
+      <article className="grid md:grid-cols-3 gap-4 sm:gap-8 mb-6 sm:mb-8">
+        <section className="md:col-span-1" aria-labelledby="profile-heading">
           <div className="bg-gray-900 border border-green-800 rounded-lg p-3 sm:p-4">
             <img
               src={avatar}
-              alt={`${name}'s avatar`}
+              alt={`${name}'s profile avatar`}
               className="w-full rounded mb-3 sm:mb-4"
               onError={(e) => {
                 (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23333" width="200" height="200"/%3E%3Ctext fill="%23777" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EAvatar%3C/text%3E%3C/svg%3E';
               }}
             />
              <a
-               href={resumeUrl}
-               className="block w-full text-center bg-green-800 hover:bg-green-700 text-white py-2 px-3 sm:px-4 rounded transition-colors text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-400"
-               aria-label={`Download ${name}'s resume`}
-             >
-               Download Resume
-             </a>
+              href={resumeUrl}
+              className="block w-full text-center bg-green-800 hover:bg-green-700 text-white py-2 px-3 sm:px-4 rounded transition-colors text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-400"
+              aria-label={`Download ${name}'s resume`}
+            >
+              Download Resume
+            </a>
           </div>
-        </div>
+        </section>
 
-        <div className="md:col-span-2">
-          <section className="mb-6">
-            <h2 className="text-lg sm:text-2xl font-semibold text-green-400 mb-3">About Me</h2>
-            <p className="text-sm sm:text-base whitespace-pre-line">{bio}</p>
-          </section>
+        <section className="md:col-span-2">
+          <h2 id="about-heading" className="text-lg sm:text-2xl font-semibold text-green-400 mb-3">About Me</h2>
+          <p className="text-sm sm:text-base whitespace-pre-line">{bio}</p>
 
-          <section className="mb-6">
-            <h2 className="text-lg sm:text-2xl font-semibold text-green-400 mb-3">Experience</h2>
-            <div className="space-y-4">
-              {experience.map((exp) => (
-                <div key={exp.role} className="border-l-2 border-green-800 pl-4">
-                  <h3 className="font-semibold text-white text-sm sm:text-base">{exp.role}</h3>
-                  <p className="text-gray-400 text-sm">{exp.company} | {exp.duration}</p>
-                  <ul className="mt-2 list-disc list-inside text-xs sm:text-sm text-gray-300">
-                    {exp.highlights.map((highlight, idx) => (
-                      <li key={idx}>{highlight}</li>
-                    ))}
-                  </ul>
-                </div>
-              ))}
-            </div>
-          </section>
-        </div>
-      </div>
+          <h2 id="experience-heading" className="text-lg sm:text-2xl font-semibold text-green-400 mb-3 mt-6">Experience</h2>
+          <div className="space-y-4" role="list">
+            {experience.map((exp) => (
+              <article key={exp.role} className="border-l-2 border-green-800 pl-4" role="listitem">
+                <h3 className="font-semibold text-white text-sm sm:text-base">{exp.role}</h3>
+                <p className="text-gray-400 text-sm">{exp.company} | {exp.duration}</p>
+                <ul className="mt-2 list-disc list-inside text-xs sm:text-sm text-gray-300">
+                  {exp.highlights.map((highlight, idx) => (
+                    <li key={idx}>{highlight}</li>
+                  ))}
+                </ul>
+              </article>
+            ))}
+          </div>
+        </section>
+      </article>
 
       <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
-        <section className="mb-6">
-          <h2 className="text-lg sm:text-2xl font-semibold text-green-400 mb-3">Skills</h2>
+        <section aria-labelledby="skills-heading">
+          <h2 id="skills-heading" className="text-lg sm:text-2xl font-semibold text-green-400 mb-3">Skills</h2>
           {Object.entries(skills).map(([category, items]) => (
             <div key={category} className="mb-4">
               <h3 className="text-base sm:text-lg font-medium text-gray-300 capitalize mb-2">
                 {category}
               </h3>
-              <div className="flex flex-wrap gap-2">
+              <div className="flex flex-wrap gap-2" role="list">
                 {items.map((skill: { name: string; proficiency: string }) => (
                   <span
                     key={skill.name}
                     className="bg-gray-900 border border-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
+                    role="listitem"
                   >
                     {skill.name} <span className="text-gray-500 text-xs">({skill.proficiency})</span>
                   </span>
                 ))}
@@ -105,30 +102,31 @@
             </div>
           ))}
         </section>
 
-        <section className="mb-6">
-          <h2 className="text-lg sm:text-2xl font-semibold text-green-400 mb-3">Education</h2>
-          <div className="space-y-3">
+        <section aria-labelledby="education-heading">
+          <h2 id="education-heading" className="text-lg sm:text-2xl font-semibold text-green-400 mb-3">Education</h2>
+          <div className="space-y-3" role="list">
             {education.map((edu) => (
-              <div key={edu.degree} className="border-l-2 border-green-800 pl-4">
+              <article key={edu.degree} className="border-l-2 border-green-800 pl-4" role="listitem">
                 <h3 className="font-semibold text-white text-sm sm:text-base">{edu.degree}</h3>
                 <p className="text-gray-400 text-sm">{edu.institution} | {edu.year}</p>
                 <ul className="mt-1 list-disc list-inside text-xs sm:text-sm text-gray-300">
                   {edu.highlights.map((h: string, idx: number) => (
                     <li key={idx}>{h}</li>
                   ))}
                 </ul>
-              </div>
+              </article>
             ))}
           </div>
 
-          <h2 className="text-lg sm:text-2xl font-semibold text-green-400 mb-3 mt-6">Languages</h2>
-          <div className="flex flex-wrap gap-2">
+          <h2 id="languages-heading" className="text-lg sm:text-2xl font-semibold text-green-400 mb-3 mt-6">Languages</h2>
+          <div className="flex flex-wrap gap-2" role="list">
             {languages.map((lang) => (
               <span
                 key={lang.language}
                 className="bg-gray-900 border border-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
+                role="listitem"
               >
                 {lang.language} ({lang.level})
               </span>
             ))}

[0m
Now update Projects.tsx with semantic HTML:
[0m← [0mEdit src/pages/Projects.tsx
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/terminalportfolio/src/pages/Projects.tsx
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/terminalportfolio/src/pages/Projects.tsx
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/terminalportfolio/src/pages/Projects.tsx
@@ -29,31 +29,32 @@
 }
 
 return (
   <div className="min-h-screen bg-black text-gray-300 p-4 sm:p-6 overflow-x-hidden">
-    <div className="max-w-6xl mx-auto">
+    <div className="max-w-6xl mx-auto" role="main">
       <header className="mb-6 sm:mb-8">
         <h1 className="text-2xl sm:text-4xl font-bold text-green-400">Projects</h1>
         <p className="text-gray-400 mt-2 text-sm sm:text-base">A selection of my recent work</p>
       </header>
 
-      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
+      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" role="list">
         {projects.map((project) => (
-          <div
+          <article
             key={project.id}
             className="bg-gray-900 border border-green-800 rounded-lg overflow-hidden hover:border-green-600 transition-colors flex flex-col"
+            role="listitem"
           >
             <div className="h-40 sm:h-48 bg-gray-800 relative flex-shrink-0">
               <img
                 src={project.image}
-                alt={project.title}
+                alt={`Project: ${project.title}. ${project.shortDescription}`}
                 className="w-full h-full object-cover"
                 onError={(e) => {
                   (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23333" width="400" height="300"/%3E%3Ctext fill="%23777" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EProject Image%3C/text%3E%3C/svg%3E';
                 }}
               />
               {project.featured && (
-                <span className="absolute top-2 right-2 bg-green-800 text-green-200 px-2 py-1 text-xs rounded">
+                <span className="absolute top-2 right-2 bg-green-800 text-green-200 px-2 py-1 text-xs rounded" aria-label="Featured project">
                   Featured
                 </span>
               )}
             </div>
@@ -62,19 +63,20 @@
               <h2 className="text-lg sm:text-xl font-semibold text-green-300 mb-2">{project.title}</h2>
               <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 flex-1">{project.shortDescription}</p>
 
               <div className="mb-3 sm:mb-4">
-                <div className="flex flex-wrap gap-1 mb-2">
+                <div className="flex flex-wrap gap-1 mb-2" role="list" aria-label="Technologies used">
                   {project.technologies.slice(0, 4).map((tech) => (
                     <span
                       key={tech}
                       className="bg-gray-800 text-xs px-2 py-1 rounded text-gray-300"
+                      role="listitem"
                     >
                       {tech}
                     </span>
                   ))}
                   {project.technologies.length > 4 && (
-                    <span className="bg-gray-800 text-xs px-2 py-1 rounded text-gray-400">
+                    <span className="bg-gray-800 text-xs px-2 py-1 rounded text-gray-400" aria-label={`${project.technologies.length - 4} more technologies`}>
                       +{project.technologies.length - 4}
                     </span>
                   )}
                 </div>
@@ -113,9 +115,9 @@
                   </a>
                 )}
               </div>
             </div>
-          </div>
+          </article>
         ))}
       </div>
     </div>
   </div>

[0m
Now update Achievements.tsx with semantic HTML:
[0m← [0mEdit src/pages/Achievements.tsx
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/terminalportfolio/src/pages/Achievements.tsx
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/terminalportfolio/src/pages/Achievements.tsx
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/terminalportfolio/src/pages/Achievements.tsx
@@ -29,22 +29,23 @@
 }
 
 return (
   <div className="min-h-screen bg-black text-gray-300 p-4 sm:p-6 overflow-x-hidden">
-    <div className="max-w-4xl mx-auto">
+    <div className="max-w-4xl mx-auto" role="main">
       <header className="mb-6 sm:mb-8">
         <h1 className="text-2xl sm:text-4xl font-bold text-green-400">Achievements</h1>
         <p className="text-gray-400 mt-2 text-sm sm:text-base">Certifications, awards, and recognitions</p>
       </header>
 
-      <div className="space-y-4">
+      <div className="space-y-4" role="list">
         {achievements.map((achievement) => (
-          <div
+          <article
             key={achievement.id}
             className="bg-gray-900 border border-green-800 rounded-lg p-4 sm:p-6 hover:border-green-600 transition-colors"
+            role="listitem"
           >
             <div className="flex items-start gap-3 sm:gap-4">
-              <span className="text-2xl sm:text-4xl">{achievement.icon}</span>
+              <span className="text-2xl sm:text-4xl" aria-hidden="true">{achievement.icon}</span>
               <div className="flex-1">
                 <h2 className="text-lg sm:text-xl font-semibold text-green-300 mb-1">
                   {achievement.title}
                 </h2>
@@ -53,9 +54,9 @@
                 </p>
                 <p className="text-gray-300 text-sm sm:text-base mb-3">{achievement.description}</p>
 
                 <div className="flex gap-2">
-                  <span className="bg-gray-800 text-xs px-2 py-1 rounded text-gray-400 capitalize">
+                  <span className="bg-gray-800 text-xs px-2 py-1 rounded text-gray-400 capitalize" aria-label={`Achievement type: ${achievement.type}`}>
                     {achievement.type}
                   </span>
                   {achievement.url && (
                     <a
@@ -70,9 +71,9 @@
                   )}
                 </div>
               </div>
             </div>
-          </div>
+          </article>
         ))}
       </div>
     </div>
   </div>

[0m
Now update Contact.tsx with semantic HTML and improved form accessibility. I'll add error handling with aria-describedby:
[0m← [0mEdit src/pages/Contact.tsx
Index: /home/julien/Desktop/Free-Wiggum-opencode/projects/terminalportfolio/src/pages/Contact.tsx
===================================================================
--- /home/julien/Desktop/Free-Wiggum-opencode/projects/terminalportfolio/src/pages/Contact.tsx
+++ /home/julien/Desktop/Free-Wiggum-opencode/projects/terminalportfolio/src/pages/Contact.tsx
@@ -9,19 +9,54 @@
   subject: '',
   message: '',
 });
 const [submitted, setSubmitted] = useState(false);
+const [errors, setErrors] = useState<Record<string, string>>({});
 
 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
-  setFormData({ ...formData, [e.target.name]: e.target.value });
+  const { name, value } = e.target;
+  setFormData({ ...formData, [name]: value });
+  // Clear error when user starts typing
+  if (errors[name]) {
+    setErrors(prev => ({ ...prev, [name]: '' }));
+  }
 };
 
+const validateForm = (): boolean => {
+  const newErrors: Record<string, string> = {};
+
+  if (!formData.name.trim()) {
+    newErrors.name = 'Name is required';
+  }
+
+  if (!formData.email.trim()) {
+    newErrors.email = 'Email is required';
+  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
+    newErrors.email = 'Please enter a valid email address';
+  }
+
+  if (!formData.subject.trim()) {
+    newErrors.subject = 'Subject is required';
+  }
+
+  if (!formData.message.trim()) {
+    newErrors.message = 'Message is required';
+  }
+
+  setErrors(newErrors);
+  return Object.keys(newErrors).length === 0;
+};
+
 const handleSubmit = (e: React.FormEvent) => {
   e.preventDefault();
+  if (!validateForm()) {
+    return;
+  }
   // In a real implementation, this would send the data to a backend
   alert(`Thanks for your message, ${formData.name}! I'll get back to you soon.`);
   setFormData({ name: '', email: '', subject: '', message: '' });
   setSubmitted(true);
+  setErrors({});
   setTimeout(() => setSubmitted(false), 3000);
 };
 
 if (isLoading) {

[0m
```

## TASKS.md After Iteration

```markdown
# terminalportfolio
**Mission:** create an aesthetic portfolio website template with projects, achievements and many pages, but homepage is a terminal interface that allows the user to read more about the person, like contact info, email, and mainly a chatbot/rag implmentation for answering interview or general questions as well!

## Phase 1: Planning & Setup
- [x] **Task 1:** Choose tech stack (React/Vite + TypeScript + Tailwind CSS + React Router + Vercel), justify choices in README. Install Node.js v18+, create repository, and commit initial scaffold. *Deliverable:* `package.json` with dependencies, `.gitignore`, `README.md` with stack rationale.
- [x] **Task 2:** Design data model for portfolio: define JSON schemas for `projects`, `achievements`, `contact`, and `personal_info`. Create sample data files under `src/data/`. *Deliverable:* `src/data/projects.json`, `achievements.json`, `contact.json`, `personal.json` with realistic dummy content.
- [x] **Task 3:** Create wireframes for terminal interface and all static pages (About, Projects, Achievements, Contact). Define terminal command set (e.g., `help`, `about`, `projects`, `achievements`, `contact`, `email`, `chat`, `clear`, `exit`). Document command syntax and help text. *Deliverable:* Wireframes (Figma/draw.io) and `docs/commands.md`.
- [x] **Task 4:** Configure CI/CD pipeline using GitHub Actions to build and deploy preview on push to `main`. Set up Vercel project and link repository. *Deliverable:* `.github/workflows/vercel-deploy.yml`, Vercel project live URL.

## Phase 2: Core Infrastructure
- [x] **Task 1:** Build Terminal UI component: input line with prompt, command history output, and auto-completion for commands using Tailwind CSS. Implement command parser with validation. *Deliverable:* `src/components/Terminal.tsx`, `src/hooks/useTerminal.ts`, and `src/utils/commandParser.ts`.
- [x] **Task 2:** Implement client-side routing with React Router v6 for static pages and ensure terminal stays on `/` route. Create layout with navigation bar linking to pages (except terminal). *Deliverable:* `src/App.tsx` with routes, `src/components/Navbar.tsx`.
- [x] **Task 3:** Develop Content Pages: About (personal bio + skills), Projects (grid with cards, tags, links), Achievements (timeline/list), Contact (email form/links). Use data from JSON. *Deliverable:* `src/pages/About.tsx`, `Projects.tsx`, `Achievements.tsx`, `Contact.tsx`.
- [x] **Task 4:** Set up global state with Zustand to load portfolio data once and share across pages and terminal. Add loading states and error handling. *Deliverable:* `src/store/usePortfolioStore.ts`, updated pages/terminal consuming store.

## Phase 3: RAG Implementation
- [x] **Task 1:** Integrate LLM service using OpenAI API (`gpt-4-turbo` or `gpt-3.5-turbo`). Create streaming response handler with `fetch`. Manage API key via env (`.env.local`). *Deliverable:* `src/services/llmService.ts` with `streamChat(messages)` function. ✓ Completed: `llmService.ts` with streaming support, TypeScript types, and error handling. Added `vite-env.d.ts` for environment variable typing. Updated `.env.example` and README.md with setup instructions.
- [x] **Task 2:** Build document ingestion pipeline: load portfolio markdown/text (from `src/data/docs/`), chunk using LangChain's `RecursiveCharacterTextSplitter`, generate embeddings via `text-embedding-ada-002`. *Deliverable:* `src/services/embeddingService.ts`, `scripts/ingest.js` to produce `embeddings.json`. ✓ Completed: Created markdown files in `src/data/docs/` (about.md, projects.md, achievements.md, contact.md). Implemented `embeddingService.ts` with chunking and embedding functions. Created `scripts/ingest.js` that generates `embeddings.json`. Added `npm run ingest` script and updated README.
- [x] **Task 3:** Set up vector database: use Chroma (local) or Pinecone (cloud). Create index from embeddings, storing metadata (source, chunk id). Implement `search(query, topK)` function. *Deliverable:* `src/services/vectorService.ts`, `scripts/create-index.js`, index files or Pinecone index.
- [x] **Task 4:** Implement RAG-powered chatbot within terminal: add `chat` command that enters multi-turn mode. Retrieve relevant context, construct prompt with history, stream LLM response. Handle token limits and context pruning. *Deliverable:* `src/services/chatService.ts` with `ragConversation()`, terminal updates to support interactive chat.

## Phase 4: UI/UX Polish & Deployment
- [x] **Task 1:** Enhance terminal aesthetics: add CRT scanline overlay, text glow, typing animation for output, custom scrollbar, monospace font (Fira Code). Use a retro palette (green/amber on black). *Deliverable:* `src/components/Terminal.css` with animations, updated `Terminal.tsx` applying effects.
- [x] **Task 2:** Ensure responsive design: adapt terminal and pages for mobile/tablet via Tailwind breakpoints. Test on device emulation. Remove horizontal overflow, adjust font sizes. *Deliverable:* Responsive styles applied, verified on Chrome DevTools.
- [ ] **Task 3:** Add keyboard navigation and accessibility: tab order, ARIA labels for elements, focus rings, skip-to-content link, high-contrast mode toggle. Run Lighthouse audit. *Deliverable:* Accessibility improvements merged, Lighthouse scores >90.
- [ ] **Task 4:** Final performance optimization: code splitting with React.lazy, image lazy loading, preconnect to font/CDN, compress assets. Deploy to production, run end-to-end tests, fix any issues. *Deliverable:* Live production URL, Lighthouse scores >90 performance, `README.md` with setup and deployment instructions.
```
```

**Completed at:** Mon Mar 16 01:40:26 PM EDT 2026

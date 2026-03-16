# Wireframes & UI Design Specification

This document contains visual wireframes and layout specifications for the terminal portfolio website.

---

## 1. Terminal Homepage Interface

### 1.1 Full Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   ╔═══════════════════════════════════════════════════════════════════╗ │
│   ║                                                                   ║ │
│   ║   ████████╗ ███████╗ ██╗  ██╗ █████╗ ██████╗ ████████╗          ║ │
│   ║   ╚══██╔══╝ ██╔════╝ ██║  ██║██╔══██╗██╔══██╗╚══██╔══╝          ║ │
│   ║      ██║    █████╗   ███████║███████║██████╔╝   ██║             ║ │
│   ║      ██║    ██╔══╝   ██╔══██║██╔══██║██╔═══╝    ██║             ║ │
│   ║      ██║    ███████╗ ██║  ██║██║  ██║██║        ██║             ║ │
│   ║      ╚═╝    ╚══════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝        ╚═╝             ║ │
│   ║                                                                   ║ │
│   ║   Welcome to my interactive portfolio!                          ║ │
│   ║   Type 'help' to see available commands.                        ║ │
│   ║                                                                   ║ │
│   ║   visitor@portfolio:~$ help                                      ║ │
│   ║                                                                   ║ │
│   ║   Available commands:                                            ║ │
│   ║   · about       - Personal information & bio                    ║ │
│   ║   · projects    - View my projects                              ║ │
│   ║   · achievements- Career highlights & awards                   ║ │
│   ║   · contact     - Get in touch                                  ║ │
│   ║   · chat        - Ask me anything (RAG-powered)                ║ │
│   ║   · clear       - Clear terminal screen                         ║ │
│   ║                                                                   ║ │
│   ║   Try typing 'about' or 'chat' to get started!                  ║ │
│   ║                                                                   ║ │
│   ╚═══════════════════════════════════════════════════════════════════╝ │
│                                                                         │
│   ┌───────────────────────────────────────────────────────────────────┐ │
│   │ visitor@portfolio:~$                                               │ │
│   └───────────────────────────────────────────────────────────────────┘ │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Components:**
- Header: ASCII art banner with name/logo
- Welcome message: Brief introduction
- Command history: Previous outputs with prompt and results
- Input line: Fixed at bottom, includes prompt `visitor@portfolio:~$`
- Scrollable area: Command history with custom scrollbar
- CRT effects: Scanlines, subtle glow, optional flicker

**Colors (Dark Theme - Default):**
- Background: `#0a0a0a` (near black)
- Text: `#00ff00` (terminal green) or `#ffb000` (amber)
- Prompt: `#00ff00` (bright green)
- Input: `#00ff00` (matching prompt)
- Header text: `#00ff00` with glow effect
- Commands: `#00ffff` (cyan) for command names
- Output: `#e0e0e0` (light gray) for regular text
- Links: `#ff6b6b` (soft red) underlined
- Error: `#ff4444` (red)
- Success: `#44cc44` (green)

---

### 1.2 Terminal Input States

**Idle State:**
```
┌─────────────────────────────────────┐
│ visitor@portfolio:~$                │
└─────────────────────────────────────┘
```

**Typing State:**
```
┌─────────────────────────────────────┐
│ visitor@portfolio:~$ about --skill  │  ← Cursor blinking here
└─────────────────────────────────────┘
```

**Processing State:**
```
┌─────────────────────────────────────┐
│ visitor@portfolio:~$ about          │
│                                       │
│ [∙∙∙∙∙∙∙∙∙∙∙∙] Loading profile...   │
│                                       │
│ visitor@portfolio:~$                │ ← Secondary prompt disabled
└─────────────────────────────────────┘
```

**Chat Mode State:**
```
┌─────────────────────────────────────┐
│ CHAT MODE [Active]                  │
│ Type '/exit' to return              │
├─────────────────────────────────────┤
│ You: What are your main skills?     │
│                                     │
│ Bot: I'm a full-stack developer     │
│      with expertise in React,       │
│      TypeScript, Node.js...         │
│                                     │
│ You:                               │ ← Active input line
└─────────────────────────────────────┘
```

---

### 1.3 Terminal Output Examples

**Help Command:**
```
┌─────────────────────────────────────────────────────────────┐
│ visitor@portfolio:~$ help                                   │
│                                                             │
│ AVAILABLE COMMANDS:                                        │
│   about        - Personal information & bio               │
│   projects     - View my projects                         │
│   achievements - Career highlights & awards              │
│   contact      - Get in touch                             │
│   chat         - Ask me anything (RAG-powered)           │
│   clear        - Clear terminal screen                    │
│   exit         - Exit terminal                            │
│                                                             │
│ Use 'help <command>' for detailed syntax.                 │
│                                                             │
│ visitor@portfolio:~$                                      │
└─────────────────────────────────────────────────────────────┘
```

**Projects Command:**
```
┌─────────────────────────────────────────────────────────────┐
│ visitor@portfolio:~$ projects                              │
│                                                             │
│ MY PROJECTS (5 total)                                      │
│ ─────────────────────────────────────────────────────      │
│                                                             │
│ #1 - E-Commerce Platform                                   │
│    🏷️  e-commerce, react, node, mongodb                   │
│    Full-featured online store with Stripe integration     │
│    🌐 Live | 💻 GitHub | 📺 Demo                          │
│                                                             │
│ #2 - AI Chat Assistant                                    │
│    🏷️  ai, python, langchain, openai                      │
│    RAG-powered chatbot with vector search                 │
│    🌐 Live | 💻 GitHub                                    │
│                                                             │
│ #3 - Portfolio Website Template                           │
│    🏷️  web, react, tailwind, vite                        │
│    Terminal-style portfolio with interactive UI           │
│    💻 GitHub                                              │
│                                                             │
│ Use 'projects --id <n>' for full details.                 │
│ Filter: 'projects --tag <tagname>'                         │
│                                                             │
│ visitor@portfolio:~$                                      │
└─────────────────────────────────────────────────────────────┘
```

**Achievements Command:**
```
┌─────────────────────────────────────────────────────────────┐
│ visitor@portfolio:~$ achievements                          │
│                                                             │
│ ACHIEVEMENTS TIMELINE                                      │
│ ─────────────────────────────────────────────────────      │
│                                                             │
│ 2024                                                       │
│   • 🏆 Best Innovation Award - TechConf 2024              │
│   • 📜 AWS Certified Solutions Architect                  │
│   • 📚 Published: "Modern React Patterns"                  │
│                                                             │
│ 2023                                                       │
│   • 🎓 Master's in Computer Science (GPA: 4.0)           │
│   • 🏆 1st Place - University Hackathon                    │
│   • 💼 Promoted to Senior Developer                        │
│                                                             │
│ 2022                                                       │
│   • 📜 Google Associate Cloud Engineer                     │
│   • 🏆 GitHub Octoverse Award                              │
│                                                             │
│ Filter by year: 'achievements --year 2024'                │
│ Filter by type: 'achievements --type award'               │
│                                                             │
│ visitor@portfolio:~$                                      │
└─────────────────────────────────────────────────────────────┘
```

**Chat Mode:**
```
┌─────────────────────────────────────────────────────────────┐
│ CHAT MODE [Active] - Type '/exit' to quit                 │
├─────────────────────────────────────────────────────────────┤
│ You: Tell me about your experience with AI?               │
│                                                             │
│ Bot: [∙∙∙∙∙∙∙∙∙∙∙∙]                                        │
│                                                             │
│ Bot: I have extensive experience with AI/ML technologies. │
│      Recently, I built an AI chat assistant using        │
│      LangChain and OpenAI's GPT-4. The system uses RAG    │
│      to provide accurate responses based on my portfolio  │
│      content. I've also worked with computer vision       │
│      models and deployed them using TensorFlow Serving.   │
│                                                             │
│      Would you like to know more about a specific project?│
│                                                             │
│ You: What frameworks do you use?                           │
│                                                             │
│ Bot: [∙∙∙∙∙∙∙∙∙∙∙∙]                                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Static Pages Layouts

### 2.1 About Page (`/about`)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  NAVBAR                                                               │
│  [Logo] Terminal Portfolio | About | Projects | Achievements | Contact│
├─────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌─────────────────────────┬─────────────────────────────────────────┐ │
│  │ PROFILE IMAGE            │                                             │ │
│  │                         │  ████████████████████████████████       │ │
│  │      [Photo]            │  ██                                ██       │ │
│  │                         │  ██   NAME: John Developer           ██       │ │
│  │                         │  ██   Title: Full-Stack Engineer     ██       │ │
│  │                         │  ██   Location: San Francisco, CA    ██       │ │
│  │                         │  ██                                ██       │ │
│  │                         │  ████████████████████████████████       │ │
│  │                         │                                             │ │
│  │                         │  📧 john@example.com                     │ │
│  │                         │  🔗 github.com/johndev                  │ │
│  │                         │  💼 linkedin.com/in/johndev            │ │
│  │                         │  🌐 johndev.com                         │ │
│  │                         │                                             │ │
│  └─────────────────────────┴─────────────────────────────────────────┘ │
│                                                                        │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │ BIOGRAPHY                                                         │ │
│  │ ───────────────────────────────────────────────────────────────   │ │
│  │ I'm a passionate full-stack developer with 5+ years of           │ │
│  │ experience building web applications and AI-powered solutions.  │ │
│  │ I love creating elegant user experiences and solving complex   │ │
│  │ problems with clean, maintainable code.                         │ │
│  │                                                                   │ │
│  │ My expertise spans React, Node.js, Python, and cloud            │ │
│  │ technologies. I'm always exploring new tools and frameworks    │ │
│  │ to stay at the cutting edge of software development.           │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                        │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │ SKILLS                                                           │ │
│  │ ───────────────────────────────────────────────────────────────   │ │
│  │                                                                   │ │
│  │  Frontend              Backend               DevOps & Cloud      │ │
│  │  ─────────────         ────────────         ───────────────    │ │
│  │  React ████████        Node.js ███████       AWS ███████       │ │
│  │  TypeScript ███████    Python ██████         Docker ██████     │ │
│  │  Tailwind ██████       Express ██████        CI/CD █████       │ │
│  │  Vue.js ████           GraphQL █████         GCP ████          │ │
│  │  CSS/SCSS ██████       PostgreSQL █████     Kubernetes ███    │ │
│  │                                                                   │ │
│  │  AI/ML                      Databases                 Tools       │ │
│  │  ───────────                ───────────             ──────      │ │
│  │  OpenAI API ███████         MongoDB ███████       Git ███████  │ │
│  │  LangChain ██████           PostgreSQL █████       Vercel ████ │ │
│  │  TensorFlow █████           Redis ████            Nginx ███    │ │
│  │  Computer Vision ████       SQLite ███            Webpack ███ │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                        │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │ EXPERIENCE                                                        │ │
│  │ ───────────────────────────────────────────────────────────────   │ │
│  │                                                                   │ │
│  │  2022 - Present                                                  │ │
│  │  Senior Full-Stack Engineer @ TechCorp                           │ │
│  │  • Leading development of microservices architecture            │ │
│  │  • Mentoring 3 junior developers                                │ │
│  │  • Architected real-time analytics dashboard                    │ │
│  │                                                                   │ │
│  │  2020 - 2022                                                    │ │
│  │  Full-Stack Developer @ StartupXYZ                               │ │
│  │  • Built customer-facing React applications                     │ │
│  │  • Implemented CI/CD pipelines reducing deployment time 70%     │ │
│  │  • Developed RESTful APIs serving 10k+ daily users             │ │
│  │                                                                   │ │
│  │  2019 - 2020                                                    │ │
│  │  Junior Developer @ DevAgency                                    │ │
│  │  • Developed responsive websites for various clients           │ │
│  │  • Collaborated with designers on UI/UX improvements           │ │
│  │                                                                   │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                        │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │ EDUCATION                                                         │ │
│  │ ───────────────────────────────────────────────────────────────   │ │
│  │                                                                   │ │
│  │  2021                                                            │ │
│  │  Master's in Computer Science                                    │ │
│  │  Stanford University                                            │ │
│  │  GPA: 4.0/4.0                                                   │ │
│  │                                                                   │ │
│  │  2019                                                            │ │
│  │  Bachelor's in Software Engineering                              │ │
│  │  UC Berkeley                                                    │ │
│  │  GPA: 3.8/4.0                                                   │ │
│  │                                                                   │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                        │
└─────────────────────────────────────────────────────────────────────────┘
```

**Layout:**
- Fixed navbar at top with navigation links
- Two-column profile section (image left, info right)
- Full-width sections with consistent padding
- Skills: Grid layout with 4 columns, proficiency bars
- Experience/Eduction: Timeline layout with vertical line or simple vertical stack
- Responsive: Columns stack on mobile

---

### 2.2 Projects Page (`/projects`)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  NAVBAR                                                               │
│  [Logo] Terminal Portfolio | About | Projects | Achievements | Contact│
├─────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │ PAGE HEADER                                                      │ │
│  │ "My Projects"                                                    │ │
│  │ ───────────────────────────────────────────────────────────────   │ │
│  │ Show: [All ▼] | [Web] | [Mobile] | [AI] | [Tools]              │ │
│  │ Search: [_____________]                                          │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                        │
│  PROJECT CARDS GRID                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │ │
│  │  [Thumbnail] │  │  [Thumbnail] │  │  [Thumbnail] │                │ │
│  │             │  │             │  │             │                │ │
│  │  E-Commerce  │  │  AI Chat    │  │  Portfolio  │                │ │
│  │  Platform    │  │  Assistant  │  │  Website    │                │ │
│  │             │  │             │  │             │                │ │
│  │  🏷️ e-commerce, │  🏷️ ai, python, │  🏷️ web, react,│                │ │
│  │      react, node  │      langchain  │      tailwind  │                │ │
│  │             │  │             │  │             │                │ │
│  │  🌐 Live     │  │  🌐 Live     │  │  💻 GitHub   │                │ │
│  │  💻 GitHub   │  │  💻 GitHub   │  │             │                │ │
│  │  📺 Demo     │  │             │  │             │                │ │
│  └─────────────┘  └─────────────┘  └─────────────┘                │ │
│                                                                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │ │
│  │  [Thumbnail] │  │  [Thumbnail] │  │  [Thumbnail] │                │ │
│  │             │  │             │  │             │                │ │
│  │  Task Mgmt  │  │  Data Vis   │  │  CLI Tool   │                │ │
│  │  App        │  │  Dashboard  │  │             │                │ │
│  │             │  │             │  │             │                │ │
│  │  🏷️ react,  │  🏷️ python,   │  🏷️ cli,      │                │ │
│  │      typescript│      d3.js    │      node,    │                │ │
│  │             │  │             │  │      inquirer│                │ │
│  │  💻 GitHub   │  │  💻 GitHub   │  │  💻 GitHub   │                │ │
│  │             │  │  🌐 Live     │  │             │                │ │
│  └─────────────┘  └─────────────┘  └─────────────┘                │ │
│                                                                        │
└─────────────────────────────────────────────────────────────────────────┘
```

**Card Structure:**
- Thumbnail image (16:9 ratio, 300x169px) with hover effect
- Title (bold, h3)
- Tags: pill buttons with colors (e.g., React=blue, Python=yellow)
- Short description (2 lines max)
- Links: Icons for Live demo, GitHub repo, Blog post, Video demo
- Hover: Card slightly lifts, shadow increases

**Filters:**
- Dropdown for category filter
- Tag buttons for quick filtering
- Search input with instant filtering
- Shows count: "5 projects"

**Responsive:**
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column

---

### 2.3 Achievements Page (`/achievements`)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  NAVBAR                                                               │
│  [Logo] Terminal Portfolio | About | Projects | Achievements | Contact│
├─────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │ PAGE HEADER                                                      │ │
│  │ "Achievements & Milestones"                                      │ │
│  │ ───────────────────────────────────────────────────────────────   │ │
│  │ Filter: [All ▼] | [Awards] | [Certifications] | [Publications] │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                        │
│  TIMELINE                                                            │
│  ───────────────────────────────────────────────────────────────────   │
│                                                                        │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │ 2024                                                            │ │
│  ├───────────────────────────────────────────────────────────────────┤ │
│  │                                                                   │ │
│  │  🏆 Best Innovation Award                                       │ │
│  │     TechConf 2024                                               │ │
│  │     ──────────────────────────────────────────────────────      │ │
│  │     Awarded for developing an AI-powered code review tool      │ │
│  │     that reduces code review time by 40%.                      │ │
│  │                                 [Certificate PDF]                  │ │
│  │                                                                   │ │
│  │  📜 AWS Certified Solutions Architect - Professional           │ │
│  │     Amazon Web Services                                        │ │
│  │     ──────────────────────────────────────────────────────      │ │
│  │     Advanced cloud architecture certification covering         │ │
│  │     complex distributed systems and security best practices.  │ │
│  │                                 [Badge]                           │ │
│  │                                                                   │ │
│  │  📚 "Modern React Patterns" Published                          │ │
│  │     Medium Engineering Blog                                    │ │
│  │     ──────────────────────────────────────────────────────      │ │
│  │     Article on advanced React patterns featured in React       │ │
│  │     Weekly newsletter with 50k+ readers.                       │ │
│  │                                 [Read Article]                   │ │
│  │                                                                   │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                        │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │ 2023                                                            │ │
│  ├───────────────────────────────────────────────────────────────────┤ │
│  │                                                                   │ │
│  │  🎓 Master's in Computer Science                               │ │
│  │     Stanford University                                        │ │
│  │     GPA: 4.0/4.0                                               │ │
│  │     ──────────────────────────────────────────────────────      │ │
│  │     Thesis: "Optimizing Neural Networks for Edge Deployment"   │ │
│  │                                 [View Thesis]                     │ │
│  │                                                                   │ │
│  │  🏆 1st Place - University Hackathon                          │ │
│  │     Berkeley Hack 2023                                         │ │
│  │     ──────────────────────────────────────────────────────      │ │
│  │     Built an AI-powered accessibility tool for visually       │ │
│  │     impaired students. Won $5,000 and mentorship from tech    │ │
│  │     companies.                                                 │ │
│  │                                 [Demo]                           │ │
│  │                                                                   │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                        │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │ 2022                                                            │ │
│  ├───────────────────────────────────────────────────────────────────┤ │
│  │                                                                   │ │
│  │  📜 Google Associate Cloud Engineer                             │ │
│  │     Google Cloud                                               │ │
│  │     ──────────────────────────────────────────────────────      │ │
│  │     Certified in cloud infrastructure and application          │ │
│  │     deployment on GCP.                                         │ │
│  │                                 [Verify]                         │ │
│  │                                                                   │ │
│  │  💼 Promoted to Senior Developer                                │ │
│  │     StartupXYZ                                                 │ │
│  │     ──────────────────────────────────────────────────────       │ │
│  │     Recognized for leadership in migrating legacy systems      │ │
│  │     to modern architecture.                                    │ │
│  │                                                                   │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                        │
└─────────────────────────────────────────────────────────────────────────┘
```

**Timeline Design:**
- Vertical line connecting years
- Each year is a collapsible section (default expanded)
- Achievement cards with:
  - Icon emoji or SVG (🏆 📜 🎓 💼 📚)
  - Title in bold
  - Organization/issuer in italic
  - Horizontal rule separator
  - Description (2-3 sentences)
  - Optional link button(s)
- Hover effects on cards (subtle background)
- Filter at top to show only specific types

**Responsive:**
- Desktop: Full-width timeline with alternating sides for visual interest (optional)
- Tablet/Mobile: Single column, all achievements stacked

---

### 2.4 Contact Page (`/contact`)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  NAVBAR                                                               │
│  [Logo] Terminal Portfolio | About | Projects | Achievements | Contact│
├─────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │ PAGE HEADER                                                      │ │
│  │ "Get In Touch"                                                   │ │
│  │ ───────────────────────────────────────────────────────────────   │ │
│  │ Interested in collaborating or have a project in mind? Reach out!│ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                        │
│  ┌─────────────────────────────┬─────────────────────────────────────┐ │
│  │ CONTACT INFO                │                                     │ │
│  │ ─────────────────────────   │                                     │ │
│  │                             │                                     │ │
│  │  📧 Email                   │                                     │ │
│  │  ┌─────────────────────┐   │    [QR CODE]                        │ │
│  │  │ john@example.com    │   │    ┌─────────────────┐             │ │
│  │  └─────────────────────┘   │    │    ███████████  │             │ │
│  │  [Copy to Clipboard]       │    │   ██  QR CODE  ██│             │ │
│  │                            │    │   ███████████  │             │ │
│  │                            │    └─────────────────┘             │ │
│  │  💬 LinkedIn               │    Scan to add contact              │ │
│  │  linkedin.com/in/johndev  │                                     │ │
│  │                            │    AVAILABILITY                      │ │
│  │  🐙 GitHub                │    ─────────────────────────────     │ │
│  │  github.com/johndev       │                                     │ │
│  │                            │    ✅ Open to new opportunities      │ │
│  │  🐦 Twitter               │    📍 San Francisco, CA              │ │
│  │  @johndev                 │    🕐 Usually responds within 24h     │ │
│  │                            │                                     │ │
│  │  🌐 Portfolio             │                                     │ │
│  │  johndev.com              │                                     │ │
│  │                            │                                     │ │
│  └─────────────────────────────┴─────────────────────────────────────┘ │
│                                                                        │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │ MESSAGE FORM                                                     │ │
│  │ ───────────────────────────────────────────────────────────────   │ │
│  │                                                                   │ │
│  │  Name:             [_______________________________________]     │ │
│  │  Email:            [_______________________________________]     │ │
│  │  Subject:          [_______________________________________]     │ │
│  │                                                                   │ │
│  │  Message:                                                         │ │
│  │  [                                                               │ │
│  │    ____________________________________________________________ │ │
│  │    ____________________________________________________________ │ │
│  │    ____________________________________________________________ │ │
│  │  ]                                                               │ │
│  │                                                                   │ │
│  │               [Send Message] [Clear Form]                       │ │
│  │                                                                   │ │
│  │  *Note: This is a demo form. Connect your email service to      │ │
│  │        make it functional.                                        │ │
│  │                                                                   │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                        │
└─────────────────────────────────────────────────────────────────────────┘
```

**Layout:**
- Two-column layout: contact info left, form right
- QR code for mobile quick contact
- Availability status indicator
- Form with validation (real-time)
- Form submission: shows success/error message, prevents default (demo)
- All links open in new tab

**Responsive:**
- Desktop: Two columns
- Mobile: Single column, QR code below email, form below info

---

## 3. Terminal CSS & Styling Specification

### 3.1 Color Palette

**Green Theme (Default):**
```css
--terminal-bg: #0a0a0a;
--terminal-text: #00ff00;
--terminal-dim: #008800;
--terminal-bright: #00ff00;
--terminal-prompt: #00ff00;
--terminal-cursor: #00ff00;
--terminal-error: #ff4444;
--terminal-success: #44cc44;
--terminal-warning: #ffcc00;
--terminal-link: #ff6b6b;
--terminal-command: #00ffff;
```

**Amber Theme (Alternative):**
```css
--terminal-bg: #1a1a0a;
--terminal-text: #ffb000;
--terminal-dim: #886600;
--terminal-bright: #ffcc00;
--terminal-prompt: #ffb000;
--terminal-cursor: #ffb000;
--terminal-error: #ff6b00;
--terminal-success: #88cc00;
--terminal-warning: #ffcc00;
--terminal-link: #ff6b6b;
--terminal-command: #00d7ff;
```

### 3.2 Typography

```css
--font-mono: 'Fira Code', 'JetBrains Mono', 'Source Code Pro',
             'Consolas', 'Monaco', monospace;
--font-size-base: 14px;
--font-size-lg: 16px;
--font-size-sm: 12px;
--line-height: 1.6;
--letter-spacing: 0.01em;
```

### 3.3 CRT Effects

```css
/* Scanline overlay */
.scanlines::after {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0,0,0,0.15),
    rgba(0,0,0,0.15) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
  z-index: 10;
}

/* Text glow */
.text-glow {
  text-shadow: 0 0 10px var(--terminal-text),
               0 0 20px var(--terminal-text),
               0 0 30px var(--terminal-dim);
}

/* Subtle flicker animation */
@keyframes flicker {
  0% { opacity: 1; }
  5% { opacity: 0.95; }
  10% { opacity: 1; }
  15% { opacity: 0.98; }
  20% { opacity: 1; }
  100% { opacity: 1; }
}

.flicker {
  animation: flicker 4s infinite;
}

/* Custom scrollbar */
.terminal-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.terminal-scrollbar::-webkit-scrollbar-track {
  background: rgba(0,0,0,0.3);
}

.terminal-scrollbar::-webkit-scrollbar-thumb {
  background: var(--terminal-dim);
  border-radius: 4px;
}

.terminal-scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--terminal-text);
}
```

### 3.4 Component CSS Classes

```css
.terminal-container {
  @apply relative bg-terminal-bg text-terminal-text font-mono
         text-base leading-relaxed overflow-hidden;
}

.terminal-header {
  @apply flex items-center justify-between px-4 py-2 bg-gray-900
         border-b border-gray-800;
}

.terminal-buttons {
  @apply flex gap-2;
}

.terminal-button {
  @apply w-3 h-3 rounded-full;
}

.terminal-button.red { @apply bg-red-500; }
.terminal-button.yellow { @apply bg-yellow-500; }
.terminal-button.green { @apply bg-green-500; }

.terminal-body {
  @apply relative h-[calc(100-40px)] overflow-y-auto p-4 scanlines;
}

.terminal-output {
  @apply mb-2 whitespace-pre-wrap break-words;
}

.terminal-prompt {
  @apply text-terminal-prompt font-bold mr-2;
}

.terminal-input-line {
  @apply flex items-center;
}

.terminal-input {
  @apply flex-1 bg-transparent outline-none text-terminal-text
         caret-transparent selection:bg-terminal-dim;
}

.terminal-input::selection {
  background-color: var(--terminal-dim);
}
```

---

## 4. Responsive Breakpoints

```css
/* Mobile-first approach */
.container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

/* Grid layouts */
.projects-grid {
  @apply grid gap-6;
  grid-template-columns: 1fr; /* Mobile: single column */
}

@media (min-width: 640px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr); /* Tablet: 2 columns */
  }
}

@media (min-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr); /* Desktop: 3 columns */
  }
}

/* About page two-column */
.about-grid {
  @apply grid gap-8;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .about-grid {
    grid-template-columns: 280px 1fr; /* Sidebar + content */
  }
}

/* Skills grid */
.skills-grid {
  @apply grid gap-6;
  grid-template-columns: repeat(2, 1fr);
}

@media (min-width: 1024px) {
  .skills-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Contact page */
.contact-grid {
  @apply grid gap-8;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr 1fr; /* Two columns */
  }
}
```

---

## 5. Interactive States

### 5.1 Button States

**Primary Button:**
```
Normal:  [▶ Send Message]     bg-blue-600, text-white, hover:bg-blue-700
Hover:   [▶ Send Message]     shadow-lg transform -translate-y-0.5
Active:  [▶ Send Message]     scale-95 bg-blue-800
Disabled: [  Send Message]    bg-gray-600, cursor-not-allowed, opacity-50
```

**Secondary Button:**
```
Normal:  [Copy to Clipboard]  bg-transparent border border-terminal-text
Hover:   [Copy to Clipboard]  bg-terminal-dim/20
```

### 5.2 Navigation States

```
Navbar link:
Normal:  About                text-gray-400 hover:text-white
Active:  About                text-white border-b-2 border-green-500
```

---

## 6. Accessibility Considerations

### 6.1 Focus States

```css
:focus-visible {
  @apply outline-2 outline-offset-2 outline-green-500;
}

/* Skip link for keyboard navigation */
.skip-link {
  @apply absolute -translate-y-full top-0 left-0 p-4 bg-black text-white
         z-50 transition-transform;
}

.skip-link:focus {
  @apply translate-y-0;
}
```

### 6.2 ARIA Attributes

**Terminal Input:**
```html
<input
  type="text"
  aria-label="Terminal command input"
  aria-describedby="help-text"
  role="textbox"
  autocomplete="off"
  autocorrect="off"
  autocapitalize="off"
  spellcheck="false"
/>
```

**Interactive Elements:**
- Buttons: `aria-label` describing action
- Links: `aria-label` for icon-only links
- Sections: Proper heading hierarchy (h1-h6)
- Forms: Labels associated with inputs, error messages linked with `aria-live`

---

## 7. Mobile-Specific Optimizations

- Terminal input: larger touch target (min 44x44px)
- Command history: prevent zoom on double-tap (`touch-action: manipulation`)
- Avoid horizontal scrolling on terminals (break long words)
- Reduce animations for reduced motion preference
- Increase tap targets for navigation links
- Stack columns on screens < 768px

---

## 8. Page Navigation Structure

```
Route Guard: None (all pages public)

Routes:
  /              → Terminal (Homepage)
  /about         → About Page
  /projects      → Projects Gallery
  /achievements  → Achievements Timeline
  /contact       → Contact Form

Navbar: Visible on all static pages, hidden on terminal
Terminal: Only at root path, includes back to home link from pages
```

**Navigation Pattern:**
- Terminal page: user types commands to navigate
  - `about` command: navigates to `/about` (or displays inline if single-page)
  - `projects` command: navigates to `/projects`
  - etc.
- Static pages: Navbar links + breadcrumb back to terminal

---

*Wireframes completed for Task 3 - UI/UX Design Specification*

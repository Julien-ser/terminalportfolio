# Terminal Commands Reference

This document defines the complete command set for the terminal portfolio interface.

## Command Overview

| Command | Description | Syntax |
|---------|-------------|-------|
| `help` | Display all available commands | `help [command]` |
| `about` | Show personal information and bio | `about [--skills \| --experience]` |
| `projects` | List all projects with details | `projects [--tag <tag>] [--id <id>]` |
| `achievements` | Display achievements timeline | `achievements [--year <yyyy>] [--type <type>]` |
| `contact` | Show contact information | `contact [--email \| --social]` |
| `email` | Open email client or copy address | `email [--copy]` |
| `chat` | Start RAG-powered chatbot session | `chat` |
| `clear` | Clear terminal screen | `clear` |
| `exit` | Exit chat mode or terminal | `exit` |

---

## Detailed Command Reference

### `help`

Display help information about all commands or a specific command.

**Syntax:**
```
help
help <command>
```

**Examples:**
```
help                # Show all commands
help projects        # Show help for projects command
```

**Output Format:**
- Lists all available commands with brief descriptions
- For specific commands, shows syntax, options, and examples

---

### `about`

Display personal information, bio, skills, and experience.

**Syntax:**
```
about
about --skills
about --experience
about --all
```

**Options:**
- `--skills` - Show only skills and technologies
- `--experience` - Show work experience and education
- `--all` - Show complete profile (default)

**Examples:**
```
about                # Show full bio
about --skills        # Show skills only
```

**Data Source:** `src/data/personal.json`

---

### `projects`

List and filter portfolio projects.

**Syntax:**
```
projects
projects --tag <tag>
projects --id <id>
projects --detail <id>
```

**Options:**
- `--tag <tag>` - Filter projects by tag (e.g., `web`, `mobile`, `ai`)
- `--id <id>` - Show detailed information for specific project
- `--detail <id>` - Alias for `--id`

**Examples:**
```
projects                         # List all projects
projects --tag react             # Show React projects
projects --id 3                  # Show full details for project #3
```

**Data Source:** `src/data/projects.json`

**Output:**
- Summary view: ID, title, short description, tags, links
- Detail view: Full description, tech stack, screenshots, live/demo links, GitHub

---

### `achievements`

Display achievements, awards, and milestones in timeline format.

**Syntax:**
```
achievements
achievements --year <yyyy>
achievements --type <type>
achievements --reverse
```

**Options:**
- `--year <yyyy>` - Filter by year (e.g., `2024`)
- `--type <type>` - Filter by type (e.g., `award`, `certification`, `publication`)
- `--reverse` - Reverse chronological order (default), or oldest first without flag

**Examples:**
```
achievements                    # Show all achievements
achievements --year 2024        # Show 2024 achievements only
achievements --type award       # Show awards only
```

**Data Source:** `src/data/achievements.json`

**Output Format:**
- Timeline layout with date, title, description, and optional links

---

### `contact`

Display contact information and social links.

**Syntax:**
```
contact
contact --email
contact --social
```

**Options:**
- `--email` - Show email address only
- `--social` - Show social media links only

**Examples:**
```
contact                # Show all contact info
contact --email        # Copy email to clipboard or display
```

**Data Source:** `src/data/contact.json`

**Features:**
- Email address with copy-to-clipboard functionality
- Links to GitHub, LinkedIn, Twitter, etc.
- QR code for mobile quick access (optional)

---

### `email`

Direct email interaction command.

**Syntax:**
```
email
email --copy
```

**Options:**
- `--copy` - Copy email address to clipboard

**Examples:**
```
email --copy           # Copy email and confirm
```

**Behavior:**
- Without options: opens default mail client with `mailto:` link
- With `--copy`: copies email to clipboard and shows confirmation

---

### `chat`

Start an interactive chat session with the RAG-powered assistant.

**Syntax:**
```
chat
```

**Behavior:**
- Enters multi-turn conversation mode
- Context is retrieved from portfolio documents using embeddings
- Responses stream in real-time
- Maintains conversation history for context-aware replies

**Controls (within chat mode):**
- Type questions naturally
- Press `Enter` to send
- Type `/exit` or `/quit` to leave chat mode
- Type `/clear` to clear conversation history

**Features:**
- RAG: Retrieves relevant information from portfolio docs
- Streaming: Responses appear token-by-token
- Context: Maintains conversation history within session
- Sources: Can show which documents were referenced (optional flag)

**Examples:**
```
chat
> Tell me about your React experience
> What projects have you built with TypeScript?
> /exit
```

---

### `clear`

Clear the terminal screen and reset scroll position.

**Syntax:**
```
clear
```

**Notes:**
- Keeps command history intact
- Does not clear scrollback buffer (use Ctrl+L in some terminals)

---

### `exit`

Exit chat mode (when in chat) or close terminal session.

**Syntax:**
```
exit
```

**Behavior:**
- In chat mode: returns to normal terminal prompt
- At normal prompt: shows farewell message and locks terminal (optional)

---

## Command Aliases (Optional)

For convenience, the following aliases may be supported:

| Alias | Command |
|-------|---------|
| `?` | `help` |
| `h` | `help` |
| `cls` | `clear` |
| `quit` | `exit` |
| `q` | `exit` |
| `projs` | `projects` |
| `ach` | `achievements` |
| `cv` | `about --all` |

---

## Command History & Autocomplete

- **Up/Down arrows**: Navigate command history
- **Tab**: Auto-complete commands and file paths
- **Ctrl+R**: Reverse search through history
- **Ctrl+C**: Cancel current command/input

---

## Error Handling

Common error responses:
- `Command not found: <command>` - Unknown command
- `Missing argument for --<option>` - Required option value missing
- `Invalid option: --<option>` - Unrecognized option
- `No projects found matching tag: <tag>` - Filter returned empty
- `Please enter a valid project ID` - Invalid ID format
- `Chat service unavailable. Please try again later.` - LLM/embedding service down

---

## Future Commands (Roadmap)

- `blog` - View blog posts/articles
- `resume` - Download resume PDF
- `skills` - Interactive skills explorer with proficiency levels
- `timeline` - Full career/interactive timeline
- `playground` - Code snippets and live demos
- `themes` - Change terminal color theme (green, amber, blue, etc.)
- `sound` - Toggle keystroke sounds
- `matrix` - Enable Matrix rain effect Easter egg
- `sudo` - Easter egg: pretend to gain elevated privileges

---

## Implementation Notes

### Command Parser Requirements

```typescript
interface Command {
  name: string;
  args: string[];
  options: Record<string, string | boolean>;
  raw: string;
}

parseCommand(input: string): Command
validateCommand(cmd: Command): ValidationResult
executeCommand(cmd: Command): Promise<CommandOutput>
```

### Command Registration

Commands should be registered in a central registry:

```typescript
const commandRegistry: Record<string, CommandHandler> = {
  help: { handler: handleHelp, description: '...' },
  about: { handler: handleAbout, description: '...' },
  // ...
};
```

### Response Formatting

Commands output should be formatted consistently:

- **Success**: Green text, readable layout
- **Error**: Red text, helpful message
- **Warning**: Yellow text, cautionary note
- **Info**: Cyan/blue text, neutral information

---

## UX Patterns

### Interactive Prompts

For commands requiring additional input:
```
> projects --tag
Enter tag: react
```

### Confirmation Prompts

Destructive or irreversible actions:
```
> clear
Clear terminal? (y/N): y
```

### Pagination

Long output (more than 20 lines) should be paginated:
```
(Page 1/3) - Press Space for next, Q to quit
```

### Progress Indicators

Async operations (e.g., chat loading, embeddings search):
```
[············] Searching knowledge base...
```

---

*Last updated: Task 3 - Wireframes & Command Spec*

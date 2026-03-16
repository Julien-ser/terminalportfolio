import React, { useState, useEffect, useRef } from 'react';
import { useTerminal } from '../hooks/useTerminal';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { CommandHandler } from '../utils/commandParser';
import { getAutoCompletions } from '../utils/commandParser';

const PROMPT_CLASS = "text-blue-400";
const ERROR_CLASS = "text-red-400";
const OUTPUT_CLASS = "text-gray-300";

export const Terminal: React.FC = () => {
  const terminal = useTerminal(100);
  const {
    commandHistory,
    input,
    setInput,
    handleKeyDown,
    availableCommands,
    registerCommand,
    clearOutput
  } = terminal;

  // Ensure store is initialized
  usePortfolioStore();

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (input.includes('--') || input.split(' ').length <= 2) {
      const newSuggestions = getAutoCompletions(input, availableCommands);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
      setSelectedSuggestion(0);
    } else {
      setShowSuggestions(false);
    }
  }, [input, availableCommands]);

  useEffect(() => {
    outputRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [commandHistory]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
  };

  const handleTabKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab' && showSuggestions && suggestions.length > 0) {
      e.preventDefault();
      const suggestion = suggestions[selectedSuggestion];
      setInput(suggestion + ' ');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion + ' ');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  // Register all commands
  useEffect(() => {
    const helpHandler: CommandHandler = async (_args, _options) => {
      const commands = ['about', 'projects', 'achievements', 'contact', 'email', 'clear', 'exit', 'help'];
      return 'Available commands:\n  ' + commands.join('\n  ');
    };

    const clearHandler: CommandHandler = async (_args, _options) => {
      clearOutput();
      return '';
    };

    const exitHandler: CommandHandler = async (_args, _options) => {
      return 'To exit the terminal, navigate using the navbar or close the tab.';
    };

    const aboutHandler: CommandHandler = async (_args, _options) => {
      const { personal, isLoading, error } = usePortfolioStore.getState();
      if (isLoading) return 'Portfolio data is loading, please wait...';
      if (error || !personal) return 'Personal data not available.';
      let output = `\n=== About ${personal.name} ===\n\n`;
      output += `${personal.title}\n\n`;
      output += `Bio:\n${personal.bio}\n\n`;
      output += `Skills:\n`;
      Object.entries(personal.skills).forEach(([category, skillList]) => {
        output += `  ${category}: ${skillList.map(s => s.name).join(', ')}\n`;
      });
      output += `\nExperience:\n`;
      personal.experience.forEach(exp => {
        output += `  ${exp.role} at ${exp.company} (${exp.duration})\n`;
        exp.highlights.forEach(h => output += `    - ${h}\n`);
      });
      output += `\nEducation:\n`;
      personal.education.forEach(edu => {
        output += `  ${edu.degree} from ${edu.institution} (${edu.year})\n`;
      });
      output += `\nLanguages:\n`;
      personal.languages.forEach(lang => {
        output += `  ${lang.language} (${lang.level})\n`;
      });
      return output;
    };

    const projectsHandler: CommandHandler = async (_args, _options) => {
      const { projects, isLoading, error } = usePortfolioStore.getState();
      if (isLoading) return 'Portfolio data is loading, please wait...';
      if (error || projects.length === 0) return 'No projects available.';
      let output = '\n=== Projects ===\n\n';
      projects.forEach(p => {
        output += `${p.title} (${p.year})\n`;
        output += `  ${p.shortDescription}\n`;
        output += `  Technologies: ${p.technologies.join(', ')}\n`;
        if (p.links.github) output += `  GitHub: ${p.links.github}\n`;
        if (p.links.demo) output += `  Demo: ${p.links.demo}\n`;
        if (p.links.documentation) output += `  Docs: ${p.links.documentation}\n`;
        output += '\n';
      });
      return output;
    };

    const achievementsHandler: CommandHandler = async (_args, _options) => {
      const { achievements, isLoading, error } = usePortfolioStore.getState();
      if (isLoading) return 'Portfolio data is loading, please wait...';
      if (error || achievements.length === 0) return 'No achievements available.';
      let output = '\n=== Achievements ===\n\n';
      achievements.forEach(a => {
        output += `${a.title} - ${a.issuer} (${a.date})\n`;
        output += `  ${a.description}\n`;
        output += `  Type: ${a.type}\n`;
        if (a.url) output += `  Verify: ${a.url}\n`;
        output += '\n';
      });
      return output;
    };

    const contactHandler: CommandHandler = async (_args, _options) => {
      const { contact, isLoading, error } = usePortfolioStore.getState();
      if (isLoading) return 'Portfolio data is loading, please wait...';
      if (error || !contact) return 'Contact data not available.';
      let output = '\n=== Contact Information ===\n\n';
      output += `Email: ${contact.email}\n`;
      output += `Phone: ${contact.phone}\n`;
      output += `Location: ${contact.location.city}, ${contact.location.state}, ${contact.location.country} (${contact.location.timezone})\n`;
      output += `\nSocial Media:\n`;
      Object.entries(contact.social).forEach(([platform, url]) => {
        output += `  ${platform}: ${url}\n`;
      });
      return output;
    };

    const emailHandler: CommandHandler = async (_args, _options) => {
      const { contact, isLoading, error } = usePortfolioStore.getState();
      if (isLoading) return 'Portfolio data is loading, please wait...';
      if (error || !contact) return 'Email not available.';
      return `You can email me at: ${contact.email}`;
    };

    // Register commands
    registerCommand('help', helpHandler);
    registerCommand('clear', clearHandler);
    registerCommand('exit', exitHandler);
    registerCommand('about', aboutHandler);
    registerCommand('projects', projectsHandler);
    registerCommand('achievements', achievementsHandler);
    registerCommand('contact', contactHandler);
    registerCommand('email', emailHandler);

    // 'chat' command will be implemented in Phase 3
  }, [registerCommand, clearOutput]);

  const welcomeMessage = `Welcome to Terminal Portfolio v1.0.0
Type 'help' to see available commands.
`;

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4 overflow-hidden"
         onClick={() => inputRef.current?.focus()}
         data-testid="terminal">
      <div 
        className="max-w-4xl mx-auto h-screen flex flex-col relative"
      >
        <div className="flex-1 overflow-y-auto mb-4" data-testid="terminal-output">
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {commandHistory.length === 0 && (
              <div className="opacity-70">{welcomeMessage}</div>
            )}
            
            {commandHistory.map((entry) => (
              <div key={entry.id} className="mb-4">
                <div className="flex items-start">
                  <span className={PROMPT_CLASS}>guest@portfolio:~$</span>
                  <span className="ml-2">{entry.command}</span>
                </div>
                {entry.output && (
                  <div className={`mt-2 ${entry.isError ? ERROR_CLASS : OUTPUT_CLASS}`}>
                    {entry.output}
                  </div>
                )}
              </div>
            ))}
            <div ref={outputRef} />
          </div>
        </div>

        <div className="relative">
          <div className="flex items-center mb-2">
            <span className={PROMPT_CLASS}>guest@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                handleKeyDown(e);
                handleTabKey(e);
              }}
              className="flex-1 bg-transparent outline-none ml-2 text-green-400 caret-white font-mono"
              placeholder="Type a command..."
              aria-label="Terminal command input"
              autoComplete="off"
              spellCheck={false}
              data-testid="terminal-input"
            />
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div 
              className="absolute bottom-full left-0 right-0 bg-gray-900 border border-gray-700 rounded-b-md overflow-hidden mb-1 shadow-lg"
              role="listbox"
              data-testid="suggestions-dropdown"
            >
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion}
                  className={`px-3 py-2 cursor-pointer ${
                    index === selectedSuggestion 
                      ? 'bg-gray-700 text-white' 
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  role="option"
                  aria-selected={index === selectedSuggestion}
                >
                  <span className="font-mono text-sm">{suggestion}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="text-xs text-gray-500 mt-2">
          Press <kbd className="px-2 py-1 bg-gray-800 rounded">Tab</kbd> for autocomplete,{' '}
          <kbd className="px-2 py-1 bg-gray-800 rounded">↑↓</kbd> for history
        </div>
      </div>
    </div>
  );
};

export default Terminal;

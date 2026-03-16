import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTerminal } from '../hooks/useTerminal';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { CommandHandler } from '../utils/commandParser';
import { getAutoCompletions } from '../utils/commandParser';
import { ChatService } from '../services/chatService';
import './Terminal.css';

export const Terminal: React.FC = () => {
  const terminal = useTerminal(100);
  const {
    commandHistory,
    input,
    setInput,
    handleKeyDown,
    clearOutput,
    registerCommand,
    availableCommands,
    mode,
    setMode,
    setChatInputHandler,
    addEntry,
    updateEntry,
  } = terminal;

  // Ensure store is initialized
  usePortfolioStore();

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Ref to hold the current chat service instance
  const chatServiceRef = useRef<ChatService | null>(null);

  // Ref to always have the latest available commands for help
  const commandsRef = useRef<string[]>([]);
  useEffect(() => {
    commandsRef.current = availableCommands;
  });

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

  // Chat input handler - called when in chat mode and user presses Enter
  const handleChatInput = useCallback(async (userMessage: string) => {
    const service = chatServiceRef.current;
    if (!service) {
      addEntry({ command: userMessage, output: 'Chat service not initialized. Please restart chat.', isError: true });
      return;
    }

    // Add user message as a new entry
    const entryId = addEntry({ command: userMessage, output: '' });

    try {
      let fullResponse = '';
      await service.sendMessage(userMessage, (token) => {
        fullResponse += token;
        updateEntry(entryId, { output: fullResponse });
      });
    } catch (error) {
      updateEntry(entryId, {
        output: `Error: ${error instanceof Error ? error.message : String(error)}`,
        isError: true
      });
    }
  }, [addEntry, updateEntry]);

  // Set the chat input handler so useTerminal can call it
  useEffect(() => {
    setChatInputHandler(handleChatInput);
  }, [handleChatInput, setChatInputHandler]);

  // Cleanup chat service when exiting chat mode
  useEffect(() => {
    if (mode !== 'chat') {
      chatServiceRef.current = null;
    }
  }, [mode]);

  // Register all commands
  useEffect(() => {
    const helpHandler: CommandHandler = async () => {
      return 'Available commands:\n  ' + commandsRef.current.sort().join('\n  ');
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

    const chatHandler: CommandHandler = async (_args, _options) => {
      // Initialize a new chat service instance
      chatServiceRef.current = new ChatService();
      // Switch to chat mode
      setMode('chat');
      return 'Chat mode activated. Type your questions; type "/exit" to leave.';
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
    registerCommand('chat', chatHandler);
  }, [registerCommand, clearOutput, setMode, addEntry, updateEntry]);

  const welcomeMessage = `Welcome to Terminal Portfolio v1.0.0
Type 'help' to see available commands.
`;

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4 overflow-hidden"
         onClick={() => inputRef.current?.focus()}
         data-testid="terminal">
      <div className="max-w-4xl mx-auto h-screen flex flex-col relative retro-border rounded-lg">
        {/* CRT Scanline overlay */}
        <div className="crt-overlay" />
        <div className="scanline-flash" />
        
        <div className="flex-1 overflow-y-auto mb-4 terminal-scrollbar" data-testid="terminal-output">
          <div className="whitespace-pre-wrap text-sm leading-relaxed px-2">
            {commandHistory.length === 0 && (
              <div className="opacity-70 typing-animation">{welcomeMessage}</div>
            )}
            
            {commandHistory.map((entry, idx) => (
              <div key={entry.id} className="mb-4" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="flex items-start">
                  <span className="prompt-glow">guest@portfolio:~$</span>
                  <span className="ml-2">{entry.command}</span>
                </div>
                {entry.output && (
                  <div className={`mt-2 ${entry.isError ? 'text-red-400' : 'text-glow'}`}>
                    <span className="typing-animation inline-block">{entry.output}</span>
                  </div>
                )}
              </div>
            ))}
            <div ref={outputRef} />
          </div>
        </div>

        <div className="relative px-2">
          <div className="flex items-center mb-2">
            <span className="prompt-glow">guest@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                handleKeyDown(e);
                handleTabKey(e);
              }}
              className="flex-1 bg-transparent outline-none ml-2 text-green-400 caret-white font-mono text-glow"
              placeholder="Type a command..."
              aria-label="Terminal command input"
              autoComplete="off"
              spellCheck={false}
              data-testid="terminal-input"
            />
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div 
              className="absolute bottom-full left-0 right-0 bg-gray-900 border border-green-800 rounded-b-md overflow-hidden mb-1 shadow-lg shadow-green-900/50"
              role="listbox"
              data-testid="suggestions-dropdown"
            >
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion}
                  className={`px-3 py-2 cursor-pointer transition-colors duration-150 ${
                    index === selectedSuggestion 
                      ? 'bg-green-900 text-white border-l-2 border-green-400' 
                      : 'text-green-300 hover:bg-gray-800'
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

        <div className="text-xs text-green-600 mt-2 px-2">
          Press <kbd className="px-2 py-1 bg-gray-900 border border-green-800 rounded text-green-400">Tab</kbd> for autocomplete,{' '}
          <kbd className="px-2 py-1 bg-gray-900 border border-green-800 rounded text-green-400">↑↓</kbd> for history
        </div>
      </div>
    </div>
  );
};

export default Terminal;

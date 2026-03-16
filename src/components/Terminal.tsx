import React, { useState, useEffect, useRef, useEffect } from 'react';
import { useTerminal } from '../hooks/useTerminal';
import { getAutoCompletions } from '../utils/commandParser';

const SUGGESTION_CLASS = "text-gray-400";
const COMMAND_CLASS = "text-green-400 font-bold";
const PROMPT_CLASS = "text-blue-400";
const ERROR_CLASS = "text-red-400";
const OUTPUT_CLASS = "text-gray-300";

export const Terminal: React.FC = () => {
  const {
    commandHistory,
    input,
    setInput,
    handleKeyDown,
    clearOutput,
    availableCommands,
  } = useTerminal(100);

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

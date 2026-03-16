import { useState, useCallback, useEffect, useRef } from 'react';
import { parseCommand, validateCommand, CommandHandler } from '../utils/commandParser';

interface CommandEntry {
  id: number;
  command: string;
  output: string;
  isError?: boolean;
}

interface UseTerminalReturn {
  commandHistory: CommandEntry[];
  input: string;
  setInput: (value: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => Promise<void>;
  clearOutput: () => void;
  maxHistory: number;
  registerCommand: (name: string, handler: CommandHandler) => void;
  availableCommands: string[];
}

export function useTerminal(maxHistory: number = 100): UseTerminalReturn {
  const [commandHistory, setCommandHistory] = useState<CommandEntry[]>([]);
  const [input, setInput] = useState('');
  const [commandRegistry, setCommandRegistry] = useState<Map<string, CommandHandler>>(new Map());
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const commandCounter = useRef(0);

  const registerCommand = useCallback((name: string, handler: CommandHandler) => {
    setCommandRegistry(prev => new Map(prev.set(name, handler)));
  }, []);

  const availableCommands = Array.from(commandRegistry.keys()).sort();

  const clearOutput = useCallback(() => {
    setCommandHistory([]);
  }, []);

  const executeCommand = useCallback(async (rawInput: string): Promise<string> => {
    const command = parseCommand(rawInput);
    const validation = validateCommand(command, availableCommands);

    if (!validation.isValid) {
      return validation.error || 'Unknown error';
    }

    const handler = commandRegistry.get(command.name);
    if (!handler) {
      return `No handler registered for command: ${command.name}`;
    }

    try {
      return await handler(command.args, command.options);
    } catch (error) {
      return `Error executing ${command.name}: ${error instanceof Error ? error.message : String(error)}`;
    }
  }, [commandRegistry, availableCommands]);

  const handleKeyDown = useCallback(async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      const rawInput = input.trim();
      if (!rawInput) {
        setInput('');
        return;
      }

      setCommandHistory(prev => {
        const newEntry: CommandEntry = {
          id: commandCounter.current++,
          command: rawInput,
          output: 'Processing...',
        };
        return [...prev, newEntry];
      });

      const output = await executeCommand(rawInput);
      
      setCommandHistory(prev => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last) {
          last.output = output;
          last.isError = output.toLowerCase().includes('error') || 
                         output.toLowerCase().includes('not found') ||
                         output.toLowerCase().includes('invalid');
        }
        return updated.slice(-maxHistory);
      });

      setInput('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 
          ? commandHistory.length - 1 
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex].command);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
        if (newIndex === commandHistory.length - 1) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex + 1]?.command || '');
        }
      }
    }
  }, [input, commandHistory, historyIndex, executeCommand, maxHistory]);

  useEffect(() => {
    const handleFocus = () => {
      inputRef.current?.focus();
    };
    window.addEventListener('click', handleFocus);
    return () => window.removeEventListener('click', handleFocus);
  }, []);

  return {
    commandHistory,
    input,
    setInput,
    handleKeyDown,
    clearOutput,
    maxHistory,
    registerCommand,
    availableCommands,
  };
}

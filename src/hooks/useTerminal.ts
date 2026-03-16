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
  // New additions for chat mode
  mode: 'command' | 'chat';
  setMode: (mode: 'command' | 'chat') => void;
  chatInputHandler: ((input: string) => Promise<void>) | null;
  setChatInputHandler: (handler: (input: string) => Promise<void>) => void;
  addEntry: (entry: Omit<CommandEntry, 'id'>) => number;
  updateEntry: (id: number, updates: Partial<CommandEntry>) => void;
}

export function useTerminal(maxHistory: number = 100): UseTerminalReturn {
  const [commandHistory, setCommandHistory] = useState<CommandEntry[]>([]);
  const [input, setInput] = useState('');
  const [commandRegistry, setCommandRegistry] = useState<Map<string, CommandHandler>>(new Map());
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const commandCounter = useRef(0);

  // Chat mode state
  const [mode, setMode] = useState<'command' | 'chat'>('command');
  const [chatInputHandler, setChatInputHandler] = useState<((input: string) => Promise<void>) | null>(null);

  const registerCommand = useCallback((name: string, handler: CommandHandler) => {
    setCommandRegistry(prev => new Map(prev.set(name, handler)));
  }, []);

  const availableCommands = Array.from(commandRegistry.keys()).sort();

  const clearOutput = useCallback(() => {
    setCommandHistory([]);
  }, []);

  const addEntry = useCallback((entry: Omit<CommandEntry, 'id'>): number => {
    const newId = commandCounter.current++;
    setCommandHistory(prev => {
      const next = [...prev, { ...entry, id: newId }];
      return next.slice(-maxHistory);
    });
    return newId;
  }, [maxHistory]);

  const updateEntry = useCallback((id: number, updates: Partial<CommandEntry>) => {
    setCommandHistory(prev => prev.map(entry => 
      entry.id === id ? { ...entry, ...updates } : entry
    ));
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
    if (e.key === 'ArrowUp') {
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
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const rawInput = input.trim();
      if (!rawInput) {
        setInput('');
        return;
      }

      // Chat mode handling
      if (mode === 'chat') {
        if (rawInput === '/exit' || rawInput === '/quit') {
          setMode('command');
          setChatInputHandler(null);
          addEntry({ command: rawInput, output: 'Exited chat mode.' });
          setInput('');
          return;
        }

        if (chatInputHandler) {
          await chatInputHandler(rawInput);
        } else {
          addEntry({ command: rawInput, output: 'Error: Chat handler not initialized.', isError: true });
        }
        setInput('');
        return;
      }

      // Command mode handling
      const entryId = addEntry({ command: rawInput, output: 'Processing...' });
      setInput('');
      setHistoryIndex(-1);

      const output = await executeCommand(rawInput);
      
      const isError = output.toLowerCase().includes('error') || 
                      output.toLowerCase().includes('not found') ||
                      output.toLowerCase().includes('invalid');
      updateEntry(entryId, { output, isError });
    }
  }, [
    input, 
    commandHistory, 
    historyIndex, 
    executeCommand, 
    maxHistory,
    mode,
    chatInputHandler,
    setMode,
    addEntry,
    updateEntry
  ]);

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
    mode,
    setMode,
    chatInputHandler,
    setChatInputHandler,
    addEntry,
    updateEntry,
  };
}

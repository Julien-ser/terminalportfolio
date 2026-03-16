export interface Command {
  name: string;
  args: string[];
  options: Record<string, string | boolean>;
  raw: string;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export type CommandHandler = (
  args: string[],
  options: Record<string, string | boolean>
) => Promise<string>;

export function parseCommand(input: string): Command {
  const trimmed = input.trim();
  const parts = trimmed.split(/\s+/);
  
  if (parts.length === 0 || parts[0] === '') {
    return { name: '', args: [], options: {}, raw: trimmed };
  }

  const name = parts[0].toLowerCase();
  const args: string[] = [];
  const options: Record<string, string | boolean> = {};
  
  let i = 1;
  while (i < parts.length) {
    const part = parts[i];
    
    if (part.startsWith('--')) {
      const optionName = part.slice(2);
      if (i + 1 < parts.length && !parts[i + 1].startsWith('--')) {
        options[optionName] = parts[i + 1];
        i += 2;
      } else {
        options[optionName] = true;
        i++;
      }
    } else {
      args.push(part);
      i++;
    }
  }

  return {
    name,
    args,
    options,
    raw: trimmed,
  };
}

export function validateCommand(
  command: Command,
  validCommands: string[],
  requiredArgs?: number
): ValidationResult {
  if (!command.name) {
    return { isValid: false, error: 'Empty command' };
  }

  if (!validCommands.includes(command.name)) {
    return { isValid: false, error: `Command not found: ${command.name}` };
  }

  if (requiredArgs && command.args.length < requiredArgs) {
    return { 
      isValid: false, 
      error: `Missing argument(s). Required: ${requiredArgs}, got: ${command.args.length}` 
    };
  }

  return { isValid: true };
}

export function getAutoCompletions(
  input: string,
  availableCommands: string[]
): string[] {
  const trimmed = input.trim();
  if (!trimmed) {
    return availableCommands.slice(0, 10);
  }

  const parts = trimmed.split(/\s+/);
  const currentWord = parts[parts.length - 1] || '';
  
  if (parts.length === 1) {
    return availableCommands
      .filter(cmd => cmd.startsWith(currentWord))
      .slice(0, 10);
  }

  return [];
}

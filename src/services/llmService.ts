/**
 * LLM Service for OpenAI API integration with streaming support
 * Handles chat completions using GPT-4-turbo or GPT-3.5-turbo
 */

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface StreamCallbacks {
  onToken?: (token: string) => void;
  onComplete?: (fullResponse: string) => void;
  onError?: (error: Error) => void;
}

/**
 * Stream chat completion from OpenAI API
 * @param messages - Array of conversation messages (system, user, assistant)
 * @param apiKey - OpenAI API key (defaults to OPENAI_API_KEY env variable)
 * @param model - Model to use (default: gpt-4-turbo-preview)
 * @param callbacks - Optional callbacks for streaming events
 * @returns Promise that resolves when streaming completes
 */
export async function streamChat(
  messages: Message[],
  apiKey?: string,
  model: string = 'gpt-4-turbo-preview',
  callbacks?: StreamCallbacks
): Promise<string> {
  const key = apiKey || import.meta.env.VITE_OPENAI_API_KEY;

  if (!key) {
    const error = new Error('OpenAI API key not provided. Set OPENAI_API_KEY environment variable or pass apiKey parameter.');
    callbacks?.onError?.(error);
    throw error;
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
      },
      body: JSON.stringify({
        model,
        messages,
        stream: true,
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error = new Error(`OpenAI API error: ${response.status} ${response.statusText}${errorData.error?.message ? ` - ${errorData.error.message}` : ''}`);
      callbacks?.onError?.(error);
      throw error;
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Response body is not readable');
    }

    const decoder = new TextDecoder();
    let fullResponse = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(line => line.trim() !== '');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullResponse += content;
              callbacks?.onToken?.(content);
            }
          } catch {
            // Skip malformed JSON lines
          }
        }
      }
    }

    callbacks?.onComplete?.(fullResponse);
    return fullResponse;
  } catch (error) {
    if (error instanceof Error) {
      callbacks?.onError?.(error);
    }
    throw error;
  }
}

/**
 * Non-streaming version for simple use cases
 */
export async function chat(
  messages: Message[],
  apiKey?: string,
  model: string = 'gpt-4-turbo-preview'
): Promise<string> {
  const key = apiKey || import.meta.env.VITE_OPENAI_API_KEY;

  if (!key) {
    throw new Error('OpenAI API key not provided');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`,
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: 1000,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`OpenAI API error: ${response.status} ${errorData.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

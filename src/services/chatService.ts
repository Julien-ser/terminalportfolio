/**
 * Chat Service for RAG-powered conversational AI
 * Manages multi-turn conversations with context retrieval from vector database
 */

import { Message } from './llmService';
import { search } from './vectorService';
import { streamChat } from './llmService';

export class ChatService {
  private history: Message[] = [];

  /**
   * Send a message and get a streaming response with RAG context
   * @param userMessage - The user's question/message
   * @param onToken - Callback for each token in the streaming response
   * @throws Error if the chat fails
   */
  async sendMessage(
    userMessage: string,
    onToken: (token: string) => void
  ): Promise<void> {
    // Retrieve relevant context from vector database
    let context = '';
    try {
      const results = await search(userMessage, 5);
      context = results.map(r => r.content).join('\n---\n');
    } catch (error) {
      console.error('Failed to retrieve context:', error);
      // Continue with empty context - the assistant will use general knowledge
    }

    const systemPrompt = `You are a helpful assistant for a portfolio website. Answer questions about the portfolio owner based on the provided context. Keep responses concise and professional. If you cannot find the answer in the context, say so.

Context:
${context || 'No context available.'}`;

    // Build messages array with recent history (last 3 exchanges = 6 messages) to stay within token limits
    const messages: Message[] = [
      { role: 'system', content: systemPrompt },
      ...this.history.slice(-6),
      { role: 'user', content: userMessage }
    ];

    // Stream the response
    const fullResponse = await streamChat(messages, undefined, 'gpt-4-turbo-preview', {
      onToken,
    });

    // Update conversation history
    this.history.push({ role: 'user', content: userMessage });
    this.history.push({ role: 'assistant', content: fullResponse });

    // Prune history to last 6 messages (3 turns) to manage token usage
    if (this.history.length > 6) {
      this.history = this.history.slice(-6);
    }
  }

  /**
   * Clear conversation history for a fresh session
   */
  clear(): void {
    this.history = [];
  }
}

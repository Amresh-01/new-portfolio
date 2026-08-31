import { streamText } from 'ai';
import { createGroq } from '@ai-sdk/groq';

import { PORTFOLIO_CONTEXT } from '@/lib/chatContext';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      console.error('Invalid messages format:', messages);
      return Response.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: 'GROQ_API_KEY is not configured' },
        { status: 500 }
      );
    }

    // Create Groq provider with API key
    const groq = createGroq({
      apiKey: apiKey,
    });

    // Stream the response using AI SDK
    const result = streamText({
      model: groq('llama-3.1-8b-instant'),
      system: PORTFOLIO_CONTEXT,
      messages: messages as any,
      temperature: 0.7,
    });

    // Return UI message stream response for useChat hook
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const API_URL = 'https://api.deepseek.com/v1/chat/completions';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    console.log('Environment check:', {
      hasApiKey: !!DEEPSEEK_API_KEY,
      apiKeyLength: DEEPSEEK_API_KEY?.length,
      nodeEnv: process.env.NODE_ENV,
    });

    if (!DEEPSEEK_API_KEY) {
      console.error('DEEPSEEK_API_KEY is not set');
      return NextResponse.json(
        { error: 'API key is not configured. Please check environment variables.' },
        { status: 500 }
      );
    }

    const { messages } = await request.json();
    console.log('Sending request to DeepSeek API with messages:', messages);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: messages,
          temperature: 0.7,
          max_tokens: 2000,
          stream: false,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();
      console.log('DeepSeek API response:', data);

      if (!response.ok) {
        console.error('DeepSeek API error:', data);
        return NextResponse.json(
          { error: `API request failed: ${data.error?.message || response.statusText}` },
          { status: response.status }
        );
      }

      if (!data.choices?.[0]?.message) {
        console.error('Invalid response format:', data);
        return NextResponse.json(
          { error: 'Invalid response format from API' },
          { status: 500 }
        );
      }

      return NextResponse.json(data);
    } catch (fetchError) {
      clearTimeout(timeoutId);
      if (fetchError.name === 'AbortError') {
        return NextResponse.json(
          { error: 'Request timeout - API took too long to respond' },
          { status: 504 }
        );
      }
      throw fetchError;
    }
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
} 
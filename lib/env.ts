// Returns env key if present synchronously (fast path)
export function getGroqApiKey(): string | undefined {
  return process.env.GROQ_API_KEY;
}

// Async accessor that tries env first, then local fallback from lib/keys.ts (gitignored)
export async function getGroqApiKeyAsync(): Promise<string> {
  const fromEnv = process.env.GROQ_API_KEY;
  if (fromEnv) return fromEnv;
  try {
    // Dynamically import local-only fallback if exists
    const mod = await import('@/lib/keys');
    const candidate = (mod as any).GROQ_API_KEY as string | undefined;
    if (candidate && candidate.length > 0) return candidate;
  } catch (_) {
    // no local fallback available
  }
  throw new Error('GROQ_API_KEY is not set. Provide via environment or lib/keys.ts');
}

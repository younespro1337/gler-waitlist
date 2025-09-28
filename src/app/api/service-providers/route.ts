import { NextResponse } from 'next/server';
import { seedServiceProviders } from '@/lib/seed';
import type { ServiceProvider } from '@/lib/types';

let cached: ServiceProvider[] | null = null;

export async function GET(_req: Request) {
  if (!cached) {
    cached = seedServiceProviders(120);
  }
  return NextResponse.json({ data: cached });
}




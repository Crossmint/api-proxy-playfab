import { callCrossmintAPI } from '@/app/utils/crossmint';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const apiResponse = await callCrossmintAPI("v1-alpha1/wallets", { method: "POST", body });
  return NextResponse.json(apiResponse);
}

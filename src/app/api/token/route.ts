// src/app/api/token/route.ts
//import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from "next/server";
import { callCrossmintAPI } from "@/app/utils/crossmint";
import jwt from "jsonwebtoken";
import validateSessionWithPlayFab from "@/app/utils/playfab";

// required for CORS
export async function OPTIONS(req: NextRequest, res: NextResponse) {
  return NextResponse.json({ status: 200 });
}

const JWT_SECRET = process.env.JWT_SECRET;

type RequestBody = {
  SessionTicket: string;
};

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    //const SessionTicket = req.body.get("SessionTicket");
    const { SessionTicket } = await req.json();

    const playfabId = await validateSessionWithPlayFab(SessionTicket || "");
    if (!playfabId) {
      return NextResponse.json(
        { message: "Invalid session ticket" },
        { status: 401 }
      );
    }

    const body = {
      chain: "polygon",
      email: "danny@crossmint.io", // need to see if possible to extract this from playfab response
    };

    const apiResponse = await callCrossmintAPI("v1-alpha1/wallets", {
      method: "POST",
      body,
    });

    return NextResponse.json(apiResponse, { status: 200 });

    // Generate JWT
    const token = jwt.sign({ playfabId: playfabId }, JWT_SECRET!, {
      expiresIn: "24h",
    });

    return NextResponse.json({ token });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}

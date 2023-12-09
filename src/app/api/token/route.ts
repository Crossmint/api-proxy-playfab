// src/app/api/token/route.ts
//import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from "next/server";
import { callCrossmintAPI } from "@/app/utils/crossmint";
import validateSessionWithPlayFab from "@/app/utils/playfab";

// required for CORS
export async function OPTIONS(req: NextRequest, res: NextResponse) {
  return NextResponse.json({ status: 200 });
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { SessionTicket } = await req.json();

    const playfabId = await validateSessionWithPlayFab(SessionTicket || "");
    if (playfabId.error) {
      return NextResponse.json(
        { message: playfabId.message },
        { status: 401 }
      );
    }

    console.log('user', playfabId.data.UserInfo.PrivateInfo);

    const body = {
      chain: "polygon",
      email: playfabId.data.UserInfo.PrivateInfo.Email
    };

    const apiResponse = await callCrossmintAPI("v1-alpha1/wallets", {
      method: "POST",
      body,
    });

    return NextResponse.json(apiResponse, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}

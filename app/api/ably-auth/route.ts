import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Ably from "ably";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const ably = new Ably.Rest(process.env.ABLY_API_KEY!);

    const tokenRequest = await ably.auth.createTokenRequest({
      clientId: userId,
    });

    return NextResponse.json(tokenRequest);
  } catch (error) {
    console.error("Ably auth error:", error);
    return NextResponse.json(
      { error: "Token creation failed" },
      { status: 500 },
    );
  }
}

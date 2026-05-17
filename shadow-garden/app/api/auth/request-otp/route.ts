import { NextRequest, NextResponse } from "next/server";
import { generateOtp } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();

    if (!phone || !/^\d{10,15}$/.test(phone)) {
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { phone } });

    const code = await generateOtp(phone);

    const isDev = process.env.NODE_ENV === "development" || !process.env.TWILIO_ACCOUNT_SID;

    if (!isDev && process.env.TWILIO_ACCOUNT_SID) {
      const twilio = await import("twilio");
      const client = twilio.default(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );
      await client.messages.create({
        body: `Your Shadow Garden OTP: ${code}. Valid for 10 minutes.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: `+${phone}`,
      });
      return NextResponse.json({ success: true, isNew: !user });
    }

    return NextResponse.json({
      success: true,
      isNew: !user,
      devOtp: isDev ? code : undefined,
    });
  } catch (error) {
    console.error("OTP request error:", error);
    return NextResponse.json(
      { error: "Failed to send OTP" },
      { status: 500 }
    );
  }
}

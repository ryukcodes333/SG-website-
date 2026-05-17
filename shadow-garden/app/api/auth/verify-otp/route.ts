import { NextRequest, NextResponse } from "next/server";
import { verifyOtp, getOrCreateUser, createSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { phone, code, name } = await req.json();

    if (!phone || !code) {
      return NextResponse.json(
        { error: "Phone and code are required" },
        { status: 400 }
      );
    }

    const valid = await verifyOtp(phone, code);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid or expired OTP" },
        { status: 401 }
      );
    }

    const user = await getOrCreateUser(phone, name);

    const token = await createSession({
      userId: user.id.toString(),
      phone: user.phone,
      name: user.name,
      role: user.role,
      premium: user.premium,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id.toString(),
        phone: user.phone,
        name: user.name,
        role: user.role,
      },
    });

    response.cookies.set("sg_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("OTP verify error:", error);
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }
}

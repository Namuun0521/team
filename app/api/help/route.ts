import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/lib/db"; // Prisma client — adjust path if needed

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { issueType, description, email } = body;

    if (!issueType || !description || !email) {
      return NextResponse.json(
        { error: "Бүх талбарыг бөглөнө үү" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Зөв и-мэйл хаяг оруулна уу" },
        { status: 400 }
      );
    }

    // Save to database — uncomment when HelpRequest model is added to schema
    // await db.helpRequest.create({
    //   data: { issueType, description, email },
    // });

    // Optional: send email notification (e.g. using Resend / Nodemailer)
    // await sendEmail({ to: "info@freelancer.mn", subject: `Шинэ тусламжийн хүсэлт: ${issueType}`, text: description });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[HELP_POST]", err);
    return NextResponse.json(
      { error: "Серверийн алдаа гарлаа. Дахин оролдоно уу." },
      { status: 500 }
    );
  }
}
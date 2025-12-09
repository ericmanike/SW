import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Payment from "@/models/Payment";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { reference, name, email, message } = await req.json();

    if (!reference) {
      return NextResponse.json({ error: "Missing reference" }, { status: 400 });
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ error: "Missing Paystack Secret Key" }, { status: 500 });
    }

    // --- Verify payment from Paystack ---
    const verify = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: { Authorization: `Bearer ${secretKey}` },
      }
    );

    const data = await verify.json();

    if (!data.status || data.data.status !== "success") {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
    }

    // Extract Paystack details
    const amount = data.data.amount / 100; // convert from kobo
    const paymentMethod = data.data.authorization?.channel || "unknown";
    const cardLast4 = data.data.authorization?.last4 || null;
    const currency = data.data.currency;

    // --- Save to MongoDB ---
    const newPayment = await Payment.create({
      reference,
      amount,
      status: "success",
      currency,
      paymentMethod,
      cardLast4,
      name,
      email,
      message,
    });

    return NextResponse.json(
      { success: true, payment: newPayment },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("PAYSTACK VERIFY ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}

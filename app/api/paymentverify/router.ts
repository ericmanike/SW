import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import payment from "@/models/payment";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { userId, reference } = await req.json();

    if (!userId || !reference) {
      return NextResponse.json({ error: "Missing userId or reference" }, { status: 400 });
    }

    // Verify payment with Paystack
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    const verify = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    });

    const data = await verify.json();

    if (!data.status || data.data.status !== "success") {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
    }

    // Extract safe info
    const amount = data.data.amount / 100; // Paystack sends in kobo
    const cardLast4 = data.data.authorization?.last4 || null;
    const paymentMethod = data.data.authorization?.channel || "card";

    // Store in MongoDB
    const Newpayment = await payment.create({
      userId,
      reference,
      amount,
      status: "success",
      currency: data.data.currency,
      paymentMethod,
      cardLast4,
    });

    return NextResponse.json({ success: true, payment });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}

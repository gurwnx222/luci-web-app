// app/api/create-checkout-session/route.js
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-09-30.clover",
});

export async function POST(req) {
  try {
    const { priceId } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId, // e.g., 'price_1234567890'
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get(
        "origin"
      )}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/canceled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Error creating checkout session:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { CheckCircle, Mail, Home } from "lucide-react";
import Link from "next/link";

interface SuccessProps {
  searchParams: { session_id?: string };
}

export default async function Success({ searchParams }: SuccessProps) {
  const { session_id } = searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const { status, customer_details, amount_total } = session;
  const customerEmail = customer_details?.email ?? "your email";

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    return (
      <section className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 flex items-center justify-center p-6">
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center animate-fadeIn">
          <div className="flex justify-center mb-4">
            <CheckCircle className="text-green-500 w-16 h-16 animate-bounce-slow" />
          </div>
          <h1 className="text-3xl font-semibold text-gray-800 mb-3">
            Payment Successful
          </h1>
          <p className="text-gray-600 mb-3">
            🎉 Thank you for your purchase! A confirmation email has been sent to{" "}
            <span className="font-medium text-gray-800">{customerEmail}</span>.
          </p>
          <p className="text-gray-600 mb-6">
            Total Amount:{" "}
            <span className="font-semibold text-green-600">
              ${(amount_total! / 100).toFixed(2)}
            </span>
          </p>
          <div className="flex flex-col gap-3 items-center">
            <a
              href="mailto:caleb.designer1@gmail.com"
              className="inline-flex items-center gap-2 text-blue-600 hover:underline"
            >
              <Mail className="w-4 h-4" />
              Need help? Contact support
            </a>
            <Link
              href="/"
              className="mt-4 inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              <Home className="w-4 h-4" /> Back to Home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-md rounded-xl p-6 max-w-sm text-center">
        <h1 className="text-xl font-semibold mb-3 text-gray-800">
          ⚠️ Payment Not Completed
        </h1>
        <p className="text-gray-600">Status: {status}</p>
        <Link
          href="/"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          Return Home
        </Link>
      </div>
    </section>
  );
}

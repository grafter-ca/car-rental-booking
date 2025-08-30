import { redirect } from "next/navigation"
import { stripe } from "@/lib/stripe"

interface SuccessProps {
  searchParams: { session_id?: string }
}

export default async function Success({ searchParams }: SuccessProps) {
  const { session_id } = searchParams

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)")
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  })

  const { status, customer_details } = session
  const customerEmail = customer_details?.email ?? "your email"

  if (status === "open") {
    return redirect("/")
  }

  if (status === "complete") {
    return (
      <section id="success" className="p-6 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">✅ Payment Successful</h1>
        <p className="mb-2">
          We appreciate your business! A confirmation email will be sent to{" "}
          <span className="font-semibold">{customerEmail}</span>.
        </p>
        <p>
          If you have any questions, please email{" "}
          <a
            href="mailto:orders@example.com"
            className="text-blue-600 underline"
          >
            orders@example.com
          </a>.
        </p>
      </section>
    )
  }

  return (
    <section id="success" className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-semibold mb-4">⚠️ Payment not completed</h1>
      <p>Status: {status}</p>
    </section>
  )
}

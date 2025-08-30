interface CheckoutProps {
  searchParams: { canceled?: string }
}

export default async function CheckOutPayment({ searchParams }: CheckoutProps) {
  const { canceled } = searchParams

  return (
    <section className="flex flex-col items-center justify-center p-6 max-w-lg mx-auto">
      {canceled && (
        <p className="mb-0 text-red-500">
          ❌ Order canceled — continue shopping and checkout when you’re ready.
        </p>
      )}

      <form action="/api/checkout_sessions" method="POST">
        <button
          type="submit"
          role="link"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Checkout
        </button>
      </form>
    </section>
  )
}

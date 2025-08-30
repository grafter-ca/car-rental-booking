'use client';
import React from "react";
import CheckOutPayment from "@/components/CheckOutPayment";

const PaymentPage = () => {
  return (
    <div className="flex flex-col items-center py-12">
      <h1 className="pb-1 text-3xl font-bold">Payment Checkout</h1>
      <CheckOutPayment searchParams={{}} />
    </div>
  );
};

export default PaymentPage;

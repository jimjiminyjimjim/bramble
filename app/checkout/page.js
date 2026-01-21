"use client";

import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const redirectToCheckout = async () => {
      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });

        const data = await response.json();

        if (data.url) {
          window.location.href = data.url;
        } else {
          setError(data.error || "Failed to create checkout session");
          setLoading(false);
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
        setLoading(false);
      }
    };

    redirectToCheckout();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-error mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="mt-4">Redirecting to checkout...</p>
      </div>
    </div>
  );
}

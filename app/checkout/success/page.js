export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">✓</div>
        <h1 className="text-2xl font-bold mb-2">Payment Successful</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your subscription. You will receive a confirmation email shortly.
        </p>
        <a href="/" className="btn btn-primary">
          Return Home
        </a>
      </div>
    </div>
  );
}

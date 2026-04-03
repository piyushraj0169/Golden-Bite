import { useEffect, useState } from "react";

export default function useRazorpayScript() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (document.getElementById("razorpay-js")) return setReady(true);
    const script = document.createElement("script");
    script.id = "razorpay-js";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setReady(true);
    script.onerror = () => setReady(false);
    document.body.appendChild(script);
  }, []);

  return ready;
}

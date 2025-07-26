import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const [params] = useSearchParams();

  useEffect(() => {
    const verifyPayment = async () => {
      const data = {
        razorpay_order_id: params.get("razorpay_order_id"),
        razorpay_payment_id: params.get("razorpay_payment_id"),
        razorpay_signature: params.get("razorpay_signature"),
      };

      try {
        const res = await axios.post("http://localhost:8000/api/payments/verify", data);
        alert(res.data.message);
      } catch (error) {
        alert("Payment verification failed.");
      }
    };

    if (params.get("razorpay_order_id")) verifyPayment();
  }, []);

  return <div>Verifying your payment...</div>;
};

export default PaymentSuccess;

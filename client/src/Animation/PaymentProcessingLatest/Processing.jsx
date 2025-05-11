// PaymentProcessingOnly.jsx
import { Player } from "@lottiefiles/react-lottie-player";
import paymentAnimation from "./animation.json";

export default function PaymentProcessingOnly() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <Player
        autoplay
        loop
        src={paymentAnimation}
        style={{ height: "450px", width: "450px" }}
      />
      <p className="mt-4 text-lg text-gray-700 font-medium">
        Processing Payment...
      </p>
    </div>
  );
}

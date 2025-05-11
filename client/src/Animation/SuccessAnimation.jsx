import { Player } from "@lottiefiles/react-lottie-player";
import { Howl } from "howler";
import successAnimation from "./success.json";
import successSound from "./success.mp3";
import { useEffect, useRef } from "react";

export default function SuccessAnimation() {
  const soundRef = useRef(null);

  useEffect(() => {
    soundRef.current = new Howl({
      src: [successSound],
    });
    soundRef.current.play();
  }, []);

  return (
    <div className="flex items-center justify-center h-[70vh] bg-transparent">
      <Player
        autoplay
        keepLastFrame
        src={successAnimation}
        style={{ height: "300px", width: "300px" }}
      />
    </div>
  );
}

import { animate } from "@motionone/dom";
import { useEffect } from "react";

export default function Web() {
  useEffect(() => {
    animate();
  });
  return (
    <div>
      <h1>Web</h1>
    </div>
  );
}

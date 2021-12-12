import { ReactChild, useEffect, useRef } from "react";
import { animate } from "popmotion";

function createDepthShadow(size: number) {
  let shadow = "";

  for (let i = 1; i <= size; i++) {
    shadow += `${i}px ${i}px var(--secondary), `;
  }

  return shadow.slice(0, -2);
}

interface Props {
  children: ReactChild;
  delay?: number;
}

function PopText({ children, delay = 0 }: Props) {
  const ref = useRef(null);

  useEffect(() => {
    const fontSize = parseFloat(window.getComputedStyle(ref.current).fontSize);

    animate({
      from: 0,
      to: fontSize / 10,
      damping: 25,
      stiffness: 300,
      velocity: fontSize * 8,
      elapsed: -delay,
      onUpdate: (depth) => {
        depth = Math.ceil(depth);
        ref.current.style.transform = `translate3d(-${depth}px, -${depth}px, 0px)`;
        ref.current.style.textShadow = createDepthShadow(depth);
      },
    });
  }, []);

  return <span ref={ref}>{children}</span>;
}

export function LandingPageHeader() {
  return (
    <h1>
      <PopText delay={400}>Motion</PopText> <PopText delay={700}>Made</PopText>{" "}
      <PopText delay={1000}>Simple</PopText>
    </h1>
  );
}

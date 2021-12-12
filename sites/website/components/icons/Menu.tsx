import * as React from "react";
import { animated } from "motion/react";

interface LineProps {
  d: string;
  style?: any;
  options?: any;
}

function Line({ d, style, options }: LineProps) {
  return (
    <animated.path
      d={d}
      fill="transparent"
      strokeWidth="3"
      stroke="rgb(255, 248, 31)"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      options={options}
    ></animated.path>
  );
}

interface Props {
  onClick?: VoidFunction;
  isOpen?: boolean;
  className?: string;
}

export function MenuIcon({ onClick, isOpen, className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      onClick={onClick}
      style={{
        WebkitTapHighlightColor: "transparent",
        WebkitTouchCallout: "none",
        userSelect: "none",
        cursor: "pointer",
      }}
      className={className}
    >
      <Line
        d="M 5 8 L 26 8"
        style={{
          transformOrigin: "15px 8px",
          transform: isOpen ? "translateY(7px) rotate(45deg)" : "none",
        }}
      />
      <Line
        d="M 5 15 L 26 15"
        style={{ opacity: isOpen ? 0 : 1 }}
        options={{ duration: 0.2 }}
      />
      <Line
        d="M 5 22 L 26 22"
        style={{
          transformOrigin: "15px 22px",
          transform: isOpen ? "translateY(-7px) rotate(-45deg)" : "none",
        }}
      />
    </svg>
  );
}

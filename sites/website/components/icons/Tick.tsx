import { motion, useMotionValue, useTransform } from "framer-motion";

interface Props {
  initial?: string | false;
  animate?: string;
  delay?: number;
  color?: string;
  style?: React.CSSProperties;
}

export function Tick({
  initial = "hidden",
  animate = "visible",
  delay,
  color = "var(--background)",
  style,
}: Props) {
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0, 0.05], [0, 1]);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="16"
      viewBox="0 0 15 11"
      style={style}
    >
      <motion.path
        initial={initial}
        animate={animate}
        exit={{ scale: 0, opacity: 0, transition: { duration: 0.3 } }}
        d="M 2 6 L 5.5 9.5 L 13 2"
        fill="transparent"
        strokeWidth="2"
        stroke={color}
        strokeLinecap="round"
        strokeMiterlimit="10"
        style={{ pathLength, opacity }}
        variants={{
          hidden: { scale: 0.5, pathLength: 0 },
          visible: {
            scale: 1,
            pathLength: 1,
            transition: { delay: delay || 0 },
          },
        }}
      />
    </svg>
  );
}

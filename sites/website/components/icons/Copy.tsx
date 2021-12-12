import { motion } from "framer-motion";

export function CopyIcon() {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="23"
      initial={{ scale: 0.3, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        transition: { type: "spring", duration: 0.3, bounce: 0.3 },
      }}
      exit={{
        scale: 0.3,
        opacity: 0,
        transition: { type: "spring", duration: 0.3, bounce: 0 },
      }}
    >
      <path
        d="M 6 8 C 6 6.895 6.895 6 8 6 L 19 6 C 20.105 6 21 6.895 21 8 L 21 19 C 21 20.105 20.105 21 19 21 L 8 21 C 6.895 21 6 20.105 6 19 Z"
        fill="rgb(15, 17, 21)"
        strokeWidth="2"
        stroke="rgb(255, 255, 255)"
      ></path>
      <path
        d="M 1 3 C 1 1.895 1.895 1 3 1 L 14 1 C 15.105 1 16 1.895 16 3 L 16 14 C 16 15.105 15.105 16 14 16 L 3 16 C 1.895 16 1 15.105 1 14 Z"
        fill="rgb(15, 17, 21)"
        strokeWidth="2"
        stroke="rgb(255, 255, 255)"
      ></path>
    </motion.svg>
  );
}

import * as React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const RefreshContainer = styled(motion.div)`
  padding: 10px;
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  top: 10px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const button = {
  rest: { scale: 1 },
  hover: { scale: 1.1 },
  pressed: { scale: 0.95 },
};

const arrow = {
  rest: { rotate: 0 },
  hover: { rotate: 360, transition: { duration: 0.4 } },
};

export const Reset = ({ onClick }) => {
  return (
    <RefreshContainer
      onClick={onClick}
      variants={button}
      initial="rest"
      whileHover="hover"
      whileTap="pressed"
    >
      <motion.svg
        width="16"
        height="16"
        xmlns="http://www.w3.org/2000/svg"
        variants={arrow}
      >
        <path
          d="M12.8 5.1541V2.5a.7.7 0 0 1 1.4 0v5a.7.7 0 0 1-.7.7h-5a.7.7 0 0 1 0-1.4h3.573c-.7005-1.8367-2.4886-3.1-4.5308-3.1C4.8665 3.7 2.7 5.85 2.7 8.5s2.1665 4.8 4.8422 4.8c1.3035 0 2.523-.512 3.426-1.4079a.7.7 0 0 1 .986.9938C10.7915 14.0396 9.2186 14.7 7.5422 14.7 4.0957 14.7 1.3 11.9257 1.3 8.5s2.7957-6.2 6.2422-6.2c2.1801 0 4.137 1.1192 5.2578 2.8541z"
          fill="#fff"
          fillRule="nonzero"
        />
      </motion.svg>
    </RefreshContainer>
  );
};

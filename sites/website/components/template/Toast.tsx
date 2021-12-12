import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const messages = {
  ["subscription-confirmed"]: "Subscription confirmed",
};

export function Toast() {
  const { query } = useRouter();
  const hasValidMessage = Boolean(
    typeof query.message === "string" && messages[query.message]
  );
  const [showMessage, setShowMessage] = useState(hasValidMessage);

  useEffect(() => {
    // setTimeout(() => setShowMessage(!showMessage), 5000);
  }, []);

  if (hasValidMessage) {
    const message = messages[query.message as string];

    return (
      <AnimatePresence>
        {showMessage && message && <Message>{message}</Message>}
      </AnimatePresence>
    );
  } else {
    return null;
  }
}

const Message = styled(motion.div)`
  position: fixed;
  bottom: 20;
  background: var(--success);
  color: var(--foreground);
`;

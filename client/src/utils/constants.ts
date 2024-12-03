import { keyframes } from "@emotion/react";


export const fadeOut = keyframes`
from {
  opacity: 1;
}
to {
  opacity: 0;
}
`;

export const shakeAnimation = keyframes`
0%, 100% { transform: translateX(0); }
25% { transform: translateX(-2px); }
50% { transform: translateX(2px); }
75% { transform: translateX(-2px); }
`;
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fadeOut } from "../../utils/constants";

// Styled Box component with Emotion
const FullScreenBox = styled(Box)<{ fadeout: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: black;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1300;
  ${({ fadeout }) =>
    fadeout === "true" &&
    css`
      animation: ${fadeOut} 0.5s forwards;
      opacity: 0;
    `}
  transition: opacity 0.5s;
`;

const Loader: React.FC<{ fadeout: boolean }> = () => {
  const [fadeOutEffect, setFadeOutEffect] = useState("false");

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOutEffect("true");
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <FullScreenBox fadeout={fadeOutEffect}>
      <Box
        sx={{
          height: "19%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="/images/loader-logo.png"
          alt="RCS Logo"
          style={{ height: "60%", marginBottom: "10%" }}
        />
        <CircularProgress
          style={{ color: "white", height: "9%", width: "9%" }}
          aria-label="loading"
        />{" "}
      </Box>
    </FullScreenBox>
  );
};

export default Loader;

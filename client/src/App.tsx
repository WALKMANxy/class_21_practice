import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "./styles/theme";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { useEffect, useState } from "react";
import { useAppDispatch } from "./app/hooks";
import { refreshAccessToken } from "./services/sessionService";
import { handleLogout } from "./store/auth/authThunks";
import Loader from "./components/common/Loader";

//console.log("Vite mode:", import.meta.env.MODE);

function App() {
  const dispatch = useAppDispatch();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const initializeApp = async () => {
      if (!isMounted) return;

      try {
        const localAuthState = localStorage.getItem("authState");
        if (!localAuthState) {
          setIsInitializing(false);
          return;
        }

        const storedAuthState = JSON.parse(localAuthState);

        if (storedAuthState.isLoggedIn) {
          const refreshSuccessful = await refreshAccessToken();

          if (!refreshSuccessful && !storedAuthState.id) {
            console.error("Failed to fetch current user");
            dispatch(handleLogout());
          }
        }
      } finally {
        if (isMounted) {
          setIsInitializing(false);
        }
      }
    };

    initializeApp();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  if (isInitializing) {
    return <Loader fadeout={!isInitializing} />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;

// src/hooks/useAuth.ts
import { useAppDispatch } from "../../app/hooks";
import {
  getUserById,
  loginUser,
  registerUser,
} from "../../store/auth/api/auth";
import { setRegistered } from "../../utils/landingUtils";
import { setAccessToken } from "../../services/tokenService";
import { handleLogin, handleLogout } from "../../store/auth/authThunks";
import { saveAuthState } from "../../services/localStorage";
import store from "../../app/store";
import { User } from "../../models/User";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const initiateRegister = async (
    email: string,
    password: string,
    username: string,
    name: string,
    setAlertMessage: (message: string) => void,
    setAlertSeverity: (severity: "success" | "error") => void,
    setAlertOpen: (open: boolean) => void
  ) => {
    // Client-side validation for email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setAlertMessage("Indirizzo email non valido.");
      setAlertSeverity("error");
      setAlertOpen(true);
      return;
    }

    // Client-side validation for password
    if (password.length < 8) {
      setAlertMessage("La password deve contenere almeno 8 caratteri.");
      setAlertSeverity("error");
      setAlertOpen(true);
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setAlertMessage("La password deve contenere almeno una lettera maiuscola.");
      setAlertSeverity("error");
      setAlertOpen(true);
      return;
    }
    if (!/[a-z]/.test(password)) {
      setAlertMessage("La password deve contenere almeno una lettera minuscola.");
      setAlertSeverity("error");
      setAlertOpen(true);
      return;
    }
    if (!/[0-9]/.test(password)) {
      setAlertMessage("La password deve contenere almeno un numero.");
      setAlertSeverity("error");
      setAlertOpen(true);
      return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setAlertMessage("La password deve contenere almeno un carattere speciale.");
      setAlertSeverity("error");
      setAlertOpen(true);
      return;
    }

    // Validation for username
    if (!username || username.length > 12) {
      setAlertMessage("Il nome utente deve essere lungo massimo 12 caratteri.");
      setAlertSeverity("error");
      setAlertOpen(true);
      return;
    }

    // Validation for name
    if (!name || name.length > 25) {
      setAlertMessage("Il nome deve essere lungo massimo 25 caratteri.");
      setAlertSeverity("error");
      setAlertOpen(true);
      return;
    }

    try {
      const { statusCode, message } = await registerUser({
        email,
        password,
        username,
        name,
      });

      // Check if the registration was unsuccessful
      if (statusCode !== 201) {
        console.warn(
          "Registration failed with status code:",
          statusCode,
          "Message:",
          message
        );
        setAlertMessage("Registrazione fallita: " + message);
        setAlertSeverity("error");
        setAlertOpen(true);
        return;
      }

      setAlertMessage("Registrazione avvenuta con successo!");
      setAlertSeverity("success");
      setAlertOpen(true);
      setRegistered(true);
    } catch (error) {
      console.warn("Registration error:", (error as Error).message);

      setAlertMessage("Registrazione fallita. Si prega di riprovare.");
      setAlertSeverity("error");
      setAlertOpen(true);
    }
  };

  const initiateLogin = async (
    email: string,
    password: string,
    setAlertMessage: (message: string) => void,
    setAlertSeverity: (severity: "success" | "error" | "info") => void,
    setAlertOpen: (open: boolean) => void,
    onClose: () => void,
    keepMeSignedIn: boolean
  ) => {
    try {
      // Check if email or password is empty
      if (!email) {
        setAlertMessage("Inserisci la tua email.");
        setAlertSeverity("error");
        setAlertOpen(true);
        return;
      }

      if (!password) {
        setAlertMessage("Inserisci la tua password.");
        setAlertSeverity("error");
        setAlertOpen(true);
        return;
      }

      // Attempt to log in the user
      const { id, message, statusCode, refreshToken, accessToken } =
        await loginUser({
          email,
          password,
        });

      // Handle 401 Unauthorized response
      if (statusCode === 401) {
        setAlertMessage("Accesso non autorizzato.");
        setAlertSeverity("error");
        setAlertOpen(true);
        return;
      }

      if (statusCode !== 200) {
        console.warn(
          "Login failed with status code:",
          statusCode,
          "Message:",
          message
        );

        // Check for specific error messages and use corresponding messages
        if (message.includes("Invalid credentials")) {
          setAlertMessage("Credenziali non valide.");
        } else if (message.includes("Network Error")) {
          setAlertMessage("Server non raggiungibile.");
        } else {
          setAlertMessage("Accesso fallito: " + message);
        }

        setAlertSeverity("error");
        setAlertOpen(true);
        return;
      }

      // Validate tokens
      if (!accessToken || !refreshToken) {
        console.error(
          "Access token or refresh token missing in login response"
        );
        throw new Error("Login failed: Access token or Refresh token missing");
      }

      // Store the access token in memory
      setRegistered(true);
      setAccessToken(accessToken);

      // Proceed if the login was successful
      const userId = id;

      if (userId) {
        const result = await getUserById(userId);

        if (result) {
          const user = result as User;

          await dispatch(
            handleLogin({
              id: user._id,
              email: user.email,
              username: user.username,
              name: user.name,
              refreshToken,
            })
          );

          if (keepMeSignedIn) {
            saveAuthState(store.getState().auth);
          }

          onClose();
        }
      } else {
        console.error("User ID not found in login response");
        setAlertMessage("Utente non trovato.");
        setAlertSeverity("error");
        setAlertOpen(true);
      }
    } catch (error) {
      console.error("Error during initiateLogin:", error);
      let errorMessage = "Errore durante il login.";
      const errorSeverity: "error" | "info" = "error";

      if (error instanceof Error && error.message.includes("undefined")) {
        errorMessage =
          "Il server non è al momento raggiungibile, prova più tardi.";
        setAlertMessage(errorMessage);
        setAlertSeverity(errorSeverity);
        setAlertOpen(true);
      } else if (
        error instanceof Error &&
        error.message.includes("Forbidden")
      ) {
        errorMessage =
          "Errore imprevisto nell'autenticazione, verifica che le credenziali siano corrette.";
        setAlertMessage(errorMessage);
        setAlertSeverity("info");
        setAlertOpen(true);
      } else {
        setAlertMessage(errorMessage);
        setAlertSeverity(errorSeverity);
        setAlertOpen(true);
      }
    }
  };

  const initiateLogout = (
    setAlertMessage: (message: string) => void,
    setAlertSeverity: (severity: "success" | "error") => void,
    setAlertOpen: (open: boolean) => void
  ) => {
    try {
      dispatch(handleLogout());
      setAlertMessage("Logout effettuato con successo!");
      setAlertSeverity("success");
      setAlertOpen(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setAlertMessage("Logout fallito: " + error.message);
        setAlertSeverity("error");
        setAlertOpen(true);
      } else {
        setAlertMessage("Logout fallito: Errore sconosciuto");
        setAlertSeverity("error");
        setAlertOpen(true);
      }
    }
  };

  return {
    initiateRegister,
    initiateLogin,
    initiateLogout,
  };
};

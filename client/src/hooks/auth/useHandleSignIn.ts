// src/hooks/useHandleSignin.ts
import { useCallback, useEffect, useState } from "react";
import { isRegistered } from "../../utils/landingUtils";
import { useAuth } from "./useAuth";

export const useHandleSignin = (onClose: () => void) => {
  const [isLoginMode, setIsLoginMode] = useState<boolean>(() => isRegistered());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState(""); 
  const [name, setName] = useState(""); 
  const [keepMeSignedIn, setKeepMeSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<
    "success" | "error" | "info"
  >("error");
  const [shakeEmail, setShakeEmail] = useState(false);
  const [shakePassword, setShakePassword] = useState(false);
  const [shakeConfirmPassword, setShakeConfirmPassword] = useState(false);
  const [shakeUsername, setShakeUsername] = useState(false); 
  const [shakeName, setShakeName] = useState(false); 

  const { initiateLogin, initiateRegister } = useAuth();

  const toggleMode = useCallback(() => {
    setIsLoginMode((prevMode) => !prevMode);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setUsername(""); 
    setName(""); 
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    // Reset shake states
    setShakeEmail(false);
    setShakePassword(false);
    setShakeConfirmPassword(false);
    setShakeUsername(false);
    setShakeName(false);

    try {
      if (isLoginMode) {
        // Login mode
        if (!email) {
          setAlertMessage("L'email è obbligatoria.");
          setAlertSeverity("error");
          setAlertOpen(true);
          setShakeEmail(true);
          setLoading(false);
          return;
        }
        if (!password) {
          setAlertMessage("La password è obbligatoria.");
          setAlertSeverity("error");
          setAlertOpen(true);
          setShakePassword(true);
          setLoading(false);
          return;
        }

        await initiateLogin(
          email,
          password,
          setAlertMessage,
          setAlertSeverity,
          setAlertOpen,
          onClose,
          keepMeSignedIn
        );
      } else {
        // Registration mode
        let hasError = false;

        if (!email) {
          setAlertMessage("L'email è obbligatoria.");
          setAlertSeverity("error");
          setAlertOpen(true);
          setShakeEmail(true);
          hasError = true;
        }
        if (!password) {
          setAlertMessage("La password è obbligatoria.");
          setAlertSeverity("error");
          setAlertOpen(true);
          setShakePassword(true);
          hasError = true;
        }
        if (!confirmPassword) {
          setAlertMessage("Conferma la tua password.");
          setAlertSeverity("error");
          setAlertOpen(true);
          setShakeConfirmPassword(true);
          hasError = true;
        }
        if (password !== confirmPassword) {
          setAlertMessage("Le password non coincidono.");
          setAlertSeverity("error");
          setAlertOpen(true);
          setShakePassword(true);
          setShakeConfirmPassword(true);
          hasError = true;
        }
        if (!username || username.length > 12) {
          setAlertMessage(
            "Il nome utente deve essere lungo massimo 12 caratteri."
          );
          setAlertSeverity("error");
          setAlertOpen(true);
          setShakeUsername(true);
          hasError = true;
        }
        if (!name || name.length > 25) {
          setAlertMessage("Il nome deve essere lungo massimo 25 caratteri.");
          setAlertSeverity("error");
          setAlertOpen(true);
          setShakeName(true);
          hasError = true;
        }

        if (hasError) {
          setLoading(false);
          // Debounce reset to ensure animation triggers
          setTimeout(() => {
            setShakeEmail(false);
            setShakePassword(false);
            setShakeConfirmPassword(false);
            setShakeUsername(false);
            setShakeName(false);
          }, 2000);
          return;
        }

        await initiateRegister(
          email,
          password,
          username,
          name,
          setAlertMessage,
          setAlertSeverity,
          setAlertOpen
        );
      }
    } catch (error: unknown) {
      // Handling the error with proper type checking
      if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("Error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  // Optionally, update useEffect to handle shake animations based on alert messages
  useEffect(() => {
    // Reset shake effects after the animation completes
    const resetShake = setTimeout(() => {
      setShakeEmail(false);
      setShakePassword(false);
      setShakeConfirmPassword(false);
      setShakeUsername(false);
      setShakeName(false);
    }, 2000);

    return () => clearTimeout(resetShake);
  }, [alertMessage]);

  return {
    isLoginMode,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    username, // Export username
    setUsername, // Export setUsername
    name, // Export name
    setName, // Export setName
    keepMeSignedIn,
    setKeepMeSignedIn,
    loading,
    alertOpen,
    setAlertOpen,
    alertMessage,
    alertSeverity,
    shakeEmail,
    shakePassword,
    shakeConfirmPassword,
    shakeUsername, // Export shakeUsername
    shakeName, // Export shakeName
    toggleMode,
    handleSubmit,
  };
};

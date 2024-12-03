import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Collapse,
  Dialog,
  DialogContent,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import "animate.css";
import React, { useCallback, useState } from "react";
import { useHandleSignin } from "../../hooks/auth/useHandleSignIn";
import { useLocation } from "react-router-dom"; // Import useLocation

interface AuthenticationModalProps {
  open: boolean;
  onClose: () => void;
}

const AuthenticationModal: React.FC<AuthenticationModalProps> = ({
  open,
  onClose,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [animationClass, setAnimationClass] = useState("animate__fadeIn");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    isLoginMode,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
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
    toggleMode: originalToggleMode,
    username,
    setUsername,
    name,
    setName,
    shakeUsername,
    shakeName,
    handleSubmit,
  } = useHandleSignin(onClose);

  // Get the current pathname
  const location = useLocation();
  const { pathname } = location;

  // Determine appName and button color based on pathname
  let appName = "NEXT_";
  let buttonColor = "#81c784"; // Default color

  if (pathname.includes("eshop")) {
    appName = "Subito.it";
    buttonColor = "#f9423a";
  } else if (pathname.includes("trains")) {
    appName = "Trenitalia";
    buttonColor = "#c41228";
  }

  // Toggle functions
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const toggleMode = useCallback(() => {
    setAnimationClass("animate__animated animate__fadeOut");
    setTimeout(() => {
      originalToggleMode();
      setAnimationClass("animate__animated animate__fadeIn");
    }, 250);
  }, [originalToggleMode]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "30px",
          backdropFilter: "blur(120px)",
          backgroundColor: "rgba(255, 255, 255, 1)",
        },
      }}
    >
      <DialogContent
        className={animationClass}
        sx={{ textAlign: "center", padding: "32px", borderRadius: "24px" }}
      >
        {/* Removed password reset functionality */}
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", marginBottom: "12px" }}
        >
          {isLoginMode ? "Accedi" : "Registrati"}
        </Typography>
        <Typography
          variant="body2"
          sx={{ marginBottom: "24px", color: "text.secondary" }}
        >
          {`Continua su ${appName}`}
        </Typography>

        <Collapse in={alertOpen}>
          <Alert
            severity={alertSeverity}
            onClose={() => setAlertOpen(false)}
            sx={{ mb: 2 }}
          >
            {alertMessage}
          </Alert>
        </Collapse>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                textAlign: "left",
                marginBottom: "8px",
                fontWeight: "bold",
              }}
            >
              Email
            </Typography>
            <TextField
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                marginBottom: "16px",
                backdropFilter: "blur(15px)",
              }}
              className={shakeEmail ? "animate__animated animate__shakeX" : ""}
              type="email"
              aria-label="Email"
              placeholder="Inserisci la tua email"
              inputProps={{
                autoComplete: "email",
              }}
            />

            <Typography
              variant="subtitle2"
              sx={{
                textAlign: "left",
                marginBottom: "8px",
                fontWeight: "bold",
              }}
            >
              Password
            </Typography>
            <TextField
              type={showPassword ? "text" : "password"}
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                marginBottom: "16px",
                backdropFilter: "blur(15px)",
              }}
              className={
                shakePassword ? "animate__animated animate__shakeX" : ""
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      aria-label={
                        showPassword ? "Nascondi password" : "Mostra password"
                      }
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              aria-label="Password"
              placeholder="Inserisci la tua password"
              inputProps={{
                autoComplete: "current-password",
              }}
            />

            {!isLoginMode && (
              <>
                <Typography
                  variant="subtitle2"
                  sx={{
                    textAlign: "left",
                    marginBottom: "8px",
                    fontWeight: "bold",
                  }}
                >
                  Conferma Password
                </Typography>
                <TextField
                  type={showConfirmPassword ? "text" : "password"}
                  fullWidth
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  variant="outlined"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.4)",
                    marginBottom: "16px",
                    backdropFilter: "blur(15px)",
                  }}
                  className={
                    shakeConfirmPassword
                      ? "animate__animated animate__shakeX"
                      : ""
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={toggleConfirmPasswordVisibility}
                          aria-label={
                            showConfirmPassword
                              ? "Nascondi password"
                              : "Mostra password"
                          }
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  aria-label="Conferma Password"
                  placeholder="Conferma la tua password"
                  inputProps={{
                    autoComplete: "new-password",
                  }}
                />

                {/* Username Field */}
                <Typography
                  variant="subtitle2"
                  sx={{
                    textAlign: "left",
                    marginBottom: "8px",
                    fontWeight: "bold",
                  }}
                >
                  Nome utente
                </Typography>
                <TextField
                  fullWidth
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  variant="outlined"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.4)",
                    marginBottom: "16px",
                    backdropFilter: "blur(15px)",
                  }}
                  className={
                    shakeUsername ? "animate__animated animate__shakeX" : ""
                  }
                  type="text"
                  aria-label="Nome utente"
                  placeholder="Inserisci il tuo nome utente"
                  inputProps={{
                    maxLength: 12,
                  }}
                />

                {/* Name Field */}
                <Typography
                  variant="subtitle2"
                  sx={{
                    textAlign: "left",
                    marginBottom: "8px",
                    fontWeight: "bold",
                  }}
                >
                  Nome
                </Typography>
                <TextField
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="outlined"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.4)",
                    marginBottom: "16px",
                    backdropFilter: "blur(15px)",
                  }}
                  className={
                    shakeName ? "animate__animated animate__shakeX" : ""
                  }
                  type="text"
                  aria-label="Nome"
                  placeholder="Inserisci il tuo nome"
                  inputProps={{
                    maxLength: 25,
                  }}
                />
              </>
            )}
          </Box>

          {isLoginMode && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={keepMeSignedIn}
                  onChange={(e) => setKeepMeSignedIn(e.target.checked)}
                />
              }
              label={
                <Box textAlign="left">
                  <Typography variant="body2">Mantieni l'accesso</Typography>
                  <Typography variant="caption" color="textSecondary">
                    Consigliato su dispositivi affidabili
                  </Typography>
                </Box>
              }
              sx={{ marginBottom: "16px", alignSelf: "center" }}
            />
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: buttonColor,
              fontSize: "16px",
              padding: "10px",
              marginBottom: "16px",
              borderRadius: "12px",
              "&:hover": {
                backgroundColor: buttonColor,
              },
            }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : isLoginMode ? (
              "Accedi"
            ) : (
              "Registrati"
            )}
          </Button>
        </form>

        {/* Removed Google login button and forgot password content */}

        <Typography
          variant="body2"
          sx={{ marginBottom: "10px", fontSize: "1rem" }}
        >
          {isLoginMode ? (
            <>
              {`Nuovo su ${appName}?`}{" "}
              <Typography
                component="span"
                sx={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontSize: "1rem",
                  color: "#6C63FF",
                }}
                onClick={toggleMode}
              >
                Crea un account
              </Typography>
            </>
          ) : (
            <>
              Hai già un account?{" "}
              <Typography
                component="span"
                sx={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontSize: "1rem",
                  color: "#6C63FF",
                }}
                onClick={toggleMode}
              >
                Accedi
              </Typography>
            </>
          )}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default AuthenticationModal;

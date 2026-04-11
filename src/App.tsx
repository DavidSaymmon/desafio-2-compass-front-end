import { useEffect, useMemo } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  type PaletteMode,
} from "@mui/material";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { PublicRoute } from "./routes/PublicRoute";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { loginSuccess } from "./store/slices/authSlice";

function App() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode) as PaletteMode;

  useEffect(() => {
    const authData = localStorage.getItem("auth");

    if (!authData) return;

    try {
      const parsed = JSON.parse(authData);
      dispatch(loginSuccess(parsed));
    } catch {
      localStorage.removeItem("auth");
    }
  }, [dispatch]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#0f766e",
          },
          secondary: {
            main: "#f59e0b",
          },
          background: {
            default: mode === "dark" ? "#0b1120" : "#f4f7fb",
            paper: mode === "dark" ? "#111827" : "#ffffff",
          },
        },
        shape: {
          borderRadius: 16,
        },
        typography: {
          fontFamily: '"Segoe UI", "Helvetica Neue", sans-serif',
        },
      }),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

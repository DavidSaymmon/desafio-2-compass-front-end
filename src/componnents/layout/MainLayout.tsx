import type { ReactNode } from "react";
import { AppBar, Box, IconButton, Toolbar, useTheme } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "../theme/ThemeToggle";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/slices/authSlice";

export function DashboardLayout({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <Box
      sx={{ minHeight: "100vh", background: theme.palette.background.default }}
    >
      <AppBar
        position="fixed"
        color="default"
        elevation={1}
        sx={{ width: "100%" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={handleLogout}
            edge="start"
            sx={{ mr: 2 }}
          >
            <LogoutIcon />
          </IconButton>
          <Box sx={{ flex: 1 }} />
          <ThemeToggle />
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children}
      </Box>
    </Box>
  );
}

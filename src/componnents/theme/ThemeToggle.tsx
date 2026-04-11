import { Box, type SxProps, type Theme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleTheme } from "../../store/slices/themeSlice";

interface ThemeToggleProps {
  sx?: SxProps<Theme>;
}

export function ThemeToggle({ sx }: ThemeToggleProps) {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);

  return (
    <Box
      component="button"
      onClick={() => dispatch(toggleTheme())}
      sx={{
        width: 48,
        height: 28,
        borderRadius: 14,   
        border: "2px solid",
        borderColor: mode === "dark" ? "primary.main" : "grey.400",
        backgroundColor: mode === "dark" ? "grey.900" : "grey.200",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        px: 0.5,
        transition: "background 0.2s",
        outline: "none",
        boxShadow: "none",
        ...sx,
      }}
      aria-label="Alternar tema"
    >
      <Box
        sx={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          backgroundColor: mode === "dark" ? "primary.main" : "grey.400",
          transform: mode === "dark" ? "translateX(20px)" : "translateX(0)",
          transition: "transform 0.2s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "background.paper",
          fontSize: 16,
        }}
      >
        {mode === "dark" ? "🌙" : "☀️"}
      </Box>
    </Box>
  );
}

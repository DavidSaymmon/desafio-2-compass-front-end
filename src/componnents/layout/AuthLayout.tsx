import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { ThemeToggle } from "../theme/ThemeToggle";
import { useAppSelector } from "../../store/hooks";

interface AuthLayoutProps {
  title: string;
  footer: ReactNode;
  children: ReactNode;
  formProps?: ComponentPropsWithoutRef<"form">;
}

export function AuthLayout({
  title,
  footer,
  children,
  formProps,
}: AuthLayoutProps) {
  const mode = useAppSelector((state) => state.theme.mode);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        px: 2,
        position: "relative",
        background:
          mode === "dark"
            ? "linear-gradient(135deg, rgba(15,118,110,0.2), rgba(11,17,32,0.92))"
            : "linear-gradient(135deg, rgba(15,118,110,0.14), rgba(245,158,11,0.14))",
      }}
    >
      <ThemeToggle sx={{ position: "absolute", top: 24, right: 24 }} />

      <Card sx={{ width: "100%", maxWidth: 420, boxShadow: 8 }}>
        <CardContent sx={{ p: 4 }}>
          <Stack
            spacing={3}
            component={formProps ? "form" : "div"}
            {...formProps}
          >
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
                {title}
              </Typography>
            </Box>

            {children}

            <Typography variant="body2" sx={{ textAlign: "center" }}>
              {footer}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

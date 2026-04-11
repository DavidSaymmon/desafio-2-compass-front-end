import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Link, TextField } from "@mui/material";
import { AuthLayout } from "../componnents/layout/AuthLayout";
import { useAppDispatch } from "../store/hooks";
import { loginSuccess } from "../store/slices/authSlice";
import { saveAuthSession } from "../utils/authStorage";
import { type LoginFormData } from "../schemas/authSchemas";

interface LoginLocationState {
  from?: {
    pathname?: string;
    search?: string;
    hash?: string;
  };
}

export function LoginPage() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const redirectTarget = (location.state as LoginLocationState | null)?.from;
  const redirectPath = redirectTarget
    ? `${redirectTarget.pathname ?? ""}${redirectTarget.search ?? ""}${redirectTarget.hash ?? ""}`
    : "/dashboard";

  const onSubmit = (data: LoginFormData) => {
    const normalizedEmail = data.email.trim().toLowerCase();
    const emailName = normalizedEmail.split("@")[0] ?? "";
    const formattedName =
      emailName.charAt(0).toUpperCase() + emailName.slice(1);

    const authPayload = {
      token: `local-auth-${normalizedEmail}`,
      user: {
        email: normalizedEmail,
        name: formattedName || "Usuário",
      },
    };

    saveAuthSession(authPayload.user, authPayload.token);
    dispatch(loginSuccess(authPayload));
    navigate(redirectPath, { replace: true });
  };

  return (
    <AuthLayout
      title="Entrar"
      formProps={{ onSubmit: handleSubmit(onSubmit) }}
      footer={
        <>
          Não tem conta?{" "}
          <Link component={RouterLink} to="/register" underline="hover">
            Criar conta
          </Link>
        </>
      }
    >
      <TextField
        label="Email"
        type="email"
        fullWidth
        required
        {...register("email")}
      />

      <TextField
        label="Senha"
        type="password"
        fullWidth
        required
        {...register("password")}
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={isSubmitting}
      >
        Login
      </Button>
    </AuthLayout>
  );
}

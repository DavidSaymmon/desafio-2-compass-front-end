import { Link as RouterLink, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Link, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { AuthLayout } from "../componnents/layout/AuthLayout";
import { type RegisterFormData, registerSchema } from "../schemas/authSchemas";

export function RegisterPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = () => {
    toast.success("Usuário registrado com sucesso.");
    navigate("/login", { replace: true });
  };

  return (
    <AuthLayout
      title="Criar conta"
      formProps={{ onSubmit: handleSubmit(onSubmit) }}
      footer={
        <>
          Já tem conta?{" "}
          <Link component={RouterLink} to="/login" underline="hover">
            Fazer login
          </Link>
        </>
      }
    >
      <TextField
        label="Nome"
        fullWidth
        error={!!errors.name}
        helperText={errors.name?.message}
        {...register("name")}
      />
      <TextField
        label="Email"
        type="email"
        fullWidth
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register("email")}
      />
      <TextField
        label="Senha"
        type="password"
        fullWidth
        error={!!errors.password}
        helperText={errors.password?.message}
        {...register("password")}
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={isSubmitting}
      >
        Registrar
      </Button>
    </AuthLayout>
  );
}

import { useState } from "react";
import { TextField, Box, Container, Divider, InputAdornment } from "mui";
import { LockIcon } from "mui/icon";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import FormTitle from "components/form/FormTitle";
import UIButton from "components/UI/UIButton";
const resetPasswordSchema = yup.object({
  password: yup
    .string("Enter Password")
    .min(8, "")
    .required("Password is required"),
  confirmPassword: yup
    .string("Enter Confirmation Password")
    .required("Confirmation Confirmation is required")
    .oneOf([yup.ref("password"), null], "Confirmation Password donot match"),
});

const AuthResetPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: router.query?.email,
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const res = await axios.post("/api/reset-password", {
          email: values.email,
          code: router.query?.code,
          password: values.password,
        });
        toast.success(res.data.message);
        setIsLoading(false);
        router.push("/join/login-popup?locale=en-US");
      } catch (error) {
        toast.error(error.response.data.message);
        setIsLoading(false);
      }
    },
  });
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <FormTitle>Reset Password</FormTitle>

        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          <Divider
            sx={{
              my: 2,
            }}
          />

          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            placeholder="Password"
            autoComplete="current-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            margin="normal"
            fullWidth
            name="confirmPassword"
            label="Confirmation Password"
            type="password"
            id="confirmPassword"
            placeholder="Confirmation Password"
            autoComplete="current-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />

          <UIButton variant={"loading"} color={"primary"} loading={isLoading}>
            Change Password
          </UIButton>
        </Box>
      </Box>
    </Container>
  );
};

export default AuthResetPasswordForm;

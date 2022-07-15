import { useState } from "react";
import {
  TextField,
  Box,
  Typography,
  Container,
  Divider,
  InputAdornment,
} from "mui";
import { LoadingButton } from "mui/lab";
import { MailIcon } from "mui/icon";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import AlertBanner from "components/banner/AlertBanner";

const forgotPasswordSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
});

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const res = await axios.post("/api/forgot-password", values);
        toast.success(res.data.message);
        setIsLoading(false);
        setSuccess(true);
      } catch (error) {
        toast.error(error.response.data.message);
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      {success ? (
        <AlertBanner
          subtitle={` You should soon receive an email allowing you to reset your
              password. Please make sure to check your spam and trash if you
              can't find the email.`}
        >
          Forgot Password
        </AlertBanner>
      ) : (
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              component="p"
              variant="p"
              sx={{
                fontWeight: "bold",
              }}
            >
              Forgot Password
            </Typography>

            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
              <Divider
                sx={{
                  my: 2,
                }}
              />

              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                placeholder="Email Address"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailIcon />
                    </InputAdornment>
                  ),
                }}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <LoadingButton
                loading={isLoading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, p: 1.5 }}
                disabled={isLoading}
              >
                Reset Password
              </LoadingButton>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
};

ForgotPasswordPage.guestMode = true;

export default ForgotPasswordPage;

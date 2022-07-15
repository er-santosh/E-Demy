import {
  TextField,
  Grid,
  Box,
  Divider,
  InputAdornment,
  Container,
  Typography,
} from "mui";
import { LoadingButton } from "mui/lab";
import { MailIcon, LockIcon } from "mui/icon";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../store/AuthReducer";

import { useFormik } from "formik";
import * as yup from "yup";
import dynamic from "next/dynamic";
const AuthLoginOptionList = dynamic(() =>
  import("components/auth/AuthLoginOptionList")
);

const loginSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string("Enter your password").required("Password is required"),
});

const AuthLoginForm = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      await dispatch(login(values));
    },
  });
  return (
    <>
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
            Log In to Your Udemy Account!
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <Divider
              sx={{
                my: 2,
              }}
            />

            <AuthLoginOptionList />
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email "
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

            <LoadingButton
              loading={isLoading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, p: 1.5 }}
              disabled={isLoading}
            >
              Sign In
            </LoadingButton>
            <Grid container spacing={1}>
              <Grid item component="p">
                <Link href="/user/forgot-password">Forgot password?</Link>
              </Grid>
              <Grid item component="p">
                {`Don't have an account?`}
                <Link href="/join/signup-popup?locale=en-US">{"Sign Up"}</Link>
              </Grid>
              <Grid
                item
                component="p"
                sx={{
                  flexGrow: 1,
                  textAlign: "center",
                  my: 1,
                  fontWeight: "bold",
                }}
              >
                <Link href="?locale=en-US">
                  {"Log in with your organization"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default AuthLoginForm;

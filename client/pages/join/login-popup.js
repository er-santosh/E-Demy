import { useState, useEffect } from "react";
import {
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Divider,
  InputAdornment,
} from "mui";
import { LoadingButton } from "mui/lab";
import {
  MailIcon,
  LockIcon,
  FacebookIcon,
  GoogleIcon,
  AppleIcon,
} from "mui/icon";
import Link from "next/link";
import AuthLoginOption from "../../components/auth/AuthLoginOption";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { reset, login } from "../../store/AuthReducer";

import { useFormik } from "formik";
import * as yup from "yup";

const loginSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string("Enter your password").required("Password is required"),
});

const authAccountOptions = [
  {
    icon: <FacebookIcon />,
    title: "Facebook",
    color: "blue",
  },
  {
    icon: <GoogleIcon />,
    title: "Google",
    color: "#FF8235",
  },
  {
    icon: <AppleIcon />,
    title: "Apple",
    color: "black",
  },
];

const SignInPage = () => {
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
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    //error and success toast is handled in authnavitem useEffect

    if (isSuccess || user) {
      if (router.query && router.query.from) {
        router.push(router.query.from);
      } else {
        router.push("/");
      }
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, router, dispatch]);

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

          {authAccountOptions.map((item) => (
            <AuthLoginOption
              key={item.title}
              icon={item.icon}
              title={item.title}
              color={item.color}
            />
          ))}
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
              <Link href="?locale=en-US">Forgot password?</Link>
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
  );
};

SignInPage.isGuest = true;

export default SignInPage;

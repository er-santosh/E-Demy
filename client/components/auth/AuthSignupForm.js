import {
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  Divider,
  Container,
} from "mui";

import { LoadingButton } from "mui/lab";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../store/AuthReducer";

import { useFormik } from "formik";
import * as yup from "yup";
const signupSchema = yup.object({
  name: yup
    .string("Enter your name")
    .max(32, "Name should not exceed 32 characters of length")
    .required("Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const AuthSignUpForm = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      sendRecommendation: false,
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      await dispatch(register(values));
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
        <Typography component="h1" variant="h5">
          Sign Up and start learning
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="name"
            label="Fullname"
            name="name"
            autoComplete="name"
            autoFocus
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email "
            name="email"
            autoComplete="email"
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
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                name="sendRecommendation"
                value={formik.values.sendRecommendation}
                onChange={formik.handleChange}
              />
            }
            label="Send me special offer,personalised recommendations, and learning tips"
          />

          <LoadingButton
            loading={isLoading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, p: 1.5 }}
            disabled={isLoading}
          >
            Sign Up
          </LoadingButton>

          <Typography>
            By signing up, you agree to our{" "}
            <Link href="?locale=en-US">Terms of Use</Link> and{" "}
            <Link href="?locale=en-US">Privacy Policy</Link>
          </Typography>
          <Divider
            sx={{
              my: 1,
            }}
          />
          <Typography>
            Already have an account?
            <Link href="/join/login-popup?locale=en-US">Log In</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default AuthSignUpForm;

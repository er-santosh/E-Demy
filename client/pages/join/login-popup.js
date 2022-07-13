import * as React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import AuthLoginOption from "../../components/auth/AuthLoginOption";
import FacebookIcon from "@mui/icons-material/FacebookRounded";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { reset, login } from "../../store/auth-reducer";

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

const SignIn = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  React.useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (message !== "" && isSuccess) {
      toast.success(message);
    }
    if (isSuccess || user) {
      if (router.query && router.query.from) {
        router.push(router.query.from);
      }
      router.push("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, router, dispatch]);

  const onHandleInput = (e) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(login(formData));
  };

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

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            placeholder="Email"
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailIcon />
                </InputAdornment>
              ),
            }}
            onChange={onHandleInput}
          />
          <TextField
            margin="normal"
            required
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
            onChange={onHandleInput}
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
              Don't have an account?
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
export default SignIn;

import * as React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import axios from "axios";
import { toast } from "react-toastify";

const SignIn = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);

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
    try {
      setIsLoading(true);
      await axios.post(`/api/register`, formData);
      toast.success("Registration successfull, Please login.");
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data);
      setIsLoading(false);
    }
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
        <Typography component="h1" variant="h5">
          Sign Up and start learning
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Fullname"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={onHandleInput}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
            autoComplete="current-password"
            onChange={onHandleInput}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
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
export default SignIn;

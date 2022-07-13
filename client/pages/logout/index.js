import { Box, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import * as React from "react";
const LogoutPage = () => {
  const router = useRouter();

  const { user } = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);
  return (
    <Container
      sx={{
        py: 4,
      }}
    >
      <Box
        sx={{
          display: "inline-flex",
          backgroundColor: "#5F9EA0",
          p: 3,
          width: "100%",
        }}
      >
        <CheckCircleIcon />
        <Typography
          sx={{
            fontWeight: "bold",
          }}
        >
          You’ve successfully logged out of Edemy. Come back soon!
        </Typography>
      </Box>
    </Container>
  );
};

export default LogoutPage;

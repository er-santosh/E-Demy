import { Box, Typography, Container } from "mui";
import { CheckCircleIcon } from "mui/icon";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

const LogoutPage = () => {
  const router = useRouter();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
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

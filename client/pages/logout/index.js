import { Box, Typography, Container } from "mui";
import { CheckCircleIcon } from "mui/icon";
const LogoutPage = () => {
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

LogoutPage.isGuest = true;

export default LogoutPage;

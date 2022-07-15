import { Container, Box, Backdrop } from "mui";
import { ScaleLoader } from "react-spinners";

export const FallbackLoader = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Backdrop
          sx={{
            backgroundColor: "white",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open
        >
          <ScaleLoader color="purple" loading />
        </Backdrop>
      </Box>
    </Container>
  );
};

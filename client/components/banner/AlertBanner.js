import { Box, Typography, Container } from "mui";
import { CheckCircleIcon, DangerousIcon } from "mui/icon";
const AlertBanner = ({ children, danger, subtitle }) => {
  return (
    <Container
      sx={{
        py: 4,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#5F9EA0",
          p: 3,
          width: "100%",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            display: "inline-flex",
          }}
        >
          {danger ? (
            <DangerousIcon
              sx={{
                mr: 2,
              }}
            />
          ) : (
            <CheckCircleIcon
              sx={{
                mr: 2,
              }}
            />
          )}
          {children}
        </Typography>
        <Typography
          sx={{
            pl: 2,
            mt: 1,
          }}
        >
          {subtitle}
        </Typography>
      </Box>
    </Container>
  );
};

export default AlertBanner;

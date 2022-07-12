import Button from "@mui/material/Button";

const AuthLoginOption = ({ icon, title, color }) => {
  return (
    <Button
      startIcon={icon}
      variant="outlined"
      fullWidth
      sx={{
        my: 0.5,
        textTransform: "none",
        display: "flex",
        justifyContent: "start",
        color,
      }}
    >
      Continue with {title}
    </Button>
  );
};

export default AuthLoginOption;

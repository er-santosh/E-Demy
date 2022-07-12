import Typography from "@mui/material/Typography";

const CompanyLogo = () => {
  return (
    <Typography
      variant="h6"
      component="a"
      href="/"
      sx={{
        mr: 2,
        fontFamily: "monospace",
        flexGrow: {
          xs: 1,
          md: 0,
        },
        fontWeight: 700,
        fontSize: 30,
        letterSpacing: ".3rem",
        color: "inherit",
        textAlign: {
          xs: "center",
          md: "start",
        },
        textDecoration: "none",
      }}
    >
      LOGO
    </Typography>
  );
};

export default CompanyLogo;

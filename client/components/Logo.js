import Typography from "@mui/material/Typography";
import Link from "next/link";
const CompanyLogo = () => {
  return (
    <Link href="/">
      <Typography
        variant="h6"
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
          cursor: "pointer",
          textAlign: {
            xs: "center",
            md: "start",
          },
          textDecoration: "none",
        }}
      >
        LOGO
      </Typography>
    </Link>
  );
};

export default CompanyLogo;

import { Typography } from "@mui/material";

const FormTitle = ({ children, sx, ...otherProps }) => {
  return (
    <Typography
      component="p"
      variant="p"
      sx={{
        fontWeight: "bold",
        ...sx,
      }}
      {...otherProps}
    >
      {children}
    </Typography>
  );
};

export default FormTitle;

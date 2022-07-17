import { Typography, MenuItem } from "@mui/material";
import Link from "next/link";

const UILink = ({
  children,
  variant,
  as,
  onClick,
  href,
  sx,
  nav,
  underline,
  ...otherProps
}) => {
  return (
    <Link href={href || "/#"}>
      {variant === "dropdown" ? (
        <MenuItem {...otherProps} onClick={as === "button" && onClick}>
          <Typography textAlign="center">{children}</Typography>
        </MenuItem>
      ) : (
        <Typography
          sx={{
            mr: 2,
            fontSize: 14,
            color: nav ? "inherit" : "purple",
            cursor: "pointer",
            textDecoration: !underline ? "none" : "underline",
            display: nav
              ? {
                  xs: "none",
                  lg: "inline",
                }
              : "inline",
            ...sx,
          }}
          {...otherProps}
        >
          {children}
        </Typography>
      )}
    </Link>
  );
};

export default UILink;

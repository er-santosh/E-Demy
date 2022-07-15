import { styled, alpha } from "@mui/material/styles";

const SearchBase = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 50,
  border: "1px solid",
  backgroundColor: "#F4F9F9",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

export default SearchBase;

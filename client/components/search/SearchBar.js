import { SearchIcon } from "mui/icon";
import SearchBase from "./SearchBase";
import SearchIconWrapper from "components/search/SearchIconWrapper";
import StyledInputBase from "components/search/StyledInputBase";
const SearchBar = (props) => {
  return (
    <SearchBase
      sx={{
        flexGrow: 1,
        display: {
          xs: "none",
          md: "flex",
        },
      }}
    >
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
      />
    </SearchBase>
  );
};

export default SearchBar;

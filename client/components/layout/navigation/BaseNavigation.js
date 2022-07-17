import { AppBar, Box, Toolbar } from "mui";

const BaseNavigation = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        component="nav"
        position="static"
        color="transparent"
        sx={{
          paddingY: 0.6,
        }}
      >
        <Toolbar>{children}</Toolbar>
      </AppBar>
    </Box>
  );
};

export default BaseNavigation;

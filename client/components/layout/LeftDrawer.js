import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import DrawerContent from "../drawer/DrawerContent";

const drawerWidth = 240;

const LeftDrawer = (props) => {
  const { window, handleDrawerToggle, mobileOpen, loggedIn } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box component="nav">
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <DrawerContent
          handleDrawerToggle={handleDrawerToggle}
          loggedIn={loggedIn}
        />
      </Drawer>
    </Box>
  );
};

export default LeftDrawer;

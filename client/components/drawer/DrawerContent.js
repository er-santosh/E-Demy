import Box from "@mui/material/Box";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const drawetItems = ["Home", "About", "Contact"];

const DrawerContent = ({ handleDrawerToggle, loggedIn }) => (
  <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
    <Divider />
    <List>
      {!loggedIn ? (
        <>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Log In" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Sign Up" />
            </ListItemButton>
          </ListItem>
          <Divider />
        </>
      ) : (
        <>
          <h1>User Profile</h1>
          <Divider />
        </>
      )}

      {drawetItems.map((item) => (
        <ListItem key={item} disablePadding>
          <ListItemButton>
            <ListItemText primary={item} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
);

export default DrawerContent;

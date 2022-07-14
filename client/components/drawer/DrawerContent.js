import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "mui";

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

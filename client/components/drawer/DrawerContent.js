import { Box, Divider } from "mui";
import DrawerContentList from "./DrawerContentList";

const DrawerContent = ({ handleDrawerToggle }) => (
  <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
    <Divider />
    <DrawerContentList />
  </Box>
);

export default DrawerContent;

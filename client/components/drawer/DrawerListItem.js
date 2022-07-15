import { ListItem, ListItemButton, ListItemText } from "mui";
import { useRouter } from "next/router";
const DrawerListItem = ({ item }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(item.href);
  };
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={item.title} />
      </ListItemButton>
    </ListItem>
  );
};

export default DrawerListItem;

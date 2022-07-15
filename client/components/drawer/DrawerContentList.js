import { List, Divider } from "mui";
import Link from "next/link";

import DrawerListItem from "./DrawerListItem";
import { useSelector } from "react-redux";

const drawerItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

const DrawerContentList = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <List>
      {user ? (
        <>
          <Link href="/user/edit-profile">User Profile</Link>
          <Divider />
        </>
      ) : (
        <>
          <DrawerListItem
            item={{
              title: "Log In",
              href: "/join/login-popup?locale=en-US",
            }}
          />
          <DrawerListItem
            item={{
              title: "Sign Up",
              href: "/join/signup-popup?locale=en-US",
            }}
          />
          <Divider />
        </>
      )}

      {drawerItems.map((item) => (
        <DrawerListItem key={item.title} item={item} />
      ))}
    </List>
  );
};

export default DrawerContentList;

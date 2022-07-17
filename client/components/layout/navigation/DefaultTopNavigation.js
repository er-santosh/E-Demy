import { useState } from "react";
import dynamic from "next/dynamic";
import { Box, Badge } from "mui";
import {
  MenuIcon,
  AddShoppingCartIcon,
  FavoriteBorderOutlinedIcon,
  NotificationsNoneOutlinedIcon,
  SearchIcon,
} from "mui/icon";
import SearchBar from "components/search/SearchBar";
import CompanyLogo from "components/Logo";
const LeftDrawer = dynamic(() => import("./LeftDrawer"));
const AuthNavItem = dynamic(() => import("../../auth/AuthNavItem"));
import { useSelector } from "react-redux";
import BaseNavigation from "./BaseNavigation";
import UILink from "components/UI/UILink";
import UIButton from "components/UI/UIButton";

const TopNavigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { user } = useSelector((state) => state.auth);

  const isInstructor = user?.role?.includes("Instructor");

  return (
    <>
      <BaseNavigation>
        <UIButton
          variant="icon"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </UIButton>
        <CompanyLogo />

        <UILink nav>Categories</UILink>

        <SearchBar />

        <Box sx={{ flexGrow: 0 }}>
          <UILink href="/#" nav>
            Edemy Business
          </UILink>
          <UILink href="/teaching/?ref=teach_header" nav>
            {isInstructor ? "Instructor" : "Teach on Edemy"}
          </UILink>

          {user && (
            <UILink href="/home/my-courses" nav>
              My Learning
            </UILink>
          )}
          <UIButton variant={"icon"} sx={{ mr: 1, display: { md: "none" } }}>
            <SearchIcon />
          </UIButton>

          {user && (
            <UIButton variant={"icon"} sx={{ mr: 1 }}>
              <Badge badgeContent={100} color="primary">
                <FavoriteBorderOutlinedIcon />
              </Badge>
            </UIButton>
          )}

          <UIButton variant={"icon"} sx={{ mr: 1 }}>
            <Badge badgeContent={4} color="primary">
              <AddShoppingCartIcon />
            </Badge>
          </UIButton>

          {user && (
            <UIButton variant={"icon"} sx={{ mr: 1 }}>
              <Badge variant="dot" color="primary" overlap="circular">
                <NotificationsNoneOutlinedIcon />
              </Badge>
            </UIButton>
          )}

          <AuthNavItem />
        </Box>
      </BaseNavigation>
      <LeftDrawer
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
        user={user}
      />
    </>
  );
};

export default TopNavigation;

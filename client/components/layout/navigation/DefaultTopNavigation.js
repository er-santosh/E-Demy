import { useState } from "react";
import dynamic from "next/dynamic";
import { AppBar, Box, IconButton, Toolbar, Typography, Badge } from "mui";
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

const TopNavigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { user } = useSelector((state) => state.auth);

  const isInstructor = user?.role?.includes("Instructor");

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
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <CompanyLogo />

          <Typography
            variant="p"
            sx={{
              mr: 2,
              fontSize: 14,
              display: {
                xs: "none",
                md: "block",
              },
              color: "inherit",
            }}
          >
            Categories
          </Typography>
          <SearchBar />

          <Box sx={{ flexGrow: 0 }}>
            <Typography
              component="a"
              href="/teaching/?ref=teach_header"
              noWrap
              sx={{
                mr: 2,
                fontSize: 14,
                color: "inherit",
                display: {
                  xs: "none",
                  lg: "inline",
                },
              }}
            >
              Edemy Business
            </Typography>

            <Typography
              component="a"
              href="/teaching/?ref=teach_header"
              noWrap
              sx={{
                mr: 2,
                fontSize: 14,
                color: "inherit",
                display: {
                  xs: "none",
                  md: "inline",
                },
              }}
            >
              {isInstructor ? "Instructor" : "Teach on Edemy"}
            </Typography>

            {user && (
              <Typography
                component="a"
                href="/teaching/?ref=teach_header"
                noWrap
                sx={{
                  mr: 2,
                  fontSize: 14,
                  color: "inherit",
                  display: {
                    xs: "none",
                    md: "inline",
                  },
                }}
              >
                My Learning
              </Typography>
            )}
            <IconButton
              color="inherit"
              edge="start"
              sx={{ mr: 1, display: { md: "none" } }}
            >
              <SearchIcon />
            </IconButton>

            {user && (
              <IconButton color="inherit" edge="start" sx={{ mr: 1 }}>
                <Badge badgeContent={100} color="primary">
                  <FavoriteBorderOutlinedIcon />
                </Badge>
              </IconButton>
            )}

            <IconButton color="inherit" edge="start" sx={{ mr: 1 }}>
              <Badge badgeContent={4} color="primary">
                <AddShoppingCartIcon />
              </Badge>
            </IconButton>

            {user && (
              <IconButton color="inherit" edge="start" sx={{ mr: 1 }}>
                <Badge variant="dot" color="primary" overlap="circular">
                  <NotificationsNoneOutlinedIcon />
                </Badge>
              </IconButton>
            )}

            <AuthNavItem />
          </Box>
        </Toolbar>
      </AppBar>
      <LeftDrawer
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
        user={user}
      />
    </Box>
  );
};

export default TopNavigation;

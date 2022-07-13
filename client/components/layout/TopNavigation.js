import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LeftDrawer from "./LeftDrawer";
import SearchBar from "../search/SearchBar";
import CompanyLogo from "../Logo";
import AuthNavItem from "../auth/AuthNavItem";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";
import { Link } from "@mui/material";
function TopNavigation(props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { user } = useSelector((state) => state.auth);

  const isInstructor = false;

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

            {/* if logged in */}
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
            {/* auth */}

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
}

export default TopNavigation;

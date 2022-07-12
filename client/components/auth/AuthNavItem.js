import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LanguageIcon from "@mui/icons-material/Language";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const AuthNavItem = ({ loggedIn }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      {loggedIn ? (
        <>
          <Tooltip title="Profile">
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{
                p: 0,
                display: {
                  xs: "none",
                  md: "inline",
                },
              }}
            >
              <Badge color="primary" overlap="circular" variant="dot">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </Badge>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </>
      ) : (
        <>
          <Button
            variant="outlined"
            color="inherit"
            component="a"
            href="/join/login-popup?locale=en-US"
            sx={{
              mr: 1,
              py: 1.4,
              textTransform: "none",
              display: {
                xs: "none",
                md: "inline",
              },
            }}
          >
            Log in
          </Button>
          <Button
            variant="contained"
            component="a"
            href="/join/signup-popup?locale=en-US"
            sx={{
              mr: 1,
              py: 1.5,
              backgroundColor: "black",
              textTransform: "none",
              display: {
                xs: "none",
                md: "inline",
              },
              ":hover": {
                backgroundColor: "black",
              },
            }}
          >
            Sign up
          </Button>
          <IconButton
            size="small"
            color="inherit"
            sx={{
              border: "1px solid",
            }}
            children={<LanguageIcon />}
          />
        </>
      )}
    </>
  );
};

export default AuthNavItem;

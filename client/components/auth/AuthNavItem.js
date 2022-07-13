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
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth-reducer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const settings = ["Profile", "Account", "Dashboard"];

const AuthNavItem = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const router = useRouter();
  const handleLogout = () => {
    dispatch(logout());
    router.push("/logout");
    handleCloseUserMenu();
    toast.success("User is logged out");
  };

  return (
    <>
      {user ? (
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
            <MenuItem onClick={handleLogout}>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Menu>
        </>
      ) : (
        <>
          <Link href="/join/login-popup?locale=en-US">
            <Button
              variant="outlined"
              color="inherit"
              children="Log In"
              sx={{
                mr: 1,
                py: 1.1,
                textTransform: "none",
                display: {
                  xs: "none",
                  md: "inline",
                },
              }}
            />
          </Link>

          <Link href="/join/signup-popup?locale=en-US">
            <Button
              variant="contained"
              children="Sign Up"
              sx={{
                mr: 1,
                py: 1.3,
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
            />
          </Link>

          <IconButton
            size="small"
            color="inherit"
            sx={{
              border: "1px solid",
              display: {
                xs: "none",
                md: "inline-flex",
              },
            }}
            children={<LanguageIcon />}
          />
        </>
      )}
    </>
  );
};

export default AuthNavItem;

import {
  Button,
  IconButton,
  Typography,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Badge,
} from "mui";
import { LanguageIcon } from "mui/icon";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../store/AuthReducer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const settings = ["Account", "Dashboard"];

const AuthNavItem = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const dispatch = useDispatch();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  const router = useRouter();
  const handleLogout = async () => {
    await dispatch(logout());
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && !user) {
      router.push("/logout");
    }

    if (message !== "" && isSuccess) {
      toast.success(message);
    }
    handleCloseUserMenu();
    dispatch(reset());
  }, [user, isError, isSuccess, message, isLoading, router, dispatch]);

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
            <Link href="/user/edit-profile">
              <MenuItem>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
            </Link>
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
              sx={{
                mr: 1,
                py: 1.1,
                textTransform: "none",
                display: {
                  xs: "none",
                  md: "inline",
                },
              }}
            >
              Log In
            </Button>
          </Link>

          <Link href="/join/signup-popup?locale=en-US">
            <Button
              variant="contained"
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
            >
              Sign Up
            </Button>
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
          >
            <LanguageIcon />
          </IconButton>
        </>
      )}
    </>
  );
};

export default AuthNavItem;

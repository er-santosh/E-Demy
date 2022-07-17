import { Typography, Tooltip, Avatar, Menu, MenuItem, Badge } from "mui";
import { LanguageIcon } from "mui/icon";

import { useState } from "react";
import UILink from "components/UI/UILink";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../store/AuthReducer";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import UIButton from "components/UI/UIButton";

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
  const { user } = useSelector((state) => state.auth);

  const router = useRouter();
  const handleLogout = async () => {
    await dispatch(logout())
      .unwrap()
      .then(() => {
        router.push("/logout");
        handleCloseUserMenu();
      })
      .then(() => {
        toast.success("User is logged out");
        dispatch(reset());
      })
      .catch(() => {
        toast.error("Error logging out");
      });
  };

  return (
    <>
      {user ? (
        <>
          <Tooltip title="Profile">
            <UIButton
              variant={"icon"}
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
                <Avatar alt="Remy Sharp" src="" />
              </Badge>
            </UIButton>
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
            <UILink variant={"dropdown"}>Profile</UILink>
            {settings.map((setting) => (
              <UILink
                variant={"dropdown"}
                as={"button"}
                key={setting}
                onClick={handleCloseUserMenu}
              >
                {setting}
              </UILink>
            ))}
            <UILink as="button" onClick={handleLogout} variant={"dropdown"}>
              Logout
            </UILink>
          </Menu>
        </>
      ) : (
        <>
          <UIButton
            outlined
            as="link"
            href="/join/login-popup?locale=en-US"
            sx={{
              mr: 1,
              py: 1.1,
              display: {
                xs: "none",
                md: "inline",
              },
            }}
          >
            Log In
          </UIButton>

          <UIButton
            as="link"
            color={"dark"}
            href="/join/signup-popup?locale=en-US"
            sx={{
              mr: 1,
              py: 1.1,
              display: {
                xs: "none",
                md: "inline",
              },
            }}
          >
            Sign Up
          </UIButton>

          <UIButton
            variant={"icon"}
            size="small"
            sx={{
              border: "1px solid",
              display: {
                xs: "none",
                md: "inline-flex",
              },
            }}
          >
            <LanguageIcon />
          </UIButton>
        </>
      )}
    </>
  );
};

export default AuthNavItem;

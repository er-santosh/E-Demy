import dynamic from "next/dynamic";
import { AppBar, Box, IconButton, Toolbar, Typography, Badge } from "mui";
import { NotificationsNoneOutlinedIcon } from "mui/icon";
import CompanyLogo from "components/Logo";
const AuthNavItem = dynamic(() => import("../../auth/AuthNavItem"));
import { useSelector } from "react-redux";

const InstructorTopNavigation = () => {
  const { user } = useSelector((state) => state.auth);

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
          <Box
            sx={{
              flexGrow: 1,
            }}
          >
            <CompanyLogo />
          </Box>

          <Typography
            component="a"
            href="/"
            noWrap
            sx={{
              mr: 2,
              fontSize: 14,
              color: "inherit",
            }}
          >
            Student
          </Typography>
          {user && (
            <IconButton color="inherit" edge="start" sx={{ mr: 1 }}>
              <Badge variant="dot" color="primary" overlap="circular">
                <NotificationsNoneOutlinedIcon />
              </Badge>
            </IconButton>
          )}

          <AuthNavItem />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default InstructorTopNavigation;

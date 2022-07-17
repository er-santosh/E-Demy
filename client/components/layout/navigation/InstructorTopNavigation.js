import dynamic from "next/dynamic";
import { Box, Badge } from "mui";
import { NotificationsNoneOutlinedIcon } from "mui/icon";
import CompanyLogo from "components/Logo";
const AuthNavItem = dynamic(() => import("../../auth/AuthNavItem"));
import { useSelector } from "react-redux";
import BaseNavigation from "./BaseNavigation";
import TextLink from "components/UI/UILink";
import UIButton from "components/UI/UIButton";

const InstructorTopNavigation = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <BaseNavigation>
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <CompanyLogo />
      </Box>

      <TextLink href="/">Student</TextLink>
      {user && (
        <UIButton variant={"icon"} sx={{ mr: 1 }}>
          <Badge variant="dot" color="primary" overlap="circular">
            <NotificationsNoneOutlinedIcon />
          </Badge>
        </UIButton>
      )}

      <AuthNavItem />
    </BaseNavigation>
  );
};

export default InstructorTopNavigation;

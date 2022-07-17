import UIButton from "components/UI/UIButton";

const AuthLoginOption = ({ icon, title, color }) => {
  return (
    <UIButton
      startIcon={icon}
      outlined
      fullWidth
      sx={{
        my: 0.5,
        justifyContent: "start",
        color,
        ":hover": {
          backgroundColor: color,
          color: "white",
        },
      }}
    >
      Continue with {title}
    </UIButton>
  );
};

export default AuthLoginOption;

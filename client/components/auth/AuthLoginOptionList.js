import AuthLoginOption from "./AuthLoginOption";
import { FacebookIcon, GoogleIcon, AppleIcon } from "mui/icon";
const authAccountOptions = [
  {
    icon: <FacebookIcon />,
    title: "Facebook",
    color: "blue",
  },
  {
    icon: <GoogleIcon />,
    title: "Google",
    color: "#FF8235",
  },
  {
    icon: <AppleIcon />,
    title: "Apple",
    color: "black",
  },
];
const AuthLoginOptionList = () => {
  return (
    <>
      {authAccountOptions.map((item) => (
        <AuthLoginOption
          key={item.title}
          icon={item.icon}
          title={item.title}
          color={item.color}
        />
      ))}
    </>
  );
};

export default AuthLoginOptionList;

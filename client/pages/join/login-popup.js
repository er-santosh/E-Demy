import dynamic from "next/dynamic";

const AuthLoginForm = dynamic(() => import("components/auth/AuthLoginForm"));
const SignInPage = () => {
  return <AuthLoginForm />;
};
SignInPage.guestMode = true;
export default SignInPage;

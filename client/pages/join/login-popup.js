import { GuestLayout } from "components/layout/GuestLayout";
import dynamic from "next/dynamic";

const AuthLoginForm = dynamic(() => import("components/form/LoginForm"));
const SignInPage = () => {
  return <AuthLoginForm />;
};

SignInPage.layout = (page) => {
  return <GuestLayout>{page}</GuestLayout>;
};

export default SignInPage;

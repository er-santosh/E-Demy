import { GuestLayout } from "components/layout/GuestLayout";
import dynamic from "next/dynamic";

const AuthForgotPasswordForm = dynamic(() =>
  import("components/auth/AuthForgotPasswordForm")
);

const ForgotPasswordPage = () => {
  return <AuthForgotPasswordForm />;
};

ForgotPasswordPage.layout = (page) => {
  return <GuestLayout>{page}</GuestLayout>;
};

export default ForgotPasswordPage;

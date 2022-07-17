import { GuestLayout } from "components/layout/GuestLayout";
import dynamic from "next/dynamic";

const AuthForgotPasswordForm = dynamic(() =>
  import("components/form/ForgotPasswordForm")
);

const ForgotPasswordPage = () => {
  return <AuthForgotPasswordForm />;
};

ForgotPasswordPage.layout = (page) => {
  return <GuestLayout>{page}</GuestLayout>;
};

export default ForgotPasswordPage;

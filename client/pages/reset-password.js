import { GuestLayout } from "components/layout/GuestLayout";
import dynamic from "next/dynamic";

const AuthResetPasswordForm = dynamic(() =>
  import("components/auth/AuthResetPasswordForm")
);

const ResetPasswordPage = () => {
  return <AuthResetPasswordForm />;
};

ResetPasswordPage.layout = (page) => {
  return <GuestLayout>{page}</GuestLayout>;
};

export default ResetPasswordPage;

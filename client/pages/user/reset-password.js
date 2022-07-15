import dynamic from "next/dynamic";

const AuthResetPasswordForm = dynamic(() =>
  import("components/auth/AuthResetPasswordForm")
);

const ResetPasswordPage = () => {
  return <AuthResetPasswordForm />;
};
ResetPasswordPage.guestMode = true;
export default ResetPasswordPage;

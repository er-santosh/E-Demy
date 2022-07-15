import dynamic from "next/dynamic";

const AuthForgotPasswordForm = dynamic(() =>
  import("components/auth/AuthForgotPasswordForm")
);

const ForgotPasswordPage = () => {
  return <AuthForgotPasswordForm />;
};

ForgotPasswordPage.guestMode = true;

export default ForgotPasswordPage;

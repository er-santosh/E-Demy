const AuthSignUpForm = dynamic(() => import("components/auth/AuthSignupForm"));

import dynamic from "next/dynamic";

const SignUpPage = () => {
  return <AuthSignUpForm />;
};
SignUpPage.guestMode = true;
export default SignUpPage;

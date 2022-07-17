const AuthSignUpForm = dynamic(() => import("components/form/SignupForm"));

import { GuestLayout } from "components/layout/GuestLayout";
import dynamic from "next/dynamic";

const SignUpPage = () => {
  return <AuthSignUpForm />;
};

SignUpPage.layout = (page) => {
  return <GuestLayout>{page}</GuestLayout>;
};

export default SignUpPage;

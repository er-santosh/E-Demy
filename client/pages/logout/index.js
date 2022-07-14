import AlertBanner from "components/banner/AlertBanner";

const LogoutPage = () => {
  return (
    <AlertBanner>
      {` You've successfully logged out of Edemy. Come back soon!`}
    </AlertBanner>
  );
};

LogoutPage.isGuest = true;

export default LogoutPage;

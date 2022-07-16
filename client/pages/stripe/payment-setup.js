import axios from "axios";
import { FallbackLoader } from "components/loader/FallbackLoader";
import { Container, Typography } from "mui";
import { LoadingButton } from "mui/lab";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const StripePaymentSetup = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const paymentSet = user.stripe_account_id && user.stripe_account_id !== "";
  useEffect(() => {
    if (paymentSet) {
      router.push("/instructor/courses");
    }
  }, []);
  const payoutSetup = async () => {
    setLoading(true);
    await axios
      .post("/api/stripe-payment-setup")
      .then((res) => {
        window.location.href = res.data;
      })
      .catch((err) => {
        toast.error("Stripe onboarding failed. Try again.");
        setLoading(false);
      });
  };

  if (paymentSet) {
    return <FallbackLoader />;
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 4,
      }}
    >
      <Typography
        component="h1"
        sx={{
          fontWeight: "bold",
          fontSize: {
            xs: "1rem",
            sm: "2rem",
            md: "3rem",
          },
        }}
      >
        Setup Payment to publish courses
      </Typography>

      <Typography
        component="h3"
        sx={{
          fontSize: {
            xs: "0.5rem",
            sm: "1rem",
            md: "1.5rem",
          },
        }}
      >
        Edemy parterned with stripe to transfer your bank account.
      </Typography>
      <LoadingButton
        color="primary"
        variant="contained"
        loading={loading}
        disabled={loading || paymentSet}
        sx={{
          mt: 2,
        }}
        onClick={payoutSetup}
      >
        Payout Setup
      </LoadingButton>
    </Container>
  );
};

StripePaymentSetup.requiresAuth = true;

export default StripePaymentSetup;

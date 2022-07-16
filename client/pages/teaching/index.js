import axios from "axios";
import { FallbackLoader } from "components/loader/FallbackLoader";
import { Container, Typography } from "mui";
import { LoadingButton } from "mui/lab";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUser } from "store/AuthReducer";

const TeachingPage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const isInstructor = user?.role?.includes("Instructor");
  const paymentSet = user?.stripe_account_id && user?.stripe_account_id !== "";
  useEffect(() => {
    if (isInstructor) {
      router.push("/stripe/payment-setup");
    }
    if (isInstructor && paymentSet) {
      router.push("/instructor/courses");
    }
  }, [isInstructor]);
  const becomeInstructor = async () => {
    setLoading(true);
    if (!isInstructor) {
      //update user to be an instructor
      try {
        const res = await axios.post("/api/become-instructor");
        dispatch(updateUser(res.data));
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
    setLoading(false);
  };

  if (isInstructor) {
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
        Become an instructor today
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
        Join one of the world’s largest online learning marketplaces.
      </Typography>
      <LoadingButton
        color="dark"
        variant="contained"
        loading={loading}
        disabled={loading}
        sx={{
          mt: 2,
        }}
        onClick={becomeInstructor}
      >
        Get Started
      </LoadingButton>
    </Container>
  );
};

TeachingPage.requiresAuth = true;
export default TeachingPage;

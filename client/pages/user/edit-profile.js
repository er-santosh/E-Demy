import { Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const EditProfile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Container
      component="main"
      maxWidth="xs"
      color="black"
      sx={{
        p: 6,
      }}
    >
      <Typography>{user.name}</Typography>
    </Container>
  );
};

export default EditProfile;

EditProfile.requiresAuth = true;

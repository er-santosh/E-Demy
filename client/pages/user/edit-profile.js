import { Container, Typography } from "mui";
import { useSelector } from "react-redux";

const EditProfilePage = () => {
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
      <Typography>hello user {user?.name}</Typography>
    </Container>
  );
};

EditProfilePage.requiresAuth = true;

export default EditProfilePage;

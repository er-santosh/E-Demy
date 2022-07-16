import InstructorLayout from "components/layout/InstructorLayout";
import { Typography } from "mui";
const InstructorCoursesPage = () => {
  return <Typography>courses</Typography>;
};

InstructorCoursesPage.layout = (page) => {
  return <InstructorLayout>{page}</InstructorLayout>;
};

export default InstructorCoursesPage;

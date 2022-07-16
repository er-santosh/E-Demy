import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { FallbackLoader } from "components/loader/FallbackLoader";
import { toast } from "react-toastify";

const InstructorRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchInstructor();
  }, []);

  const fetchInstructor = async () => {
    try {
      const { data } = await axios.get("/api/current-instructor");
      if (data.ok) setOk(true);
    } catch (err) {
      setOk(false);
      router.push("/");
      toast.error(err);
    }
  };

  if (!ok) {
    return <FallbackLoader />;
  }

  return <> {children}</>;
};

export default InstructorRoute;

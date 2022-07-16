import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { FallbackLoader } from "components/loader/FallbackLoader";
import { toast } from "react-toastify";

const UserRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/current-user");
      if (data.ok) setOk(true);
    } catch (err) {
      setOk(false);
      router.push("/join/login-popup?locale=en-US");
      toast.error(err);
    }
  };

  if (!ok) {
    return <FallbackLoader />;
  }

  return <> {children}</>;
};

export default UserRoute;
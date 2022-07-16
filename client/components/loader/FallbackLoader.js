import { Backdrop } from "mui";
import { ScaleLoader } from "react-spinners";

export const FallbackLoader = () => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open
    >
      <ScaleLoader color="purple" loading />
    </Backdrop>
  );
};

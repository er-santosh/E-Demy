import { FallbackLoader } from "components/loader/FallbackLoader";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const DefaultTopNavigation = dynamic(
  () => import("./navigation/DefaultTopNavigation"),
  {
    suspense: true,
  }
);

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Suspense fallback={<FallbackLoader />}>
        <DefaultTopNavigation />
        {children}
      </Suspense>
    </>
  );
};

export default DefaultLayout;

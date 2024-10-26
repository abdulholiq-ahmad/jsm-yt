import { Suspense } from "react";
import Logo from "@/assets/images/logo.svg";

const Loading = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#09090A]">
      <img className="animate-ping" src={Logo} alt="" width={300} />
    </div>
  );
};

const SuspenseComponent = ({ children }: { children: JSX.Element }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export { Loading, SuspenseComponent };

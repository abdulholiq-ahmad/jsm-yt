import React from "react";
import { Outlet } from "react-router-dom";
import Image from "../../assets/images/login-bg.jpg";

const Auth: React.FC = () => {
  return (
    <div className=" bg-[#09090A]">
      <div className="grid grid-cols-2">
        <Outlet />
        <div className="col-span-1 h-screen">
          <img className="h-full w-full object-cover" src={Image} alt="Background auth" />
        </div>
      </div>
    </div>
  );
};

export default Auth;

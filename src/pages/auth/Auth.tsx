import React, { FC } from "react";
import { Outlet } from "react-router-dom";

const Auth: FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Auth;

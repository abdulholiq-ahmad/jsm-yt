import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormComponent from "@/components/form/FormComponent";
import { logOut } from "@/redux/slice/auth-slice";
import { useDispatch } from "react-redux";
import Logo from "@/assets/images/logo.svg";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("token");

    if (accessToken) {
      navigate("/");
    }

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "token") {
        dispatch(logOut());
        navigate("/login");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate, dispatch]);

  return (
    <div className="container flex items-center justify-center">
      <div className="w-2/4">
        <div className="mb-5 flex flex-col items-center justify-center">
          <img className="mb-16" src={Logo} alt="logo" />
          <h2 className="text-3xl font-bold text-white text-center">Log in to your account</h2>
          <p className="text-[#7878A3] text-base text-center">Welcome back! Please enter your details.</p>
        </div>
        <FormComponent />
        <div className="flex items-center justify-center gap-2 mt-4 font-light">
          <p className="text-white">Don’t have an account?</p>
          <Link to="/auth/register" className="text-[#877EFF]">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

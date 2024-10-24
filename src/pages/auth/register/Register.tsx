import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormRegister from "@/components/form/FormRegister";
import { useRegisterRequestMutation } from "@/redux/api/auth-api";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { isSuccess } = useRegisterRequestMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/auth/login");
    }
  });
  return (
    <div className="container flex items-center justify-center">
      <div className="w-2/4">
        <div className="mb-5 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-white text-center">Create a new account</h2>
          <p className="text-[#7878A3] text-base text-center">To use snapgram, Please enter your details.</p>
        </div>

        <FormRegister />
        <div className="flex items-center justify-center gap-2 mt-4 font-light">
          <p className="text-white">Don’t have an account?</p>
          <Link to="/auth/login" className="text-[#877EFF]">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

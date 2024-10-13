import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Routers from "./router";
import { logOut } from "./redux/slice/auth-slice";
import { useDispatch } from "react-redux";

const App: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fromRegister = localStorage.getItem("fromRegister") === "true";

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "token") {
        dispatch(logOut());
        navigate("/auth/login");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    const token = localStorage.getItem("token");
    const path = window.location.pathname;

    if (path === "/auth/login") {
      if (token) {
        if (!fromRegister) {
          navigate("/");
        }
      }
    } else if (path === "/auth/register") {
      localStorage.setItem("fromRegister", "true");
    } else {
      if (!token) {
        navigate("/auth/login");
      }
    }

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      localStorage.removeItem("fromRegister");
    };
  }, [navigate, dispatch, fromRegister]);

  return (
    <>
      <Routers />
    </>
  );
};

export default App;

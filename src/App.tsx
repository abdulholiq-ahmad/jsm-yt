import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Routers from "./router";
import { logOut } from "./redux/slice/auth-slice";
import { useDispatch } from "react-redux";

const App: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

    if (token) {
      if (path === "/auth/login" || path === "/auth/register") {
        navigate("/");
      }
    } else {
      if (path !== "/auth/login" && path !== "/auth/register") {
        navigate("/auth/login");
      }
    }

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate, dispatch]);

  return (
    <>
      <Routers />
    </>
  );
};

export default App;

import { useDispatch } from "react-redux";
import Routers from "./router";
import { useEffect } from "react";
import { logOut } from "./redux/slice/auth-slice";
import { useNavigate } from "react-router-dom";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      dispatch(logOut());
      navigate("/auth/login");
    }
  }, [dispatch]);

  return (
    <>
      <Routers />
    </>
  );
};

export default App;

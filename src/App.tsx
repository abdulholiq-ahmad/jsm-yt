import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Routers from "./router";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth/login");
    }
  }, [navigate]);

  return (
    <>
      <Routers />
    </>
  );
}

export default App;

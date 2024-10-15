import AsideRoutes from "@/components/aside-routes/AsideRoutes";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="flex">
      <AsideRoutes />
      <Outlet />
    </main>
  );
};

export default Layout;

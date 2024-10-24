import AsideRoutes from "@/components/aside-routes/AsideRoutes";
import { useGetProfileQuery } from "@/redux/api/user-api";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { data: profile, isLoading } = useGetProfileQuery({});

  return (
    <>
      <div className="grid grid-cols-6">
        <div className="col-span-1 sticky top-0 left-0 z-30">
          <AsideRoutes data={profile} isLoading={isLoading} />
        </div>
        <div className="col-span-5">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;

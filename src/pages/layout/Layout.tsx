import AsideRoutes from "@/components/aside-routes/AsideRoutes";
import { useGetProfileQuery } from "@/redux/api/user-api";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { data: profile } = useGetProfileQuery({});
  console.log(profile);
  return (
    <>
      <div className="grid grid-cols-6">
        <div className="col-span-1">
          <AsideRoutes data={profile} />
        </div>
        <div className="col-span-5">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;

import Logo from "@/assets/images/logo.svg";
import AvatarComponent from "../avatar-component/Avatar";
import HomeIcon from "@/assets/images/home-primary.svg";
import { NavLink } from "react-router-dom";

const AsideRoutes = () => {
  return (
    <aside className="w-1/4 bg-aside h-screen font-inter pt-12 pb-8 px-6 text-white">
      <img src={Logo} alt="Logo" title="Logo" width={171} />

      <span className="flex items-center gap-2.5 my-11">
        <AvatarComponent />
        <span className="text-white">
          <h4 className="text-lg font-semibold capitalize tracking-wide">adminbek</h4>
          <p className="text-infoText text-sm">@admin</p>
        </span>
      </span>
      <nav>
        <ul>
          <li className="group">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "text-lg font-bold bg-hoverPrimary p-4 flex items-start rounded-md gap-2.5"
                  : "font-medium text-lg group-hover:bg-hoverPrimary p-4 flex items-start rounded-md gap-2.5 transition-all ease-in duration-150"
              }
            >
              {({ isActive }) => (
                <>
                  <img
                    src={HomeIcon}
                    alt="Home icon"
                    className={`transition-all ease-in duration-150 ${
                      isActive ? "invert brightness-0" : "group-hover:brightness-0 group-hover:invert"
                    }`}
                  />
                  <span className="capitalize">Home</span>
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AsideRoutes;

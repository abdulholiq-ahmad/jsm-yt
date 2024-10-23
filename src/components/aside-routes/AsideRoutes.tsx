import Logo from "@/assets/images/logo.svg";
import AvatarComponent from "../avatar-component/Avatar";
import HomeIcon from "@/assets/images/home-primary.svg";
import ExploreIcon from "@/assets/images/explore.svg";
import PeopleIcon from "@/assets/images/people.svg";
import BookmarkIcon from "@/assets/images/bookmark.svg";
import ReelsIcon from "@/assets/images/reels.svg";
import ChatsIcon from "@/assets/images/chats.svg";
import CreatePostIcon from "@/assets/images/create-post.svg";
import LogOutIcon from "@/assets/images/logout.svg";
import SettingIcon from "@/assets/images/setting.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { logOut } from "@/redux/slice/auth-slice";
import { useDispatch } from "react-redux";
import SkeletonAvatar from "../skeleton/SkeletonAvatar";

const AsideRoutes = ({ data, isLoading }) => {
  const routes = [
    {
      title: "Home",
      path: "/",
      icon: HomeIcon,
    },
    {
      title: "Explore",
      path: "/explore",
      icon: ExploreIcon,
    },
    {
      title: "People",
      path: "/people",
      icon: PeopleIcon,
    },
    {
      title: "Saved",
      path: "/saved",
      icon: BookmarkIcon,
    },
    {
      title: "Reels",
      path: "/reels",
      icon: ReelsIcon,
    },
    {
      title: "Chats",
      path: "/chats",
      icon: ChatsIcon,
    },
    {
      title: "Create Post",
      path: "/create-post",
      icon: CreatePostIcon,
    },
  ];
  const settingData = [
    {
      title: "Logout",
      icon: LogOutIcon,
    },
    {
      title: "Settings",
      icon: SettingIcon,
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <aside className=" bg-aside h-screen font-inter pt-12 px-6 text-white border-r border-[#1F1F22] flex flex-col justify-between">
      <img src={Logo} alt="Logo" title="Logo" width={171} />

      <span className="flex items-center gap-2.5 my-5">
        {isLoading ? <SkeletonAvatar /> : <AvatarComponent data={data} />}
        <span className="text-white">
          <h4 className="text-lg font-semibold capitalize tracking-wide">{data?.username}</h4>
          <p className="text-infoText text-sm">{data?.email}</p>
        </span>
      </span>
      <nav className="">
        <ul className="flex flex-col gap-2">
          {routes.map((route, index) => (
            <li key={index} className="group relative">
              <NavLink
                to={route.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-lg font-bold bg-hoverPrimary p-2 px-4 flex items-start rounded-md gap-2.5"
                    : "font-medium text-lg group-hover:bg-hoverPrimary p-2 px-4 flex items-start rounded-md gap-2.5 transition-all ease-in duration-150"
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive ? <span className="bg-hoverPrimary absolute -left-16 top-0 p-6 rounded-full "></span> : null}
                    <img
                      src={route.icon}
                      alt="Home icon"
                      className={`transition-all ease-in duration-150 ${
                        isActive ? "invert brightness-0" : "group-hover:brightness-0 group-hover:invert"
                      }`}
                    />
                    <span className="capitalize">{route.title}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <ul className="mt-auto mb-[10px]">
        {settingData.map((data, index) => (
          <li key={index} className="group relative">
            <button
              onClick={() => {
                dispatch(logOut());
                navigate("/auth/login");
              }}
              className="text-lg font-medium p-2 px-4 flex items-start rounded-md gap-2.5 w-full hover:bg-hoverPrimary"
            >
              <img className="group-hover:brightness-0 group-hover:invert" src={data.icon} alt="" />
              <p>{data.title}</p>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AsideRoutes;

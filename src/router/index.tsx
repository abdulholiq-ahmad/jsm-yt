import { lazy, LazyExoticComponent } from "react";
import { useRoutes } from "react-router-dom";
import { SuspenseComponent as Suspense } from "../utils";

const Home: LazyExoticComponent<any> = lazy(() => import("../pages/home/Home"));
const Explore: LazyExoticComponent<any> = lazy(() => import("../pages/explore/Explore"));
const People: LazyExoticComponent<any> = lazy(() => import("../pages/people/People"));
const Saved: LazyExoticComponent<any> = lazy(() => import("../pages/saved/Saved"));
const Reels: LazyExoticComponent<any> = lazy(() => import("../pages/reels/Reels"));
const Chats: LazyExoticComponent<any> = lazy(() => import("../pages/chats/Chats"));
const CreatePost: LazyExoticComponent<any> = lazy(() => import("../pages/create-post/CreatePost"));
const Layout: LazyExoticComponent<any> = lazy(() => import("../pages/layout/Layout"));
const Auth: LazyExoticComponent<any> = lazy(() => import("../pages/auth/Auth"));
const Login: LazyExoticComponent<any> = lazy(() => import("../pages/auth/login/Login"));
const Register: LazyExoticComponent<any> = lazy(() => import("../pages/auth/register/Register"));

const Routers = () => {
  return useRoutes([
    {
      path: "/",
      element: (
        <Suspense>
          <Layout />
        </Suspense>
      ),
      children: [
        {
          path: "/",
          element: (
            <Suspense>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/explore",
          element: (
            <Suspense>
              <Explore />
            </Suspense>
          ),
        },
        {
          path: "/people",
          element: (
            <Suspense>
              <People />
            </Suspense>
          ),
        },
        {
          path: "/saved",
          element: (
            <Suspense>
              <Saved />
            </Suspense>
          ),
        },
        {
          path: "/reels",
          element: (
            <Suspense>
              <Reels />
            </Suspense>
          ),
        },
        {
          path: "/chats",
          element: (
            <Suspense>
              <Chats />
            </Suspense>
          ),
        },
        {
          path: "/create-post",
          element: (
            <Suspense>
              <CreatePost />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/auth",
      element: (
        <Suspense>
          <Auth />
        </Suspense>
      ),
      children: [
        {
          path: "login",
          element: (
            <Suspense>
              <Login />
            </Suspense>
          ),
        },
        {
          path: "register",
          element: (
            <Suspense>
              <Register />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "*",
      element: (
        <Suspense>
          <h2>404</h2>
        </Suspense>
      ),
    },
  ]);
};

export default Routers;

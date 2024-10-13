import { lazy, LazyExoticComponent } from "react";
import { useRoutes } from "react-router-dom";
import { SuspenseComponent as Suspense } from "../utils";

const Home: LazyExoticComponent<any> = lazy(() => import("../pages/home/Home"));
const About: LazyExoticComponent<any> = lazy(() => import("../pages/about/About"));
const Company: LazyExoticComponent<any> = lazy(() => import("../pages/company/Company"));
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
          path: "/about",
          element: (
            <Suspense>
              <About />
            </Suspense>
          ),
          children: [
            {
              path: "company",
              element: (
                <Suspense>
                  <Company />
                </Suspense>
              ),
            },
          ],
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

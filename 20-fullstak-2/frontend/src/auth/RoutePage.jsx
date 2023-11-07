import { jwtDecode } from "jwt-decode";
import secureLocalStorage from "react-secure-storage";
import Home from "../components/Home.jsx";
import Login from "../pages/Login.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../pages/Register.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import Contact from "../pages/Contact.jsx";
import Logout from "../pages/Logout.jsx";
import Profile from "../pages/Profile.jsx";
import NoPage from "../components/NoPage.jsx";

function RoutePage() {
  let refreshExpiration = new Date();
  const refreshToken = secureLocalStorage.getItem("refreshToken");
  if (refreshToken) {
    try {
      refreshExpiration = new Date(jwtDecode(refreshToken).exp * 1000);
    } catch (error) {
      console.log(error);
    }
  }

  const navItems = [
    { path: "/", element: <Home />, isPrivate: false, isLogin: true },
    { path: "/login", element: <Login />, isPrivate: false, isLogin: true },
    {
      path: "/about",
      element: <h1>About</h1>,
      isPrivate: false,
      isLogin: true,
    },
    {
      path: "/register",
      element: <Register />,
      isPrivate: false,
      isLogin: false,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
      isPrivate: false,
      isLogin: false,
    },
    {
      path: "/contact",
      element: <Contact />,
      isPrivate: true,
      isLogin: true,
    },
    {
      path: "/logout",
      element: <Logout />,
      isPrivate: true,
      isLogin: true,
    },
    {
      path: "/profile",
      element: <Profile />,
      isPrivate: true,
      isLogin: true,
    },
    {
      path: "*",
      element: <NoPage />,
      isPrivate: false,
      isLogin: true,
    },
  ];

  const buildNav = () => {
    return navItems.map((navItem, index) => {
      const accessToken = secureLocalStorage.getItem("acessToken");
      if (!accessToken && !navItem.isPrivate) {
        return (
          <Route key={index} path={navItem.path} element={navItem.element} />
        );
      } else if (accessToken) {
        if (navItem.isLogin && refreshExpiration <= new Date()) {
          return <Route key={index} path={navItem.path} element={<Login />} />;
        } else {
          return (
            <Route key={index} path={navItem.path} element={navItem.element} />
          );
        }
      } else {
        return <Route key={index} path={navItem.path} element={<Home />} />;
      }
    });
  };

  return (
    <BrowserRouter>
      <Routes>{buildNav()}</Routes>
    </BrowserRouter>
  );
}

export default RoutePage;

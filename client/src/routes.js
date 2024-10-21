import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import RTLDefault from "views/rtl/default";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
  MdCategory,
  MdAdd,
  MdUpdate,
  MdMenuBook,
  MdOutlinePerson3,
} from "react-icons/md";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/",
    path: "/",
    icon: <MdHome className="h-6 w-6" />,
  },
  {
    name: "Menu",
    layout: "/",
    path: "menu",
    icon: <MdMenuBook className="h-6 w-6" />,
    secondary: true,
  },
  {
    name: "Employee",
    layout: "/",
    path: "employees",
    icon: <MdOutlinePerson3 className="h-6 w-6" />,
    secondary: true,
  },
 
  {
    name: "Data Tables",
    layout: "/",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
  },
  {
    name: "Profile",
    layout: "/",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
  },
  {
    name: "Sign Out",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
  },

];
export default routes;

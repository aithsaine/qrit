import React from "react";


// Icon Imports
import {
  Md18UpRating,
  MdHome,
 
  MdKeyboardCommandKey,
 
  MdMenuBook,
  MdOutlinePerson3,
} from "react-icons/md";

const routes = [
  {
    name: "Main Dashboard",
    layout: "admin",
    path: "/admin",
    icon: <MdHome className="h-6 w-6" />,
  },
  {
    name: "Menu",
    layout: "admin",
    path: "menu",
    icon: <MdMenuBook className="h-6 w-6" />,
    secondary: true,
  },
  {
    name: "Employees",
    layout: "admin",
    path: "employees",
    icon: <MdOutlinePerson3 className="h-6 w-6" />,
    secondary: true,
  },
  {
    name: "Orders",
    layout: "admin",
    path: "orders",
    icon: <MdKeyboardCommandKey className="h-6 w-6" />,
    secondary: true,
  },
  {
    name: "Main Dashboard",
    layout: "employee",
    path: "/employee",
    icon: <MdHome className="h-6 w-6" />,
  },
  {
    name: "my rates",
    layout: "employee",
    path: "/raings",
    icon: <Md18UpRating className="h-6 w-6" />,
    secondary: true,
  },

 

];
export default routes;

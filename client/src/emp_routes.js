import React from "react";


// Icon Imports
import {
  MdHome,
 
  MdMenuBook,
} from "react-icons/md";

const emp_routes = [
  {
    name: "Main Dashboard",
    layout: "employee",
    path: "/admin",
    icon: <MdHome className="h-6 w-6" />,
  },
  {
    name: "my rates",
    layout: "employee",
    path: "menu",
    icon: <MdMenuBook className="h-6 w-6" />,
    secondary: true,
  },
 

 

];
export default emp_routes;

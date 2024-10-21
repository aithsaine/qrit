import Admin from "layouts/admin";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "views/admin/default";
import Employee from "views/admin/employee";
import Menu from "views/admin/menu";
import ProfileOverview from "views/admin/profile";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<Admin/>,
        children:[
            {
                path:"/",
                element:<Dashboard/>
            },
            {
                path:"/profile",
                element:<ProfileOverview/>
            },
            {
                path:"/menu",
                element:<Menu/>
            }
            ,
            {
                path:"/employees",
                element:<Employee/>
            }
        ]
    },
 
])
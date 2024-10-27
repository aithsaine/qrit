import Admin from "layouts/admin";
import Guest from "layouts/guest";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "views/admin/default";
import Employee from "views/admin/employee";
import Menu from "views/admin/menu";
import ProfileOverview from "views/admin/profile";
import SignIn from "views/auth/SignIn";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<Guest/>,
        children:[
            {
                path:"/",
                element:<SignIn/>
            }
        ]
    },
    {
        path:"/admin",
        element:<Admin/>,
        children:[
            {
                path:"/admin",
                element:


                <Dashboard/>
               
            },
            {
                path:"/admin/profile",
                element:

                <ProfileOverview/>
               
            },
            {
                path:"/admin/menu",
                element:

                
                <Menu/>
               
            }
            ,
            {
                path:"/admin/employees",
                element:<Employee/>
            }
        ]
    },
 
])
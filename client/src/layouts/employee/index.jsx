import React, { useEffect, useState } from "react";
import {  useLocation, Outlet, useNavigate } from "react-router-dom";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import Footer from "components/footer/Footer";
import { addAuthUser, initialiseData } from "../../redux/actionCreators";
import { useDispatch } from "react-redux";
import api from "helpers/api";
import Loading from "components/Loader";
import { MdHome, MdMenuBook } from "react-icons/md";

export default function EmployeeLayout() {
  const location = useLocation();
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(window?.innerWidth<800?false:true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");
  const dispatch = useDispatch()
  const emp_routes =  [
    {
      name: "Main Dashboard",
      layout: "employee",
      path: "/employee",
      icon: <MdHome className="h-6 w-6" />,
    },
    {
      name: "my rates",
      layout: "employee",
      path: "/employee/ratings",
      icon: <MdMenuBook className="h-6 w-6" />,
      secondary: true,
    },
   
  
   
  
  ];
  const [loading,setLoading] = useState(true)


  async function getUser() {
    try {
        const resp = await api.get("api/user")
        console.log(resp)
        dispatch(addAuthUser(resp.data?.user))
        if(resp.data?.user.role ==="employee")
         return setLoading(false)
    } catch (error) {
        if (error.response.data.message == "Unauthenticated.") {
            setLoading(false)
            return navigate("/")
        }
        setLoading(false)
        return navigate("/dsqds")
    }
}



useEffect(()=>{
  getUser()
  

},[])
  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);
  React.useEffect(() => {
    getActiveRoute(emp_routes);
  }, [location.pathname]);

  const getActiveRoute = (emp_routes) => {
    let activeRoute = "Main Dashboard";
    for (let i = 0; i < emp_routes.length; i++) {
      if (
        window.location.href.indexOf(
           emp_routes[i].path
        ) !== -1
      ) {
        setCurrentRoute(emp_routes[i].name);
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (emp_routes) => {
    let activeNavbar = false;
    for (let i = 0; i < emp_routes.length; i++) {
      if (
        window.location.href.indexOf(emp_routes[i].layout + emp_routes[i].path) !== -1
      ) {
        return emp_routes[i].secondary;
      }
    }
    return activeNavbar;
  };

  document.documentElement.dir = "ltr";

  if(loading)
  {
    return <Loading/>
  }
  return (
    <div className="flex h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      {/* Navbar & Main Content */}
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
        >
          {/* emp_routes */}
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              logoText={"qrit"}
              brandText={currentRoute}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
            <Outlet/>
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

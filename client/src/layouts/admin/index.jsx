import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import Footer from "components/footer/Footer";
import routes from "routes.js";
import { initialiseData } from "../../redux/actionCreators";
import { useDispatch } from "react-redux";
import api from "helpers/api";

export default function Admin() {
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");
  const dispatch = useDispatch()
  const getCategories = async ()=>{
    try {
        const {data} = await api.get("/api/home")
        if(data){
          dispatch(initialiseData(data))
        }
    } catch (error) {

    }
}
useEffect(()=>{
  getCategories()
  

},[])
  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);
  React.useEffect(() => {
    getActiveRoute(routes);
  }, [location.pathname]);

  const getActiveRoute = (routes) => {
    let activeRoute = "Main Dashboard";
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(
           routes[i].path
        ) !== -1
      ) {
        setCurrentRoute(routes[i].name);
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary;
      }
    }
    return activeNavbar;
  };

  document.documentElement.dir = "ltr";
  return (
    <div className="flex h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      {/* Navbar & Main Content */}
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
        >
          {/* Routes */}
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

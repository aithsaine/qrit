import React, { useEffect, useState, useRef } from "react";
import { Routes, Route, Navigate, useLocation, Outlet, useNavigate } from "react-router-dom";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import Footer from "components/footer/Footer";
import routes from "routes.js";
import { addAuthUser, addNewOrder, confirmOrder, initialiseData } from "../../redux/actionCreators";
import { useDispatch, useSelector } from "react-redux";
import api from "helpers/api";
import Loading from "components/Loader";
import { toast, Toaster } from 'sonner';
import 'react-toastify/dist/ReactToastify.css';
import cashSound from '../../assets/sounds/cash.mp3';

export default function Admin() {
  const location = useLocation();
  const employees = useSelector(state => state.employees);
  const navigate = useNavigate();
  const [open, setOpen] = useState(window?.innerWidth < 800 ? false : true);
  const [currentRoute, setCurrentRoute] = useState("Main Dashboard");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);
  const audioRef = useRef(new Audio("../../assets/sounds/notification.mp3"));
  const audiocashRef = useRef(new Audio(cashSound));

  async function getUser() {
    try {
      const resp = await api.get("api/user");
      dispatch(addAuthUser(resp.data?.user));
      if (resp.data?.user.role === "admin") {
        getCategories();
        return setLoading(false);
      } else if (resp.data?.user.role === "employee") {
        return navigate('/employee');
      }
    } catch (error) {
      if (error.response?.data?.message === "Unauthenticated.") {
        setLoading(false);
        return navigate("/");
      }
      setLoading(false);
      return navigate("/dsqds");
    }
  }

  const getCategories = async () => {
    try {
      const { data } = await api.get("/api/home");
      if (data) {
        dispatch(initialiseData(data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();

    // Listen for a user interaction to enable sound playback
    const enableSoundPlayback = () => setUserInteracted(true);
    window.addEventListener('click', enableSoundPlayback, { once: true });

    window.Echo.channel('newOrderAdded').listen('NewOrderAdded', (e) => {
      if (!userInteracted) return;

      if (e.type === "new_order") {
        dispatch(addNewOrder(e.order));
        audioRef?.current?.play();
        toast.success(`New order received from table number ${e.order.table}`);
      } else if (e.type === "confirm_order") {
        dispatch(confirmOrder(e.order));
        audiocashRef?.current?.play();
        toast.success(`Order Number ${e.order.id} confirmed by ${employees.find(elem => elem.id === e.order.confirmer).name}`);
      }
    });

    return () => {
      window.Echo.leaveChannel('newOrderAdded');
    };
  }, [userInteracted]);

  useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);

  useEffect(() => {
    getActiveRoute(routes);
  }, [location.pathname]);

  const getActiveRoute = (routes) => {
    let activeRoute = "Main Dashboard";
    for (let i = 0; i < routes.length; i++) {
      if (window.location.href.indexOf(routes[i].path) !== -1) {
        setCurrentRoute(routes[i].name);
      }
    }
    return activeRoute;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        <main className="mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]">
          <div className="h-full">
            <Navbar onOpenSidenav={() => setOpen(true)} logoText={"qrit"} brandText={currentRoute} />
            <div className="pt-5 mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Outlet />
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

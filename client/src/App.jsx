import React from "react";
import { Routes, Route, Navigate, RouterProvider } from "react-router-dom";

import RtlLayout from "layouts/rtl";
import 
AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import { router } from "router/route";
import { Toaster } from "sonner";
const App = () => {
  return (
    <>
<RouterProvider router={router}/>
<Toaster richColors/>
    </>
  );
};

export default App;

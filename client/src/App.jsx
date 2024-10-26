import React from "react";
import {  RouterProvider } from "react-router-dom";

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

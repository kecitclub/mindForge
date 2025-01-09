import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Home, Chooserole, Signin, Signup } from "../pages/index";
import Dashboard from "@/pages/police/PoliceDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/chooserole",
        element: <Chooserole />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  //police routes
  {
    path: "/police/dashboard",
    element: <Dashboard />,
  },
]);

export default router;

import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Home, Chooserole, Signin, Signup, PoliceProfile } from "../pages/index";
import Dashboard from "@/pages/police/PoliceDashboard";
import FireDashboard from "@/pages/firebrigade/FireDashboard";

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
  {
    path: "/police/profile",
    element: <PoliceProfile />,
  },
  //Firefighter routes
  {
    path: "/fire/dashboard",
    element: <FireDashboard />,
  }
]);

export default router;

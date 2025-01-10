import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import {
  Home,
  Chooserole,
  Signin,
  Signup,
  PoliceProfile,
} from "../pages/index";
import PoliceDashboard from "@/pages/police/PoliceDashboard";
import UserDashboard from "@/pages/user/UserDashboard";
import ProtectedRoute from "@/utils/ProtectedRoute";
import FireDashboard from "@/pages/firebrigade/FireDashboard";
import AmbulanceDashboard from "@/pages/ambulance/AmbulanceDashboard";

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
    element: (
      <ProtectedRoute>
        <PoliceDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/police/profile",
    element: (
      <ProtectedRoute>
        <PoliceProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user/dashboard",
    element: <UserDashboard />,
  },
  //Firefighter routes
  {
    path: "/fire/dashboard",
    element: (
      <ProtectedRoute>
        <FireDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/ambulance/dashboard",
    element: <AmbulanceDashboard />,
  },
]);

export default router;

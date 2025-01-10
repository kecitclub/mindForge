import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Home, Chooserole, Signin, Signup, PoliceProfile } from "../pages/index";
import Dashboard from "@/pages/police/PoliceDashboard";
import FireDashboard from "@/pages/firebrigade/FireDashboard";
import ProtectedRoute from "@/utils/ProtectedRoute"

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
        <Dashboard />
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
  //Firefighter routes
  {
    path: "/fire/dashboard",
    element: <FireDashboard />,
  }
]);


export default router

import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Home, Chooserole } from "../pages/index";

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
    ],
  },
]);

export default router;

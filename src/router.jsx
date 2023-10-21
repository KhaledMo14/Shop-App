import { createBrowserRouter } from "react-router-dom";
import { Details } from "./pages/Details/Details";
import { Home } from "./pages/Home";
import { Order } from "./pages/Order/Order";
import { Review } from "./pages/Review/Review";
import { NavBar } from "./components/NavBar/NavBar";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <>
    <Home/>
    </>
   ,
  },
  {
    path: "details/:id",
    element: <Details />,
  },
  {
    path: "order",
    element: <Order />,
  },
  {
    path: "review",
    element: <>
    <NavBar/>
    <Review />,
    </>
  },
]);

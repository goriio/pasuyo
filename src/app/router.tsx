import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignUp } from "./routes/signup";
import { Home } from "./routes/home";
import { Login } from "./routes/login";
import { CartRoute } from "./routes/cart";
import { ProductsRoute } from "./routes/products";
import { MainLayout } from "@/components/layouts/main-layout";
import { CheckoutRoute } from "./routes/checkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <CartRoute />,
      },
      {
        path: "/products",
        element: <ProductsRoute />,
      },
      {
        path: "/checkout",
        element: <CheckoutRoute />,
      },
    ],
  },
  {
    path: "/",
    children: [
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignUp } from "./routes/signup";
import { Home } from "./routes/home";
import { Login } from "./routes/login";
import { CartRoute } from "./routes/cart";
import { ProductsRoute } from "./routes/products";
import { MainLayout } from "@/components/layouts/main-layout";
import { CheckoutRoute } from "./routes/checkout";
import { ProtectedRoute } from "./routes/protected-route";

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
        path: "/products",
        element: <ProductsRoute />,
      },
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          {
            path: "/cart",
            element: <CartRoute />,
          },
          {
            path: "/checkout",
            element: <CheckoutRoute />,
          },
        ],
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

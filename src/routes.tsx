import App from "./App";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Homepage from "./components/Homepage/Homepage";
import StorePage from "./components/StorePage/StorePage";
import AlbumPage from "./components/AlbumPage/AlbumPage";
import CartPage from "./components/CartPage/CartPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "store",
        element: <StorePage />,
        children: [{ path: ":albumId", element: <AlbumPage /> }],
      },
      { path: "cart", element: <CartPage /> },
    ],
  },
];

export default routes;

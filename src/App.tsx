import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router";
import NavBar from "./components/NavBar/NavBar";
import { addToCart, getCartSize } from "./utils/cart";
import { useState } from "react";
import { DetailedAlbumObject } from "./utils/interfaces";

const queryClient = new QueryClient();

function App() {
  const [cartSize, setCartSize] = useState(getCartSize());

  function handleAddToCart(
    itemObject: DetailedAlbumObject,
    itemId: string,
    amount: number
  ) {
    addToCart(itemObject, itemId, amount);
    setCartSize(getCartSize());
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NavBar cartSize={cartSize} />
        <Outlet
          context={{
            handleAddToCart: handleAddToCart,
          }}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;

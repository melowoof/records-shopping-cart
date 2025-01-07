import styles from "./CartPage.module.css";
import BottomNav from "../BottomNav/BottomNav";
import RoundedButton from "../RoundedButton/RoundedButton";
import {
  getCart,
  getItem,
  removeFromCart,
  increaseAmount,
  decreaseAmount,
  getItemCount,
  getTotalPrice,
  getCartSize,
} from "../../utils/cart";
import { useState } from "react";
import AmountInput from "../AmountInput/AmountInput";
import { motion } from "motion/react";
import { Trash2 } from "lucide-react";
import { useOutletContext } from "react-router";

interface AlbumProps {
  albumId: string;
  updateCartUI: () => void;
}

function Album({ albumId, updateCartUI }: AlbumProps) {
  const album = getItem(albumId);
  const [amount, setAmount] = useState<number>(getItemCount(albumId));

  function handleIncrement() {
    increaseAmount(albumId);
    setAmount(getItemCount(albumId));
    updateCartUI();
  }

  function handleDecrement() {
    decreaseAmount(albumId);
    setAmount(getItemCount(albumId));
    updateCartUI();
  }

  function handleRemoveFromCart() {
    removeFromCart(albumId);
    updateCartUI();
  }

  if (!album) return null;

  return (
    <div className={styles.albumContainer}>
      <img
        src={album.albumArtMed}
        alt={album.albumName}
        className={styles.albumArt}
      />
      <div className={styles.infoContainer}>
        <div className={styles.albumHeader}>
          <div className={styles.albumName}>{album.albumName}</div>
          <div className={styles.artistName}>{album.artistName}</div>
        </div>
        <div className={styles.purchaseInfo}>
          <div className={styles.amount}>
            <AmountInput
              amount={amount}
              increment={handleIncrement}
              decrement={handleDecrement}
            />
            <button
              className={styles.removeButton}
              onClick={handleRemoveFromCart}
            >
              <Trash2 />
            </button>
          </div>
          <div className={styles.albumPrice}>${album.price * amount}</div>
        </div>
      </div>
    </div>
  );
}

function CartPage() {
  const { setCartSize } = useOutletContext<{
    setCartSize: (size: number) => void;
  }>();
  const [cart, setCart] = useState(getCart());
  const [totalPrice, setTotalPrice] = useState(getTotalPrice());

  function updateCartUI() {
    setCart(getCart());
    setTotalPrice(getTotalPrice());
    setCartSize(getCartSize());
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.cartPage}
    >
      <div className={styles.cartDisplay}>
        {Array.from(cart).map(([key, album]) => (
          <Album
            key={key}
            albumId={album.albumId}
            updateCartUI={updateCartUI}
          ></Album>
        ))}
      </div>
      <BottomNav>
        <div className={styles.navContainer}>
          <p className={styles.total}>TOTAL</p>
          <p className={styles.totalPrice}>${totalPrice}</p>
          <RoundedButton
            text={"CHECKOUT"}
            onClick={() => {
              alert("Purchase Complete!");
            }}
          />
        </div>
      </BottomNav>
    </motion.div>
  );
}

export default CartPage;

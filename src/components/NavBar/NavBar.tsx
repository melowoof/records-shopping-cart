import styles from "./NavBar.module.css";
import { NavLink } from "react-router";
// import useCart from "../../utils/CartContext";

interface NavBarProps {
  cartSize: number;
}

function NavBar({ cartSize }: NavBarProps) {
  return (
    <div className={styles.navBar}>
      <div className={styles.navBg}></div>
      <div className={`${styles.nav} ${styles.navLeft}`}>
        <NavLink
          className={({ isActive }) =>
            `${styles.navLink} ${isActive && styles.selected}`
          }
          to={"/"}
        >
          <p>HOME</p>
        </NavLink>
        {/* <NavLink
          className={({ isActive }) =>
            `${styles.navLink} ${isActive && styles.selected}`
          }
          to={"/about"}
        >
          <p>ABOUT</p>
        </NavLink> */}
        <NavLink
          className={({ isActive }) =>
            `${styles.navLink} ${isActive && styles.selected}`
          }
          to={"/store"}
        >
          <p>STORE</p>
        </NavLink>
      </div>
      <div className={`${styles.nav} ${styles.navRight}`}>
        {" "}
        <NavLink
          className={({ isActive }) =>
            `${styles.navLink} ${isActive && styles.selected}`
          }
          to={"/cart"}
        >
          <p>CART ({cartSize})</p>
        </NavLink>
      </div>
    </div>
  );
}

export default NavBar;

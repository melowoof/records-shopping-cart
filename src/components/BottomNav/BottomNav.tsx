import styles from "./BottomNav.module.css";

interface BottomNavProps {
  children?: React.ReactNode;
}

export default function BottomNav({ children }: BottomNavProps) {
  return (
    <div className={styles.bottomNav}>
      <div className={styles.navBg} />
      {children}
    </div>
  );
}

import React from "react";
import styles from "./RoundedButton.module.css";

interface RoundedButtonProps {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function RoundedButton({ text, onClick }: RoundedButtonProps) {
  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
}

export default RoundedButton;

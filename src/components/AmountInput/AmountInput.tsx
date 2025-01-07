import styles from "./AmountInput.module.css";
import { Minus, Plus } from "lucide-react";

interface AmountInputProps {
  amount: number;
  increment: React.MouseEventHandler<HTMLButtonElement>;
  decrement: React.MouseEventHandler<HTMLButtonElement>;
}

function AmountInput({ amount = 1, decrement, increment }: AmountInputProps) {
  return (
    <div className={styles.button}>
      <button className={styles.decrement} onClick={decrement}>
        <Minus />
      </button>
      <p className={styles.amountField}>{amount}</p>
      <button className={styles.increment} onClick={increment}>
        <Plus />
      </button>
    </div>
  );
}

export default AmountInput;

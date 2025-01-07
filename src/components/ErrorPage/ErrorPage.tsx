import { useRouteError } from "react-router";
import styles from "./ErrorPage.module.css";

interface RouteError {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  console.log(error);

  return (
    <div className={styles.errorPage}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i className={styles.errorMessage}>
          {error.statusText || error.message}
        </i>
      </p>
    </div>
  );
}

import styles from "./AlbumCard.module.css";
import { Link } from "react-router";

interface AlbumCardProps {
  albumArt: string;
  price: number;
  albumName: string;
  artistName: string;
  onClick: () => void;
  albumId: string;
  isLoading: boolean;
}

function AlbumCard({
  albumArt,
  price,
  albumName,
  artistName,
  onClick,
  albumId,
  isLoading,
}: AlbumCardProps) {
  return (
    <div className={styles.albumCard} onClick={onClick}>
      <Link to={`/store/${albumId}`}>
        <div className={styles.albumContainer}>
          <div className={styles.priceTag}>${price}</div>
          <img
            className={
              isLoading ? `${styles.albumArt} loading` : `${styles.albumArt}`
            }
            src={albumArt}
            alt={albumName}
          />
        </div>
      </Link>
      <div className={styles.albumInfo}>
        <div className={styles.albumName}>{albumName}</div>
        <div className={styles.artistName}>{artistName}</div>
      </div>
    </div>
  );
}

export default AlbumCard;

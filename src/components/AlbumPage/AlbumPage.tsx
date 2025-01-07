import styles from "./AlbumPage.module.css";
import RoundedButton from "../RoundedButton/RoundedButton";
import { useFetchAlbumTracks } from "../../utils/api";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { Link, useOutletContext } from "react-router";
import paper from "../../assets/images/paper.jpg";
import AmountInput from "../AmountInput/AmountInput";
import { useState } from "react";
import { AlbumPageContext, Track, AlbumObject } from "../../utils/interfaces";

interface TrackProps {
  trackNumber: number;
  trackTitle: string;
  duration: number | string;
}

function TrackElement({ trackNumber, trackTitle, duration }: TrackProps) {
  return (
    <div className={styles.track}>
      <div className={styles.trackNumber}>{trackNumber}</div>
      <div className={styles.trackTitle}>{trackTitle}</div>
      <div className={styles.duration}>{duration}</div>
    </div>
  );
}

function AlbumPage() {
  const context = useOutletContext<AlbumPageContext>();
  const { selectedAlbum, closePopup, handleAddToCart } = context;
  const { data: tracksArray } = useFetchAlbumTracks(selectedAlbum.albumId);

  const [amount, setAmount] = useState(1);
  const [showCartNotification, setShowCartNotification] = useState(false);

  function addToCart(album: AlbumObject, albumId: string, amount: number) {
    handleAddToCart(album, albumId, amount);
    setAmount(1);
    setShowCartNotification(true);
    setTimeout(() => {
      setShowCartNotification(false);
    }, 2000);
  }

  function handleIncrement() {
    setAmount((x) => x + 1);
  }

  function handleDecrement() {
    if (amount <= 1) {
      setAmount(1);
    } else {
      setAmount((x) => x - 1);
    }
  }

  function getAlbumLength(tracksArray: Track[]) {
    const length = tracksArray?.reduce((totalLength: number, track) => {
      totalLength += track.trackDurationMs;
      return totalLength;
    }, 0);
    return getDurationFromMs(length);
  }

  function getDurationFromMs(duration_ms: number) {
    const minutes = Math.floor(duration_ms / 60000);
    const seconds = Math.floor((duration_ms % 60000) / 1000);
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return { minutes, formattedSeconds };
  }

  if (!tracksArray) return null;

  return (
    <div className={styles.albumPage}>
      <motion.div
        className={styles.container}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: { duration: 0.25, type: "spring" },
        }}
      >
        <img src={paper} className={styles.containerBg} />
        <div className={styles.leftSide}>
          <motion.img
            initial={{ filter: "blur(10px)" }}
            animate={{ filter: "blur(0)", transition: { duration: 0.2 } }}
            className={styles.albumArt}
            src={selectedAlbum.albumArtLarge}
            alt={selectedAlbum.albumName}
            draggable={false}
          />
        </div>
        <div className={styles.rightSide}>
          <div className={styles.topBar}>
            <div className={styles.albumHeader}>
              <div className={styles.albumName}>{selectedAlbum.albumName}</div>
              <div className={styles.artistName}>
                {selectedAlbum.artistName}
              </div>
            </div>
            <Link className={styles.closeButton} onClick={closePopup} to={".."}>
              <motion.div whileHover={{ scale: 1.2 }}>
                <X size={48} color="#000000" strokeWidth={1.25} />
              </motion.div>
            </Link>
          </div>
          <div className={styles.trackList}>
            {tracksArray?.map((track) => (
              <TrackElement
                key={track.trackId}
                trackNumber={track.trackNumber}
                trackTitle={track.trackName}
                duration={`${
                  getDurationFromMs(track.trackDurationMs).minutes
                }:${getDurationFromMs(track.trackDurationMs).formattedSeconds}`}
              />
            ))}
          </div>
          <div className={styles.buttonsContainer}>
            <AmountInput
              amount={amount}
              decrement={handleDecrement}
              increment={handleIncrement}
            />
            <div className={styles.cartButtonContainer}>
              <AnimatePresence>
                {showCartNotification && (
                  <motion.div
                    initial={{ y: 0, x: "-50%", opacity: 0 }}
                    animate={{ y: "-150%", opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={styles.notificationPopup}
                  >
                    Added to cart!
                  </motion.div>
                )}
              </AnimatePresence>
              <RoundedButton
                text={"ADD TO CART"}
                onClick={() => {
                  addToCart(selectedAlbum, selectedAlbum.albumId, amount);
                }}
              />
            </div>
          </div>
          <div className={styles.albumInfo}>
            <div className={styles.releaseDate}>
              {selectedAlbum.releaseDate}
            </div>
            <div className={styles.tracksInfo}>
              <div className={styles.totalTracks}>
                {`${tracksArray?.length} `}
                {tracksArray?.length > 1 ? "tracks" : "track"},
              </div>
              <div className={styles.albumLength}>
                {`${getAlbumLength(tracksArray).minutes} `}
                {getAlbumLength(tracksArray).minutes > 1 ? "minutes" : "minute"}
              </div>
            </div>
            {/* <div className={styles.copyrights}>{selectedAlbum.copyrights}</div> */}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default AlbumPage;

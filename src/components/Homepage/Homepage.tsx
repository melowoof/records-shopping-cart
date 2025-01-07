import styles from "./Homepage.module.css";
import records from "../../assets/images/RECORDS.png";
// import { useFetchNewReleases } from "../../utils/api";
import { motion } from "motion/react";

function Homepage() {
  // const { data, isLoading } = useFetchNewReleases(4, 0);
  // const albumsArray = data?.albums.items;

  // if (isLoading) return <div>Loading...</div>;

  return (
    <div id={styles.homepage}>
      <div className={styles.leftSide}>
        <div className={styles.radialBlur}></div>
        <motion.img
          className={styles.logo}
          src={records}
          draggable={false}
          initial={{ filter: "blur(10px)" }}
          animate={{
            filter: "blur(0)",
            opacity: 1,
          }}
          transition={{
            filter: {
              duration: 0.9,
              // repeat: Infinity,
            },
            opacity: { duration: 0.15 },
          }}
        />
      </div>
      <div className={styles.rightSide}>
        {/* {albumsArray?.map((album) => {
          return (
            <img
              className={styles.albumArt}
              src={album.images[0].url}
              alt={album.name}
              key={album.id}
            />
          );
        })} */}
        <motion.p
          initial={{ filter: "blur(10px)", opacity: 0 }}
          animate={{
            filter: "blur(0)",
            opacity: 1,
          }}
          transition={{
            filter: { duration: 0.2 },
            opacity: { duration: 0.3 },
          }}
          className={styles.fluffText}
        >
          PART OF THE ODIN PROJECT CURRICULUM. NOT AFFILIATED WITH SPOTIFY® IN
          ANY TANGIBLE WAY OR WHATSOEVER. ALSO USES THE SPOTIFY® API.
        </motion.p>
      </div>
    </div>
  );
}

export default Homepage;

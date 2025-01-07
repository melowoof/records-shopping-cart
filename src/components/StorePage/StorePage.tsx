import { useFetchNewReleases } from "../../utils/api";
import styles from "./StorePage.module.css";
import AlbumCard from "../AlbumCard/AlbumCard";
import { useEffect, useState } from "react";
import { useParams, Outlet, useOutletContext } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import BottomNav from "../BottomNav/BottomNav";
import { AlbumObject } from "../../utils/interfaces";

interface PageNavProps {
  handlePrevPage: () => void;
  handleNextPage: () => void;
}

function PageNav({ handlePrevPage, handleNextPage }: PageNavProps) {
  return (
    <div className={styles.navLinkContainer}>
      <button className={styles.prevPage} onClick={handlePrevPage}>
        <ArrowLeft size={45} />
      </button>
      <button className={styles.nextPage} onClick={handleNextPage}>
        <ArrowRight size={45} />
      </button>
    </div>
  );
}

interface AlbumsDisplayProps {
  setSelectedAlbum: (album: AlbumObject) => void;
  setIsPopupOpen: (isOpen: boolean) => void;
  page: number;
}

function AlbumsDisplay({
  setSelectedAlbum,
  setIsPopupOpen,
  page,
}: AlbumsDisplayProps) {
  const albumsLimit = 40;
  const offset = (page - 1) * albumsLimit;
  const { data: albumsArray, isLoading } = useFetchNewReleases(
    albumsLimit,
    offset
  );

  if (isLoading) return null;

  return (
    <>
      {albumsArray?.map((album) => (
        <motion.div key={album.albumId}>
          <AlbumCard
            albumArt={album.albumArtMed}
            price={8.99}
            albumName={album.albumName}
            artistName={album.artistName}
            key={album.albumId}
            albumId={album.albumId}
            onClick={() => {
              setSelectedAlbum(album);
              setIsPopupOpen(true);
            }}
            isLoading={true}
          />
        </motion.div>
      ))}
    </>
  );
}

function StorePage() {
  const { albumId } = useParams<{ albumId: string }>();
  const { handleAddToCart } = useOutletContext<{
    handleAddToCart: (
      itemObject: AlbumObject,
      itemId: string,
      amount: number
    ) => void;
  }>();

  const [selectedAlbum, setSelectedAlbum] = useState<AlbumObject | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    document.body.style.overflow = isPopupOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isPopupOpen]);

  useEffect(() => {
    if (!albumId) {
      setIsPopupOpen(false);
      setSelectedAlbum(null);
    }
  }, [albumId]);

  function closePopup() {
    setIsPopupOpen(false);
    setSelectedAlbum(null);
  }

  function handleNextPage() {
    if (page >= 3) {
      setPage(3);
    } else {
      setPage((x) => x + 1);
    }
  }

  function handlePrevPage() {
    if (page <= 1) {
      setPage(1);
    } else {
      setPage((x) => x - 1);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.storepage}
    >
      <PageNav
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />
      <BottomNav />
      {isPopupOpen && selectedAlbum && albumId === selectedAlbum.albumId && (
        <motion.div className={styles.popup}>
          <motion.div
            key={selectedAlbum.albumId}
            initial={{
              filter: "blur(20px)",
            }}
            animate={{
              opacity: 1,
              filter: "blur(0)",
              transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
            }}
            exit={{
              filter: "blur(40px)",
              opacity: 0,
              scale: 0.9,
              transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
            }}
          >
            <Outlet
              key={selectedAlbum.albumId}
              context={{
                selectedAlbum: selectedAlbum,
                closePopup: closePopup,
                handleAddToCart: handleAddToCart,
              }}
            />
          </motion.div>
        </motion.div>
      )}
      <div className={styles.albumsDisplay}>
        <AlbumsDisplay
          key={page}
          setSelectedAlbum={setSelectedAlbum}
          setIsPopupOpen={setIsPopupOpen}
          page={page}
        />
      </div>
    </motion.div>
  );
}

export default StorePage;

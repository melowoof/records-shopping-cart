export interface AlbumPageContext {
  selectedAlbum: AlbumObject;
  closePopup: () => void;
  handleAddToCart: (
    itemObject: AlbumObject,
    itemId: string,
    amount: number
  ) => void;
}

export interface AlbumObject {
  albumName: string;
  albumType: string;
  totalTracks: number;
  albumId: string;
  albumArtMed: string;
  albumArtLarge: string;
  releaseDate: string;
  artistName: string;
  artistId: string;
  price: number;
}

export interface DetailedAlbumObject {
  albumName: string;
  albumId: string;
  artistName: string;
  releaseDate: string;
  albumArt: string;
  trackList: Track[];
  copyrights: string;
  price: number;
}

export interface Track {
  artistName: string;
  trackDurationMs: number;
  isExplicit: boolean;
  isPlayable: boolean;
  trackId: string;
  trackName: string;
  trackNumber: number;
}

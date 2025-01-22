import { useQuery } from "@tanstack/react-query";
import { AlbumObject, Track } from "./interfaces";
import { AlbumJsonType } from "./albumJsonType";
import { NewReleasesType } from "./newReleasesType";
import { AlbumTracksType } from "./albumTracksType";

function toAlbumObject(json: AlbumJsonType) {
  const albumObject = {
    albumName: json.name,
    albumId: json.id,
    artistName: json.artists[0].name,
    releaseDate: json.release_date,
    albumArt: json.images[0].url,
    trackList: json.tracks.items,
    copyrights: json.copyrights[0].text,
    price: 8.99,
  };
  return albumObject;
}

function toAlbumsArray(json: NewReleasesType) {
  const items = json.albums.items;
  const albumsArray: AlbumObject[] = [];
  items.forEach((album) => {
    const albumObject: AlbumObject = {
      albumName: album.name,
      albumType: album.album_type,
      totalTracks: album.total_tracks,
      albumId: album.id,
      albumArtMed: album.images[0].url,
      albumArtLarge: album.images[2].url,
      releaseDate: album.release_date,
      artistName: album.artists[0].name,
      artistId: album.artists[0].id,
      price: 8.99,
    };
    albumsArray.push(albumObject);
  });
  return albumsArray;
}

function useAccessToken() {
  const url = "https://accounts.spotify.com/api/token";
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Missing client ID or client secret");
  }

  return useQuery({
    queryKey: ["accessToken"],
    queryFn: async () => {
      const response = await fetch(url, {
        method: "POST",
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: clientId,
          client_secret: clientSecret,
        }),
      });
      const json = await response.json();
      return json;
    },
    staleTime: 3600 * 1000,
  });
}

export function useFetchNewReleases(limit: number, offset: number) {
  const url = `https://api.spotify.com/v1/browse/new-releases?limit=${limit}&offset=${offset}`;
  const { data: tokenData, isLoading: isLoadingToken } = useAccessToken();
  const accessToken = tokenData?.access_token;

  return useQuery({
    queryKey: ["newReleases"],
    queryFn: async ({ signal }) => {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        signal,
      });
      const json = await response.json();
      const albumsArray = toAlbumsArray(json);

      return albumsArray;
    },
    enabled: !!accessToken && !isLoadingToken,
  });
}

export function useFetchAlbum(albumId: string) {
  const url = `https://api.spotify.com/v1/albums/${albumId}`;
  const { data: tokenData, isLoading: isLoadingToken } = useAccessToken();
  const accessToken = tokenData?.access_token;

  return useQuery({
    queryKey: ["album"],
    queryFn: async ({ signal }) => {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        signal,
      });
      const json = await response.json();
      const album = toAlbumObject(json);
      return album;
    },
    enabled: !!albumId && !!accessToken && !isLoadingToken,
  });
}

function toTracksArray(json: AlbumTracksType) {
  const items = json.items;
  const tracksArray: Track[] = [];
  items.forEach((track) => {
    const trackObject = {
      artistName: track.artists[0].name,
      trackDurationMs: track.duration_ms,
      isExplicit: track.explicit,
      isPlayable: track.is_playable,
      trackId: track.id,
      trackName: track.name,
      trackNumber: track.track_number,
    };
    tracksArray.push(trackObject);
  });
  return tracksArray;
}

export function useFetchAlbumTracks(albumId: string) {
  const url = `https://api.spotify.com/v1/albums/${albumId}/tracks`;
  const { data: tokenData, isLoading: isLoadingToken } = useAccessToken();
  const accessToken = tokenData?.access_token;

  return useQuery({
    queryKey: ["album"],
    queryFn: async ({ signal }) => {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        signal,
      });
      const json = await response.json();
      const tracksArray = toTracksArray(json);
      return tracksArray;
    },
    enabled: !!albumId && !!accessToken && !isLoadingToken,
  });
}

export function useFetchPokemon() {
  return useQuery({
    queryKey: ["gif"],
    queryFn: async () => {
      //   await new Promise((resolve) => setTimeout(resolve, 5000));
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/charizard"
      );
      const json = await response.json();
      return json.sprites.other.home.front_default;
    },
  });
}

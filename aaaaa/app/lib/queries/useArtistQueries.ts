// lib/queries/useArtistQueries.ts
import { Artist, Track } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetchWithAuth = async (url: string, token: string | undefined) => {
  const response = await fetch(url, {
    headers: {
      method: "GET", 
    },
  });
  if (!response.ok) throw new Error("Failed to fetch: " + url);
  return response.json();
};

export const useArtistData = (id: string | string[] | undefined, token: string | undefined) => {
  const artistId = Array.isArray(id) ? id[0] : id;
  return useQuery<Artist>({
    queryKey: ["artist", artistId],
    queryFn: () => fetchWithAuth(`http://localhost:5000/get-artist?${encodeURIComponent(artistId ?? "")}`, token),
    enabled: !!id  
  });
};

export const useTopTracks = (id: string | string[] | undefined, token: string | undefined) => {
  const artistId = Array.isArray(id) ? id[0] : id;
  return useQuery<Track[]>({
    queryKey: ["topTracks", artistId],
    queryFn: () => fetchWithAuth(`http://localhost:5000/get-artist-topsong?${encodeURIComponent(artistId ?? "")}`, token),
    enabled: !!id  
  });
};

export const useAlbums = (id: string | string[] | undefined, token: string | undefined) => {
  const artistId = Array.isArray(id) ? id[0] : id;
  return useQuery({
    queryKey: ["albums", artistId],
    queryFn: () => fetchWithAuth(`https://api.spotify.com/v1/artists/${encodeURIComponent(artistId ?? "")}/albums?include_groups=album`, token),
    enabled: !!id && !!token,
  });
};

export const useRelatedArtists = (id: string | string[] | undefined, token: string | undefined) => {
  const artistId = Array.isArray(id) ? id[0] : id;
  return useQuery({
    queryKey: ["relatedArtists", artistId],
    queryFn: async () => {
      const data = await fetchWithAuth(`https://api.spotify.com/v1/artists/${encodeURIComponent(artistId ?? "")}/related-artists`, token);
      if (data.artists?.length <= 5) throw new Error("Too few related artists");
      return data;
    },
    enabled: !!id && !!token,
  });
};

export type Track = {
  id: string;
  name: string;
  preview_url?: string | null;
  album: Album;
  songArtists: songArtists[];
};
export type songArtists = {
  id: string;
  songId: string; 
  artistId: string;
  artist: Artist ;
}; 
export type albumArtists = {
  id: string;
  albumId: string; 
  artistId: string;
  artist: Artist ;
  album: Album;
};  
export type Album = {
  id: string;
  name: string;
  coverUrl:string;
};
export type Artist = {
  id: string;
  name: string;
  coverUrl?: string ;
  topTrack?: Track[]; 
  songArtists?: songArtists[];  
  albumArtists?: albumArtists[];
};

export type Image = {
  url: string;
  height?: number;
  width?: number;
};

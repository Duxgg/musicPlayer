import { PropsWithChildren, createContext, useState, useContext, useEffect } from 'react';
 import { Sound } from 'expo-av/build/Audio';
import { AVPlaybackStatus, Audio } from 'expo-av';
import { Track } from '@/types';
 

type PlayerContextType = {
  track?: any;
  setTrack: (track: Track) => void;
  show?: boolean;
  setShow:(show:boolean)  => void; 
  sound?: Audio.Sound;
  setSound:(sound:Sound) => void;
  isPlaying?:boolean 
  setIsPlaying:(isPlaying:boolean) => void;
  isLoaded?:boolean  
  setisLoaded:(isLoaded:boolean) => void;
  token?:string
  setToken:(token:string)  => void; 
  onPauseResume:() => void; 
  pushTrack: (track: Track) => void;
  popTrack: () => void; 
  trackStack?:Track[] 
};

const PlayerContext = createContext<PlayerContextType>({
  setShow: () => {}, setTrack: () => {}, setSound: () => {},setIsPlaying: () => {}, setisLoaded: () => {}, setToken: () => {}, onPauseResume: () => {}, pushTrack: () => {}, popTrack: () => {},
});

async function getSpotifyToken() {
  const clientId = '40ebf1404cdb49eda511de531b81e31f'; // Replace with client ID
  const clientSecret = '00f5dad4e1b442e6b421095a8249cda7'; // Replace with client secret

  const url = "https://accounts.spotify.com/api/token";
  const body = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret
  });

  const response = await fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: body.toString()
  });

  if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;  
}
 
export default function PlayerProvider({ children }: PropsWithChildren) {
  const [track, setTrack] = useState<any>();
  const [color , setColors] = useState<string>() ; 
  const [sound, setSound] = useState<Audio.Sound>(); 
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setisLoaded] = useState(false);  
  const [show, setShow] = useState(true);  
  const [token,setToken]  = useState<string>();  
  const [trackStack, setTrackStack] = useState<Track[]>([]);
   
  const pushTrack = (newTrack: Track) => {
    setTrackStack(prevStack => [ newTrack,...prevStack ]); 
  };
  console.log(trackStack)
  const popTrack = () => { 
    if(trackStack.length<1) return
    setTrackStack(prevStack => prevStack.slice(1));
    const newTopTrack = trackStack[0]; // Get the next top track
    setTrack(newTopTrack);
  };  
  useEffect(() => { 
    getSpotifyToken()
    .then(data => {
        setToken(data.access_token)
  
    })
    .catch(err => {
        console.error('Error fetching token:', err);
    });  
  }, []);
  const onPLay = async () => {
    if (sound) await sound.unloadAsync();

    if (track?.preview_url) {
      const { sound: newSound } = await Audio.Sound.createAsync({
        uri: track.preview_url,
      });
      setSound(newSound);
      newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      await newSound.playAsync();
    }
  };
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [isLoaded, setisLoaded] = useState(false);
  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    setisLoaded(status.isLoaded);
    if (!status.isLoaded) {
      return;
    }
    setIsPlaying(status.isPlaying);
    if(status.didJustFinish){ popTrack() }
  };
  const onPauseResume = async () => {
    if (!isLoaded) {
      return;
    }
    if (isPlaying) {
      await sound?.pauseAsync();
    } else {
      await sound?.playAsync();
    }
  };
  useEffect(() => {
    onPLay();
  }, [track]);
  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]); 
  return (
    
    <PlayerContext.Provider value={{ track, setTrack,show,setShow,sound,setSound,isPlaying,setIsPlaying,isLoaded,setisLoaded,token,setToken ,onPauseResume,pushTrack, popTrack,trackStack}}>
      {children}
    </PlayerContext.Provider>
  );
  
}

export const usePlayerContext = () => useContext(PlayerContext);
import { Text, View, StyleSheet, Image, Pressable, TouchableHighlight } from 'react-native';
import { Track } from '../types';
import { usePlayerContext } from '@/providers/PlayerProvider';
 
import { useState } from 'react';
import Colors from '@/constants/Colors';
import { router } from 'expo-router';
 
const goToAlbum = (id:string) => { 
};

const goToArtist = (id:string) => { 
  router.push({
          pathname: "/two",
          params: { id: id}  
        }) 
}; 
 
export default function TrackListItem({ track2 }:any ) {
   const { setTrack, track} = usePlayerContext();
 
 
  return (  
    <TouchableHighlight onPress={() => {track2.album
    ? setTrack(track2)
    : track2.topSongIds
    ? goToArtist(track2.id)
    : goToAlbum(track2.id) }}  >
       <View style={styles.container}> 
      <Image
        source={{ uri: track2.album
    ? track2.album.coverUrl
    : track2.topSongIds
    ? track2.coverUrl
    : track2.coverUrl }}
   style={
  track2.album
    ? styles.imageTrack
    : track2.topSongIds
    ? styles.imageAlbum
    : styles.imageTrack
}
      />
      <View>
        <Text style={[styles.title,{color: track2.id===track?.id?'#1DB954':'white' ,fontWeight: track2.id===track?.id?700:500}]}>{track2.name}</Text>
        <Text style={styles.subtitle}>{ track2.album?`Song • ${track2.songArtists[0].artist.name}`:track2.topSongIds? `Artist`:`Album • ${track2.albumArtists[0].artist.name}`}</Text>
      </View>
      </View> 
    </TouchableHighlight>
  );
}

export function TrackListItem2({ track2 }:any ) {
  const { setTrack, track,token} = usePlayerContext();
   var isActive= false 
   if(track === undefined) isActive= false 
    else isActive = track2.id===track.id

 return (  
   <TouchableHighlight onPress={() => { fetchTrack(track2.id,token,setTrack)}}  >
      <View style={styles.container}>  
     <View>
       <Text style={[styles.title,{color: isActive?'red':'white' ,fontWeight:isActive?700:500}]}>{track2.name}</Text>
       <Text style={styles.subtitle}>{track2.artists[0].name}</Text>
     </View>
     </View> 
   </TouchableHighlight>
 );
} 
async function fetchTrack(Id:any,token:any,setTrack:any) {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/tracks/${encodeURIComponent(
        Id
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data  = await response.json(); 
      setTrack(data)
    }
  } catch (error) {
    console.error("Error fetching artist data:", error);
  } 
} 
const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },

  title: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  subtitle: {
    color: 'gray',
  },
  imageTrack: {
    width: 45,
    aspectRatio: 1, 
    marginRight: 10,
  },
  imageAlbum: {
    width: 45,
    aspectRatio: 1, 
    marginRight: 10,
    borderRadius:90
  }, 
});
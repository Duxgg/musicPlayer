import { Text, View, StyleSheet, Image, Pressable, TouchableHighlight } from 'react-native';
import { Track } from '../types';
import { usePlayerContext } from '@/providers/PlayerProvider';
 
import { useState } from 'react';
import Colors from '@/constants/Colors';
 
  
export default function TrackListItem({ track2 }:any ) {
   const { setTrack, track} = usePlayerContext();
    var isActive= false 
    if(track === undefined) isActive= false 
     else isActive = track2.id===track.id
 
  return (  
    <TouchableHighlight onPress={() => {setTrack(track2) }}  >
       <View style={styles.container}> 
      <Image
        source={{ uri: track2.album.images[0]?.url }}
        style={styles.image}
      />
      <View>
        <Text style={[styles.title,{color: isActive?'red':'white' ,fontWeight:isActive?700:500}]}>{track2.name}</Text>
        <Text style={styles.subtitle}>{track2.artists[0].name}</Text>
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
  image: {
    width: 45,
    aspectRatio: 1, 
    marginRight: 10,
  },
});
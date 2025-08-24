import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; 

import { usePlayerContext } from "@/providers/PlayerProvider";
import ImageColors from 'react-native-image-colors'; 
import { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { Sound } from "expo-av/build/Audio";
// import { useExtractColor } from "react-extract-colors";
// import { getColors } from "react-native-image-colors";

const Player = () => {
  const {
    track,
    onPauseResume,
    isPlaying,
    setColor,
    color   
  } = usePlayerContext();
      
  useEffect(() => {
    const imageUrl = track?.album.coverUrl ?? 'https://static.thenounproject.com/png/1269202-200.png';
 
    const fetchColors = async () => {
      const result = await ImageColors.getColors(imageUrl, {
        fallback: '#000000',
        cache: true, 
      });
       
      if (result.platform === 'android') {
        setColor(result.darkVibrant || '#000');
      } else if (result.platform === 'ios') {
        setColor(result.background || '#000');
      } else if (result.platform === 'web') {
        setColor(result.darkVibrant || '#000'); // or result.vibrant / lightVibrant if supported
      } else {
        setColor('#000'); // fallback for undefined
      } 

      console.log
    };
 
    fetchColors();
  }, [track]); 
  if (!track) {
    return null;
  }

  const image = track.album.coverUrl;
  return (
    <Pressable style={styles.container}>
      {({ pressed }) => (
        <View
          style={{
            backgroundColor: color,
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 7,
            padding: 3,
            paddingRight: 15,
          }}
        >
          {image && <Image source={{ uri: image  }} style={styles.image} />}

          <Pressable
            onPress={() => [router.push("/modal")]}
            style={{ flex: 1 }}
          >
            <Text style={styles.title}>{track.name}</Text>
            <Text style={styles.subtitle}>
              {track.songArtists[0]?.artist.name}  
            </Text>
          </Pressable>

          <Ionicons
            name={"heart-outline"}
            size={20}
            color={"white"}
            style={{ marginHorizontal: 10 }}
          />
          <Ionicons
            onPress={() => onPauseResume()}
            name={isPlaying ? "pause" : "play"}
            size={22}
            color={track?.preview_url ? "white" : "gray"}
          />
        </View>
      )}
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: -155,
    width: "100%",
    height: 70,
    paddingHorizontal: 8,
  },
  player: {
    backgroundColor: "#286660",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 7,
    padding: 3,
    paddingRight: 15,
  },
  title: {
    color: "white",
  },
  subtitle: {
    color: "lightgray",
    fontSize: 12,
  },
  image: {
    marginLeft: 5,
    height: "90%",
    aspectRatio: 1,
    marginRight: 10,
    borderRadius: 5,
  },
});

export default Player;

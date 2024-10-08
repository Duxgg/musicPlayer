import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { tracks } from "../assets/data/tracks";

import { usePlayerContext } from "@/providers/PlayerProvider";
import { AVPlaybackStatus, Audio } from "expo-av";
import { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { Sound } from "expo-av/build/Audio";
// import { useExtractColor } from "react-extract-colors";
// import { getColors } from "react-native-image-colors";

const Player = () => {
  const {
    track,
    sound,
    setSound,
    isLoaded,
    isPlaying,
    setIsPlaying,
    setisLoaded,
  } = usePlayerContext();
  // const    [ sound, setSound ]= useState<Audio.Sound>();

  // const { colors, dominantColor, darkerColor, lighterColor, loading, error } =
  //   useExtractColor(track?.album.images[0].url, {
  //     maxColors: 10,
  //     format: "rgb",
  //     maxSize: 1,
  //   });

  // console.log(dominantColor);
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
  if (!track) {
    return null;
  }

  const image = track.album.images?.[0];
  return (
    <Pressable style={styles.container}>
      {({ pressed }) => (
        <View
          style={{
            backgroundColor: "pink",
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 7,
            padding: 3,
            paddingRight: 15,
          }}
        >
          {image && <Image source={{ uri: image.url }} style={styles.image} />}

          <Pressable
            onPress={() => [router.navigate("/modal")]}
            style={{ flex: 1 }}
          >
            <Text style={styles.title}>{track.name}</Text>
            <Text style={styles.subtitle}>
              {track.artists[0]?.name} {track.artists[1]?.name}{" "}
              {track.artists[2]?.name} {track.artists[3]?.name}
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
    top: -120,
    width: "100%",
    height: 75,
    padding: 8,
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

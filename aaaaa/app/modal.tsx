import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import EditScreenInfo from "@/components/EditScreenInfo";
// import { getColors } from "react-native-image-colors";

import { Track } from "@/types";
import { usePlayerContext } from "@/providers/PlayerProvider";
// import { useExtractColor } from "react-extract-colors";
import {
  Entypo,
  Feather,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { BlurView } from "expo-blur";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Sound } from "expo-av/build/Audio";
import Player from "@/components/musicPlayer";

type TrackListItemProps = {
  track: Track;
};

export default function TabTwoScreen() {
  const {
    setShow,
    track,
    isLoaded,
    isPlaying,
    setIsPlaying,
    setisLoaded,
    sound,
  } = usePlayerContext();
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
  if (!track) {
    return null;
  }
  const image = track.album.images?.[0];

  // const { colors, dominantColor, darkerColor, lighterColor, loading, error } =
  //   useExtractColor(image.url, { maxColors: 10, format: "rgb", maxSize: 1 });
  const [show, setShow2] = useState(false);
  const [artist, setArtist] = useState(false);
 
  return (
    <LinearGradient
      colors={["pink", "#000000"]}
      style={[
        {
          height: "125%",
        },
        StyleSheet.absoluteFill,
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          marginTop: 15,
          marginBottom: 30,
          justifyContent: "space-between",
          paddingHorizontal: "5%",
        }}
      >
        <Pressable onPress={() => [router.back()]}>
          <Ionicons name={"chevron-down"} size={20} color={"white"} />
        </Pressable>

        <Text style={styles.album}>{track.album.name}</Text>
        <Pressable onPress={() => setShow2(true)}>
          <Ionicons name={"ellipsis-horizontal"} size={20} color={"white"} />
        </Pressable>
      </View>
      <Image
        source={{ uri: track.album.images[0]?.url }}
        style={styles.image}
      />
      <View style={{}}>
        <Text style={styles.title}>{track.name}</Text>
        <Text style={styles.subtitle}>{track.artists[0].name}</Text>
      </View>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          marginTop: 15,
          marginBottom: 30,
          justifyContent: "space-between",
          paddingHorizontal: "5%",
        }}
      >
        <Pressable onPress={() => router.back()}>
          <FontAwesome6 name={"shuffle"} size={20} color={"white"} />
        </Pressable>

        <Pressable onPress={() => sound?.setPositionAsync(0)}>
          <Ionicons name={"play-skip-back-sharp"} size={35} color={"white"} />
        </Pressable>

        <Pressable onPress={() => onPauseResume()}>
          <Ionicons
            name={isPlaying ? "pause-circle" : "play-circle"}
            size={80}
            color={"white"}
          />
        </Pressable>

        <Pressable onPress={() => router.back()}>
          <Ionicons
            name={"play-skip-forward-sharp"}
            size={35}
            color={"white"}
          />
        </Pressable>

        <Pressable onPress={() => setShow2(true)}>
          <Ionicons name={"ellipsis-horizontal"} size={20} color={"white"} />
        </Pressable>
      </View>
      {show ? (
        <BlurView
          experimentalBlurMethod="dimezisBlurView"
          intensity={70}
          tint="dark"
          style={[
            {
              flex: 1,
            },
            StyleSheet.absoluteFill,
          ]}
        >
          <Image
            source={{ uri: track.album.images[0]?.url }}
            style={[
              styles.image,
              { width: "50%", marginTop: 15, borderRadius: 0 },
            ]}
          />
          <Text style={[styles.title, { alignSelf: "center" }]}>
            {track?.name}
          </Text>
          <Text style={[styles.subtitle, { alignSelf: "center" }]}>
            {track?.artists[0].name} • {track?.album.name}
          </Text>

          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              marginBottom: 30,
              justifyContent: "flex-start",
              paddingHorizontal: "5%",
            }}
          >
            <Pressable onPress={() => setShow2(false)}>
              <Ionicons name={"add-circle-outline"} size={20} color={"white"} />
            </Pressable>
            <Text style={[styles.album, { marginLeft: 15 }]}>
              Add to playlist
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              marginBottom: 30,
              justifyContent: "flex-start",
              paddingHorizontal: "5%",
            }}
          >
            <Pressable
              onPress={() => [setShow2(false), router.navigate("/two") ]}
            >
              <Feather name={"disc"} size={18} color={"white"} />
            </Pressable>
            <Text style={[styles.album, { marginLeft: 15 }]}>View album</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              marginBottom: 30,
              justifyContent: "flex-start",
              paddingHorizontal: "5%",
            }}
          >
            <Pressable onPress={() => setShow2(false)}>
              <Ionicons
                name={"musical-note-outline"}
                size={20}
                color={"white"}
              />
            </Pressable>
            <Text style={[styles.album, { marginLeft: 15 }]}>View artist</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              marginBottom: 30,
              justifyContent: "flex-start",
              paddingHorizontal: "5%",
            }}
          >
            <Pressable onPress={() => setShow2(false)}>
              <MaterialIcons name={"queue-music"} size={20} color={"white"} />
            </Pressable>
            <Text style={[styles.album, { marginLeft: 15 }]}>Add to queue</Text>
          </View>
          <Text
            style={[
              styles.subtitle,
              { alignSelf: "center", marginTop: 100, fontSize: 30 },
            ]}
            onPress={() => setShow2(false)}
          >
            close
          </Text>
        </BlurView>
      ) : null}
          
       
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  album: {
    color: "white",
    fontWeight: "500",
    fontSize: 15,
    alignSelf: "center",
  },
  title: {
    marginTop: 12,
    color: "white",
    fontWeight: "500",
    fontSize: 24,
    marginLeft: "5%",
  },
  subtitle: {
    color: "gray",
    marginLeft: "5%",
    fontSize: 16,
  },
  image: {
    alignSelf: "center",
    width: "90%",
    aspectRatio: 1,
    borderRadius: 10,
  },
  blurContainer: {
    flex: 1,
    padding: 20,
    margin: 16,
    textAlign: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 20,
  },
});

import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
  Animated,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { Artist, Track } from "@/types";
import { StyleSheet } from "react-native";
import TrackListItem from "../../components/trackList";
import { tracks } from "../../assets/data/tracks";
import { artists } from "../../assets/data/artist";
import { FontAwesome } from "@expo/vector-icons";
import { useMemo, useRef, useState } from "react";
import { BlurView } from "expo-blur";
import Player from "@/components/musicPlayer";
import PlayerProvider, { usePlayerContext } from "@/providers/PlayerProvider";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
const ItemSeparator = () => <View style={styles.separator}></View>;

const trackTitleFilter = (title: string) => (track: Track) =>
  track.name.toLowerCase().includes(title.toLowerCase());
export default function TabOneScreen() {
   
  const {
    setShow,
    track,
    setTrack,
    isLoaded,
    isPlaying,
    setIsPlaying,
    setisLoaded,
    sound,
  } = usePlayerContext();
  const scrollA = useRef(new Animated.Value(0)).current;
  

  return (
    <View
      style={[
        {
          backgroundColor: "black",
          flex: 1,
        },
        StyleSheet.absoluteFill,
      ]}
    >
      <Animated.Image
        source={{ uri: artists[0]?.images?.url }}
        style={{
          alignSelf: "center",
          width: "110%",
          aspectRatio: 1,
          transform: [
            {
              scale: scrollA.interpolate({
                inputRange: [-1, 0, 1250, 1250 + 1],
                outputRange: [1.001, 1, 0.5, 0.5],
              }),
            },
          ],
        }}
      />
      <LinearGradient
        colors={["transparent", "#000000"]}
        style={[
          {
            position: "absolute",
            height: "70%",
          },
          StyleSheet.absoluteFill,
        ]}
      ></LinearGradient>
      <Animated.ScrollView
        style={[
          {
            position: "absolute",
            flex: 1,
          },
          StyleSheet.absoluteFill,
        ]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollA } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 35,
            marginLeft: 15,
            marginTop: 290,
            marginBottom: 10,
            color: "white",
          }}
        >
          {artists[0]?.name}
        </Text>
        <View
          style={[
            {
              paddingBottom: 140,
              backgroundColor: "black",
            },
          ]}
        >
          <Text
            style={{
              fontSize: 12,
              marginLeft: 15,
              marginTop: 12,
              marginBottom: 10,
              color: "grey",
            }}
          >
            28.3M monthly listener
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Following</Text>
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              marginLeft: 15,
              marginTop: 12,
              marginBottom: 10,
              color: "white",
            }}
          >
            Popular
          </Text>

          <TouchableHighlight>
            <View
              style={{
                marginVertical: 5,
                padding: 5,
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text
                style={[
                  { marginLeft: 15, marginRight: 10, fontSize: 16 },
                  { color: "white", fontWeight: 500 },
                ]}
              >
                1
              </Text>
              <Image
                source={{ uri: artists[0]?.topTrack[0]?.album.images[0].url }}
                style={{ width: 45, aspectRatio: 1, marginRight: 10 }}
              />
              <View>
                <Text
                  style={[
                    { color: "white", fontWeight: "500", fontSize: 16 },
                    { color: "white", fontWeight: 500 },
                  ]}
                >
                  {artists[0]?.topTrack[0]?.name}
                </Text>
                <Text style={{ color: "gray" }}>{artists[0].name}</Text>
              </View>
            </View>
          </TouchableHighlight>

          <TouchableHighlight>
            <View
              style={{
                marginVertical: 5,
                padding: 5,
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text
                style={[
                  { marginLeft: 15, marginRight: 10, fontSize: 16 },
                  { color: "white", fontWeight: 500 },
                ]}
              >
                2
              </Text>
              <Image
                source={{ uri: artists[0]?.topTrack[1]?.album.images[0].url }}
                style={{ width: 45, aspectRatio: 1, marginRight: 10 }}
              />
              <View>
                <Text
                  style={[
                    { color: "white", fontWeight: "500", fontSize: 16 },
                    { color: "white", fontWeight: 500 },
                  ]}
                >
                  {artists[0]?.topTrack[1]?.name}
                </Text>
                <Text style={{ color: "gray" }}>{artists[0].name}</Text>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight>
            <View
              style={{
                marginVertical: 5,
                padding: 5,
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text
                style={[
                  { marginLeft: 15, marginRight: 10, fontSize: 16 },
                  { color: "white", fontWeight: 500 },
                ]}
              >
                3
              </Text>
              <Image
                source={{ uri: artists[0]?.topTrack[2]?.album.images[0].url }}
                style={{ width: 45, aspectRatio: 1, marginRight: 10 }}
              />
              <View>
                <Text
                  style={[
                    { color: "white", fontWeight: "500", fontSize: 16 },
                    { color: "white", fontWeight: 500 },
                  ]}
                >
                  {artists[0]?.topTrack[2]?.name}
                </Text>
                <Text style={{ color: "gray" }}>{artists[0].name}</Text>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight>
            <View
              style={{
                marginVertical: 5,
                padding: 5,
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text
                style={[
                  { marginLeft: 15, marginRight: 10, fontSize: 16 },
                  { color: "white", fontWeight: 500 },
                ]}
              >
                4
              </Text>
              <Image
                source={{ uri: artists[0]?.topTrack[3]?.album.images[0].url }}
                style={{ width: 45, aspectRatio: 1, marginRight: 10 }}
              />
              <View>
                <Text
                  style={[
                    { color: "white", fontWeight: "500", fontSize: 16 },
                    { color: "white", fontWeight: 500 },
                  ]}
                >
                  {artists[0]?.topTrack[3]?.name}
                </Text>
                <Text style={{ color: "gray" }}>{artists[0].name}</Text>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight>
            <View
              style={{
                marginVertical: 5,
                padding: 5,
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text
                style={[
                  { marginLeft: 15, marginRight: 10, fontSize: 16 },
                  { color: "white", fontWeight: 500 },
                ]}
              >
                5
              </Text>
              <Image
                source={{ uri: artists[0]?.topTrack[4]?.album.images[0].url }}
                style={{ width: 45, aspectRatio: 1, marginRight: 10 }}
              />
              <View>
                <Text
                  style={[
                    { color: "white", fontWeight: "500", fontSize: 16 },
                    { color: "white", fontWeight: 500 },
                  ]}
                >
                  {artists[0]?.topTrack[4]?.name}
                </Text>
                <Text style={{ color: "gray" }}>{artists[0].name}</Text>
              </View>
            </View>
          </TouchableHighlight>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              marginLeft: 15,
              marginTop: 12,
              marginBottom: 10,
              color: "white",
            }}
          >
            Releash
          </Text>
          <TouchableHighlight>
            <View
              style={{
                marginVertical: 5,
                padding: 5,
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Image
                source={{ uri: artists[0]?.topTrack[0]?.album.images[0].url }}
                style={{
                  width: 80,
                  marginLeft: 15,
                  aspectRatio: 1,
                  marginRight: 10,
                }}
              />
              <View>
                <Text
                  style={[
                    { color: "white", fontWeight: "500", fontSize: 18 },
                    { color: "white", fontWeight: 500 },
                  ]}
                >
                  {artists[0]?.topTrack[0]?.album.name}
                </Text>
                <Text style={{ color: "gray" }}>{artists[0].name}</Text>
              </View>
            </View>
          </TouchableHighlight>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              marginLeft: 15,
              marginTop: 12,
              marginBottom: 10,
              color: "white",
            }}
          >
            Fans also like
          </Text>
          <ScrollView horizontal={true} style={styles.scrollView}>
            <View style={styles.box}>
              <Text>Item 1</Text>
            </View>
            <View style={styles.box}>
              <Text>Item 2</Text>
            </View>
            <View style={styles.box}>
              <Text>Item 3</Text>
            </View>
            <View style={styles.box}>
              <Text>Item 4</Text>
            </View>
            <View style={styles.box}>
              <Text>Item 5</Text>
            </View>
          </ScrollView>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: "row",
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: "#f0f0f0",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    borderColor: "grey",
    borderWidth: StyleSheet.hairlineWidth,
    opacity: 0.3,
    marginLeft: 60,
  },
  searchbox: {
    flexGrow: 1,
    padding: 7,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#121314",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    marginHorizontal: 10,
    color: "white",
  },
  image: {
    alignSelf: "center",
    width: "100%",
    aspectRatio: 1,
  },
  button: {
    alignSelf: "flex-start",
    flexDirection: "row",
    marginHorizontal: 20,
    backgroundColor: "transparent",
    borderWidth: 2, // Border width
    borderColor: "#C0C0C0", // Border color
    borderRadius: 20, // Border radius for rounded corners
    paddingVertical: 10, // Vertical padding
    paddingHorizontal: 20, // Horizontal padding
  },
  text: {
    color: "#FFFFFF", // Text color
    fontSize: 12, // Font size
    fontWeight: "bold", // Font weight
    textAlign: "center", // Center text alignment
  },
});

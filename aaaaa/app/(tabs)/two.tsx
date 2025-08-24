import { 
  Text, 
  View,
  Image,
  ScrollView,
  Animated,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";  
import { StyleSheet } from "react-native"; 
import { useEffect, useMemo, useRef, useState } from "react"; 
import { usePlayerContext } from "@/providers/PlayerProvider";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  useArtistData,
  useTopTracks,
  useAlbums,
  useRelatedArtists
} from "@/app/lib/queries/useArtistQueries" 
export default function TabTwoScreen() { 
  const { 
    setTrack, 
    token,
    track  
  } = usePlayerContext();
  const scrollA = useRef(new Animated.Value(0)).current;
  const   {id}   =   useLocalSearchParams(); 
  
  const { data: artist } = useArtistData(id, token);
  const { data: topTracks } = useTopTracks(id, token);
  const { data: albums } = useAlbums(id, token);
  const { data: relate } = useRelatedArtists(id, token);  
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
        source={{ uri: artist?.coverUrl}}
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
        start={{ x: 0, y: 0 }} // Start at the top
        end={{ x: 0, y: 0.7 }} 
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
          {artist?.name}
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
             { } followers
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

          {topTracks?.slice(0, 5).map((tracks:any, index:any) => (
  <TouchableHighlight key={tracks.id} onPress={() => setTrack(tracks)}>
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
        style={{
          marginLeft: 15,
          marginRight: 10,
          fontSize: 16,
          color: "white",
          fontWeight: "500",
        }}
      >
        {index + 1}
      </Text>
      <Image
        source={{ uri: tracks?.album.coverUrl }}
        style={{ width: 45, aspectRatio: 1, marginRight: 10 } }
      />
      <View>
        <Text
          style={[{
            color: "white",
            fontWeight: "500",
            fontSize: 16,
          },  track?.id === tracks.id && { color: "#1DB954" }]}
        >
          {tracks.name}
        </Text>
        <Text style={{ color: "gray" }}>
          {tracks.songArtists?.[0]?.artist.name ?? "Unknown Artist"}
        </Text>
      </View>
    </View>
  </TouchableHighlight>
))}

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
          <TouchableHighlight      onPress={() => [ router.navigate({
                pathname: "../albums",
                params: { albumsId:  artist?.albumArtists?.[0]?.album?.id as string}  
              }) ]}>
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
                source={{ uri: artist?.albumArtists?.[0]?.album?.coverUrl   }}
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
                  {artist?.albumArtists
                    ?.slice(0, 5)
                    ?.map((artistEntry: any) => artistEntry.album?.name)
                    ?.filter(Boolean)
                    ?.join(", ")}
                </Text>
                <Text style={{ color: "gray" }}>{artist?.name}</Text>
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
          {relate?.artists.length >5 ? ( 
          <ScrollView horizontal={true} style={styles.scrollView}>
          <TouchableHighlight    onPress={() => [ router.navigate({
                pathname: "/two",
                params: { id:  relate?.artists[0].id as string}  
              }) ]}>
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
                source={{ uri: relate?.artists[0]?.images[0]?.url }}
                style={{
                  width: 80,
                  marginLeft: 15,
                  aspectRatio: 1,
                  marginRight: 10,
                }}
              /> 
            </View>
          </TouchableHighlight>
          <TouchableHighlight    onPress={() => [ router.navigate({
                pathname: "/two",
                params: { id:  relate?.artists[1].id as string}  
              }) ]}>
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
                source={{ uri: relate?.artists[1]?.images[0]?.url }}
                style={{
                  width: 80,
                  marginLeft: 15,
                  aspectRatio: 1,
                  marginRight: 10,
                }}
              /> 
            </View>
          </TouchableHighlight>
          <TouchableHighlight    onPress={() => [ router.navigate({
                pathname: "/two",
                params: { id:  relate?.artists[2].id as string}  
              }) ]}>
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
                source={{ uri: relate?.artists[2]?.images[0]?.url }}
                style={{
                  width: 80,
                  marginLeft: 15,
                  aspectRatio: 1,
                  marginRight: 10,
                }}
              /> 
            </View>
          </TouchableHighlight> 
          <TouchableHighlight    onPress={() => [ router.navigate({
                pathname: "/two",
                params: { id:  relate?.artists[3].id as string}  
              }) ]}>
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
                source={{ uri: relate?.artists[3]?.images[0]?.url }}
                style={{
                  width: 80,
                  marginLeft: 15,
                  aspectRatio: 1,
                  marginRight: 10,
                }}
              /> 
            </View>
          </TouchableHighlight> 
          <TouchableHighlight    onPress={() => [ router.navigate({
                pathname: "/two",
                params: { id:  relate?.artists[4].id as string}  
              }) ]}>
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
                source={{ uri: relate?.artists[4]?.images[0]?.url }}
                style={{
                  width: 80,
                  marginLeft: 15,
                  aspectRatio: 1,
                  marginRight: 10,
                }}
              /> 
            </View>
          </TouchableHighlight> 
           
          </ScrollView>
        ) : null}   
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

 
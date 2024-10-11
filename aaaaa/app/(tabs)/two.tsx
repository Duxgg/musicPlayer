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
import { useEffect, useMemo, useRef, useState } from "react";
import { BlurView } from "expo-blur";
import Player from "@/components/musicPlayer";
import PlayerProvider, { usePlayerContext } from "@/providers/PlayerProvider";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
 
export default function TabTwoScreen() {
  const [artist,setArtist] = useState<any>(null)
  const [topTracks,setTopTracks] = useState<any>() 
  const [albums,setAlbums] = useState<any>()  
  const [relate,setRelate] = useState<any>()   
  const { 
    setTrack, 
    token 
  } = usePlayerContext();
  const scrollA = useRef(new Animated.Value(0)).current;
  const   {id}   =   useLocalSearchParams(); 
   
  useEffect(() => {
    async function fetchArtistData() {
      const artistId = Array.isArray(id) ? id[0] : id; 
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/artists/${encodeURIComponent(
            artistId 
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
          const data:Artist = await response.json();
          setArtist(data); 
        }
      } catch (error) {
        console.error("Error fetching artist data:", error);
      }
    }
    
    async function fetchTopTracks() {
      const artistId = Array.isArray(id) ? id[0] : id;  
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/artists/${encodeURIComponent(
            artistId
          )}/top-tracks`,
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
          setTopTracks(data )  
        }
      } catch (error) {
        console.error("Error fetching artist data:", error);
      }
    }
    
    async function fetchAlbums() {
      const artistId = Array.isArray(id) ? id[0] : id;  
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/artists/${encodeURIComponent(
            artistId
          )}/albums?include_groups=album`,
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
          setAlbums(data )   
        }
      } catch (error) {
        console.error("Error fetching artist data:", error);
      }
    } 
    async function fetchRelateArtists() {
      const artistId = Array.isArray(id) ? id[0] : id;  
      console.log("Id",artistId )  
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/artists/${encodeURIComponent(
            artistId
          )}/related-artists`,
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
          setRelate(data )   
          if( data.artists.length<=5){await fetchRelateArtists()} else
          console.log("blackaaa",data.artists[0].id )   
        }
      } catch (error) {
        console.error("Error fetching artist data:", error);
      }
    }  
    if (id) {
      fetchArtistData(); 
      fetchTopTracks() 
      fetchAlbums() 
      fetchRelateArtists() 
    }
  }, [id, token]); 
   
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
        source={{ uri: artist?.images[0].url }}
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
             {artist?.followers.total} followers
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

          <TouchableHighlight onPress={() => {setTrack(topTracks?.tracks[0]) }}>
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
                source={{ uri: topTracks?.tracks[0]?.album.images[0].url }}
                style={{ width: 45, aspectRatio: 1, marginRight: 10 }}
              />
              <View>
                <Text
                  style={[
                    { color: "white", fontWeight: "500", fontSize: 16 },
                    { color: "white", fontWeight: 500 },
                  ]}
                >
                  {topTracks?.tracks[0]?.name}
                </Text>
                <Text style={{ color: "gray" }}>{topTracks?.tracks[0]?.artists[0].name}</Text>
              </View>
            </View>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => {setTrack(topTracks?.tracks[1]) }}>
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
                source={{ uri: topTracks?.tracks[1]?.album.images[0].url }}
                style={{ width: 45, aspectRatio: 1, marginRight: 10 }}
              />
              <View>
                <Text
                  style={[
                    { color: "white", fontWeight: "500", fontSize: 16 },
                    { color: "white", fontWeight: 500 },
                  ]}
                >
                  {topTracks?.tracks[1]?.name}
                </Text>
                <Text style={{ color: "gray" }}>{topTracks?.tracks[1]?.artists[0].name}</Text>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => {setTrack(topTracks?.tracks[3]) }}>
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
                source={{ uri: topTracks?.tracks[3]?.album.images[0].url }}
                style={{ width: 45, aspectRatio: 1, marginRight: 10 }}
              />
              <View>
                <Text
                  style={[
                    { color: "white", fontWeight: "500", fontSize: 16 },
                    { color: "white", fontWeight: 500 },
                  ]}
                >
                  {topTracks?.tracks[3]?.name}
                </Text>
                <Text style={{ color: "gray" }}>{topTracks?.tracks[2]?.artists[0].name}</Text>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => {setTrack(topTracks?.tracks[4]) }}>
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
                source={{ uri: topTracks?.tracks[4]?.album.images[0].url }}
                style={{ width: 45, aspectRatio: 1, marginRight: 10 }}
              />
              <View>
                <Text
                  style={[
                    { color: "white", fontWeight: "500", fontSize: 16 },
                    { color: "white", fontWeight: 500 },
                  ]}
                >
                  {topTracks?.tracks[4]?.name}
                </Text>
                <Text style={{ color: "gray" }}>{topTracks?.tracks[3]?.artists[0].name}</Text>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => {setTrack(topTracks?.tracks[5]) }}>
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
                source={{ uri: topTracks?.tracks[5]?.album.images[0].url }}
                style={{ width: 45, aspectRatio: 1, marginRight: 10 }}
              />
              <View>
                <Text
                  style={[
                    { color: "white", fontWeight: "500", fontSize: 16 },
                    { color: "white", fontWeight: 500 },
                  ]}
                >
                  {topTracks?.tracks[5]?.name}
                </Text>
                <Text style={{ color: "gray" }}>{topTracks?.tracks[4]?.artists[0].name}</Text>
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
          <TouchableHighlight      onPress={() => [ router.navigate({
                pathname: "../albums",
                params: { albumsId:  albums?.items[0]?.id as string}  
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
                source={{ uri: albums?.items[0]?.images[0].url }}
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
                  {albums?.items[0]?.name}
                </Text>
                <Text style={{ color: "gray" }}>{albums?.items[0]?.artists[0].name}</Text>
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

 
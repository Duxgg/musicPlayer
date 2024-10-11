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
    Dimensions,
  } from "react-native"; 
  import { Artist, Track } from "@/types";
  import { StyleSheet } from "react-native";
  import TrackListItem, { TrackListItem2 } from "../../components/trackList";
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
    const { width, height } = Dimensions.get('window'); 
    const [artist,setArtist] = useState<any>(null) 
    const [albums,setAlbums] = useState<any>()   
    const { 
      setTrack, 
      token 
    } = usePlayerContext();
    const scrollA = useRef(new Animated.Value(0)).current;
    const   {albumsId}   =   useLocalSearchParams();  
    useEffect(() => {
     
      async function fetchAlbums() {
        const  Id = Array.isArray(albumsId) ? albumsId[0] : albumsId; 
       
        try {
          const response = await fetch(
            `https://api.spotify.com/v1/albums/${encodeURIComponent(
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
            setAlbums(data )   
          }
        } catch (error) {
          console.error("Error fetching artist data:", error);
        }
      } 
      
      if (albumsId) { 
        fetchAlbums()  
      }
    }, [albumsId, token]); 
     console.log(albums?.images[0].url)
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
          source={{ uri: albums?.images[0].url }}
          style={{
            marginTop:scrollA.interpolate({
                inputRange: [0, 500],  
                outputRange: [5, -45],  
                extrapolate: 'clamp',  
              }),
            opacity:  scrollA.interpolate({
                inputRange: [0, height*0.4], 
                outputRange: [1, 0], 
                extrapolate: 'clamp',
              }),  
            alignSelf: "center",
            height: "40%",
            aspectRatio: 1,
            transform: [
              {
                scale: scrollA.interpolate({
                    inputRange: [0, 0, height*0.4, height*0.4],
                    outputRange: [1, 1, 0.7, 0],
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
      <View style={{  marginTop: height*0.4,backgroundColor: "black"}}>
        <Text style={styles.title}>{albums?.name }</Text>
        <Text style={styles.subtitle}>{albums?.artists[0].name }</Text>
        <Text style={ { color: "grey",
        marginLeft: "5%",fontWeight:500,
        fontSize: 12,}}>{albums?.release_date }</Text> 
     
      <FlatList
        contentContainerStyle={{ paddingBottom: 160 }} 
        data={albums?.tracks.items}
        renderItem={({ item }) => <TrackListItem2 track2={item} />}
        scrollEnabled = {false}  
      /> 
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
        marginTop: 12,
        color: "white",
        fontWeight: "500",
        fontSize: 24,
        marginLeft: "5%",
      },
      subtitle: {
        color: "white",
        marginLeft: "5%",
        fontSize: 15,
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
  
   
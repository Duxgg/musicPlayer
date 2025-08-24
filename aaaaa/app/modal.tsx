import { Text, View, StyleSheet, Image, Pressable, FlatList } from "react-native";
 
import { usePlayerContext } from "@/providers/PlayerProvider";
// import { useExtractColor } from "react-extract-colors";
import { 
  Feather, 
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { BlurView } from "expo-blur";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient"; 
import TrackListItem from "@/components/trackList";
import { SafeAreaView } from "react-native-safe-area-context";
import { Track } from "@/types";

 

export default function modal() {
  const {
    trackStack,
    track,
    isLoaded,
    isPlaying, 
    sound,
    pushTrack,
    popTrack  
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
  // const { colors, dominantColor, darkerColor, lighterColor, loading, error } =
  //   useExtractColor(image.url, { maxColors: 10, format: "rgb", maxSize: 1 });
  const [show2, setShow2] = useState(false);  
  const [showQueue, setShowQueue] = useState(false);

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
      <SafeAreaView> 
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
        source={{ uri: track.album.coverUrl }}
        style={styles.image}
      />
      <View style={{}}>
        <Text style={styles.title}>{track.name}</Text>
        <Text style={styles.subtitle}>{track.songArtists[0].artist.name}</Text>
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

        <Pressable onPress={() => popTrack()}>
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
      {show2 ? (
        blurStuff(track,setShow2,pushTrack,setShowQueue)
      ) : null}
      {showQueue ? (
       queueList(trackStack,setShowQueue,track) 
      ) : null}  
       </SafeAreaView> 
    </LinearGradient>
  );
}

function blurStuff(track:Track , setShow2:any, pushTrack:any,setShowQueue:any ){
   return( 
 
  <BlurView
  experimentalBlurMethod="dimezisBlurView"
  intensity={70}
  tint="dark"
  style={[
    {
          height: "1925%",
    },
    StyleSheet.absoluteFill,
  ]}
>
  <SafeAreaView>    
  <Image
    source={{ uri: track.album.coverUrl }}
    style={[
      styles.image,
      { width: "50%", marginTop: 15, borderRadius: 0 },
    ]}
  />
  <Text style={[styles.title, { alignSelf: "center" }]}>
    {track?.name}
  </Text>
  <Text style={[styles.subtitle, { alignSelf: "center" }]}>
    {track?.songArtists[0].artist.name} • {track?.album.name}
  </Text>
   <View style={{marginLeft:20}}> 
    <Pressable onPress={() => [setShow2(false),setShowQueue(true) ]}>
      <Ionicons name={"menu-outline"} size={20} color={"white"} />
    </Pressable>
    <Text style={ {color: "white" ,fontWeight: "500",
                   fontSize: 12 }}>
      Go to queue
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
      onPress={() => [setShow2(false),router.back(), router.push({
        pathname: "/albums",
        params: { albumsId:  track?.album.id as string}  
      }) ]}
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
     <Pressable
      onPress={() => [setShow2(false),router.back(), router.push({
        pathname: "/two",
        params: { id:  track.songArtists[0].artist.id as string}  
      }) ]}
    >
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
    <Pressable onPress={() => [pushTrack(track),alert('Queue Added!')]}>
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
   </SafeAreaView>  
</BlurView>
   
   )
}
function queueList(trackStack:any,setShowQueue:any,track:any) {
 
  return(  
    < View  
    style={[
      {
        backgroundColor:"black" ,
        flex: 1,
      },
      StyleSheet.absoluteFill,
    ]}
  > 
     
        <Pressable onPress={() => [setShowQueue(false)]}
           style={{
           
            marginTop: 15,
      
            paddingHorizontal: "5%",
          }}>
          <Ionicons name={"chevron-down"} size={20} color={"white"} />
        </Pressable>
          
        <Text style={ {color: "white" ,fontWeight: "500",
                   fontSize: 16,paddingHorizontal: "5%", }}>
      Now Playing:               
    </Text > 
     <View style={ { paddingHorizontal: "3%", }}> 
    <TrackListItem     track2={track} />
    </View>  
    <Text style={ {color: "white" ,fontWeight: "500",
                   fontSize: 16,paddingHorizontal: "5%", }}>
      Next:               
    </Text>   
  <FlatList
  contentContainerStyle={{ paddingBottom: 160 }} 
  data={trackStack}
  renderItem={({ item }) => <TrackListItem  track2={item} />}
  scrollEnabled = {false}  
/> 
</ View>
 )
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

import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import { Track } from "@/types"; 
import { StyleSheet } from "react-native";
import TrackListItem from "../components/trackList";
 import { FontAwesome } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { BlurView } from "expo-blur";
import Player from "@/components/musicPlayer";
import PlayerProvider from "@/providers/PlayerProvider";
const ItemSeparator = () =>(  
  <View style = {styles.separator}></View>
) 
const trackTitleFilter  = (title:string)=>(track:Track)=>track.name.toLowerCase().includes(title.toLowerCase())
export default function premier() {
  
 
  return (
   
    <SafeAreaView>
             <Text
           style={{ fontSize: 12, marginEnd: 10, color: "white" }}
        >
          Cancel
        </Text>
 
 
      <Text
           style={{ fontSize: 12, marginEnd: 10, color: "white" }}
        >
          Cancel
        </Text>
      </SafeAreaView>
  );
}
 
const styles = StyleSheet.create({
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
     borderColor: "grey" ,
     borderWidth:StyleSheet.hairlineWidth,
     opacity:0.3,  
     marginLeft:60 
  },
  searchbox: {
   
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
});

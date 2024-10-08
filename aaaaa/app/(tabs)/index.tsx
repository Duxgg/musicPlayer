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
import TrackListItem from "../../components/trackList";
import { tracks } from "../../assets/data/tracks";
import { FontAwesome } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { BlurView } from "expo-blur";
import { usePlayerContext } from "@/providers/PlayerProvider";

interface SpotifySearchResult {
  tracks: {
    items: Track[];
  };
}
const ItemSeparator = () => <View style={styles.separator}></View>;
const trackTitleFilter = (title: string) => (track: Track) =>
  track.name.toLowerCase().includes(title.toLowerCase());
export default function TabOneScreen() {
  const { token } = usePlayerContext();
  console.log("Access Token:", token);
  const [search, setSearch] = useState("");

  const [track, setTracks] = useState<Track[]>();
  useMemo(async () => {
    if (!search) return null;
    //try...
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        search
      )}&type=track`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if(response.ok){ 
    const data: SpotifySearchResult = await response.json();
    setTracks(data.tracks.items); 
    }   
  }, [search]);

  return (
    <SafeAreaView>
      <BlurView
        intensity={20}
        tint="dark"
        style={[
          {
            overflow: "hidden",
            backgroundColor: "transparent",
            flexDirection: "row",
            alignItems: "center",
          },
          ,
        ]}
      >
        <View style={styles.searchbox}>
          {/* Header */}
          <FontAwesome name="search" size={16} color="gray" />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="What do you want to listen to?"
            style={styles.input}
          />
        </View>
        <Text
          onPress={() => setSearch("")}
          style={{ fontSize: 12, marginEnd: 10, color: "white" }}
        >
          Cancel
        </Text>
      </BlurView>
      <FlatList
        contentContainerStyle={{ paddingBottom: 160 }}
        ItemSeparatorComponent={ItemSeparator}
        data={track}
        renderItem={({ item }) => <TrackListItem track2={item} />}
      />
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
    borderColor: "grey",
    borderWidth: StyleSheet.hairlineWidth,
    opacity: 0.2,
    marginLeft: 60,
    marginRight: 10,
    top: -10,
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
});

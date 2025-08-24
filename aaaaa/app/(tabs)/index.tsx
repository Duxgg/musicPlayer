import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import { BlurView } from "expo-blur";
import { FontAwesome } from "@expo/vector-icons";

import { Album, Artist, Track } from "@/types";
import TrackListItem from "../../components/trackList";
import { usePlayerContext } from "@/providers/PlayerProvider";

interface SearchResults {
  songs: Track[];
  albums: Album[];
  artists: Artist[];
}

type SearchItem = Track | Album | Artist;

const INITIAL_SEARCH_STATE: SearchResults = {
  songs: [],
  albums: [],
  artists: [],
};

const ItemSeparator = () => <View style={styles.separator} />;

export default function TabOneScreen() {
  const { token } = usePlayerContext();
  
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<SearchResults>(INITIAL_SEARCH_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounced search effect
  useEffect(() => {
    if (!search.trim()) {
      setItems(INITIAL_SEARCH_STATE);
      setError(null);
      return;
    }

    const timeoutId = setTimeout(() => {
      performSearch(search.trim());
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [search]);

  const performSearch = async (query: string) => {
    if (!query) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/search?q=${encodeURIComponent(query)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Add authorization header if token is available
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Search failed: ${response.status} ${response.statusText}`);
      }

      const data: SearchResults = await response.json();
      
      // Validate the response structure
      const validatedData: SearchResults = {
        songs: Array.isArray(data.songs) ? data.songs : [],
        albums: Array.isArray(data.albums) ? data.albums : [],
        artists: Array.isArray(data.artists) ? data.artists : [],
      };

      setItems(validatedData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      console.error("Search error:", errorMessage);
      setError(errorMessage);
      setItems(INITIAL_SEARCH_STATE);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearSearch = useCallback(() => {
    setSearch("");
    setItems(INITIAL_SEARCH_STATE);
    setError(null);
  }, []);

  const handleRetry = useCallback(() => {
    if (search.trim()) {
      performSearch(search.trim());
    }
  }, [search]);

  // Combine all items for the FlatList
  const flatListData: SearchItem[] = [
    ...items.songs,
    ...items.albums,
    ...items.artists,
  ];

  const renderItem = ({ item }: { item: SearchItem }) => (
    <TrackListItem track2={item} />
  );

  const renderEmptyState = () => {
    if (isLoading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#1DB954" />
          <Text style={styles.statusText}>Searching...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerContainer}>
          <FontAwesome name="exclamation-circle" size={48} color="#FF6B6B" />
          <Text style={styles.errorText}>Search Error</Text>
          <Text style={styles.errorSubtext}>{error}</Text>
          <Text style={styles.retryButton} onPress={handleRetry}>
            Tap to retry
          </Text>
        </View>
      );
    }

    if (search.trim() && flatListData.length === 0) {
      return (
        <View style={styles.centerContainer}>
          <FontAwesome name="search" size={48} color="gray" />
          <Text style={styles.statusText}>No results found</Text>
          <Text style={styles.statusSubtext}>
            Try searching for something else
          </Text>
        </View>
      );
    }

    if (!search.trim()) {
      return (
        <View style={styles.centerContainer}>
          <FontAwesome name="music" size={48} color="gray" />
          <Text style={styles.statusText}>Start searching</Text>
          <Text style={styles.statusSubtext}>
            Find your favorite songs, albums, and artists
          </Text>
        </View>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <BlurView intensity={20} tint="dark" style={styles.searchHeader}>
        <View style={styles.searchBox}>
          <FontAwesome name="search" size={16} color="gray" />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="What do you want to listen to?"
            placeholderTextColor="gray"
            style={styles.input}
            returnKeyType="search"
            clearButtonMode="while-editing"
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>
        <Text style={styles.cancelButton} onPress={handleClearSearch}>
          Cancel
        </Text>
      </BlurView>

      <FlatList
        data={flatListData}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item, index) => `${item.id || index}`}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  searchHeader: {
    overflow: "hidden",
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
  },
  searchBox: {
    flex: 1,
    padding: 12,
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
    flex: 1,
    fontSize: 16,
  },
  cancelButton: {
    fontSize: 16,
    marginEnd: 16,
    color: "white",
    fontWeight: "500",
  },
  separator: {
    borderColor: "grey",
    borderWidth: StyleSheet.hairlineWidth,
    opacity: 0.2,
    marginLeft: 60,
    marginRight: 10,
    marginTop: -10,
  },
  listContainer: {
    paddingBottom: 160,
    flexGrow: 1,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  statusText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    marginTop: 16,
    textAlign: "center",
  },
  statusSubtext: {
    fontSize: 14,
    color: "gray",
    marginTop: 8,
    textAlign: "center",
    lineHeight: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FF6B6B",
    marginTop: 16,
    textAlign: "center",
  },
  errorSubtext: {
    fontSize: 14,
    color: "#FF6B6B",
    marginTop: 8,
    textAlign: "center",
    lineHeight: 20,
  },
  retryButton: {
    fontSize: 16,
    color: "#1DB954",
    marginTop: 16,
    fontWeight: "600",
  },
});
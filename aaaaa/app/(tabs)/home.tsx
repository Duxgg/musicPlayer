import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface Track {
  id: string;
  title: string;
  artist: string;
  image: string;
  duration: string;
}

interface Playlist {
  id: string;
  name: string;
  description: string;
  image: string;
  tracks: number;
}

interface Album {
  id: string;
  name: string;
  artist: string;
  image: string;
  year: number;
}

const SpotifyHome: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Home' | 'Search' | 'Library'>('Home');

  const recentlyPlayed: Track[] = [
    {
      id: '1',
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      image: 'https://i.scdn.co/image/ab67616d0000b273/4f39df47b4e7b8d7c9e5b3a4e4c8b5f2e3d4a1c6',
      duration: '3:20'
    },
    {
      id: '2',
      title: 'Levitating',
      artist: 'Dua Lipa',
      image: 'https://i.scdn.co/image/ab67616d0000b273/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0',
      duration: '3:23'
    },
    {
      id: '3',
      title: 'Good 4 U',
      artist: 'Olivia Rodrigo',
      image: 'https://i.scdn.co/image/ab67616d0000b273/b1c2d3e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0',
      duration: '2:58'
    },
  ];

  const madeForYou: Playlist[] = [
    {
      id: '1',
      name: 'Discover Weekly',
      description: 'Your weekly mixtape of fresh music',
      image: 'https://i.scdn.co/image/ab67616d0000b273/330c0d0c98c8a6ca8b3f1e2d7a9b5c4f8e7d6a3b',
      tracks: 30
    },
    {
      id: '2',
      name: 'Release Radar',
      description: 'Catch all the latest music from artists you follow',
      image: 'https://i.scdn.co/image/ab67616d0000b273/2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t',
      tracks: 25
    },
    {
      id: '3',
      name: 'Daily Mix 1',
      description: 'The Weeknd, Dua Lipa, Ariana Grande and more',
      image: 'https://i.scdn.co/image/ab67616d0000b273/3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u',
      tracks: 50
    },
  ];

  const topAlbums: Album[] = [
    {
      id: '1',
      name: 'After Hours',
      artist: 'The Weeknd',
      image: 'https://i.scdn.co/image/ab67616d0000b273/4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v',
      year: 2020
    },
    {
      id: '2',
      name: 'Future Nostalgia',
      artist: 'Dua Lipa',
      image: 'https://i.scdn.co/image/ab67616d0000b273/5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v4w',
      year: 2020
    },
    {
      id: '3',
      name: 'SOUR',
      artist: 'Olivia Rodrigo',
      image: 'https://i.scdn.co/image/ab67616d0000b273/6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v4w5x',
      year: 2021
    },
  ];

  const renderTrackItem = ({ item }: { item: Track }) => (
    <TouchableOpacity style={styles.trackItem}>
      <View style={styles.trackImageContainer}>
        <Text style={styles.trackImagePlaceholder}>♪</Text>
      </View>
      <View style={styles.trackInfo}>
        <Text style={styles.trackTitle}>{item.title}</Text>
        <Text style={styles.trackArtist}>{item.artist}</Text>
      </View>
      <TouchableOpacity style={styles.playButton}>
        <Ionicons name="play" size={16} color="#000" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderPlaylistItem = ({ item }: { item: Playlist }) => (
    <TouchableOpacity style={styles.playlistItem}>
      <View style={styles.playlistImageContainer}>
        <Text style={styles.playlistImagePlaceholder}>♪</Text>
      </View>
      <Text style={styles.playlistName}>{item.name}</Text>
      <Text style={styles.playlistDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  const renderAlbumItem = ({ item }: { item: Album }) => (
    <TouchableOpacity style={styles.albumItem}>
      <View style={styles.albumImageContainer}>
        <Text style={styles.albumImagePlaceholder}>♪</Text>
      </View>
      <Text style={styles.albumName}>{item.name}</Text>
      <Text style={styles.albumArtist}>{item.artist}</Text>
    </TouchableOpacity>
  );

  const renderQuickAccess = () => (
    <View style={styles.quickAccessContainer}>
      <View style={styles.quickAccessGrid}>
        <TouchableOpacity style={styles.quickAccessItem}>
          <View style={styles.quickAccessImage}>
            <Ionicons name="heart" size={20} color="#1ed760" />
          </View>
          <Text style={styles.quickAccessText}>Liked Songs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickAccessItem}>
          <View style={styles.quickAccessImage}>
            <Ionicons name="download" size={20} color="#1ed760" />
          </View>
          <Text style={styles.quickAccessText}>Downloaded</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickAccessItem}>
          <View style={styles.quickAccessImage}>
            <Text style={styles.quickAccessImagePlaceholder}>♪</Text>
          </View>
          <Text style={styles.quickAccessText}>Daily Mix 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickAccessItem}>
          <View style={styles.quickAccessImage}>
            <Text style={styles.quickAccessImagePlaceholder}>♪</Text>
          </View>
          <Text style={styles.quickAccessText}>Discover Weekly</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickAccessItem}>
          <View style={styles.quickAccessImage}>
            <Text style={styles.quickAccessImagePlaceholder}>♪</Text>
          </View>
          <Text style={styles.quickAccessText}>Rock Classics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickAccessItem}>
          <View style={styles.quickAccessImage}>
            <Text style={styles.quickAccessImagePlaceholder}>♪</Text>
          </View>
          <Text style={styles.quickAccessText}>Chill Hits</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <TouchableOpacity style={styles.profileButton}>
          <Text style={styles.profileInitial}>U</Text>
        </TouchableOpacity>
        <Text style={styles.greeting}>Good evening</Text>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="notifications-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="time-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="settings-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSection = (title: string, data: any[], renderItem: any) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />
    </View>
  );

  

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {renderHeader()}
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderQuickAccess()}
        
        {renderSection('Recently played', recentlyPlayed, renderTrackItem)}
        
        {renderSection('Made for you', madeForYou, renderPlaylistItem)}
        
        {renderSection('Your top albums', topAlbums, renderAlbumItem)}
        
        <View style={styles.bottomPadding} />
      </ScrollView>
       
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#000',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1ed760',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileInitial: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  greeting: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    marginLeft: 16,
  },
  content: {
    flex: 1,
    backgroundColor: '#000',
  },
  quickAccessContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAccessItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: (width - 48) / 2,
    height: 56,
    backgroundColor: '#282828',
    borderRadius: 4,
    marginBottom: 8,
    paddingLeft: 0,
    overflow: 'hidden',
  },
  quickAccessImage: {
    width: 56,
    height: 56,
    backgroundColor: '#404040',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  quickAccessImagePlaceholder: {
    color: '#b3b3b3',
    fontSize: 20,
  },
  quickAccessText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  section: {
    marginTop: 32,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  horizontalList: {
    paddingHorizontal: 16,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#181818',
    borderRadius: 4,
    padding: 8,
    marginRight: 12,
    width: 280,
  },
  trackImageContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#404040',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  trackImagePlaceholder: {
    color: '#b3b3b3',
    fontSize: 16,
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  trackArtist: {
    color: '#b3b3b3',
    fontSize: 12,
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1ed760',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playlistItem: {
    width: 160,
    marginRight: 16,
  },
  playlistImageContainer: {
    width: 160,
    height: 160,
    backgroundColor: '#404040',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  playlistImagePlaceholder: {
    color: '#b3b3b3',
    fontSize: 32,
  },
  playlistName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  playlistDescription: {
    color: '#b3b3b3',
    fontSize: 12,
    lineHeight: 16,
  },
  albumItem: {
    width: 160,
    marginRight: 16,
  },
  albumImageContainer: {
    width: 160,
    height: 160,
    backgroundColor: '#404040',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  albumImagePlaceholder: {
    color: '#b3b3b3',
    fontSize: 32,
  },
  albumName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  albumArtist: {
    color: '#b3b3b3',
    fontSize: 12,
  },
  bottomPadding: {
    height: 100,
  },
  bottomTab: {
    flexDirection: 'row',
    backgroundColor: '#000',
    borderTopWidth: 1,
    borderTopColor: '#282828',
    paddingVertical: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
 
  tabText: {
    color: '#b3b3b3',
    fontSize: 10,
    marginTop: 4,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#1ed760',
  },
});

export default SpotifyHome;
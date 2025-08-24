import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Stack, Tabs } from 'expo-router';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import Colors from '../../constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import Player from '@/components/musicPlayer';
import { BlurView } from 'expo-blur';
import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PlayerProvider from '@/providers/PlayerProvider';
import TabOneScreen from './two';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  focused?: boolean;
}) {
  return (
    <FontAwesome 
      size={24} 
      style={{ 
        marginBottom: -3,
        opacity: props.focused ? 1 : 0.7 
      }} 
      {...props} 
    />
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1DB954', // Spotify green
        tabBarInactiveTintColor: '#b3b3b3',
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          position: 'absolute',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 85,
          paddingTop: 10,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
        tabBarBackground: () => (
          <BlurView 
            intensity={30} 
            tint='dark' 
            style={[{
              overflow: 'hidden',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20, 
            }, StyleSheet.absoluteFillObject]}
          >
            <LinearGradient
              colors={['transparent', 'rgba(0, 0, 0, 0.98)']}
              style={StyleSheet.absoluteFillObject}
            />
          </BlurView>
        ),
        headerShown: useClientOnlyValue(false, true),
      }}
     tabBar={(props) => (
        <View style={{ 
          backgroundColor: 'transparent',
        }}> 
          <View style={{ 
          }}>
            <Player />
          </View>
           
          <BottomTabBar {...props} />
        </View>
      )}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="home" color={color} focused={focused} />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerShown: false,
        }}
      />
      
      <Tabs.Screen
        name="two"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="search" color={color} focused={focused} />
          ),
          headerShown: false,
        }}
      />
      
      <Tabs.Screen
        name="albums"
        options={{
          title: 'Library',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="music" color={color} focused={focused} />
          ),
          headerShown: false,
        }}
      />
      
      {/* Optional: Add more tabs */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="user" color={color} focused={focused} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
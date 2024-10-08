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
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        tabBarStyle: { 
          backgroundColor:'transparent',
          borderTopWidth: 0,
          position: 'absolute',
          borderTopLeftRadius:20,
          borderTopRightRadius:20, 
          
        },
        tabBarBackground: () => (
           <BlurView  intensity={30} tint='dark' style={[{   overflow:'hidden',    borderTopLeftRadius:20,
           borderTopRightRadius:20,  },StyleSheet.absoluteFillObject]}>
             
           </BlurView>
        ),
        headerShown: useClientOnlyValue(false, true), 
      }}
      tabBar={(props) => (
        <View>
       <Player></Player> 

          <BottomTabBar {...props} />
        </View>
      )} 
       
       >
      <Tabs.Screen
        name="index"
        options={{
          title: 'hhehe',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
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
          headerShown:false,  
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,  
          headerShown:false,   
           
        }}
      />
    
 
    </Tabs>
  );
}

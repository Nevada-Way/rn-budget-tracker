import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Text } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const currentYear = "2025";
  const resolvedColorScheme = colorScheme ?? 'light';


  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        //tabBarInactiveTintColor: 'red', // Hard code setting of inactive tab icon/text color
        tabBarInactiveTintColor: Colors[resolvedColorScheme].icon,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Month',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="calendar" color={color} />,
           // Optional: If you want all tabs to have some base flex behavior
           //tabBarItemStyle: { flex: 1 }
        }}
      />
      <Tabs.Screen
        name="year"
        options={{
          title: 'Year',
          tabBarIcon: ({ color, focused }) => ( // 'focused' can be used to change style for active tab
            <Text style={{
              color: focused ? Colors[resolvedColorScheme].tint : color, // Use resolvedColorScheme
              fontSize: 18,
              fontWeight: focused ? 'bold' : 'normal',
              textAlign: 'center', // Ensures the text is centered within its available space
              // borderColor: 'green', // Optional: for debugging the Text component's own bounds
              // borderWidth: 1,
            }}>
              {currentYear}
            </Text>
          ),
          //tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          tabBarItemStyle: { // Styles the entire tab item (the touchable area)
            backgroundColor: 'lightblue', // For visualizing the tab item's area
            minWidth: 90, // Ensure the overall tab item has enough width. Adjust as needed.
                            // This should be wide enough for "2025" and the "Year" label.
            // borderColor: 'red', // For debugging
            // borderWidth: 1,
            // alignItems: 'stretch', // Could be useful but tabBarIconStyle is more direct
          },
          tabBarIconStyle: { // Styles the container View that wraps your Text component
            width: '100%',    // Make the icon's container take the full available width
            // OR you could try:
            // alignSelf: 'stretch', // If the parent uses alignItems: 'center', this might help
            // borderColor: 'purple', // Optional: for debugging the icon container's bounds
            // borderWidth: 1,
            // flexGrow: 1, // Optional: If the icon container needs to grow
          },
          // Optional: If the label itself needs styling (less likely the cause of "2025" cropping)
          // tabBarLabelStyle: {
          //   borderColor: 'orange',
          //   borderWidth: 1,
          // },
        }}
      />
      <Tabs.Screen
        name="life"
        options={{
          title: 'Life',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="table.fill" color={color} />,
           // Optional: If you want all tabs to have some base flex behavior
           //tabBarItemStyle: { flex: 1 }
        }}
      />
    </Tabs>
  );
}

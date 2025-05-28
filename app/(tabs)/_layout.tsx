import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const resolvedColorScheme = colorScheme ?? 'light';
  const { bottom } = useSafeAreaInsets(); // Get bottom inset

    // Get the current year dynamically
    // For example, if this code runs in 2025, currentYear will be "2025"
    // If it runs in 2026, currentYear will be "2026"
  
    const date = new Date(); // Creates a new Date object with the current date and time
    const currentYear = date.getFullYear().toString(); // Gets the full year and converts it to a string

    // For testing year
    // const dateForYear = new Date();
    // dateForYear.setFullYear(2028); 
//    const currentYear = dateForYear.getFullYear().toString(); // Gets the full year and converts it to a string

  
  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarActiveTintColor: Colors[resolvedColorScheme].tint,
        //tabBarInactiveTintColor: 'red', // Hard code setting of inactive tab icon/text color
        tabBarActiveBackgroundColor: 'lightblue',
        tabBarInactiveTintColor: Colors[resolvedColorScheme].icon,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute', // Keeps the tab bar floating
            // Add padding to the tab bar itself
            paddingBottom: 0, // Pushes content (icons/labels) up from the bottom edge of the bar
            paddingTop: 0,     // Adds space above the content, within the bar
            height: 65, 
            // You could also use paddingHorizontal if needed
            // paddingHorizontal: 10,
            // If you don't set a height, the bar's height will often grow with vertical padding.
            // If you set a fixed height, padding will be within that height.
            // height: 60, // Example: if you wanted a fixed height
          },
          default: { // For Android and other platforms
            // Add similar padding for consistency if desired
            paddingBottom: bottom, // Apply bottom inset as padding
            paddingTop: 0,
            height: 65 + bottom, // Adjust height to include padding
            // paddingHorizontal: 10,
            // height: 60, // Example: if you wanted a fixed height
          },
        }),

        tabBarLabelStyle: {
          fontSize: 14, // Adjust this value to your desired font size
          // borderColor: 'red',
          // borderWidth: 1,
          // You can add other text styles here too, e.g.:
          // fontWeight: '500',
          // paddingBottom: 2, // Adjust spacing if needed
        },
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
              fontSize: 20,
              //fontWeight: focused ? 'bold' : 'normal',
              fontWeight: 'bold',
              textAlign: 'center', // Ensures the text is centered within its available space
              // borderColor: 'green', // Optional: for debugging the Text component's own bounds
              // borderWidth: 1,
            }}>
              {currentYear}
            </Text>
          ),
          //tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          tabBarItemStyle: { // Styles the entire tab item (the touchable area)
            //backgroundColor: 'lightblue', // For visualizing the tab item's area
            //minWidth: 0, // Ensure the overall tab item has enough width. Adjust as needed.
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

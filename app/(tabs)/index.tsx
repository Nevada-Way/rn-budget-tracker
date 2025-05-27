import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, View } from 'react-native'; // View is still used for the separator

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView'; // We'll use this for our sections
import { Colors } from '@/constants/Colors'; // Make sure this path is correct
import { useCustomTheme } from '../../contexts/ThemeContext';

export default function HomeScreen() {
  const currentMonth = "June";
  const currentStatus = "On Budget";

  const { theme, setTheme } = useCustomTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    // Root container for the screen
    <ThemedView style={styles.screenContainer}>
      {/* Header Section */}
      <ThemedView style={styles.headerSection}>
        <View style={styles.headerTopRow}>
          <ThemedText type="title" style={styles.appNameText}>
            Budget Tracker
          </ThemedText>
          <TouchableOpacity onPress={toggleTheme} style={styles.toggleButton}>
            <ThemedText type="link">Switch to {theme === 'light' ? 'Dark' : 'Light'}</ThemedText>
          </TouchableOpacity>
        </View>
        
        <ThemedText style={styles.detailsText}>
          Month : {currentMonth}
        </ThemedText>
        <ThemedText style={styles.detailsText}>
          Status : {currentStatus}
        </ThemedText>
        <View style={[
          styles.separator,
          { backgroundColor: Colors[theme].icon }
        ]} />
      </ThemedView>

      {/* Body/Content Section */}
      <ThemedView style={styles.bodySection}>
        <ThemedText type="subtitle" style={styles.placeholderText}>
          Screen Monthly
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', // Ensure it takes full width of headerSection
    paddingHorizontal: 10, // Add some padding if headerSection doesn't have it
    paddingTop: 10, // Add some padding if headerSection doesn't have it
  },
  toggleButton: {
    padding: 8,
    // Add more styling if needed, e.g., borderRadius, backgroundColor
  },
  screenContainer: {
    flex: 1, // Make the screen container fill the entire screen
    // ThemedView will automatically apply the correct background color based on the theme
  },
  headerSection: {
    // This style is based on your previous headerContentContainer
    height: 200, // Define the fixed height for your header. Adjust as needed.
    // borderWidth: 2, // You can remove debug borders
    // borderColor: 'red', // You can remove debug borders
    paddingHorizontal: 16,
    paddingTop: 30,       // Padding from the top of the header section
    // justifyContent: 'flex-start', // Content flows from the top (default for column)
    // ThemedView will apply its own background (e.g., white in light mode)
  },
  appNameText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 6,
  },
  separator: {
    height: 1,
    width: '100%',
    marginTop: 10, // Space between the last text item and the separator
  },
  bodySection: {
    // This style is based on your previous scrollContentContainer
    flex: 1, // This makes the body section take up all remaining vertical space
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    // borderWidth: 2, // You can remove debug borders
    // borderColor: 'green', // You can remove debug borders
    // ThemedView will apply its own background
  },
  placeholderText: {
    fontSize: 30,
  },
});
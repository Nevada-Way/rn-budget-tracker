import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView'; // We'll use this for our sections
import { Colors } from '@/constants/Colors'; // Make sure this path is correct
import { IconSymbol } from '../../components/ui/IconSymbol';
import { useCustomTheme } from '../../contexts/ThemeContext';

import { BudgetTrack, getBudgetTrack } from '../services';



export default function HomeScreen() {


  /** 
   * ====================
   * Control for the Theme
   * ====================
    */
  const { theme, setTheme } = useCustomTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };


    /** 
   * ====================
   * Value for display of the budget tracker
   * ====================
    */

    const currentMonth = "June";
    const currentStatus = "On Budget";
    const budgetTrack : BudgetTrack = getBudgetTrack();
  

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
            <IconSymbol iconSet="materialCommunity" name="theme-light-dark" size={24} color={Colors[theme].text} />
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
        <ThemedView style={styles.topContainer}>
          {/* Content for top container can be added here later */}
        </ThemedView>
        <ThemedView style={styles.bottomContainer}>
          {/* Content for bottom container can be added here later */}
        </ThemedView>
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
    alignItems: 'center', // Center children horizontally
    // justifyContent: 'center', // Removed to stack from top
    padding: 20,
    // borderWidth: 2, // You can remove debug borders
    // borderColor: 'green', // You can remove debug borders
    // ThemedView will apply its own background
  },
  placeholderText: {
    fontSize: 30,
  },
  topContainer: {
    height: 120,
    width: '50%', // Takes 100% of the bodySection width
    borderColor: 'pink', // As per the image's highlight
    borderWidth: 2,
    marginBottom: 10, // Space between the two containers
    // backgroundColor: Colors[theme].surface, // Optional: if you want a themed background
  },
  bottomContainer: {
    height: 350,
    width: '50%', // Takes 100% of the bodySection width
    borderColor: 'pink', // As per the image's highlight
    borderWidth: 2,
    // backgroundColor: Colors[theme].surface, // Optional: if you want a themed background
  },
});
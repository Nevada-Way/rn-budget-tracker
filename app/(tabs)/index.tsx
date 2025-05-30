import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView'; // We'll use this for our sections
import { Colors } from '@/constants/Colors'; // Make sure this path is correct
import { IconSymbol } from '../../components/ui/IconSymbol';
import { useCustomTheme } from '../../contexts/ThemeContext';

import { BudgetTrack, getBudgetTrack } from '../../services';



export default function HomeScreen() {
  const { theme, setTheme } = useCustomTheme(); // Moved theme logic up for clarity
  const budgetTrack : BudgetTrack = getBudgetTrack(); // Moved budgetTrack up for clarity

  // Labels for the containers
  const labelTopContainer = "Added\nBudget";
  const labelBottomContainer = "Original\nBudget";

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
    // budgetTrack is now initialized earlier

    // Define base heights from styles
    const topContainerBaseHeight = styles.topContainer.height; // 130
    const bottomContainerBaseHeight = styles.bottomContainer.height; // 400

    // Determine if the top container section should be visible
    const showTopContainer = budgetTrack.b2 > 0 || budgetTrack.r2 > 0;

    // Calculate dynamic height for the bottom container
    let dynamicBottomContainerHeight = bottomContainerBaseHeight;
    if (!showTopContainer) {
      dynamicBottomContainerHeight += topContainerBaseHeight;
    }

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
        {/* Top Container with Label - Conditionally Rendered */}
        {showTopContainer && (
          <View style={styles.containerRowWrapperCentered}>
            <ThemedView style={styles.topContainer}>
              <View style={[styles.innerBox, styles.blueBox,  { flex: budgetTrack.b2 }]} />
              <View style={[styles.innerBox, styles.redBox,  { flex: budgetTrack.r2 }]} />
            </ThemedView>
            <ThemedText style={styles.labelText}>{labelTopContainer}</ThemedText>
          </View>
        )}

        {/* Bottom Container with Label */}
        <View style={styles.containerRowWrapperTopAligned}>
          <ThemedView style={[styles.bottomContainer, { height: dynamicBottomContainerHeight }]}>
            <View style={[styles.innerBox, styles.greenBoxBottom, { flex: budgetTrack.g }]} />
            <View style={[styles.innerBox, styles.redBoxBottom, { flex: budgetTrack.r }]} />
            <View style={[styles.innerBox, styles.whiteBoxBottom, { flex: budgetTrack.w }]} />
          </ThemedView>
          <ThemedText style={styles.labelText}>{labelBottomContainer}</ThemedText>
        </View>
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

// The tracker tower

  bodySection: {
    flex: 1,
    alignItems: 'center', // Center the container-row-wrappers horizontally
    padding: 20,
  },
  placeholderText: {
    fontSize: 30,
  },
  topContainer: {
    height: 130,
    width: '40%', // Takes 100% of the bodySection width
    borderColor: 'pink', // As per the image's highlight
    borderWidth: 2,
    marginBottom: 10, // Space between the top and bottom containers
    padding: 10, // Space between topContainer border and inner boxes
    justifyContent: 'flex-start', // Stack inner boxes from the top
    // alignItems: 'stretch', // Default, inner boxes will stretch if width is not set
                               // Since innerBox has width: '100%', this is fine.
    // backgroundColor: Colors[theme].surface, // Optional: if you want a themed background
  },
  bottomContainer: {
    height: 400,
    width: '40%', // User updated this from 100%
    borderColor: 'pink', // As per the image's highlight
    borderWidth: 2,
    padding: 10, // Space between bottomContainer border and inner boxes
    // backgroundColor: Colors[theme].surface, // Optional: if you want a themed background
    // No explicit justifyContent or alignItems needed if children use flex for height
    // and innerBox style handles width.
  },
  innerBox: {
    width: '100%', // Takes full width of the padded topContainer content area
    // Other common styles for these boxes if any
  },
  blueBox: {
    backgroundColor: 'lightblue',
    marginBottom: 5, // Space between blue and red boxes
  },
  redBox: {
    backgroundColor: 'red',
  },
  greenBoxBottom: {
    backgroundColor: 'green',
    marginBottom: 5, // Space between green and red boxes
  },
  redBoxBottom: {
    backgroundColor: 'red',
    marginBottom: 5, // Space between red and white boxes
  },
  whiteBoxBottom: {
    backgroundColor: 'white',
  },
  containerRowWrapperBase: { // Base style for row wrappers
    flexDirection: 'row',
    width: '100%', // Make the wrapper take full width of bodySection's content area
    marginBottom: 10, // Consistent spacing like topContainer had
  },
  containerRowWrapperCentered: {
    flexDirection: 'row',
    alignItems: 'center', // Vertically center items in the row (for top container)
    width: 'auto', // Let the content define the width, bodySection will center it
    marginBottom: 10, // Space between this row and the next
  },
  containerRowWrapperTopAligned: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align items to the top of the row (for bottom container)
    width: 'auto', // Let the content define the width, bodySection will center it
  },
  labelText: {
    fontSize: 20,
    marginLeft: 10, // Space between container and its label
    textAlign: 'left', // Ensure multi-line text aligns left
  },
});
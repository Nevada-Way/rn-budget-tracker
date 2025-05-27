import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { CustomThemeProvider, useCustomTheme } from '../contexts/ThemeContext';

import 'react-native-reanimated';


function AppContent() {
  const { theme } = useCustomTheme(); // Get the dynamic theme from context

  return (
    <NavigationThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  
  const appForcedColorScheme = 'dark'; // Hardcoded theme

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }


  return (
    <CustomThemeProvider forcedTheme={appForcedColorScheme}>
      <AppContent />
    </CustomThemeProvider>
  );
}

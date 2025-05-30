/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = 'red';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#AAAAAA',
    tabIconSelected: tintColorLight,
    textInGreenBox: '#FFFFFF', // White text on green box
    textInRedBox: '#000000',   // White text on red box
    textInWhiteBox: '#000000', // Black text on white box
    textInBlueBox: '#000000',  // Black text on lightblue box
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#DDDDDD',
    tabIconSelected: tintColorDark,
    textInGreenBox: '#FFFFFF', // White text on green box (assuming green is not too light)
    textInRedBox: '#000000',   // White text on red box
    textInWhiteBox: '#000000', // Black text on white box (white box is always white)
    textInBlueBox: '#000000',  // Black text on lightblue box (lightblue is always lightblue)
  },
};

// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

// Mapping for SF Symbols to MaterialIcons
type IconMappingSFToMaterial = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolNameSF = keyof typeof MAPPING_SF_TO_MATERIAL;

// Base props shared by all icon types
interface IconSymbolPropsBase {
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight; // Primarily for SF Symbols, may not apply to others
}

// Props for SF Symbol to MaterialIcons mapping
interface IconSymbolSFProps extends IconSymbolPropsBase {
  iconSet?: 'sfToMaterial'; // Default icon set
  name: IconSymbolNameSF;
}

// Props for MaterialCommunityIcons
interface IconSymbolCommunityProps extends IconSymbolPropsBase {
  iconSet: 'materialCommunity';
  name: ComponentProps<typeof MaterialCommunityIcons>['name'];
}

// Combined props type using a discriminated union
type IconSymbolProps = IconSymbolSFProps | IconSymbolCommunityProps;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the 
 * (1) https://developer.apple.com/design/human-interface-guidelines/sf-symbols
 * (2) [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING_SF_TO_MATERIAL = {
  'calendar': 'calendar-month',
  'table.fill': 'list-alt',
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
} as IconMappingSFToMaterial;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol(props: IconSymbolProps) {
  const { size = 24, color, style } = props; // Common props

  if (props.iconSet === 'materialCommunity') {
    // Type assertion for name is safe due to discriminated union
    return <MaterialCommunityIcons color={color} size={size} name={props.name as ComponentProps<typeof MaterialCommunityIcons>['name']} style={style} />;
  } 
  
  // Default to 'sfToMaterial' if iconSet is undefined or 'sfToMaterial'
  // Type assertion for name is safe due to discriminated union
  const materialIconName = MAPPING_SF_TO_MATERIAL[props.name as IconSymbolNameSF];
  if (!materialIconName) {
    console.warn(`IconSymbol: No MaterialIcons mapping found for SF Symbol '${props.name}'. Ensure it's in MAPPING_SF_TO_MATERIAL or specify correct iconSet.`);
    return null; // Or a default fallback icon
  }
  return <MaterialIcons color={color} size={size} name={materialIconName} style={style} />;
}

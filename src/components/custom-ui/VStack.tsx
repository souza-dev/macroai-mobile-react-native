import React, { ComponentProps } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

interface VStackProps extends ComponentProps<typeof View> {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  spacing?: number;
  color?: string;
}
export default function VStack({
  children,
  style,
  spacing = 0,
  color = "transparent",
}: VStackProps) {
  return (
    <View style={[{ gap: spacing, backgroundColor: color }, style]}>
      {children}
    </View>
  );
}

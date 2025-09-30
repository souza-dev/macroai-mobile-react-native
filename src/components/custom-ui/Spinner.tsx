import React from "react";
import { ActivityIndicator, StyleProp, ViewStyle } from "react-native";

interface SpinnerProps {
  size?: "small" | "large" | number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = "small",
  color = "#000",
  style,
}) => {
  return <ActivityIndicator size={size} color={color} style={style} />;
};

export default Spinner;

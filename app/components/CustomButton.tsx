import { Image as ExpoImage } from "expo-image";
import React, { useEffect, useRef } from "react";
import { ActivityIndicator, Animated, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../providers/theme_provider"; // Import useTheme
import { Colors } from "../constants/Colors"; // Import Colors

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  icon?: string | { uri: string } | number; // Accepts string, object with uri, or number for local images
  loading?: boolean;
  disabled?: boolean;
  variant?: "filled" | "outline"; // Future use
  size?: "small" | "medium" | "large"; // Future use
};

export const CustomButton = ({
  title,
  onPress,
  icon,
  loading = false,
  disabled = false,
}: CustomButtonProps) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const { theme } = useTheme(); // Use the theme hook

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: loading ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [loading, slideAnim]);

  
  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 24],
  });

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors[theme].semantic.primaryBlue, // Use themed primary blue
        borderRadius: 9999,
        paddingVertical: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        width: "100%",
        height: 72,
        opacity: disabled ? 0.5 : 1,
      }}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <Animated.View style={{ opacity: slideAnim, marginRight: loading ? 8 : 0 }}>
          {loading && <ActivityIndicator color={Colors[theme].text} />}
        </Animated.View>
        <Animated.View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            transform: [{ translateX }],
          }}
        >
          {icon && <View style={{ marginRight: 8 }}><ExpoImage source={icon} style={{ width: 20, height: 20, tintColor: Colors[theme].text }} /></View>}
          <Text style={{ color: Colors[theme].text, fontWeight: "bold", fontSize: 18 }}>{title}</Text>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
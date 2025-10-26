import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export type BottomTabsProps = {
  active?: "home" | "clock" | "person";
  onSelect?: (key: "home" | "clock" | "person") => void;
};

export default function BottomTabs({ active = "home", onSelect }: BottomTabsProps) {
  const makeTab = (
    key: "home" | "clock" | "person",
    iconActive: string,
    iconInactive: string
  ) => {
    const isActive = active === key;
    return (
      <Pressable
        key={key}
        style={[styles.tab, isActive && styles.tabActive]}
        onPress={() => onSelect?.(key)}
      >
        <Ionicons
          name={isActive ? iconActive : iconInactive}
          size={22}
          color={isActive ? "#2563EB" : "#BDBDBD"}
        />
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {makeTab("home", "home", "home-outline")}
      {makeTab("clock", "time", "time-outline")}
      {makeTab("person", "person", "person-outline")}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 24,
    bottom: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 28,
    backgroundColor: "rgba(0,0,0,0.04)",
    // subtle iOS shadow
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    // Android elevation
    elevation: 2,
  },
  tab: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  tabActive: {
    backgroundColor: "rgba(37,99,235,0.12)", // blue tint for active
  },
});
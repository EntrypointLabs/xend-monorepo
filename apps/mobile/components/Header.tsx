import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
  showBackButton?: boolean;
}

export default function Header({ title, onBackPress, showBackButton = true }: HeaderProps) {
  return (
    <View style={styles.header}>
      {showBackButton ? (
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      ) : (
        <View style={styles.headerSpacer} />
      )}
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.headerSpacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  headerSpacer: {
    width: 40,
  },
});
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function SuccessPage() {
  const router = useRouter();
  const params = useLocalSearchParams<{ amount?: string }>();
  const amountDisplay = params.amount ? `$${params.amount}` : "$0";

  const handleDone = () => {
    router.replace("/dashboard");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="checkmark" size={48} color="#001733" />
        </View>
        <Text style={styles.subtitle}>Successfully sent</Text>
        <Text style={styles.amount}>{amountDisplay}</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001733",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircle: {
    width: 94,
    height: 94,
    borderRadius: 47,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  subtitle: {
    color: "white",
    fontSize: 16,
    marginTop: 4,
  },
  amount: {
    color: "#71B0FF",
    fontSize: 32,
    fontWeight: "700",
    marginTop: 12,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  doneButton: {
    backgroundColor: "#115EBF",
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  doneText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
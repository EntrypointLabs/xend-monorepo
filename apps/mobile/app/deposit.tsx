import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import * as Clipboard from "expo-clipboard";
import Header from "../components/Header";

export default function DepositPage() {
  const router = useRouter();
  const [address] = useState("0x1765a9b2c3d4e5f6789012345678901234567890");

  const formatAddress = (addr: string) => {
    if (addr.length <= 10) return addr;
    return `${addr.slice(0, 6)}...${addr.slice(-6)}`;
  };

  const handleBackPress = () => {
    router.back();
  };

  const handleCopyAddress = async () => {
    try {
      await Clipboard.setStringAsync(address);
      Alert.alert("Success", "Address has been copied successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to copy address to clipboard");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.gradient}>
        <Header title="Deposit" onBackPress={handleBackPress} />

        <Image source={require("../assets/portal_light.png")} style={styles.glow} resizeMode="contain" />

        <Image source={require("../assets/icons/floating_coins.png")} style={styles.floatingCoins} resizeMode="contain" />

        <View style={styles.content}>
          <View style={styles.mainIconContainer}>
            <View style={styles.mainIcon}>
              <Ionicons name="diamond" size={28} color="#3B82F6" />
            </View>
          </View>

          <Text style={styles.mainTitle}>Send USDC on Solana to this</Text>
          <Text style={styles.mainTitle}>deposit address</Text>

          <TouchableOpacity style={styles.addressButton} onPress={handleCopyAddress}>
            <Text style={styles.addressText}>{formatAddress(address)}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.copyButton} onPress={handleCopyAddress}>
            <Text style={styles.copyButtonText}>Copy Address</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.requestButton}>
            <Text style={styles.requestButtonText}>Request Payment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  gradient: {
    flex: 1,
    position: "relative",
    backgroundColor: "black",
  },

  glow: {
    position: "absolute",
    top: -30,
    left: 150,
    opacity: 1,
  },
  floatingCoins: {
    position: "absolute",
    top: 80,
    left: "50%",
    transform: [{ translateX: -50 }],
    width: 120,
    height: 120,
    zIndex: 5,
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    zIndex: 10,
  },
  mainIconContainer: {
    marginBottom: 40,
  },
  mainIcon: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 24,
  },
  addressButton: {
    backgroundColor: "#0757BB",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    marginTop: 32,
    minWidth: 200,
    alignItems: "center",
  },
  addressText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  bottomButtons: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 12,
    zIndex: 10,
  },
  copyButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  copyButtonText: {
    color: "#001733",
    fontSize: 16,
    fontWeight: "600",
  },
  requestButton: {
    flex: 1,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  requestButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
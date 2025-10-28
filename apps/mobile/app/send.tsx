import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import ApprovalSheet from "../components/ApprovalSheet";
import Header from "../components/Header";
import UsdcIcon from "../assets/icons/usdc.svg";
import SwapIcon from "../assets/icons/arrow-swap-horizontal.svg";

export default function SendPage() {
  const router = useRouter();
  const [amount, setAmount] = useState<string>("");
  const availableUsd = 1796.93;

  const [isSheetOpen, setSheetOpen] = useState(false);
  const openSheet = () => setSheetOpen(true);
  const closeSheet = () => setSheetOpen(false);

  const handleBackPress = () => {
    router.back();
  };

  const handleMax = () => {
    setAmount(String(availableUsd));
  };

  const handleKeyPress = (key: string) => {
    setAmount((prev) => {
      if (key === "backspace") {
        return prev.slice(0, -1);
      }
      if (key === ".") {
        if (prev.includes(".")) return prev; // single decimal
        return prev ? prev + "." : "0."; // start decimal
      }
      // digit
      if (prev === "0" && key !== ".") return key; // avoid leading zeros
      return prev + key;
    });
  };

  const displayAmount = useMemo(() => {
    if (!amount) return "0";
    if (amount === ".") return "0.";

    const hasDot = amount.includes(".");
    const [intStr, fracStr = ""] = amount.split(".");
    const intNum = Number(intStr || "0");
    const intFormatted = Intl.NumberFormat("en-US").format(isNaN(intNum) ? 0 : intNum);

    if (!hasDot) return intFormatted;
    return fracStr === "" ? `${intFormatted}.` : `${intFormatted}.${fracStr}`;
  }, [amount]);

  const usdcEquivalent = useMemo(() => {
    // Assume 1 USDC = 1 USD for now
    const n = Number(amount);
    if (!amount || isNaN(n)) return "0.000000 USDC";
    return `${n.toFixed(6)} USDC`;
  }, [amount]);

  const keypad = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "backspace"];

  const canProceed = !!amount && amount !== "." && Number(amount) > 0;

  const handleApprove = () => {
    closeSheet();
    router.push({ pathname: "/success", params: { amount: displayAmount } });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <Header title="Send" onBackPress={handleBackPress} color="#111827" />

      <View style={styles.content}>
        <View style={styles.amountContainer}>
        <View style={styles.amountRow}>
          <View style={styles.amountLeft}>
            <Text style={styles.amountValue}>{displayAmount}</Text>
            <Text style={styles.amountCurrency}>USD</Text>
          </View>
          <TouchableOpacity style={styles.maxPill} onPress={handleMax}>
            <Text style={styles.maxPillText}>Max</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.usdcSmallRow}>
          <SwapIcon width={24} height={24} />
          <Text style={styles.usdcSmallText}>{usdcEquivalent}</Text>
        </View>
        </View>

        <View style={styles.tokenRow}>
          <View style={styles.tokenLeft}>
            <UsdcIcon width={24} height={24} />
            <Text style={styles.tokenLabel}>USDC</Text>
          </View>

          <View style={styles.tokenRight}>
            <Text style={styles.balanceText}>${Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(availableUsd)}</Text>
            <Text style={styles.balanceSubText}>Available</Text>
          </View>
        </View>

        <View style={styles.keypad}>
          {keypad.map((k) => (
            <TouchableOpacity
              key={k}
              style={styles.key}
              onPress={() => handleKeyPress(k)}
            >
              {k === "backspace" ? (
                <Ionicons name="backspace-outline" size={22} color="#111827" />
              ) : (
                <Text style={styles.keyText}>{ k}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={[styles.nextButton, !canProceed && styles.nextButtonDisabled]} disabled={!canProceed} onPress={openSheet}>
          <Text style={[styles.nextButtonText, !canProceed && styles.nextButtonTextDisabled]}>Next</Text>
        </TouchableOpacity>
      </View>

      <ApprovalSheet
        visible={isSheetOpen}
        onRequestClose={closeSheet}
        amountDisplay={displayAmount}
        recipientHandle="@recipient"
        recipientAddress="0x765...B8164f"
        onApprove={handleApprove}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  amountContainer: {
    marginTop: 70,
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  amountLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  amountValue: {
    color: "#111827",
    fontSize: 32,
    fontWeight: "800",
  },
  amountCurrency: {
    color: "rgba(0,0,0,0.4)",
    fontSize: 32,
    fontWeight: "800",
  },
  maxPill: {
    backgroundColor: "#F3F3F3",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  maxPillText: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "500",
  },
  usdcSmallRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  usdcSmallText: {
    color: "#115EBF",
    fontSize: 14,
    fontWeight: "600",
  },
  tokenRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "auto",
  },
  tokenLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  tokenLabel: {
    color: "black",
    fontSize: 16,
    fontWeight: "500",
  },
  tokenRight: {
    alignItems: "flex-end",
  },
  balanceText: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "600",
  },
  balanceSubText: {
    color: "rgba(0,0,0,0.4)",
    fontSize: 12,
  },
  keypad: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    columnGap: 16,
    rowGap: 16,
    marginTop:36,
    marginBottom: 30
  },
  key: {
    width: "30%",
    minHeight: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  keyText: {
    color: "black",
    fontSize: 30,
    fontWeight: "600",
  },
  nextButton: {
    backgroundColor: "#115EBF",
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: "center",
    marginBottom: 24,
  },
  nextButtonDisabled: {
    backgroundColor: "#BFD4F5",
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  nextButtonTextDisabled: {
    color: "#FFFFFF",
    opacity: 0.8,
  },

  // Bottom sheet styles
  sheetWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1000,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#0A2244",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sheetHeaderIcons: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    gap: 12,
    marginTop: 8,
  },
  sheetIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#17365F",
    alignItems: "center",
    justifyContent: "center",
  },
  sheetSwapIcon: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 6,
  },
  sheetRecipientCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  sheetContent: {
    marginTop: 16,
    paddingHorizontal: 4,
  },
  sheetRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  sheetLabel: {
    color: "#BFD4F5",
    fontSize: 14,
    fontWeight: "500",
  },
  sheetValue: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  sheetSubValue: {
    color: "#BFD4F5",
    fontSize: 12,
    marginTop: 4,
  },
  sheetDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginVertical: 8,
  },
  slideButton: {
    marginTop: 18,
    backgroundColor: "#115EBF",
    borderRadius: 28,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginHorizontal: 12,
    marginBottom: 12,
  },
  slideButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
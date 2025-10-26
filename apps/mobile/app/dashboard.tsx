import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ActionCard from "../components/ActionCard";
import BottomTabs from "../components/BottomTabs";
import CashIcon from "../assets/icons/cash.svg";
import MoneySendIcon from "../assets/icons/money-send.svg";
import MoneyChangeIcon from "../assets/icons/money-change.svg";
import ReceiptDiscountIcon from "../assets/icons/receipt-discount.svg";

export default function DashboardPage() {
  const router = useRouter();

  const handleCashPress = () => {
    router.push("/deposit");
  };

  const handleTransferPress = () => {
    // TODO: Navigate to transfer screen
    console.log("Transfer pressed");
  };

  const handleSwapPress = () => {
    // TODO: Navigate to swap screen
    console.log("Swap pressed");
  };

  const handleBulkTransferPress = () => {
    // TODO: Navigate to bulk transfer screen
    console.log("Bulk Transfer pressed");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Image source={require("../assets/avi.png")} style={styles.avatar} />
          <Text style={styles.address}>Agi6lMy...mFio</Text>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceValue}>$0<Text style={styles.balanceValueDecimal}>.00</Text></Text>
        </View>

        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Your wallet is empty</Text>
          <Text style={styles.emptySubtitle}>Deposit funds to start sending tokens{"\n"}seamlessly</Text>
        </View>

        <View style={styles.grid}>
          <ActionCard
            color="#389BFF"
            icon={<MoneySendIcon width={24} height={24} />}
            title="Cash"
            subtitle="Deposit crypto"
            onPress={handleCashPress}
          />
          <ActionCard
            color="#FF4838"
            icon={<MoneySendIcon width={24} height={24} />}
            title="Transfer"
            subtitle="Transfer crypto"
            onPress={handleTransferPress}
          />
          <ActionCard
            color="#FFA238"
            icon={<MoneyChangeIcon width={24} height={24} />}
            title="Swap"
            subtitle="Swap crypto"
            onPress={handleSwapPress}
          />
          <ActionCard
            color="#6638FF"
            icon={<ReceiptDiscountIcon width={24} height={24} />}
            title="Bulk Transfer"
            subtitle="Bulk transfer crypto"
            onPress={handleBulkTransferPress}
          />
        </View>
      </ScrollView>
      <BottomTabs active="home" />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 112,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 8,
    marginBottom: 16,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 5,
    backgroundColor: "#D1D5DB",
    overflow: "hidden",
  },
  address: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "600",
  },
  balanceCard: {
    padding: 16,
    marginBottom: 20,
  },
  balanceLabel: {
    color: "rgba(0,0,0,0.4)",
    fontSize: 18,
    marginBottom: 8,
  },
  balanceValue: {
    color: "#111827",
    fontSize: 34,
    fontWeight: "800",
  },
  balanceValueDecimal: {
    color: "rgba(0,0,0,0.4)",
  },
  emptyState: {
    alignItems: "center",
    marginBottom: 20,
  },
  emptyTitle: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 8,
  },
  emptySubtitle: {
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 16,
  },
});
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ActionCard from "../components/ActionCard";

export default function DashboardPage() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header with avatar and address */}
        <View style={styles.headerRow}>
          <Image source={require("../assets/avi.png")} style={styles.avatar} />
          <Text style={styles.address}>Agi6lMy...mFio</Text>
        </View>

        {/* Balance card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceValue}>$0<Text style={styles.balanceValueDecimal}>.00</Text></Text>
        </View>

        {/* Empty state */}
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Your wallet is empty</Text>
          <Text style={styles.emptySubtitle}>Deposit funds to start sending tokens{ "\n" }seamlessly</Text>
        </View>

        {/* Action grid (4 cards) */}
        <View style={styles.grid}>
          <ActionCard
            color="#389BFF"
            iconSource={require("../assets/icons/cash.png")}
            title="Cash"
            subtitle="Deposit crypto"
          />
          <ActionCard
            color="#FF4838"
            iconSource={require("../assets/icons/money-send.png")}
            title="Transfer"
            subtitle="Transfer crypto"
          />
          <ActionCard
            color="#FFA238"
            iconSource={require("../assets/icons/money-change.png")}
            title="Swap"
            subtitle="Swap crypto"
          />
          <ActionCard
            color="#6638FF"
            iconSource={require("../assets/icons/receipt-discount.png")}
            title="Bulk Transfer"
            subtitle="Bulk transfer crypto"
          />
        </View>
      </ScrollView>
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
    paddingBottom: 24,
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
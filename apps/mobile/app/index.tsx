import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const router = useRouter();

  const handleSignIn = () => {
+    router.push("/dashboard");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Top logo */}
      <SafeAreaView style={styles.header}>
        <Image source={require("../assets/logo_white.png")} style={styles.logo} resizeMode="contain" />
      </SafeAreaView>

      {/* Glow background art */}
      <Image source={require("../assets/portal_light2.png")} style={styles.glow} resizeMode="contain" />

      {/* Bottom content */}
      <View style={styles.bottomContent}>
        <Text style={styles.title}>Empower the Future of{"\n"}Finance</Text>
        <Text style={styles.subtitle}>Deposit funds to start sending tokens seamlessly</Text>

        <Pressable onPress={handleSignIn} style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed] }>
          <View style={styles.ctaInner}>
            <Image source={require("../assets/bi_twitter-x.png")} style={styles.ctaIcon} />
            <Text style={styles.ctaText}>Sign in with twitter</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  logo: {
    width: 40,
    height: 40,
  },
  glow: {
    position: "absolute",
    top: 56,
    left: 50,
    height: 480,
    opacity: 1,
  },
  bottomContent: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 24,
    paddingBottom: 73,
    gap: 16,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
    lineHeight: 28,
  },
  subtitle: {
    color: "#9CA3AF",
    fontSize: 16,
  },
  cta: {
    marginTop: 40,
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  ctaPressed: {
    opacity: 0.95,
  },
  ctaInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 12,
  },
  ctaIcon: {
    width: 20,
    height: 20,
    tintColor: "#000",
  },
  ctaText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
  },
});

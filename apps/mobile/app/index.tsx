import { StyleSheet, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function Page() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Xend</Text>
        <Pressable onPress={() => router.push("/transfer")}> 
          <Text style={styles.link}>Go to Transfer →</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  link: {
    marginTop: 16,
    fontSize: 18,
    color: "#1D4ED8",
  },
});

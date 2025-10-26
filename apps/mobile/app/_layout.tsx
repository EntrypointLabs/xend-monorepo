import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen name="index" options={{ title: "Xend" }} />
      <Stack.Screen name="transfer" options={{ title: "Transfer" }} />
    </Stack>
  );
}
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="dashboard"
        options={{
          headerShown: false,
          title: "Dashboard",
          headerTitleAlign: "center",
          animation: "fade"
        }}
      />
      <Stack.Screen
        name="deposit"
        options={{
          headerShown: false,
          title: "Deposit",
          headerTitleAlign: "center",
          animation: "slide_from_right"
        }}
      />
    </Stack>
  );
}
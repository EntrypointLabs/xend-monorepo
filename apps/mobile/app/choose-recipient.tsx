import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import ScanBarcodeIcon from "../assets/icons/scan-barcode.svg";
import UserSearchIcon from "../assets/icons/user-search.svg";
import { useRouter } from "expo-router";
import { useState } from "react";
import Header from "../components/Header";

export default function ChooseRecipientPage() {
  const router = useRouter();
  const [recipientInput, setRecipientInput] = useState("");
  const [inputFocused, setInputFocused] = useState(false);

  const handleBackPress = () => {
    router.back();
  };

  const handleNext = () => {
    console.log("Next pressed with input:", recipientInput);
    router.push({
      pathname: "/send",
      params: {
        recipient: recipientInput,
      }
    })
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <Header 
        title="Choose recipient" 
        onBackPress={handleBackPress}
        color="#111827"
        showBackButton={true}
      />

      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <View style={[styles.inputWrapper, inputFocused && styles.inputWrapperFocused]}>
            <UserSearchIcon width={24} height={24} />
            <TextInput
              style={styles.textInput}
              placeholder="Twitter, SNS address"
              placeholderTextColor="#9CA3AF"
              value={recipientInput}
              onChangeText={setRecipientInput}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
            />
              <ScanBarcodeIcon width={24} height={24} />
          </View>
        </View>

        <Text style={styles.descriptionText}>
          You can submit the recipients twitter{"\n"}username or provide a solana wallet address
        </Text>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  inputWrapperFocused: {
    borderColor: "#115EBF",
  },
  iconContainer: {
    marginRight: 12,
  },
  textInput: {
    marginHorizontal: 12,
    flex: 1,
    fontSize: 16,
    color: "#111827",
    fontWeight: "400",
  },
  descriptionText: {
    fontSize: 16,
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 25,
  }, 
  nextButton: {
    backgroundColor: "#115EBF",
    borderRadius: 100,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 40,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
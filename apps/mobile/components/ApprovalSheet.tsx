import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import Animated, { useSharedValue, withTiming, useAnimatedStyle, interpolate, runOnJS } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import UsdcIcon from "../assets/icons/usdc.svg";

interface ApprovalSheetProps {
  visible: boolean;
  onRequestClose: () => void;
  amountDisplay: string;
  recipientHandle: string;
  recipientAddress: string;
  onApprove?: () => void;
}

const ApprovalSheet: React.FC<ApprovalSheetProps> = ({
  visible,
  onRequestClose,
  amountDisplay,
  recipientHandle,
  recipientAddress,
  onApprove,
}) => {
  const translateY = useSharedValue(420);

  useEffect(() => {
    translateY.value = withTiming(visible ? 0 : 420, { duration: 250 });
  }, [visible]);

  const sheetAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const formatAddress = (addr: string) =>
    addr && addr.length > 10 ? `${addr.slice(0, 6)}...${addr.slice(-6)}` : addr;

  const x = useSharedValue(0);
  const maxX = useSharedValue(0);
  const startX = useSharedValue(0);
  const KNOB = 52;
  const [trackWidth, setTrackWidth] = React.useState(0);

  useEffect(() => {
    if (trackWidth) {
      maxX.value = Math.max(0, trackWidth - KNOB);
    }
  }, [trackWidth]);

  const knobStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }],
  }));

  const labelStyle = useAnimatedStyle(() => ({
    opacity: interpolate(x.value, [0, maxX.value || 1], [0.6, 0.1]),
  }));

  const pan = Gesture.Pan()
    .onBegin(() => {
      startX.value = x.value;
    })
    .onUpdate((e) => {
      const next = Math.min(Math.max(startX.value + e.translationX, 0), maxX.value || 0);
      x.value = next;
    })
    .onEnd(() => {
      const threshold = (maxX.value || 0) * 0.85;
      if (x.value >= threshold && (maxX.value || 0) > 0) {
        x.value = withTiming(maxX.value || 0, { duration: 150 });
        if (onApprove) runOnJS(onApprove)();
      } else {
        x.value = withTiming(0, { duration: 150 });
      }
    });

  if (!visible) return null;

  return (
    <View style={styles.wrapper}>
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <Animated.View style={[styles.sheet, sheetAnimatedStyle]}>
        <View style={styles.headerIcons}>
          <View style={styles.iconCircle}>
            <UsdcIcon width={28} height={28} />
          </View>
          <View style={styles.swapIcon}>
            <Ionicons name="swap-horizontal" size={18} color="#FFFFFF" />
          </View>
          <View style={styles.recipientCircle}>
            <Ionicons name="person" size={22} color="#0A2244" />
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.label}>To</Text>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.value}>{recipientHandle}</Text>
              <Text style={styles.subValue}>{formatAddress(recipientAddress)}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Amount</Text>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.value}>{amountDisplay} USDC</Text>
              <Text style={styles.subValue}>${amountDisplay}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Network fee</Text>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.value}>0.00002 USDC</Text>
              <Text style={styles.subValue}>$0.00002</Text>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Total</Text>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.value}>{amountDisplay || "0"}.00002 USDC</Text>
              <Text style={styles.subValue}>${amountDisplay || "0"}.00002</Text>
            </View>
          </View>
        </View>

        <View
          style={styles.slideButton}
          onLayout={(e) => {
            setTrackWidth(e.nativeEvent.layout.width);
          }}
        >
          <GestureDetector gesture={pan}>
            <Animated.View style={[styles.slideKnob, knobStyle]}>
              <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
            </Animated.View>
          </GestureDetector>
          <Animated.Text style={[styles.slideButtonText, labelStyle]}>Slide to approve</Animated.Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
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
    backgroundColor: "#001733",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    gap: 12,
    marginTop: 8,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#17365F",
    alignItems: "center",
    justifyContent: "center",
  },
  swapIcon: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 6,
  },
  recipientCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    marginVertical: 20,
    paddingHorizontal: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  label: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  value: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  subValue: {
    color: "#BFD4F5",
    fontSize: 12,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginVertical: 8,
  },
  slideButton: {
    marginTop: 18,
    backgroundColor: "#023370",
    borderRadius: 28,
    height: 56,
    paddingHorizontal: 0,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
    position: "relative",
    overflow: "hidden",
  },
  slideKnob: {
    position: "absolute",
    left: 0,
    top: 2,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#0D56CF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  slideButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "300",
  },
});

export default ApprovalSheet;
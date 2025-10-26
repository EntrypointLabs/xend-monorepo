import { Pressable, View, Text, Image, StyleSheet } from "react-native";
import type { ImageSourcePropType } from "react-native";

export type ActionCardProps = {
  color: string;
  iconSource: ImageSourcePropType;
  title: string;
  subtitle: string;
  onPress?: () => void;
};

export default function ActionCard({ color, iconSource, title, subtitle, onPress }: ActionCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={[styles.cardIconWrap, { backgroundColor: color }]}> 
          <Image source={iconSource} style={styles.cardIconImg} resizeMode="contain" />
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    borderWidth: 1,
    borderColor: "#C4C4C4",
    borderStyle: "dashed",
    backgroundColor: "rgba(243,243,243,0.4)",
    borderRadius: 16,
    padding: 16,
  },
  cardIconWrap: {
    marginBottom: 40,
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  cardIcon: {
    width: 28,
    height: 28,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  cardIconImg: {
    width: 24,
    height: 24,
  },
  cardTitle: {
    color: "black",
    fontSize: 16,
    fontWeight: "500",
  },
  cardSubtitle: {
    color: "#B3B3B3",
    fontSize: 14,
    marginTop: 4,
  },
});
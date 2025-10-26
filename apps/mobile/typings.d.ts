declare module "@expo/vector-icons" {
  export const Ionicons: any;
}

declare module "@expo/vector-icons/Ionicons" {
  const Ionicons: any;
  export default Ionicons;
}

declare module "*.svg" {
  import React from "react";
  const content: React.ComponentType<{
    width?: number;
    height?: number;
    color?: string;
    style?: any;
  }>;
  export default content;
}
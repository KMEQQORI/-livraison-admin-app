import Constants from "expo-constants";
import { Platform } from "react-native";

export const margins = {
  noBarMargin: {
    marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
  },
};

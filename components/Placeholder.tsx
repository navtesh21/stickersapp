import { View, Text, Image } from "react-native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { images } from "@/constants";

const Placeholder = () => {
  return (
    <GestureHandlerRootView>
      <Image
        resizeMode="cover"
        className="w-full h-full rounded-xl "
        source={images.placeholder}
      />
    </GestureHandlerRootView>
  );
};

export default Placeholder;

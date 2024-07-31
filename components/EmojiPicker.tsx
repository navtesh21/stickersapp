import { View, Text, Modal, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

type props = {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const EmojiPicker = ({ isVisible, onClose, children }: props) => {
  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View className="bg-[#B5C0D0] w-full h-[30%] absolute bottom-1 rounded-b-lg">
        <View className="flex-row justify-between bg-[#474E68] p-3 rounded-b-2xl ">
          <Text className="text-lg font-semibold text-white">
            Choose a sticker
          </Text>
          <TouchableOpacity onPress={onClose} className="text-xl">
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
        {children}
      </View>
    </Modal>
  );
};

export default EmojiPicker;

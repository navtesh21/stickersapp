import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";

import { images } from "@/constants";
import EmojiSticker from "./EmojiSticker";

type props = {
  onClose: () => void;
  setpickedEmoji: (item: any) => void;
};

const EmojiList = ({ onClose, setpickedEmoji }: props) => {
  const [data, setData] = useState([
    images.sticker1,
    images.sticker2,
    images.sticker3,
    images.sticker4,
    images.sticker5,
  ]);
  return (
    <FlatList
      horizontal
      data={data}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            onClose();
            setpickedEmoji(item);
          }}
        >
          <Image
            source={item}
            className="h-16 w-16 "
            resizeMode="contain"
          ></Image>
        </TouchableOpacity>
      )}
    />
  );
};

export default EmojiList;

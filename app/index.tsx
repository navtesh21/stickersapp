import EmojiList from "@/components/EmojiList";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiSticker from "@/components/EmojiSticker";
import { images } from "@/constants";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Index() {
  const [visible, setVisible] = useState(false);
  const [pickedemoji, setpickedEmoji] = useState(null);
  const [focus, setFocus] = useState(false);

  const onClose = () => {
    setVisible(false);
  };

  return (
    <SafeAreaView className="bg-[#161622] h-full">
      <GestureHandlerRootView>
        <TouchableOpacity
          onPress={() => setFocus(false)}
          activeOpacity={1}
          className="  h-[70vh] rounded-lg   m-7 relative"
        >
          <View className="flex justify-center items-center">
            <Image
              resizeMode="cover"
              className="w-full h-full rounded-xl "
              source={images.placeholder}
            />

            {pickedemoji && (
              <TouchableOpacity
                activeOpacity={1}
                className="absolute m-2 "
                onPress={() => setFocus(true)}
              >
                <EmojiSticker
                  source={pickedemoji}
                  imagesize="16"
                  setFocused={setFocus}
                  focused={focus}
                  DelEmoji={setpickedEmoji}
                />
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>

        <View className="flex justify-center items-center relative">
          {visible ? (
            <EmojiPicker
              isVisible={visible}
              onClose={onClose}
              children={
                <EmojiList onClose={onClose} setpickedEmoji={setpickedEmoji} />
              }
            />
          ) : null}
          <TouchableOpacity
            onPress={() => {
              setVisible(!visible);
            }}
            activeOpacity={0.7}
            className="px-4 bg-white  h-20 w-20 items-center flex justify-center rounded-full"
          >
            <AntDesign name="plus" size={32} color="black" />
          </TouchableOpacity>
        </View>
      </GestureHandlerRootView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}


import React, { useEffect,} from "react";
import Animated from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,

} from "react-native-reanimated";


import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
;

type props = {
  imagesize: string;
  source: any;
  setFocused: (text: boolean) => void;
  focused: boolean;
  DelEmoji: (item: any) => void;
};

const EmojiSticker = ({
  source,
  imagesize,
  setFocused,
  focused,
  DelEmoji,
}: props) => {
  console.log(focused);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const isSelected = useSharedValue(false);
  const initialAngle = useSharedValue(0);

  useEffect(() => {
    setFocused(false);
    translateX.value = 0;
    translateY.value = 0;
    scale.value = 1;
    rotation.value = 0;
  }, [source]);

  const startScale = useSharedValue(1);
  const startRotation = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      isSelected.value = true;
    })
    .onChange((event) => {
      translateX.value += event.changeX;
      translateY.value += event.changeY;
    })
    .onEnd(() => {
      isSelected.value = false;
    });

  const scaleRotateGesture = Gesture.Pan()
    .onStart((event) => {
      startScale.value = scale.value;
      startRotation.value = rotation.value;
      initialAngle.value = Math.atan2(event.translationY, event.translationX);
    })
    .onChange((event) => {
      // Calculate new scale
      const distanceX = event.translationX;
      const distanceY = event.translationY;

      scale.value = withSpring(
        startScale.value + Math.max(distanceX, distanceY) / 150
      );
    })
    .onEnd(() => {});

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
      { rotate: `${rotation.value}rad` },
    ],
  }));

  return (
    <>
      <Animated.View
        style={rStyle}
        className={` ${
          focused ? "border-dashed border-4" : null
        } border-red-500 relative p-6`}
      >
        <GestureDetector gesture={focused ? panGesture : Gesture.Tap()}>
          <Animated.Image
            source={source}
            className="w-24 h-24 object-contain"
          />
        </GestureDetector>
        {focused ? (
          <GestureDetector gesture={scaleRotateGesture}>
            <Animated.View className="absolute bottom-[-10] right-[-12]">
              <FontAwesome6 name="arrows-rotate" size={24} color="white" />
            </Animated.View>
          </GestureDetector>
        ) : null}
        {focused ? (
          <Animated.View>
            <TouchableOpacity
              className="text-xl absolute left-[-42] top-[-138]"
              onPress={() => DelEmoji(null)}
            >
              <Ionicons name="close" size={32} color="white" />
            </TouchableOpacity>
          </Animated.View>
        ) : null}
      </Animated.View>
    </>
  );
};

export default EmojiSticker;

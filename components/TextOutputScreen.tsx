import React from "react";
import { Dimensions, Pressable } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated";
import { Input } from "tamagui";

const { width, height } = Dimensions.get("screen");

interface TextOutputScreenProps {
  textValue: string;
  setTextValue: React.Dispatch<React.SetStateAction<string>>;
  setIsInputBoxVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDeleteButton: React.Dispatch<React.SetStateAction<boolean>>;
  onPress: () => void;
}

const TextOutputScreen: React.FC<TextOutputScreenProps> = ({
  setIsInputBoxVisible,
  setShowDeleteButton,
  textValue,
  setTextValue,
  onPress,
}) => {
  const translateX = useSharedValue((width * 0.9) / 2);
  const translateY = useSharedValue((-height * 0.9) / 2);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: { startX: number; startY: number }) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx: { startX: number; startY: number }) => {
      translateX.value = ctx.startX + event.translationX;
      translateY.value = ctx.startY + event.translationY;
      runOnJS(setShowDeleteButton)(true);
    },
    onEnd: () => {
      if (translateX.value < 10 && translateY.value < 10) {
        runOnJS(setIsInputBoxVisible)(false);
        runOnJS(setTextValue)("");
      }
      runOnJS(setShowDeleteButton)(false);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <Pressable onPress={onPress}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[
            animatedStyle,
            {
              position: "absolute",
            },
          ]}
        >
          <Input value={textValue} fontSize="$7" borderWidth={0} disabled />
        </Animated.View>
      </PanGestureHandler>
    </Pressable>
  );
};

export default TextOutputScreen;

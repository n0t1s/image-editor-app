import React, { useRef, useState } from "react";
import { Button, Card, View, XStack, YStack } from "tamagui";
import { AntDesign, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import SignatureScreen, {
  SignatureViewRef,
} from "react-native-signature-canvas";
import { Dimensions, Pressable } from "react-native";
import Buttons from "./Buttons";

const { width, height } = Dimensions.get("window");
interface ImageViewProps {
  image: string | undefined;
  setImage: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const ImageView: React.FC<ImageViewProps> = ({ image, setImage }) => {
  const ref = useRef<SignatureViewRef>(null);
  const [isColorPalette, setColorPalette] = useState(false);
  const colorOptions = ["#333", "#FFF", "#F13A3A", "#58B650", "#1A9B94"];

  const handleColorChange = (color: string) => {
    ref?.current?.changePenColor(color);
    setColorPalette(false);
  };

  return (
    <YStack>
      <Card elevate overflow="hidden" width={width} height={height * 0.85}>
        <SignatureScreen
          ref={ref}
          bgSrc={image}
          bgWidth={width}
          bgHeight={height * 0.85}
          webStyle={`.m-signature-pad {box-shadow: none; border: none; }
          .m-signature-pad--body {border: none;}
          .m-signature-pad--footer {display: none; margin: 0px;}
          body,html {
            width: 100%; height: 100%;}`}
        />
      </Card>
      <YStack>
        <XStack
          justifyContent="space-between"
          alignItems="center"
          borderBottomWidth="$0.5"
          borderBottomColor="$color2"
          paddingVertical="$2"
        >
          <Buttons onPress={() => setColorPalette(!isColorPalette)}>
            <MaterialIcons name="draw" size={24} color="white" />
          </Buttons>
          {isColorPalette && (
            <XStack gap="$2">
              {colorOptions.map((color, index) => (
                <Pressable key={index} onPress={() => handleColorChange(color)}>
                  <View
                    width={24}
                    height={24}
                    borderRadius={12}
                    backgroundColor={color}
                  />
                </Pressable>
              ))}
            </XStack>
          )}
          <Buttons onPress={() => ref?.current?.clearSignature()}>
            <FontAwesome5 name="eraser" size={24} color="white" />
          </Buttons>
        </XStack>
        <XStack
          justifyContent="space-between"
          alignItems="center"
          paddingVertical="$2"
        >
          <Buttons
            onPress={() => {
              setImage(undefined);
            }}
          >
            <AntDesign name="close" size={24} color="white" />
          </Buttons>
          <XStack gap="$7">
            <Buttons onPress={() => ref?.current?.undo()}>
              <MaterialIcons name="undo" size={24} color="white" />
            </Buttons>
            <Buttons onPress={() => ref?.current?.redo()}>
              <MaterialIcons name="redo" size={24} color="white" />
            </Buttons>
          </XStack>
          <Button size="$3" chromeless>
            <AntDesign name="check" size={24} color="white" />
          </Button>
        </XStack>
      </YStack>
    </YStack>
  );
};

export default ImageView;

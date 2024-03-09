import { AntDesign, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { Dimensions, Pressable } from "react-native";
import SignatureScreen, {
  SignatureViewRef,
} from "react-native-signature-canvas";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import { Button, Card, View, XStack, YStack } from "tamagui";
import Buttons from "./Buttons";
import Toast from "react-native-simple-toast";

const { width, height } = Dimensions.get("window");
interface ImageEditProps {
  image: string | undefined;
  setImage: React.Dispatch<React.SetStateAction<string | undefined>>;
  setImageEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageEdit: React.FC<ImageEditProps> = ({
  image,
  setImage,
  setImageEdit,
}) => {
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const ref = useRef<SignatureViewRef>(null);
  const imageRef = useRef(null);
  const [isColorPalette, setColorPalette] = useState(false);
  const colorOptions = ["#555", "#FFF", "#F13A3A", "#58B650", "#1A9B94"];

  if (status === null) {
    requestPermission();
  }

  const handleColorChange = (color: string) => {
    ref?.current?.changePenColor(color);
    setColorPalette(false);
  };

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        Toast.show("Saved ✅", Toast.BOTTOM);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <YStack>
      <Card
        ref={imageRef}
        elevate
        overflow="hidden"
        width={width}
        height={height * 0.85}
      >
        <SignatureScreen
          ref={ref}
          onOK={onSaveImageAsync}
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
              setImageEdit(false);
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
          <Button
            size="$3"
            chromeless
            onPress={() => ref?.current?.readSignature()}
          >
            <AntDesign name="check" size={24} color="white" />
          </Button>
        </XStack>
      </YStack>
    </YStack>
  );
};

export default ImageEdit;

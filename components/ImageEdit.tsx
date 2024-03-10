import { AntDesign, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import React, { useRef, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Canvas, CanvasRef } from "react-native-image-draw";
import Toast from "react-native-simple-toast";
import { captureRef } from "react-native-view-shot";
import { Card, Image, View, XStack, YStack } from "tamagui";
import Buttons from "./Buttons";

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
  const wrapperRef = useRef(null);
  const canvasRef = useRef<CanvasRef>(null);
  const [isColorPalette, setColorPalette] = useState(false);
  const [brushColor, setBrushColor] = useState("#000");
  const colorOptions = ["#555", "#FFF", "#F13A3A", "#58B650", "#1A9B94"];

  if (status === null) {
    requestPermission();
  }

  const handleColorChange = (color: string) => {
    setBrushColor(color);
    setColorPalette(false);
  };

  const handleClose = () => {
    setImageEdit(false);
    setImage(undefined);
  };

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(wrapperRef, {
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
      <GestureHandlerRootView>
        <Card
          ref={wrapperRef}
          collapsable={false}
          overflow="hidden"
          aspectRatio={9 / 16}
        >
          <Image source={{ uri: image }} flex={1} resizeMode="contain" />
          <Canvas
            ref={canvasRef}
            color={brushColor}
            style={{
              backgroundColor: "#0000",
              ...StyleSheet.absoluteFillObject,
            }}
          />
        </Card>
      </GestureHandlerRootView>
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
          <Buttons onPress={() => canvasRef.current?.clear()}>
            <FontAwesome5 name="eraser" size={24} color="white" />
          </Buttons>
        </XStack>
        <XStack
          justifyContent="space-between"
          alignItems="center"
          paddingVertical="$2"
        >
          <Buttons onPress={handleClose}>
            <AntDesign name="close" size={24} color="white" />
          </Buttons>
          <Buttons onPress={() => canvasRef.current?.undo()}>
            <MaterialIcons name="undo" size={24} color="white" />
          </Buttons>
          <Buttons onPress={onSaveImageAsync}>
            <AntDesign name="check" size={24} color="white" />
          </Buttons>
        </XStack>
      </YStack>
    </YStack>
  );
};

export default ImageEdit;

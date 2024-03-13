import {
  AntDesign,
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import React, { useRef, useState } from "react";
import { Pressable } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { CanvasRef } from "react-native-image-draw";
import Toast from "react-native-simple-toast";
import { captureRef } from "react-native-view-shot";
import { Button, Card, Image, View, XStack, YStack } from "tamagui";
import TextInputScreen from "./TextInputScreen";
import TextOutputScreen from "./TextOutputScreen";
import CanvasScreen from "./CanvasScreen";

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
  const [brushColor, setBrushColor] = useState("#000");
  const [isAddingText, setAddingText] = useState(false);
  const [isInputBoxVisible, setIsInputBoxVisible] = useState(true);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [textValue, setTextValue] = useState("");
  const colorOptions = ["#555", "#FFF", "#F13A3A", "#58B650", "#1A9B94"];
  const [isColorPalette, setColorPalette] = useState(false);
  const [isDrawingEnabled, setDrawingEnabled] = useState(false);

  if (status === null) {
    requestPermission();
  }

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

  const enableDrawing = () => {
    setColorPalette(!isColorPalette);
    setDrawingEnabled(!isDrawingEnabled);
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
          <CanvasScreen
            canvasRef={canvasRef}
            brushColor={brushColor}
            isDrawingEnabled={isDrawingEnabled}
            enableDrawing={enableDrawing}
          />
          {textValue !== "" && isInputBoxVisible && (
            <>
              {showDeleteButton && (
                <Button position="absolute">
                  <MaterialCommunityIcons
                    name="delete-outline"
                    size={24}
                    color="white"
                  />
                </Button>
              )}
              <TextOutputScreen
                setShowDeleteButton={setShowDeleteButton}
                setIsInputBoxVisible={setIsInputBoxVisible}
                textValue={textValue}
                setTextValue={setTextValue}
                onPress={() => {
                  setAddingText(true);
                  setIsInputBoxVisible(false);
                }}
              />
            </>
          )}
          {isAddingText && (
            <TextInputScreen
              initialText={textValue}
              onDone={(newText: string) => {
                setAddingText(false);
                setTextValue(newText);
                setIsInputBoxVisible(true);
              }}
              onCancel={() => setAddingText(false)}
            />
          )}
        </Card>
      </GestureHandlerRootView>
      <YStack>
        <XStack
          alignItems="center"
          justifyContent="space-between"
          borderBottomWidth="$0.5"
          borderBottomColor="$color2"
          paddingVertical="$2"
        >
          <XStack alignItems="center" gap="$2">
            <Button size="$3" chromeless onPress={enableDrawing}>
              <MaterialIcons name="draw" size={26} color="white" />
            </Button>
            {isColorPalette && (
              <XStack gap="$2">
                {colorOptions.map((color, index) => (
                  <Pressable key={index} onPress={() => setBrushColor(color)}>
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
          </XStack>
          <XStack>
            {isDrawingEnabled && (
              <Button
                size="$3"
                chromeless
                onPress={() => canvasRef.current?.clear()}
              >
                <FontAwesome5 name="eraser" size={24} color="white" />
              </Button>
            )}
            <Button
              size="$3"
              chromeless
              onPress={() => {
                setAddingText(!isAddingText);
                setIsInputBoxVisible(false);
              }}
            >
              <MaterialCommunityIcons
                name="format-text"
                size={26}
                color="white"
              />
            </Button>
          </XStack>
        </XStack>
        <XStack
          justifyContent="space-between"
          alignItems="center"
          paddingVertical="$2"
        >
          <Button size="$3" chromeless onPress={handleClose}>
            <AntDesign name="close" size={24} color="white" />
          </Button>
          {isDrawingEnabled && (
            <Button
              size="$3"
              chromeless
              onPress={() => canvasRef.current?.undo()}
            >
              <MaterialIcons name="undo" size={24} color="white" />
            </Button>
          )}
          <Button size="$3" chromeless onPress={onSaveImageAsync}>
            <AntDesign name="check" size={24} color="white" />
          </Button>
        </XStack>
      </YStack>
    </YStack>
  );
};

export default ImageEdit;

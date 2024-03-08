import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  Text,
  View,
  XStack,
  YStack,
  Image,
  Label,
} from "tamagui";
import { LinearGradient } from "@tamagui/linear-gradient";
import { Feather, AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import RBSheet from "react-native-raw-bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable } from "react-native";

export default function MainScreen() {
  const refRBSheet = useRef<RBSheet>(null);
  const [image, setImage] = React.useState<string | undefined>();
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        const base64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
        setImage(base64);
      }
    } catch (error) {
      console.error("Error picking image: ", error);
    }
  };
  return (
    <LinearGradient colors={["#000", "#121"]} flex={1}>
      <YStack gap="$2">
        <SafeAreaView>
          {!image ? (
            <YStack gap="$4" alignItems="center" marginTop="$10">
              <Label fontSize={"$9"}>Upload Image</Label>
              <Pressable
                onPress={() => refRBSheet.current && refRBSheet.current.open()}
              >
                <AntDesign name="pluscircleo" size={40} color="white" />
              </Pressable>
            </YStack>
          ) : (
            <Card elevate overflow="hidden" style={{ aspectRatio: 9 / 16 }}>
              <Image source={{ uri: image }} flex={1} resizeMode="contain" />
              <Button
                position="absolute"
                right="$0"
                size="$3"
                chromeless
                onPress={() => {
                  setImage(undefined);
                }}
              >
                <AntDesign name="close" size={20} color="green" />
              </Button>
            </Card>
          )}
        </SafeAreaView>
        <RBSheet
          ref={refRBSheet}
          height={150}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            container: {
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              backgroundColor: "rgb(0, 42, 0)",
            },
            draggableIcon: {
              display: "none",
            },
          }}
        >
          <Button
            backgroundColor="$green2Dark"
            borderColor="$green8Dark"
            size="$13"
            borderRadius="$6"
            onPress={pickImage}
          >
            <YStack alignItems="center" gap="$2">
              <Feather name="upload" size={32} color="white" />
              <Text fontSize="$5">Click to upload</Text>
            </YStack>
          </Button>
        </RBSheet>
      </YStack>
    </LinearGradient>
  );
}

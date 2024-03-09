import React, { useRef, useState } from "react";
import { YStack, Label } from "tamagui";
import { AntDesign } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable } from "react-native";
import { BottomSheet, ImageView } from "../components";

export default function MainScreen() {
  const refRBSheet = useRef<RBSheet>(null);
  const [image, setImage] = useState<string | undefined>();

  return (
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
          <ImageView image={image} setImage={setImage} />
        )}
      </SafeAreaView>
      <BottomSheet refRBSheet={refRBSheet} setImage={setImage} />
    </YStack>
  );
}

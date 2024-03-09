import React, { useState } from "react";
import { YStack } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageSelect, ImageEdit } from "../components";

export default function MainScreen() {
  const [image, setImage] = useState<string | undefined>();
  const [imageEdit, setImageEdit] = useState(false);

  return (
    <YStack gap="$2">
      <SafeAreaView>
        {!imageEdit ? (
          <ImageSelect
            image={image}
            setImage={setImage}
            setImageEdit={setImageEdit}
          />
        ) : (
          <ImageEdit
            image={image}
            setImage={setImage}
            setImageEdit={setImageEdit}
          />
        )}
      </SafeAreaView>
    </YStack>
  );
}

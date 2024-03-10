import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Button, Card, Image, Text, YStack } from "tamagui";

interface ImageSelectProps {
  image: string | undefined;
  setImage: React.Dispatch<React.SetStateAction<string | undefined>>;
  setImageEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageSelect: React.FC<ImageSelectProps> = ({
  image,
  setImage,
  setImageEdit,
}) => {
  const [isImageSelected, setIsImageSelected] = useState(false);
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        const base64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
        setImage(base64);
        setIsImageSelected(true);
      }
    } catch (error) {
      console.error("Error picking image: ", error);
      setIsImageSelected(false);
    }
  };
  return (
    <YStack gap="$5">
      <Card elevate overflow="hidden" aspectRatio={9 / 16}>
        <Image source={{ uri: image }} flex={1} resizeMode="contain" />
      </Card>
      <YStack gap="$3.5" alignItems="center">
        <Button onPress={pickImage}>
          <FontAwesome name="image" size={24} color="white" />
          <Text>Choose a photo</Text>
        </Button>
        <TouchableOpacity onPress={() => isImageSelected && setImageEdit(true)}>
          <Text>Use this photo</Text>
        </TouchableOpacity>
      </YStack>
    </YStack>
  );
};

export default ImageSelect;

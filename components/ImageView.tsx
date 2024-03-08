import React from "react";
import { Button, Card, XStack, YStack, Image } from "tamagui";
import { AntDesign, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

interface ImageViewProps {
  image: string | undefined;
  setImage: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const ImageView: React.FC<ImageViewProps> = ({ image, setImage }: any) => {
  return (
    <YStack>
      <Card elevate overflow="hidden" style={{ aspectRatio: 9 / 16 }}>
        <Image source={{ uri: image }} flex={1} resizeMode="contain" />
      </Card>
      <YStack>
        <XStack
          justifyContent="space-between"
          alignItems="center"
          borderBottomWidth="$0.5"
          borderBottomColor="$color2"
          paddingVertical="$2"
        >
          <Button size="$3" chromeless>
            <MaterialIcons name="draw" size={24} color="white" />
          </Button>
          <Button size="$3" chromeless>
            <FontAwesome5 name="eraser" size={24} color="white" />
          </Button>
        </XStack>
        <XStack
          justifyContent="space-between"
          alignItems="center"
          paddingVertical="$2"
        >
          <Button
            size="$3"
            chromeless
            onPress={() => {
              setImage(undefined);
            }}
          >
            <AntDesign name="close" size={24} color="white" />
          </Button>
          <XStack gap="$7">
            <MaterialIcons name="undo" size={24} color="white" />
            <MaterialIcons name="redo" size={24} color="white" />
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

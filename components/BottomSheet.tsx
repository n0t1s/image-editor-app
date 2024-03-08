import React from "react";
import { Button, Text, YStack } from "tamagui";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import RBSheet from "react-native-raw-bottom-sheet";

interface BottomSheetProps {
  refRBSheet: React.RefObject<RBSheet>;
  setImage: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ refRBSheet, setImage }) => {
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
        if (refRBSheet.current) {
          refRBSheet.current.close();
        }
      }
    } catch (error) {
      console.error("Error picking image: ", error);
    }
  };
  return (
    <RBSheet
      ref={refRBSheet}
      height={150}
      closeOnDragDown={true}
      closeOnPressMask={true}
      customStyles={{
        container: {
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          backgroundColor: "#222",
        },
        draggableIcon: {
          display: "none",
        },
      }}
    >
      <Button
        backgroundColor="$color3"
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
  );
};

export default BottomSheet;

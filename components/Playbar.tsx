import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { XStack, Text, YStack, Button, TextArea } from "tamagui";
import { FontAwesome6 } from "@expo/vector-icons";
import { useAudio } from "../hooks/useAudio";

const Playbar = () => {
  const [showTextArea, setShowTextArea] = useState(false);
  const [buttonText, setButtonText] = useState("Summarize");

  const { state } = useAudio();

  const toggleTextArea = () => {
    setShowTextArea(!showTextArea);
    setButtonText(showTextArea ? "Summarize" : "Resummarize");
  };

  return (
    <YStack gap="$2">
      <TextArea disabled numberOfLines={1}>
        {state.results && state.results.length > 0 ? state.results[0] : ""}
      </TextArea>
      <XStack
        justifyContent="space-between"
        alignItems="center"
        paddingVertical="$3"
        paddingHorizontal="$4"
        borderRadius="$12"
        borderColor="$color5"
        borderWidth="$1"
      >
        <Pressable>
          <FontAwesome6 name="play-circle" size={32} color="#006ADC" />
        </Pressable>
        <Text>0:30</Text>
      </XStack>
      <Button
        onPress={toggleTextArea}
        theme="blue"
        backgroundColor="$blue8Dark"
      >
        {buttonText}
      </Button>
      {showTextArea && (
        <TextArea disabled>
          The roof exhibits noticable wear, with evidence of water damage.
        </TextArea>
      )}
    </YStack>
  );
};

export default Playbar;

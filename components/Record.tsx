import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "tamagui";
import { useAudio } from "../hooks/useAudio";
import { Pressable } from "react-native";

const Record: React.FC = () => {
  const { state, startRecognizing, stopRecognizing } = useAudio();

  return (
    <Pressable
      style={{ backgroundColor: "#006ADC", padding: 10, borderRadius: 20 }}
      onPressIn={startRecognizing}
      onPressOut={stopRecognizing}
    >
      <Ionicons
        name="mic-outline"
        size={18}
        color={state.isRecording ? "green" : "white"}
      />
    </Pressable>
  );
};

export default Record;

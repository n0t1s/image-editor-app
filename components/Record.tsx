import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "tamagui";
import { Audio } from "expo-av";

interface RecordProps {
  addPlaybar: (audioUri: string) => void;
}

const Record: React.FC<RecordProps> = ({ addPlaybar }) => {
  const [recording, setRecording] = useState<Audio.Recording | undefined>();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [transcribedText, setTranscribedText] = useState("");

  async function startRecording() {
    try {
      if (!permissionResponse || permissionResponse.status !== "granted") {
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    if (recording) {
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      const uri = recording.getURI();
      addPlaybar(uri as string);
    }
    setRecording(undefined);
  }

  return (
    <Button
      size="$3"
      borderRadius="$10"
      icon={
        <Ionicons
          name={recording ? "mic-off" : "mic-outline"}
          size={18}
          color="white"
        />
      }
      onPress={recording ? stopRecording : startRecording}
    />
  );
};

export default Record;

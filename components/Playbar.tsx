import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { XStack, Text, YStack, Input, Button, TextArea } from "tamagui";
import { FontAwesome6 } from "@expo/vector-icons";
import { Audio } from "expo-av";

const Playbar = ({ audioUri }: { audioUri: string }) => {
  const [showTextArea, setShowTextArea] = useState(false);
  const [buttonText, setButtonText] = useState("Summarize");
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [positionMillis, setPositionMillis] = useState(0);

  useEffect(() => {
    if (sound) {
      const intervalId = setInterval(async () => {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          setPositionMillis(status.positionMillis);
          if (status.isPlaying && !isPlaying) {
            setIsPlaying(true);
          }
          if (!status.isPlaying && isPlaying) {
            setIsPlaying(false);
          }
        } else {
          setPositionMillis(0);
        }
      }, 500);
      return () => clearInterval(intervalId);
    }
  }, [sound, isPlaying]);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const toggleTextArea = () => {
    setShowTextArea(!showTextArea);
    setButtonText(showTextArea ? "Summarize" : "Resummarize");
  };

  const playSound = async () => {
    try {
      if (isPlaying) {
        await sound?.pauseAsync();
        setIsPlaying(false);
      } else {
        const { sound: newSound } = await Audio.Sound.createAsync({
          uri: audioUri,
        });
        setSound(newSound);
        await newSound.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Failed to play audio", error);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <YStack gap="$2">
      <Input disabled>The roof displays signs of wear and ...</Input>
      <XStack
        justifyContent="space-between"
        alignItems="center"
        paddingVertical="$3"
        paddingHorizontal="$4"
        borderRadius="$12"
        borderColor="$color5"
        borderWidth="$1"
      >
        <Pressable onPress={playSound}>
          <FontAwesome6
            name={isPlaying ? "pause-circle" : "play-circle"}
            size={32}
            color="#006ADC"
          />
        </Pressable>
        <Text>{formatTime(positionMillis)}</Text>
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

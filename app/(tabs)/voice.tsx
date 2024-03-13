import { Text, YStack, XStack, Button, Input, TextArea } from "tamagui";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Playbar, Record } from "../../components";

export default function VoiceScreen() {
  const [playbars, setPlaybars] = useState<string[]>([]);

  const addPlaybar = (audioUri: string) => {
    setPlaybars([...playbars, audioUri]);
  };

  return (
    <SafeAreaView>
      <YStack margin="$2.5" gap="$3">
        <XStack alignItems="center" justifyContent="space-between">
          <Text fontSize="$5">Observation</Text>
          <Record addPlaybar={addPlaybar} />
        </XStack>
        <YStack gap="$4">
          {playbars.map((uri, index) => (
            <Playbar key={index} audioUri={uri} />
          ))}
        </YStack>
      </YStack>
    </SafeAreaView>
  );
}

import { Text, YStack, XStack, ScrollView } from "tamagui";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Playbar, Record } from "../../components";

export default function VoiceScreen() {
  return (
    <ScrollView>
      <YStack margin="$2.5" gap="$3">
        <SafeAreaView>
          <XStack alignItems="center" justifyContent="space-between">
            <Text fontSize="$5">Observation</Text>
            <Record />
          </XStack>
        </SafeAreaView>
        <YStack gap="$4">
          <Playbar />
        </YStack>
      </YStack>
    </ScrollView>
  );
}

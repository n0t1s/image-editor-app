import React, { useState, useEffect, useRef } from "react";
import { TextInput, StyleSheet, Keyboard } from "react-native";
import { Button, Input, View } from "tamagui";

interface TextInputScreenProps {
  initialText: string;
  onDone: (text: string) => void;
  onCancel: () => void;
}

const TextInputScreen: React.FC<TextInputScreenProps> = ({
  initialText,
  onDone,
  onCancel,
}) => {
  const [text, setText] = useState(initialText);
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    textInputRef.current?.focus();
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        onCancel();
      }
    );
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View
      style={{ ...StyleSheet.absoluteFillObject }}
      justifyContent="center"
      alignItems="center"
      backgroundColor="rgba(0, 0, 0, 0.7)"
    >
      <Button
        onPress={() => onDone(text)}
        position="absolute"
        right="$3"
        top="$3"
      >
        Done
      </Button>
      <Input
        ref={textInputRef}
        value={text}
        onChangeText={(newText) => setText(newText)}
        placeholder="Type here..."
        textAlign="center"
        fontSize="$7"
        borderWidth={0}
        cursorColor="white"
      />
    </View>
  );
};

export default TextInputScreen;

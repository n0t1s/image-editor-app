import React from "react";
import { Button } from "tamagui";

interface ButtonsProps {
  onPress: () => void;
  children: React.ReactNode;
}

const Buttons: React.FC<ButtonsProps> = ({ onPress, children }) => {
  return (
    <Button size="$3" chromeless onPress={onPress}>
      {children}
    </Button>
  );
};

export default Buttons;

import React from "react";
import { StyleSheet } from "react-native";
import { Canvas, CanvasRef } from "react-native-image-draw";
import { Button, View } from "tamagui";

interface CanvasScreenProps {
  canvasRef: React.RefObject<CanvasRef>;
  isDrawingEnabled: boolean;
  enableDrawing: () => void;
  brushColor: string;
}

const CanvasScreen: React.FC<CanvasScreenProps> = ({
  canvasRef,
  isDrawingEnabled,
  enableDrawing,
  brushColor,
}) => {
  return (
    <>
      {isDrawingEnabled && (
        <Button
          onPress={enableDrawing}
          position="absolute"
          zIndex={20}
          right="$3"
          top="$3"
        >
          Done
        </Button>
      )}
      <Canvas
        ref={canvasRef}
        color={isDrawingEnabled ? brushColor : "transparent"}
        style={{
          backgroundColor: "#0000",
          ...StyleSheet.absoluteFillObject,
        }}
      />
    </>
  );
};

export default CanvasScreen;

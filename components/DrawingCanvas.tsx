import React, { useRef, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { Button } from "tamagui";

interface DrawingCanvasProps {
  image: string | undefined;
  width: number;
  height: number;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  image,
  width,
  height,
}) => {
  const [paths, setPaths] = useState<string[]>([]);
  const pathRef = useRef<Path>(null);

  const handleGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    if (event.nativeEvent.handlerTag === pathRef.current?.getTag()) {
      if (event.nativeEvent.state === 4) {
        const newPath = pathRef.current?.toDataURL();
        if (newPath) {
          setPaths([...paths, newPath]);
        }
      } else if (event.nativeEvent.state === 2) {
        pathRef.current?.draw(event.nativeEvent);
      }
    }
  };

  const clearPaths = () => {
    setPaths([]);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={{ width, height }} />
      <Svg style={{ position: "absolute", top: 0, left: 0 }}>
        <GestureHandlerRootView>
          <PanGestureHandler
            onGestureEvent={handleGestureEvent}
            onHandlerStateChange={handleGestureEvent}
          >
            <Path ref={pathRef} strokeWidth={4} stroke="black" />
          </PanGestureHandler>
        </GestureHandlerRootView>
        {paths.map((path, index) => (
          <Path key={index} d={path} strokeWidth={4} stroke="black" />
        ))}
      </Svg>
      <Button onPress={clearPaths}>Hello</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DrawingCanvas;

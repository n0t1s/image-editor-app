import Voice, {
  SpeechErrorEvent,
  SpeechResultsEvent,
} from "@react-native-voice/voice";
import { useCallback, useEffect, useState } from "react";

interface State {
  results: string[];
  isRecording: boolean;
}

export const useAudio = () => {
  const [state, setState] = useState<State>({
    results: [],
    isRecording: false,
  });

  const resetState = useCallback(() => {
    setState({
      results: [],
      isRecording: false,
    });
  }, [setState]);

  const startRecognizing = useCallback(async () => {
    resetState();
    try {
      await Voice.start("en-US");
    } catch (e) {
      console.log(e);
    }
  }, []);

  const stopRecognizing = useCallback(async () => {
    resetState();
    try {
      await Voice.stop();
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    Voice.onSpeechStart = (e: any) => {
      setState((prevState) => ({
        ...prevState,
        isRecording: true,
      }));
    };

    Voice.onSpeechEnd = (e: any) => {
      setState((prevState) => ({
        ...prevState,
        isRecording: false,
      }));
    };

    Voice.onSpeechError = (e: SpeechErrorEvent) => {
      setState((prevState) => ({
        ...prevState,
        error: JSON.stringify(e.error),
        isRecording: false,
      }));
    };

    Voice.onSpeechResults = (e: SpeechResultsEvent) => {
      if (e.value) {
        setState((prevState) => ({ ...prevState, results: e.value! }));
      }
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return {
    state,
    setState,
    startRecognizing,
    stopRecognizing,
  };
};

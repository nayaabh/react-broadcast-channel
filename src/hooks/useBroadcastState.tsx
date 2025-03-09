import { useState } from "react";
import { useBroadcastChannel } from "./useBroadcastChannel";

type BroadcastStateProps<T> = [message: T | null, sendMessage: (data: T) => void];

export const useBroadcastState = <T,>(channelName: string): BroadcastStateProps<T> => {
  const [message, setMessageState] = useState<T | null>(null);

  const [postMessage] = useBroadcastChannel(channelName, setMessageState);

  const sendMessage = (message: T) => {
    setMessageState(message);
    postMessage(message);
  };

  return [message, sendMessage];
};

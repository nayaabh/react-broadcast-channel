import { useEffect, useState } from "react";
import { useBroadcastChannel } from "./useBroadcastChannel";

export const useBroadcastState = <MessageType,>(
  channelName: string
): [MessageType | null, (data: MessageType) => void] => {
  const [message, postMessage] = useBroadcastChannel<MessageType>(channelName);
  const [messageState, setMessageState] = useState(message);
  const handlePostMessage = (message: MessageType) => {
    postMessage(message);
    setMessageState(message);
  };
  useEffect(() => {
    setMessageState(message);
  }, [message]);

  return [messageState, handlePostMessage];
};

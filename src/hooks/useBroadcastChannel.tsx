import { useEffect, useRef } from "react";

export const useBroadcastChannel = <MessageType,>(
  channelName: string
): [MessageType | null, (data: MessageType) => void] => {
  const channel = new BroadcastChannel(channelName);
  const message = useRef<MessageType>(null);
  useEffect(() => {
    channel.addEventListener("message", (event: MessageEvent) => {
      message.current = event.data;
    });
    return () => {
      channel.close();
    };
  }, []);

  return [message.current, channel.postMessage];
};

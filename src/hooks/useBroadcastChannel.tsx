import { useEffect, useMemo } from "react";

type BroadcastChannelProps<T> = [postMessage: (data: T | null) => void, closeChannel: () => void];

export const useBroadcastChannel = <T,>(
  channelName: string,
  onMessage: (message: T | null) => void = () => {}
): BroadcastChannelProps<T> => {
  const channel = useMemo(() => new BroadcastChannel(channelName), [channelName]);

  useEffect(() => {
    function eventListener(event: MessageEvent<T | null>) {
      onMessage(event.data);
    }
    channel.addEventListener("message", eventListener);
    return () => {
      channel.removeEventListener("message", eventListener);
    };
  }, [channel, onMessage]);

  const postMessage = (data: T | null) => {
    channel.postMessage(data);
  };
  const closeChannel = () => {
    channel.close();
  };

  return [postMessage, closeChannel];
};

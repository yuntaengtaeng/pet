import React, { createContext, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Socket, io } from 'socket.io-client';
import { UserState } from '../store/atoms';
import axios from 'axios';
import useDidUpdate from '../hooks/useDidUpdate';

interface Props {
  children?: React.ReactNode;
}

export const WebSocketContext = createContext<Socket | null>(null);

const WebSocketContainer = ({ children }: Props) => {
  const [webSocket, setWebSocket] = useState<Socket | null>(null);
  const { refreshToken } = useRecoilValue(UserState);
  const [user, setUser] = useRecoilState(UserState);

  useEffect(() => {
    if (!!refreshToken) {
      const socket = io(`${process.env.API_URL}/chat`, {
        transports: ['websocket'],
      });

      socket.on('error', (object) => {
        const { data, url, accessToken } = object;
        setUser((prev) => ({ ...prev, accessToken: accessToken }));
        socket.emit(`${url}`, { ...data, token: accessToken });
      });

      setWebSocket(socket);

      return () => {
        if (socket) {
          socket.disconnect();
        }
      };
    }
  }, [refreshToken]);

  return (
    <WebSocketContext.Provider value={webSocket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketContainer;

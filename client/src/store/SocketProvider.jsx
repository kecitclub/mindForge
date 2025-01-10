import React, { useEffect } from 'react'
import { useSocket } from './useSocket';

const SocketProvider = ({ children }) => {
    const { setSocket } = useSocket();
  
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const socket = io('http://localhost:4000');
        setSocket(socket);
        return () => {
          socket.disconnect();
        };
      }
    }, [setSocket]);

    return (
        <>
            {
                children
            }
        </>
    )
}

export default SocketProvider
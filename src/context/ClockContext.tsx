import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export const ClockContext = createContext<Date | null>(null);

interface ClockProviderProps {
  children: ReactNode;
}

export const ClockProvider = ({ children }: ClockProviderProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => window.clearInterval(timerId);
  }, []);

  return (
    <ClockContext.Provider value={time}>
      {children}
    </ClockContext.Provider>
  );
};
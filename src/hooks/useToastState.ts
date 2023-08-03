import React, { useState } from 'react';

interface ToastState {
  isVisible: boolean;
  message: string;
}

type ShowToastMessage = (message: string) => () => void;

const useToastState = (): readonly [ToastState, ShowToastMessage] => {
  const [toastState, setToastState] = useState<ToastState>({
    isVisible: false,
    message: '',
  });

  const showToastMessage: ShowToastMessage = (message: string) => {
    setToastState({
      isVisible: true,
      message,
    });

    const timer = setTimeout(() => {
      setToastState({
        isVisible: false,
        message: '',
      });
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  };

  return [toastState, showToastMessage] as const;
};

export default useToastState;

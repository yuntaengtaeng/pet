import React, {
  useReducer,
  useContext,
  createContext,
  Dispatch,
  useState,
} from 'react';
import ToastMessage from './ToastMessage';

// 필요한 타입들을 미리 선언

// 상태를 위한 타입
type State = {
  isVisible: boolean;
  message: string;
};

type ModalController = {
  open: () => void;
  close: () => void;
};

export type ToastDispatch = {
  showToastMessage: (message: string) => void;
};

export const ToastDispatchContext = createContext<ToastDispatch | null>(null);

const ToastStateContext = createContext<State | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toastState, setToastState] = useState({
    isVisible: false,
    message: '',
  });

  const showToastMessage = (message: string) => {
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

  const dispatch = {
    showToastMessage,
  };

  return (
    <ToastStateContext.Provider value={null}>
      <ToastDispatchContext.Provider value={dispatch}>
        {children}
        {toastState.isVisible && <ToastMessage message={toastState.message} />}
      </ToastDispatchContext.Provider>
    </ToastStateContext.Provider>
  );
}

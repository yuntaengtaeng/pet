import React, { createContext, useState } from 'react';

interface OverlayContextProps {
  open: (overlayElement: React.ReactNode) => void;
  close: () => void;
}

export const OverlayDispatchContext = createContext<OverlayContextProps | null>(
  null
);

const OverlayStateContext = createContext<null>(null);

interface OverlayProviderProps {
  children: React.ReactNode;
}

const OverlayContext = ({ children }: OverlayProviderProps) => {
  const [overlayComponents, setOverlayComponents] =
    useState<React.ReactNode>(null);

  const close = () => {
    setOverlayComponents(null);
  };

  const open = (overlayElement: React.ReactNode) => {
    setOverlayComponents(overlayElement);
  };

  const dispatch = {
    open,
    close,
  };

  return (
    <OverlayStateContext.Provider value={null}>
      <OverlayDispatchContext.Provider value={dispatch}>
        {children}
        {overlayComponents}
      </OverlayDispatchContext.Provider>
    </OverlayStateContext.Provider>
  );
};

export default OverlayContext;

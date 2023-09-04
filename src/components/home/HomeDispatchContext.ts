import { createContext } from 'react';

type ModalController = {
  open: () => void;
  close: () => void;
};

export type HomeDispatch = {
  bottomSheetController: ModalController;
  locationVerificationPopup: ModalController;
  locationVerificationRequested: ModalController;
  togglePetType: () => void;
  verifyNeighborhood: () => void;
};

export const HomeDispatchContext = createContext<HomeDispatch | null>(null);

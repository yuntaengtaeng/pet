import { createContext } from 'react';
import { PetType } from '../../types/interface';

type State = PetType;
export const HomeStateContext = createContext<State | null>(null);

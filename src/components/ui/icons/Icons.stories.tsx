import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import Alarm from './Alarm';
import ArrowDown from './ArrowDown';
import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';
import ArrowSwap from './ArrowSwap';
import ArrowUp from './ArrowUp';
import Burger from './Burger';
import Camera from './Camera';
import Chat from './Chat';
import Check from './Check';
import Close from './Close';
import Document from './Document';
import Favorite from './Favorite';
import Home from './Home';
import Location from './Location';
import Minus from './Minus';
import Plus from './Plus';
import Search from './Search';
import User from './User';
import Users from './Users';
import Won from './Won';

const meta = {
  title: 'Design System/Icons',
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj;

export const AlarmIcon = () => <Alarm size={24} />;

export const ArrowDownIcon = () => <ArrowDown size={24} />;

export const ArrowLeftIcon = () => <ArrowLeft size={24} />;

export const ArrowRightIcon = () => <ArrowRight size={24} />;

export const ArrowSwapIcon = () => <ArrowSwap size={24} />;

export const ArrowUpIcon = () => <ArrowUp size={24} />;

export const BurgerIcon = () => <Burger size={24} />;

export const CameraIcon = () => <Camera size={24} />;

export const ChatIcon = () => <Chat size={24} />;

export const CheckIcon = () => <Check size={24} />;

export const CloseIcon = () => <Close size={24} />;

export const DocumentIcon = () => <Document size={24} />;

export const FavoriteIcon = () => <Favorite size={24} />;

export const HomeIcon = () => <Home size={24} />;

export const LocationIcon = () => <Location size={24} />;

export const MinusIcon = () => <Minus size={24} />;

export const PlusIcon = () => <Plus size={24} />;

export const SearchIcon = () => <Search size={24} />;

export const UserIcon = () => <User size={24} />;

export const UsersIcon = () => <Users size={24} />;

export const WonIcon = () => <Won size={24} />;

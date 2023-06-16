import React, { useState, useEffect } from 'react';
import { BackHandler } from 'react-native';

const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  const openModal = () => {
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const handleBackButton = () => {
      if (isVisible) {
        closeModal();
        return true;
      }
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, [isVisible]);

  return {
    isVisible,
    openModal,
    closeModal,
  };
};

export default useModal;

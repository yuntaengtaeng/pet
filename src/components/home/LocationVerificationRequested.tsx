import React, { useContext, useEffect, useRef } from 'react';
import Dialog from '../ui/Dialog';
import { HomeDispatchContext } from './HomeDispatchContext';

interface Props {
  isLocationVerificationRequested: boolean;
}

const LocationVerificationRequested = ({
  isLocationVerificationRequested,
}: Props) => {
  const dispatch = useContext(HomeDispatchContext);
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (!isLocationVerificationRequested) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isLocationVerificationRequested]);

  return (
    <Dialog isOpened={isLocationVerificationRequested}>
      <Dialog.Title title="인증 지역을 확인해주세요" />
      <Dialog.Content content="선택한 위치와 현재 위치가 같아야 인증됩니다." />
      <Dialog.Buttons
        buttons={[
          {
            label: '닫기',
            onPressHandler: dispatch?.locationVerificationRequested.close,
          },
          {
            label: '동네 변경',
            onPressHandler: () => {
              dispatch?.locationVerificationRequested.close();
              timerRef.current = setTimeout(() => {
                dispatch?.bottomSheetController.open();
              }, 300);
            },
          },
        ]}
      />
    </Dialog>
  );
};

export default LocationVerificationRequested;

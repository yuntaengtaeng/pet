import AppInner from './AppInner';
import { useFonts } from 'expo-font';
import { RecoilRoot } from 'recoil';
import { ToastProvider } from './src/components/ui/toast/ToastProvider';
import OverlayContext from './src/hooks/overlay/OverlayContext';
import WebSocketContainer from './src/components/WebSocketContainer';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const [isFontsLoaded] = useFonts({
    Pretendard_SemiBold: require('./assets/fonts/Pretendard-SemiBold.ttf'),
    Pretendard_Regular: require('./assets/fonts/Pretendard-Regular.ttf'),
    Pretendard_Medium: require('./assets/fonts/Pretendard-Medium.ttf'),
  });

  if (!isFontsLoaded) {
    return null;
  }

  return (
    <RecoilRoot>
      <SafeAreaProvider>
        <WebSocketContainer>
          <OverlayContext>
            <ToastProvider>
              <AppInner />
            </ToastProvider>
          </OverlayContext>
        </WebSocketContainer>
      </SafeAreaProvider>
    </RecoilRoot>
  );
}

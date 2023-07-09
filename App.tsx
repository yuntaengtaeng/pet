import AppInner from './AppInner';
import { useFonts } from 'expo-font';
import { RecoilRoot } from 'recoil';
import { ToastProvider } from './src/components/ui/toast/ToastProvider';

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
      <ToastProvider>
        <AppInner />
      </ToastProvider>
    </RecoilRoot>
  );
}

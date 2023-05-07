import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';
import AppInner from './AppInner';
import { useFonts } from 'expo-font';

export default function App() {
  const [isFontsLoaded] = useFonts({
    Pretendard_SemiBold: require('./assets/fonts/Pretendard-SemiBold.ttf'),
    Pretendard_Regular: require('./assets/fonts/Pretendard-Regular.ttf'),
    Pretendard_Medium: require('./assets/fonts/Pretendard-Medium.ttf'),
  });

  if (!isFontsLoaded) {
    return null;
  }

  console.log(process.env.API_URL);

  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <AppInner />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import '~/global.css';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, View, Image, StyleSheet } from 'react-native';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { PortalHost } from '@rn-primitives/portal';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem('theme');
      if (Platform.OS === 'web') {
        document.documentElement.classList.add('bg-background');
      }
      if (!theme) {
        await AsyncStorage.setItem('theme', colorScheme);
      } else {
        const colorTheme = theme === 'dark' ? 'dark' : 'light';
        setColorScheme(colorTheme);
        setAndroidNavigationBar(colorTheme);
      }

      setTimeout(() => {
        setIsReady(true);
        SplashScreen.hideAsync();
      }, 5000);
    })();
  }, []);

  if (!isReady) {
    return (
      <View style={styles.splashContainer}>
        <Image
          source={{
            uri: 'https://scontent.fpkr1-1.fna.fbcdn.net/v/t1.15752-9/462636498_492075943264492_3530150559607643032_n.png?_nc_cat=110&ccb=1-7&_nc_sid=9f807c&_nc_ohc=v_xOzhBJ8gYQ7kNvgGtVG5h&_nc_zt=23&_nc_ht=scontent.fpkr1-1.fna&oh=03_Q7cD1QFyUAc020GAs8JeKAW2Av0FBy_X5Cypm0JPnSlucPOWaQ&oe=67797FB0',
          }}
          style={styles.splashImage}
        />
      </View>
    );
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <PortalHost />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});

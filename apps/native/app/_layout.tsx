import { TamaguiProvider } from "tamagui";
import { ThemeProvider } from "../providers/theme";
import { SplashScreen, Stack } from 'expo-router';
import tamaguiConfig from "../tamagui.config";
import { useEffect } from "react";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// export const unstable_settings = {
//   initialRouteName: 'login',
// };

// keeps the splash screen visible while the app loads.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  /**
   * this is where I believe I'll check the color scheme to set the theme
   * and also sort out the localisation options
  */
  useEffect(() => {
    SplashScreen.hideAsync();
  }, [])
  return <RootLayoutNav />;
}


function RootLayoutNav() {

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
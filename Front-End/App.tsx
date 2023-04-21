import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeBaseProvider, StatusBar } from "native-base";
import { ThemeProvider } from "styled-components/native";
import {
  useFonts,
  Outfit_300Light,
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
  Outfit_800ExtraBold,
} from "@expo-google-fonts/outfit";
import { DMSans_400Regular } from "@expo-google-fonts/dm-sans";
import { DMSerifDisplay_400Regular } from "@expo-google-fonts/dm-serif-display";
import { OpenSans_300Light } from "@expo-google-fonts/open-sans";
import nativeBaseExtendTheme from "./src/styles/nativeBaseExtendTheme";
import COLORS from "./src/styles/theme";
import Intro from "./src/components/Intro";
import IntroAdmin from "./src/screens/Admin/Intro";
import HomeAdmin from "./src/screens/Admin/Home/HomeAdmin";
import { Employees } from "./src/screens/Admin/Employees/Employees";
import LogInScreen from "./src/components/LogInScreen";
import Register from "./src/screens/Register/Register";
import Main from "./src/screens/Usuario/Main/Main";
import ReviewsAdmin from "./src/screens/Admin/Reviews/Reviews";
import { ProfileAdmin } from "./src/screens/Admin/Profile/Profile";
import { PasswordAdmin } from "./src/screens/Admin/Profile/Password";
import { Alert, BackHandler } from "react-native";

type RootStackParamList = {
  Intro: undefined;
  "Log In": {isAdmin: boolean};
  Register: undefined;
  Main: undefined;
  CategoryDetails: undefined;
  "Intro Admin": undefined;
  "Home Admin": undefined;
  "Reviews Admin": {
    proveedorId: number;
  };
  "Profile Admin": undefined;
  "Password Admin": undefined;
  Employees: undefined;
};

const App = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  const [fontsLoaded] = useFonts({
    Outfit_300Light,
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
    Outfit_700Bold,
    Outfit_800ExtraBold,
    DMSans_400Regular,
    DMSerifDisplay_400Regular,
    OpenSans_300Light,
  });

  useEffect(() => {
    const backAction = () => {
      Alert.alert("¡Espera!", "¿Seguro que quieres salir de la app?", [{
        text: "Cancelar",
        onPress: () => null,
        style: "cancel"
      }, { 
        text: "Salir", 
        onPress: () => BackHandler.exitApp() 
      }]);

      return true;
    }

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <NativeBaseProvider theme={nativeBaseExtendTheme}>
      <ThemeProvider theme={COLORS}>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* User */}
            <Stack.Screen name="Intro" component={Intro} />
            <Stack.Screen name="Log In" component={LogInScreen} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Main" component={Main} />
            {/* Admin */}
            <Stack.Screen name="Intro Admin" component={IntroAdmin} />
            <Stack.Screen name="Home Admin" component={HomeAdmin} />
            <Stack.Screen name="Reviews Admin" component={ReviewsAdmin} />
            <Stack.Screen name="Profile Admin" component={ProfileAdmin} />
            <Stack.Screen name="Password Admin" component={PasswordAdmin} />
            <Stack.Screen name="Employees" component={Employees} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </NativeBaseProvider>
  );
};

export type IntroProps = NativeStackScreenProps<RootStackParamList, "Intro">;
export type LogInProps = NativeStackScreenProps<RootStackParamList, "Log In">;
export type MainProps = NativeStackScreenProps<RootStackParamList, "Main">;
export type RegisterProps = NativeStackScreenProps<
  RootStackParamList,
  "Register"
>;
export type IntroAdminProps = NativeStackScreenProps<
  RootStackParamList,
  "Intro Admin"
>;

export type HomeAdminProps = NativeStackScreenProps<
  RootStackParamList,
  "Home Admin"
>;
export type ReviewsAdminProps = NativeStackScreenProps<
  RootStackParamList,
  "Reviews Admin"
>;
export type ProfileAdminProps = NativeStackScreenProps<
  RootStackParamList,
  "Profile Admin"
>;
export type CategoryDetailProps = NativeStackScreenProps<
  RootStackParamList,
  "CategoryDetails"
>;
export type EmployeesProps = NativeStackScreenProps<
  RootStackParamList,
  "Employees"
>;

export type PasswordAdminProps = NativeStackScreenProps<
  RootStackParamList,
  "Password Admin"
>;

export default App;

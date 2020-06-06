import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import PickPhotoScreen from "./src/screens/PickPhotoScreen";
import HomeScreen from "./src/screens/HomeScreen";
import StylePhotoScreen from "./src/screens/StylePhotoScreen";
import FaqScreen from "./src/screens/FaqScreen";
import AccountScreen from "./src/screens/AccountScreen";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { navigationRef } from "./src/RootNavigation.js";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";

const Stack = createStackNavigator();
const StackScreens = () => {
	return (
		<Stack.Navigator initialRouteName="Home">
			<Stack.Screen
				name="ResolveAuthScreen"
				component={ResolveAuthScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen name="Home" component={HomeScreen} />
			<Stack.Screen name="Account" component={AccountScreen} />
			<Stack.Screen name="Faq" component={FaqScreen} />
			<Stack.Screen name="Signin" component={SigninScreen} />
			<Stack.Screen name="Signup" component={SignupScreen} />
			<Stack.Screen name="PickPhoto" component={PickPhotoScreen} />
			<Stack.Screen name="StylePhoto" component={StylePhotoScreen} />
		</Stack.Navigator>
	);
};

const App = () => {
	return (
		<NavigationContainer ref={navigationRef}>
			{<StackScreens />}
		</NavigationContainer>
	);
};

export default () => {
	return (
		<AuthProvider>
			<App />
		</AuthProvider>
	);
};

import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const PickPhotoScreen = ({ navigation }) => {
	navigation.setOptions({
		// headerShown: false,
		headerLeft: () => {
			return (
				<Button title="Home" onPress={() => navigation.navigate("Home")} />
			);
		},
		headerRight: () => {
			return (
				<Button
					title="Account"
					onPress={() => navigation.navigate("Account")}
				/>
			);
		},
	});
	return (
		<View>
			<Text>PickPhoto Screen</Text>
		</View>
	);
};

const styles = StyleSheet.create({});

export default PickPhotoScreen;

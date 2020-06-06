import React from "react";
import { SafeAreaView, Text, StyleSheet, Button } from "react-native";

const HomeScreen = ({ navigation }) => {
	navigation.setOptions({
		headerShown: false,
	});
	return (
		<SafeAreaView>
			<Text>Home Screen</Text>
			<Button
				title="Let's goooo"
				onPress={() => navigation.navigate("ResolveAuthScreen")}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({});

export default HomeScreen;

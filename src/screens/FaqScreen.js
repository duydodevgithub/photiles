import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Spacer from "../components/Spacer";

const FaqScreen = ({ navigation }) => {
	navigation.setOptions({
		headerShown: false,
	});
	return (
		<View>
			<Spacer>
				<Text>FAQ Screen</Text>
			</Spacer>
		</View>
	);
};

const styles = StyleSheet.create({});

export default FaqScreen;

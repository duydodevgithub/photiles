import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";

const SignupScreen = ({ navigation }) => {
	navigation.setOptions({
		headerShown: false,
	});
	const { state, signup, clearErrorMessage } = useContext(AuthContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			clearErrorMessage();
		});

		return unsubscribe;
	}, []);
	return (
		<View style={styles.container}>
			<Spacer>
				<Text h3>Sign Up for Photo App</Text>
			</Spacer>
			<Input
				label="Email"
				value={email}
				onChangeText={setEmail}
				autoCapitalize="none"
				autoCorrect={false}
			/>
			<Spacer />
			<Input
				secureTextEntry
				label="Password"
				value={password}
				onChangeText={setPassword}
				autoCapitalize="none"
				autoCorrect={false}
			/>
			{state.errorMessage ? (
				<Text style={styles.errorMessage}>{state.errorMessage}</Text>
			) : null}
			<Spacer>
				<Button title="Sign Up" onPress={() => signup({ email, password })} />
			</Spacer>
			<TouchableOpacity onPress={() => navigation.navigate("Signin")}>
				<Spacer>
					<Text style={styles.link}>
						Already have an account? Sign in instead
					</Text>
				</Spacer>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		marginBottom: 250,
	},
	errorMessage: {
		fontSize: 16,
		color: "red",
		marginLeft: 15,
		marginTop: 15,
	},
	link: {
		color: "blue",
	},
});

export default SignupScreen;

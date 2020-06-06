import React, { useEffect, useContext } from "react";
import { View, Text } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";

const ResolveAuthScreen = () => {
	const { tryLocalSignin } = useContext(AuthContext);

	useEffect(() => {
		tryLocalSignin();
	}, []);
	return (
		<View>
			<Text></Text>
		</View>
	);
};

export default ResolveAuthScreen;

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, FlatList, Image } from "react-native";
import Constants from "expo-constants";
import * as MediaLibrary from "expo-media-library";
import PhotoLibrary from "../components/PhotoLibrary";

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
	const [image, setImage] = useState(null);
	useEffect(() => {
		(async () => {
			if (Constants.platform.ios) {
				const { status } = await MediaLibrary.requestPermissionsAsync();
				if (status !== "granted") {
					alert("Sorry, we need camera roll permissions to make this work!");
				}
			}
		})();
	}, []);

	const pickImage = async () => {
		try {
			let result = await MediaLibrary.getAssetsAsync({
				first: 10,
			});
			setImage(result.assets);
		} catch (err) {
			console.log(err);
		}
	};

	// 	if (!result.cancelled) {
	// 	  setImage(result.uri);
	// 	}
	//   };

	return (
		<View>
			<Text>PickPhoto Screen</Text>
			<Button title="Load Image" onPress={pickImage} />
			{image === null ? null : (
				<FlatList
					data={image}
					renderItem={({ item }) => (
						<Image
							source={{ uri: item.uri }}
							style={{ width: 100, height: 100 }}
						/>
					)}
					keyExtractor={(item) => item.id}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({});

export default PickPhotoScreen;

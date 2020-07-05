import React, {useEffect, useState} from "react";
import {SafeAreaView, View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from "react-native";
import {Button} from "react-native-elements";
import Constants from "expo-constants";
import * as MediaLibrary from "expo-media-library";
import Spacer from "../components/Spacer";

const PickPhotoScreen = ({navigation}) => {
    navigation.setOptions({
        // headerShown: false,
        headerLeft: () => {
            return (
                <Button title="Home" onPress={() => navigation.navigate("Home")}/>
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
    const [images, setImage] = useState(null);
    const [albums, setAlbum] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);

    useEffect(() => {
        (async () => {
            if (Constants.platform.ios) {
                const {status} = await MediaLibrary.requestPermissionsAsync();
                if (status !== "granted") {
                    alert("Sorry, we need camera roll permissions to make this work! Please reinstall the app, thank you.");
                }
            }
        })();
    }, []);

    const pickImage = async (albumId) => {
        try {
            let result = await MediaLibrary.getAssetsAsync({
                album: albumId,
                first: 20,
            });
            setImage(result.assets);
        } catch (err) {
            console.log(err);
        }
    };

    const loadAlbums = async () => {
        try {
            let results = await MediaLibrary.getAlbumsAsync();
            // console.log(results);
            setAlbum(results);

        } catch (err) {
            console.log(err);
        }
    };

    loadAlbums();

    const toggleImages = (imageUri) => {
        console.log(imageUri);
        if (selectedImages.includes(imageUri)) {
            const index = selectedImages.indexOf(imageUri);
            if (index > -1) {
                selectedImages.splice(index, 1);
                console.log(selectedImages);
            }
        } else {
            setSelectedImages([imageUri, ...selectedImages]);
            console.log(selectedImages);
        }

    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.body}>
                <View style={styles.listAlbums}>
                    <FlatList horizontal={true} data={albums} renderItem={({item}) => (
                        <TouchableOpacity onPress={() => pickImage(item.id)}>
                            <Text style={{
                                color: 'grey',
                                fontWeight: 'bold',
                                margin: 5
                            }}>{item.title}</Text>
                        </TouchableOpacity>
                    )}/>
                </View>
                <View style={styles.listImages}>
                    <Button title="Load All Image" onPress={pickImage}/>
                    {/*<Button title="Load Album" onPress={loadAlbums}/>*/}
                    {images === null ? null : (
                        <FlatList
                            data={images}
                            renderItem={({item}) => (
                                <TouchableOpacity onPress={() => toggleImages(item.uri)}>
                                    <Image
                                        source={{uri: item.uri}}
                                        style={selectedImages.includes(item.uri) ? ({
                                            width: 110,
                                            height: 110,
                                            margin: 5,
                                            borderWidth: 2,
                                            borderColor: 'red'
                                        }) : ({width: 110, height: 110, margin: 5})}
                                    />
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.id}
                            numColumns={3}
                            showsVerticalScrollIndicator={false}
                        />
                    )}
                </View>
            </View>

            <View style={styles.footer}>
                <Spacer>
                    <Button title='Style Photos' onPress={() => {
                        navigation.navigate('StylePhoto', {imageArr: selectedImages})
                    }}/>
                </Spacer>
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: 'red',
        flex: 1
    },
    body: {
        borderWidth: 1,
        borderColor: 'blue',
        flex: 14
    },
    listAlbums: {
        borderWidth: 2,
        borderColor: 'yellow',
        flex: 1,
    },
    listImages: {
        borderWidth: 2,
        borderColor: 'orange',
        flex: 11,
        alignItems: 'center'
    },
    footer: {
        borderWidth: 1,
        borderColor: 'green',
        flex: 2,
        justifyContent: 'center'
    }

});

export default PickPhotoScreen;

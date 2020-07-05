import React, {useState} from "react";
import {SafeAreaView, View, Text, StyleSheet, Image, FlatList} from "react-native";
import {Button} from "react-native-elements";
import Spacer from "../components/Spacer";
import AsyncStorage from "@react-native-community/async-storage";
import printtiles from "../api/printtiles";

const StylePhotoScreen = ({route, navigation}) => {
    const {imageArr} = route.params;
    const {products, SetProducts} = useState([]);

    const getProdducts = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await printtiles.get('/products', {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            SetProducts(response.data.data);
        } catch (err) {

        }
    }

    getProdducts();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.body}>
                <View style={styles.frameList}>
                    <Text>List</Text>
                    <FlatList horizontal={true}
                              data={products}
                              renderItem={({item}) => {
                                  console.log(item.image);
                                  return (<Text>{item.image.default}</Text>)
                              }}
                    />
                </View>
                <View style={styles.stylePhoto}>
                    <FlatList
                        horizontal={true}
                        keyExtractor={(item) => item}
                        data={imageArr}
                        renderItem={({item}) => (
                            <Image source={{uri: item}} style={{width: 200, height: 200, margin: 10}}/>)}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
            <View style={styles.footer}>
                <Spacer>
                    <Button title='Check Out'/>
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
        borderWidth: 2,
        borderColor: 'green',
        flex: 14
    },
    frameList: {
        borderWidth: 1,
        borderColor: 'grey',
        flex: 2
    },
    stylePhoto: {
        borderWidth: 2,
        borderColor: 'orange',
        justifyContent: 'center',
        flex: 8
    },
    footer: {
        borderWidth: 2,
        borderColor: 'blue',
        flex: 2
    }
});

export default StylePhotoScreen;


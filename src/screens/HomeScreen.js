import React, {useEffect, useState} from "react";
import {ScrollView, View, SafeAreaView, StyleSheet, Image} from "react-native";
import {Text, Input, Button} from "react-native-elements";
import printtiles from "../api/printtiles";
import AsyncStorage from "@react-native-community/async-storage";
import Carousel from 'react-native-snap-carousel';
import Spacer from "../components/Spacer";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreen = ({navigation}) => {

    navigation.setOptions({
        headerShown: true,
        headerLeft: false,
        headerRight: () =>  (<MaterialCommunityIcons name="hamburger" size={24} color="black" />),
        headerTitle: false
    });
    const [banners, setBanners] = useState([]);
    const getBanners = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await printtiles.get('/banner', {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            // console.log(response.data.data);
            setBanners(response.data.data)
        } catch (err) {

        }
    }

    useEffect(() => {
        getBanners();
    }, [])

    const _renderItem = ({item, index}) =>  //for carousel
    {
        return (
            <View style={{
                backgroundColor: 'white',
                borderRadius: 5,
                borderColor: 'white',
                borderWidth: 2
            }}>
                <Image style={{width: 250, height: 200}} source={{uri: `${item.image_url}`}}/>
                <Text style={{fontSize: 14}}>{item.title}</Text>
                <Text style={{fontSize: 14}}>{item.description}</Text>

            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.body}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.title1}>
                        <Spacer>
                            <Text style={{fontSize: 26, fontWeight: 'bold', textAlign: 'center'}}>Printtiles are
                                beautiful</Text>
                            <Text style={{fontSize: 26, fontWeight: 'bold', textAlign: 'center'}}>and attach
                                easily </Text>
                            <Image style={{width: 320, height: 200}}
                                   source={{uri: 'https://printtiles-public.s3.amazonaws.com/media/807126215eec4f0a13863.jpg'}}/>
                        </Spacer>
                    </View>
                    <View style={styles.title2}>
                        <Spacer>
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: 'rgba(255,2,129, 1.0)',
                                letterSpacing: 0.5
                            }}>Three tiles are US$58</Text>
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 16,
                                fontWeight: 'bold',
                                letterSpacing: 0.5,
                                marginTop: 5
                            }}>Each additional tile is US$12,</Text>
                            <Text style={{textAlign: 'center', fontSize: 16, fontWeight: 'bold', letterSpacing: 0.5}}>shipping
                                is always free</Text>
                        </Spacer>
                    </View>
                    <View style={styles.carousel}>
                        <Spacer>
                            <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>Millions of tiles
                                sold</Text>
                            <Text style={{fontSize: 13, textAlign: 'center', color: 'grey'}}>GRACING WALLS OF ALL
                                KINDS</Text>
                            <Spacer>
                                {banners.length > 0 ? (
                                    <Carousel
                                        layout={"tinder"}
                                        layoutCardOffset={1}
                                        ref={ref => this.carousel = ref}
                                        data={banners}
                                        sliderWidth={320}
                                        itemWidth={250}
                                        renderItem={_renderItem}
                                    />
                                ) : null}
                            </Spacer>
                        </Spacer>
                    </View>
                    <View style={styles.title2}>
                        <Spacer>
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: 'rgba(255,2,129, 1.0)',
                                letterSpacing: 0.5
                            }}>One perfect size</Text>
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 16,
                                fontWeight: 'bold',
                                letterSpacing: 0.5,
                                marginTop: 5
                            }}>Tiles are 8" by 8". They're</Text>
                            <Text style={{textAlign: 'center', fontSize: 16, fontWeight: 'bold', letterSpacing: 0.5}}>removeable,
                                reusable and leave no</Text>
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 16,
                                fontWeight: 'bold',
                                letterSpacing: 0.5
                            }}>marks</Text>
                        </Spacer>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.footer}>
                <Spacer>
                    <Button
                        title="Let's go"
                        onPress={() => navigation.navigate("PickPhoto")}
                    />
                </Spacer>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        // borderColor: 'blue',
        // alignItems: 'center',
        flex: 1
    },
    body: {
        // borderWidth: 1,
        backgroundColor: 'rgba(247,247,247,1.0)',
        // borderColor: 'red',
        flex: 14
    },
    title1: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    title2: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    carousel: {
        backgroundColor: 'rgba(245,245,245,1.0)',
        borderWidth: 5,
        borderColor: 'white'
    },
    footer: {
        marginTop: 10,
        flex: 2,
        backgroundColor: 'white',
        justifyContent: 'center'
    }
});

export default HomeScreen;

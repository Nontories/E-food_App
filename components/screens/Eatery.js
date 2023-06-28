import React, { useState } from "react";
import { Text, View, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

import TabNavigate from "../TabNavigate";
import BackButton from "../BackButton";

import cardImage from "../../assets/slider_img.png"
import star from "../../assets/home/Star.png"

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const Eatery = ({ route }) => {
    const restaurant = route.params.restaurant
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <BackButton navigation={navigation} />
            <View style={styles.card}>
                <View style={styles.detail}>
                    <Text style={styles.name} >{restaurant.name}</Text>
                    <View style={styles.rating}>
                        <Image
                            style={styles.star}
                            source={star}
                        />
                        <Text >{restaurant.voteRating.toFixed(1)}</Text>
                    </View>
                    <Text style={styles.locate} >{restaurant.address + " " + restaurant.district}</Text>
                </View>

                <Image
                    resizeMode="stretch"
                    style={styles.image}
                    source={{
                        uri: restaurant && restaurant.image ? restaurant.image : cardImage
                    }}
                />
            </View>
            <Text style={styles.best}>Best seller</Text>
            <View style={styles.nav}>
                <Text style={styles.navText}>Các Menu Của Quán</Text>
                <View style={styles.groupButton}>
                    <TouchableOpacity>
                        <Text style={styles.button}>
                            Tìm Quán
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Review", { restaurant: restaurant })
                        }}
                    >
                        <Text style={styles.button}>
                            Review
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* <View style={styles.dishCard}>
                <Image
                    style={styles.dishImage}
                    source={cardImage}
                />
                <View
                    style={styles.dishCombo}
                >
                    <Text
                        style={styles.comboName}
                    >
                        Combo 2 Bánh Mì Heo Quay+ 2 Ly Coca
                    </Text>
                    <View
                        style={styles.comboDetail}
                    >
                        <Text>2 Bánh Mì</Text>
                        <Text>Heo Quay</Text>
                        <Text>Rau</Text>
                        <Text>Pate</Text>
                        <View style={styles.comboRating}>
                            <Image
                                style={styles.star}
                                source={star}
                            />
                            <Text >4.9</Text>
                        </View>
                    </View>
                </View>
            </View> */}
            <TabNavigate navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        width: WIDTH,
        height : HEIGHT,
        alignItems: "center",
    },
    card: {
        width: 350,
        height: 180,
        backgroundColor: "#0C4A6E",
        borderRadius: 15,
        marginHorizontal: "auto",
        marginTop: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    detail: {
        width: 175,
    },
    name: {
        width: 170,
        color: "white",
        fontSize: 20,
        fontWeight: 700,
        marginLeft: 20,
    },
    rating: {
        width: 100,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginLeft: 20,
        marginVertical: 5,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white"
    },
    star: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    locate: {
        width: 150,
        textAlign: "center",
        borderRadius: 5,
        marginLeft: 5,
        backgroundColor: "white",
        fontWeight: 500,
        transform: [{translateX: 15}]
    },
    image: {
        width: 140,
        height: 140,
        borderRadius: 15,
        overflow: "hidden"
    },
    best: {
        textAlign: "center",
        fontWeight: 600,
        fontSize: 25,
        marginTop: 5,
    },
    nav: {
        width: 350,
        marginTop: 20,
        marginHorizontal: "auto",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    navText: {
        width: 147,
        fontWeight: 500,
    },
    groupButton: {
        width: 210,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    button: {
        textAlign: "center",
        color: "white",
        paddingHorizontal: 15,
        paddingVertical: 7,
        borderRadius: 5,
        backgroundColor: "#0C4A6E",
    },
    dishCard: {
        width: 350,
        height: 150,
        marginTop: 20,
        marginHorizontal: "auto",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    dishImage: {
        width: 120,
        height: 120,
    },
    dishCombo: {
        width: 200,
        height: 150,
        // transform: [{ translateX: -60 }]
    },
    comboName: {
        width: 198,
        paddingHorizontal: 20,
        paddingVertical: 5,
        paddingBottom: 50,
        backgroundColor: "#0C4A6E",
        borderRadius: 15,
        fontWeight: 700,
        color: "white"
    },
    comboDetail: {
        width: 200,
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 15,
        backgroundColor: "#DBEAFE",
        transform: [{ translateY: -40 }, { translateX: -1 }]
    },
    comboRating: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "right"
    }
});

export default Eatery
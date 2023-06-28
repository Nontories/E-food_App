import React, { useState } from "react";
import { Text, View, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

import BackButton from "../BackButton";
import TabNavigate from "../TabNavigate";

import more from "../../assets/review/more.png"
import ReviewAvt from "../../assets/review/ReviewAvt.png"
import StarEmpty from "../../assets/review/StarEmpty.png"
import StarFull from "../../assets/review/StarFull.png"

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const Review = ({ route }) => {


    const restaurantID = route.params.restaurantID
    const navigation = useNavigation();

    const renderStar = (rating) => {
        const stars = [];

        for (let i = 0; i < 5; i++) {
            if (rating >= i + 1) {
                stars.push(
                    <Image
                        resizeMode="stretch"
                        style={styles.star}
                        source={StarFull}
                        key={i}
                    />
                );
            } else {
                stars.push(
                    <Image
                        resizeMode="stretch"
                        style={styles.star}
                        source={StarEmpty}
                        key={i}
                    />
                );
            }
        }

        return (
            <View style={styles.starPack}>
                {stars}
            </View>
        );
    }

    return (
        <View>
            <BackButton navigation={navigation} />
            <Text style={styles.title}>Reviews</Text>
            <Text style={styles.description}>browse any reviews for your reference</Text>
            <Text style={styles.restaurantName}>Name Restaurant</Text>
            <View style={styles.reviewCard}>
                <View style={styles.cardBelong}>
                    <Image
                        resizeMode="stretch"
                        style={styles.avt}
                        source={ReviewAvt}
                    />
                    <View style={styles.belongDetail}>
                        <Text style={styles.belongName}>
                            Your Name
                        </Text>
                        <Text style={styles.postTime}>
                            26 minutes ago
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.more}>
                        <Image
                            resizeMode="stretch"
                            style={styles.moreImg}
                            source={more}
                        />
                    </TouchableOpacity>
                </View>
                {renderStar(4)}
                {/* <View style={styles.commend}>

                </View> */}
            </View>
            <TabNavigate />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        width: WIDTH * 0.9,
        textAlign: "center",
        fontSize: 50,
        fontWeight: 700,
        marginLeft: 20,
    },
    description: {
        width: WIDTH * 0.9,
        textAlign: "center",
        fontWeight: 700,
        marginLeft: 20,
    },
    restaurantName: {
        width: WIDTH,
        textAlign: "center",
        fontSize: 30,
        fontWeight: 700,
        marginHorizontal: "auto",
        marginTop: 20,
    },
    reviewCard: {
        width: WIDTH * 0.85,
        height: HEIGHT * 0.29,
        marginTop: 30,
        marginHorizontal: WIDTH * 0.08,
        backgroundColor: "#0C4A6E",
        borderRadius: 15,
    },
    cardBelong: {
        width: 350,
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
        borderBottomWidth: 1,
    },
    avt: {
        width: 40,
        height: 40,
        marginHorizontal: 15,
    },
    belongName: {
        fontWeight: 500,
        fontSize: 20,
        color: "white",
    },
    postTime: {
        fontSize: 12,
        color: "white",
    },
    more: {
        position: "absolute",
        right: 40,
    },
    moreImg: {
        width: 20,
        height: 5,
    },
    starPack: {
        width: 350,
        height: 100,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    star: {
        width: 50,
        height: 50,
    },
});

export default Review
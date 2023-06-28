import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import BackIcon from "../assets/goBack.png"

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const BackButton = () => {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack()
                }}
            >
                <Image
                    style={styles.image}
                    source={BackIcon}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        height: HEIGHT*0.05,
        backgroundColor: "#0C4A6E",
    },
    image: {
        height: 35,
        width: 35,
    }
});

export default BackButton
import React, { useState } from "react";
import { Text, View, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import TabNavigate from "../TabNavigate";
import BackButton from "../BackButton";

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const Settings = ({ route }) => {
    const navigation = useNavigation()

    return (
        <View>
            <BackButton />
            <View style={styles.settings}>
                <Text style={styles.settings}>
                    Settings
                </Text>
            </View>
            <View style={styles.container}>

            </View>
            <TabNavigate />
        </View>
    )
}

const styles = StyleSheet.create({
    settings: {
        width: WIDTH,
        height: HEIGHT * 0.45,
        backgroundColor: "#0C4A6E",
        transform: [{ translateY: -1 }],
        textAlign: "center",
        fontWeight: 600,
        color: "white",
        fontSize: 40,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
    },
    container: {
        display: "flex",
        width: WIDTH * 0.9,
        height: HEIGHT * 0.75,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: "#000000",
        marginHorizontal: WIDTH * 0.05,
        bottom: 330,
        backgroundColor: "white",
    },
});

export default Settings
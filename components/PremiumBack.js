import * as React from "react";
import { StyleSheet, Image, View, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import BackIcon from "../assets/blackGoback.png"
import home from "../assets/premium/home.png"
import PremiumIcon from "../assets/PremiumIcon.png"

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const PremiumBack = (route) => {

    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack()
                }}
            >
                <Image
                    style={styles.backButton}
                    source={BackIcon}
                />

            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Home")
                }}
            >
                <Image
                    style={styles.homeButton}
                    source={home}
                />
            </TouchableOpacity>
            <View style={styles.form}>
                <Image
                    style={styles.formBackground}
                    source={PremiumIcon}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        height: HEIGHT * 0.065,
        backgroundColor: "#F0CC10",
    },
    backButton: {
        position: "absolute",
        width: 20,
        height: 20,
        left: 20,
        top: 30,
    },
    homeButton: {
        position: "absolute",
        width: 35,
        height: 35,
        width: 20,
        height: 20,
        right: 30,
        top: 30,
    },
    formBackground: {
        position: "absolute",
        width: WIDTH,
        height: HEIGHT * 0.67,
        top: 120,
        opacity: 0.3,
    }
});

export default PremiumBack
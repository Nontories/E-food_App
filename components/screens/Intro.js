import React from "react";
import { Text, View, StyleSheet, Button, Image, TextInput, TouchableOpacity, Dimensions } from "react-native";

import icon from "../../assets/E-food-icon.png"
import user from "../../assets/intro/User.png"
import res from "../../assets/intro/restaurant.png"

const Intro = ({navigation}) => {

    return (
        <View style={styles.container}>
            <Image
                style={styles.icon}
                source={icon}
            />
            <Text style={styles.text}>E_Food</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {navigation.navigate("SignIn")}}
            >
                <Image
                    style={styles.image}
                    source={user}
                />
                <Text
                    style={styles.guide}
                >User</Text>
            </TouchableOpacity >

            <TouchableOpacity
                style={styles.button}
                onPress={() => {navigation.navigate("Login")}}
                disabled
            >
                <Image
                    style={styles.image}
                    source={res}
                />
                <Text
                    style={styles.guide}
                >Restaurant</Text>
            </TouchableOpacity >

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        marginHorizontal: 70,
        width: 70,
        height: 70,
    },
    text: {
        fontSize: 25,
        fontWeight: 700,
        marginTop: 20,
        marginBottom: 150,
    },
    button: {
        width: 350,
        height: 40,
        flexDirection: "row",
        backgroundColor: "#0070C3",
        marginVertical: 10,
        borderRadius: 15,
    },
    image: {
        width : 25,
        height: 25,
        marginHorizontal: 10,
        marginVertical: 8,
        alignItems: "center",
    },
    guide: {
        width: 260,
        color: "white",
        fontSize: 25,
        fontWeight: 700,
        textAlign: "center",
    }
});

export default Intro

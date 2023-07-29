import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useToast } from "react-native-toast-notifications";

import { UserContext } from '../../context/UserContext';
import TabNavigate from "../TabNavigate";
import BackButton from "../BackButton";

import vector from "../../assets/Vector.png"
import plus from "../../assets/plus.png"
import logout from "../../assets/Logout.png"

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const Settings = () => {

    const navigation = useNavigation()
    const { user, updateUser } = useContext(UserContext);
    const toast = useToast();

    const button = (name, image) => {
        return (
            <View style={styles.button}>
                <Text style={styles.buttonText}>{name}</Text>
                <Image
                    source={image}
                />
            </View>
        )
    }

    const divide = (name) => {
        return (
            <View style={styles.divide}>
                <Text style={styles.divideText}>{name}</Text>
            </View>
        )
    }

    const handleLogout = () => {
        updateUser("");
        showToast("Đăng xuất thành công", "success")
        navigation.navigate("Intro")
    }

    const handleComingSoon = () => {
        showToast("Comming soon", "warning")
    }

    const showToast = (message, type) => {
        toast.show(message, {
            type: type,
            placement: "top",
            duration: 3000,
            animationType: "slide-in",
        });
    };

    return (
        <View>
            <BackButton />
            <View style={styles.settings}>
                <Text style={styles.settings}>
                    Settings
                </Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.accountName}>{user && user.user ? user.user.name : "name"}</Text>
                {divide('Account Settings')}
                <TouchableOpacity
                    onPress={() => {
                        handleComingSoon()
                    }}
                >
                    {button("Edit profile", vector)}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        handleComingSoon()
                    }}
                >
                    {button("Change password", vector)}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        handleComingSoon()
                    }}
                >
                    {button("Add a payment method", plus)}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        handleComingSoon()
                    }}
                >
                    {button("Push notifications", vector)}
                </TouchableOpacity>
                {divide('More')}
                <TouchableOpacity
                    onPress={() => {
                        handleComingSoon()
                    }}
                >
                    {button("About us", vector)}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        handleComingSoon()
                    }}
                >
                    {button("Privacy policy", vector)}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        handleComingSoon()
                    }}
                >
                    {button("Terms and conditions", vector)}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        handleLogout()
                    }}
                >
                    {button("Logout", logout)}
                </TouchableOpacity>
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
    accountName: {
        width: WIDTH * 0.8,
        marginHorizontal: WIDTH * 0.05,
        marginVertical: 15,
        fontSize: 30,
    },
    button: {
        width: WIDTH * 0.8,
        height: HEIGHT * 0.05,
        marginHorizontal: WIDTH * 0.05,
        marginVertical: 7,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 700,
    },
    divide: {
        width: WIDTH * 0.9,
        fontWeight: 700,
        opacity: 0.4,
        borderBottomWidth: 2,
        padding: 15,
    },
    divideText: {
        fontSize: 18,
    }
});

export default Settings
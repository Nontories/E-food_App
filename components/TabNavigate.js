import React, { useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';

import HomeIcon from "../assets/HomeIcon.png"
import PersonalIcon from "../assets/PersonalIcon.png"
import EfoodIcon from "../assets/E-food-icon.png"
import PremiumIcon from "../assets/PremiumIcon.png"

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

function TabNavigate() {

    const navigation = useNavigation()
    const { user } = useContext(UserContext);
    
    return (
        <View style={styles.container}>

            <TouchableOpacity
                style={styles.tabNav}
                onPress={() => {
                    navigation.navigate("Home")
                }}
            >
                <Image
                    resizeMode="stretch"
                    style={styles.tabImage}
                    source={HomeIcon}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.tabNav}
                onPress={() => {
                    navigation.navigate("Settings")
                }}
            >
                <Image
                    resizeMode="stretch"
                    style={styles.tabImage}
                    source={PersonalIcon}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.tabNav}
                onPress={() => {
                    navigation.navigate("Chat")
                }}
            >
                <Image
                    resizeMode="stretch"
                    style={styles.tabImage}
                    source={EfoodIcon}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.tabNav}
                onPress={() => {
                    if(user.user ?  user.user.isPremium : false){
                        navigation.navigate("Premium")
                    }else {
                        navigation.navigate("BuyPremium")
                    }
                }}
            >
                <Image
                    resizeMode="stretch"
                    style={[styles.tabImage, styles.premiun]}
                    source={PremiumIcon}
                />
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        height: 55,
        right :0,
        left : 0,
        top: HEIGHT * 0.9,
        borderWidth: 1,
        borderRadius: 25,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        zIndex: 999,
    },
    tabNav: {
        width: 40,
        height: 40,
        textAlign: "center"
    },
    tabImage: {
        width: 40 ,
        height: 40,
    },
    premiun: {
        width: 60,
        height: 60,
        transform: [{ translateY: -14 }, { translateX: -15 }]
    }
});

export default TabNavigate
import * as React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import TabNavigate from "../TabNavigate";
import PremiumBack from "../PremiumBack";

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const Premium = () => {

    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            {/* <PremiumBack /> */}
            <Text style={styles.comingSoon}>
                Coming Soon
            </Text>
            <TabNavigate />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        height: HEIGHT,
        justifyContent: "center",
        alignItems: "center",
    },
    comingSoon:{
        textAlign: "center",
        fontSize : 35,
        fontWeight: 700,
    }
});

export default Premium
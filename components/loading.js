import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from "react-native";

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const Loading = () => {
    return (
        <View style={styles.container}>
            <Text>
                Loading...
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        zIndex: 10,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default Loading
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import TabNavigate from "../TabNavigate";
import PremiumBack from "../PremiumBack";
import BackButton from "../BackButton";

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const PremiumResult = ({ route }) => {

    const result = route.params.data.data

    return (
        <View style={styles.container}>
            <BackButton />
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.title}>
                    Tình trạng cơ thể :
                </Text>
                <Text style={styles.content}>
                    - {result.status}
                </Text>
                {/* <Text>
                Chúng tôi có kế hoạch cho bạn.
            </Text> */}

                <Text style={styles.title}>
                    Bữa sáng :
                </Text>
                <Text style={styles.content}>
                    - {result.breakfirst}
                </Text>

                {result.snacks1 ?
                    <>
                        <Text style={styles.title}>
                            Bữa phụ :
                        </Text>
                        <Text style={styles.content}>
                            - {result.snacks1}
                        </Text>
                    </>
                    : ""}

                <Text style={styles.title}>
                    Bữa trưa :
                </Text>
                <Text style={styles.content}>
                    - {result.lunch}
                </Text>

                {result.snacks2 ?
                    <>
                        <Text style={styles.title}>
                            Bữa phụ :
                        </Text>
                        <Text style={styles.content}>
                            - {result.snacks2}
                        </Text>
                    </>
                    : ""}

                <Text style={styles.title}>
                    Bữa tối :
                </Text>
                <Text style={styles.content}>
                    - {result.dinner}
                </Text>

                {result.snacks3 ?
                    <>
                        <Text style={styles.title}>
                            Bữa phụ :
                        </Text>
                        <Text style={styles.content}>
                            - {result.snacks3}
                        </Text>
                    </>
                    : ""}

            </ScrollView>
            <TabNavigate />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        height: HEIGHT,
    },
    scrollContainer: {
        width: WIDTH,
        height: HEIGHT * 0.9,
    },
    title: {
        fontSize: 18,
        fontWeight: 500,
        marginHorizontal: WIDTH * 0.05,
        paddingVertical: HEIGHT * 0.01,
    },
    content: {
        marginHorizontal: WIDTH * 0.05,
        paddingVertical: HEIGHT * 0.01,
    }
});

export default PremiumResult
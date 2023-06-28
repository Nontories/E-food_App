import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList, Dimensions } from "react-native";
import { useFocusEffect } from '@react-navigation/native';

import SearchBar from "../SearchBar";
import TabNavigate from "../TabNavigate";

import BackIcon from "../../assets/blackGoback.png"
import eateryImage from "../../assets/home/eateryImage.png"
import star from "../../assets/home/Star.png"

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const SearchResult = (route) => {

    const searchValue = route.route.params.searchText
    const navigation = route.navigation;

    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData();
    }, [searchValue]);

    const fetchData = () => {
        fetch(`http://efood.somee.com/api/Restaurant/search?keyword=${searchValue}`)
            .then(response => response.json())
            .then(jsonData => setData(jsonData))
            .catch(error => {
                console.error(error);
            });
    };

    const setRating = (rating)=> {
        let tmp = rating
        if(tmp > 5) {
            tmp = tmp / 2
        }
        return tmp
    }

    const renderEateryCard = ({ item }) => (
        <TouchableOpacity
            style={styles.eateryCard}
            onPress={() => {
                navigation.navigate("Eatery", { restaurant: item });
            }}
        >
            <Image
                style={styles.eateryImage}
                source={{ uri: item.image }}
            />
            <View style={styles.rating}>
                <Image
                    style={styles.star}
                    source={star}
                />
                <Text style={styles.ratingText}>
                    {setRating(item.voteRating).toFixed(1)}
                </Text>
            </View>
            <View style={styles.eateryDetail}>
                <Text style={styles.eateryName}>
                    {item.name}
                </Text>
                <Text style={styles.eateryLocate}>
                    {item.address}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.backContainer}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => {
                            console.log("51")
                            navigation.goBack()
                        }}
                    >
                        <Image
                            style={styles.backImage}
                            source={BackIcon}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.searchBar}>
                    <SearchBar navigation={navigation} value={searchValue} />
                </View>
            </View>

            <View style={styles.flatListContainer}>
                {data && (
                    <FlatList
                        data={data}
                        renderItem={renderEateryCard}
                        keyExtractor={(item) => item.resId}
                    />
                )}
            </View>

            <TabNavigate />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        position: "absolute",
        height: 120,
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        backgroundColor: "#f2f2f2",
    },
    backContainer: {
        width: 390,
        height: 40,
    },
    backButton: {
        zIndex: 999,
    },
    backImage: {
        height: 30,
        width: 30,
        marginTop: 5,
        marginLeft: 20,
    },
    searchBar: {
        zIndex: -1,
    },
    eateryCard: {
        width: WIDTH * 0.9,
        height: 100,
        borderWidth: 2,
        borderColor: "#9747FF",
        borderRadius: 15,
        marginHorizontal: WIDTH * 0.05,
        marginTop: 10,
        flexDirection: "row",
        overflow: "hidden",
        alignItems: "center"
    },
    eateryImage: {
        height: 100,
        width: 100,
    },
    rating: {
        flexDirection: "row",
        marginLeft: 10,
    },
    star: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    ratingText: {
        fontWeight: 700,
    },
    eateryDetail: {
        width: WIDTH * 0.48,
        marginLeft: 10,
        textAlign: "center",
    },
    eateryName: {
        fontWeight: 700,
        marginBottom: 10,
    },
    eateryLocate: {
        // fontWeight: 50,
        fontSize: 12,
    },
    flatListContainer: {
        width: WIDTH,
        height: HEIGHT * 0.75,
        marginTop: 120,
    }
});

export default SearchResult
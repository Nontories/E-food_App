import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, FlatList, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import star from "../assets/home/Star.png"

import icon from "../assets/dish/bun_bo_icon.png"

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height


const dishData = [
    {
        name: "Com true",
        icon: require("../assets/dish/bun_bo_icon.png"),

        dishID: 1,
        dish_1: {
            img: require("../assets/dish/dish_1.png"),
            name: " Lê Gia 1",
            restaurantID: 1,
            rating: 5,
        },
        dish_2: {
            img: require("../assets/dish/dish_2.png"),
            name: "Pizza Company",
            restaurantID: 2,
            rating: 5,
        },
    },
    {
        name: "Cơm chiên 2",
        icon: require("../assets/dish/bun_bo_icon.png"),
        dishID: 2,
        dish_1: {
            restaurantID: 3,
            img: require("../assets/dish/dish_1.png"),
            name: "Bún bò 2",
            rating: 5,
        },
        dish_2: {
            restaurantID: 4,
            img: require("../assets/dish/dish_2.png"),
            name: "Pizza Company",
            rating: 5,
        },
    },
    {
        name: "Bò Bún 3",
        icon: require("../assets/dish/bun_bo_icon.png"),
        dishID: 3,
        dish_1: {
            restaurantID: 5,
            img: require("../assets/dish/dish_1.png"),
            name: "Lê Gia 3",
            rating: 5,
        },
        dish_2: {
            restaurantID: 6,
            img: require("../assets/dish/dish_2.png"),
            name: "Pizza Company",
            rating: 5,
        },
    },
    {
        name: "Bún Bò 4",
        icon: require("../assets/dish/bun_bo_icon.png"),
        restaurantID: 4,
        dishID: 4,
        dish_1: {
            restaurantID: 7,
            img: require("../assets/dish/dish_1.png"),
            name: "Bún bò 4",
            rating: 5,
        },
        dish_2: {
            restaurantID: 8,
            img: require("../assets/dish/dish_2.png"),
            name: "Pizza Company",
            rating: 5,
        },
    },
]

const DishCarosel = (route) => {
    const [restaurantData, setRestaurantData] = useState(dishData)
    const [activeButton, setActiveButton] = useState(restaurantData[0] ? restaurantData[0].name : "");
    const [load, setLoad] = useState(false)
    const navigation = useNavigation();
    const defaultImage = "https://www.bookmychefs.com/food/chef_details/NTA2"

    useEffect(() => {
        let data = [];
        fetch("http://efood.somee.com/api/Home")
            .then((response) => response.json())
            .then((jsonData) => { data = jsonData.cate; })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                const fetchPromises = data.map((element) =>
                    fetch(`http://efood.somee.com/api/Home?cate=${element.id}`)
                        .then((response) => response.json())
                        .then((jsonData) => {
                            const index = data.findIndex((item) => item.id === element.id);
                            data[index].res = jsonData.res;
                        })
                );
                Promise.all(fetchPromises)
                    .then(() => {
                        setRestaurantData(data);
                        setLoad(true)
                    });
            });
    }, []);

    useEffect(() => {
        setActiveButton(restaurantData[0] ? restaurantData[0].name : "")
    }, [restaurantData]);

    useEffect(() => {
        setActiveContent(searchItemByName(restaurantData, activeButton));
    }, [activeButton]);

    const searchItemByName = (array, itemName) => {
        return array.find(item => item.name === itemName)
    };

    const [activeContent, setActiveContent] = useState(searchItemByName(restaurantData, activeButton));

    const handleButtonPress = (buttonName) => {
        setActiveButton(buttonName);
        setActiveContent(searchItemByName(restaurantData, buttonName));
    };

    const validArray = (array) => {
        if (array) {
            if (array.res) {
                if (array.res[0] !== null) {
                    return true
                }
            }
        }
        return false
    }

    const cutArray = (array) => {
        let tmp = array
        tmp = tmp.slice(0, 4)
        return tmp
    }

    onchange = (nativeEvent) => {

    }

    renderDish = (element) => {
        return (
            <TouchableOpacity
                style={styles.dishNav}
                key={key}
                onPress={() => {
                    navigation.navigate("Eatery", { restaurant: element.item })
                }}
            >
                <Image
                    resizeMode="stretch"
                    style={styles.dishImage}
                    source={{
                        uri: typeof element.item.image === "string" && element.item.image !== null ? element.item.image : defaultImage
                    }}
                />
                {/* {console.log()} */}
                <Text style={styles.dishName}>
                    {element.item ? element.item.name : ""}
                </Text>
                <View
                    style={styles.rating}
                >
                    <Image
                        resizeMode="stretch"
                        style={styles.star}
                        source={star}
                    />
                    <Text>
                        {element.item ? element.item.voteRating.toFixed(1) : ""}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (

        <View style={styles.wrap}>

            {
                load ?
                    <ScrollView
                        onScroll={({ nativeEvent }) => onchange(nativeEvent)}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        style={styles.type}
                    >
                        {
                            typeof restaurantData !== 'undefined' ? restaurantData.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        style={[
                                            styles.typeFood,
                                            activeButton === item.name && styles.activeButton,
                                            key = { index },
                                        ]}
                                        key={index}
                                        onPress={() => handleButtonPress(item.name)}
                                    >
                                        <Image
                                            resizeMode="stretch"
                                            style={styles.typeImage}
                                            source={icon}
                                        />
                                        <Text style={[
                                            styles.typeName,
                                            activeButton === item.name && styles.activeButton
                                        ]}>
                                            {item.name}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }) : ""
                        }
                    </ScrollView>
                    :
                    <Text>Loading data...</Text>
            }
            {load ?

                <FlatList
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    showsVerticalScrollIndicator={false}
                    style={styles.dish}
                    numColumns={2}
                    data={validArray(activeContent) ? activeContent.res : []}
                    renderItem={renderDish}
                    keyExtractor={(item, index) => index.toString()}
                />
                : ""
            }

        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        width: WIDTH,
        height: 500,
    },
    type: {
        width: WIDTH,
        height: 50,
    },
    typeFood: {
        height: 40,
        padding: 10,
        marginHorizontal: 7.5,
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: "row",
    },
    typeImage: {
        width: 20,
        height: 20,
        marginRight: 15,
    },
    typeName: {
        fontWeight: 500,
        fontSize: 15,
    },
    activeButton: {
        color: "#fff",
        backgroundColor: "#0C4A6E",
        borderWidth: 0,
    },
    dish: {
        marginHorizontal: 20,
        flexDirection: "row",
        flexWrap: 'wrap',
    },
    dishNav: {
        height: 250,
        width: 150,
        marginHorizontal: 20,
        alignItems: "center",
    },
    dishImage: {
        width: 120,
        height: 120,
        marginHorizontal: "auto",
        borderRadius: 15,
    },
    dishName: {
        width: 150,
        textAlign: "center",
        fontSize: 18,
        fontWeight: 500,
        marginVertical: 5,
    },
    rating: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    star: {
        width: 15,
        height: 15,
        marginRight: 10,
    }
});

export default DishCarosel
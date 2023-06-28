import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Image, TouchableOpacity, Dimensions, ToastAndroid } from "react-native";
import { useNavigation } from '@react-navigation/native';
import searchIcon from "../assets/searchIcon.png"
import submit from "../assets/submit.png"

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const SearchBar = (route) => {

    const navigation = useNavigation()
    const value = route.value

    const [searchText, setSearchText] = useState(value);

    const handleSearch = (searchText) => {
        setSearchText(searchText)
    };

    const submitSearch = (searchText) => {
        searchText ? navigation.navigate("SearchResult", { searchText: searchText }) : showToast("chưa nhập yêu cầu cần tìm")
    }

    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.LONG, ToastAndroid.TOP, 25, 10);
    };

    return (
        <View style={styles.searchBar}>
            <Image
                style={styles.searchLogo}
                source={searchIcon}
            >
            </Image>
            <TextInput
                style={styles.searchInput}
                placeholder="Tìm Kiếm"
                placeholderTextColor="#ccc"
                value={searchText}
                onChangeText={handleSearch}
                onSubmitEditing={() => submitSearch(searchText)}
            >
            </TextInput>
            <TouchableOpacity
                onPress={() =>
                    submitSearch(searchText)
                }
            >
                <Image
                    style={styles.submit}
                    source={submit}
                />
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        width: WIDTH * 0.8,
        marginHorizontal: WIDTH * 0.1,
        marginTop: 20,
        backgroundColor: "#0C4A6E",
        borderWidth: 1,
        borderRadius: 5,
    },
    searchLogo: {
        width: WIDTH * 0.05,
        height: 20,
        marginHorizontal: 10,
    },
    searchInput: {
        padding: 10,
        width: WIDTH * 0.6,
        color: "white",
    },
    submit: {
        width: 25,
        height: 25,
    }
});
export default SearchBar;
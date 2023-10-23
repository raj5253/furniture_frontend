import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES } from "../constants/index";
import axios from "axios";
import { BASE_URL } from "../constants/index";
import styles from "./search.style";
import SearchTile from "../components/products/SearchTile";

const Search = () => {
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // console.log(searchKey);

  const handlePress = async () => {


    if (searchKey.trimStart() === "") {  //this was very much needed
      setSearchResults("");
      return
    }
    try {
      const res = await axios.get(
        `${BASE_URL}/api/products/search/${searchKey}`
      );
      setSearchResults(res.data);
      console.log("==========================================");
      console.log(res.data,);
      console.log("==========================================");
    } catch (error) {
      console.log("error in Search ", error);
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Ionicons
            name="camera-outline"
            size={SIZES.xLarge}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
        <View style={styles.serachWrapper}>
          <TextInput
            value={searchKey}
            onPressIn={() => { }}
            onChangeText={setSearchKey} //new way to call
            placeholder="what are you looking for"
            style={styles.searchInput}
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.searchBtn}
            onPress={() => {
              handlePress();
              console.log(searchKey);
            }}
          >
            <Feather name="search" size={24} color={COLORS.offwhite} />
          </TouchableOpacity>
        </View>
      </View>

      {searchResults.length === 0 ? (
        <View
          style={{
            flex: 1,
          }}
        >
          <Image
            source={require("../assets/images/Pose23.png")}
            style={styles.searchImage}
          />
        </View>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <SearchTile item={item}
          />}
          style={{ marginHorizontal: 12 }}
        />
      )}
    </SafeAreaView>
  );
};

export default Search;

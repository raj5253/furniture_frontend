import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./welcome.styles";
import { COLORS, SIZES } from "../../constants";
import { Feather, Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
    const navigation = useNavigation();

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.welcomeTxt(COLORS.black, SIZES.xSmall)}>
                    Find the Most
                </Text>
                <Text style={styles.welcomeTxt(COLORS.primary, 0)}>
                    Luxurious Furniture
                </Text>
            </View>
            <View style={styles.searchContainer}>
                <TouchableOpacity>
                    <Feather name="search" size={24} style={styles.searchIcon} />
                </TouchableOpacity>
                <View style={styles.serachWrapper}>
                    <TextInput
                        value=""
                        onPressIn={() => {
                            navigation.navigate("Search"); //important
                        }}
                        placeholder="what are you looking for"
                        style={styles.searchInput}
                    />
                </View>
                <View>
                    <TouchableOpacity style={styles.searchBtn}>
                        <Ionicons
                            name="camera-outline"
                            size={SIZES.xLarge}
                            color={COLORS.offwhite}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Welcome;

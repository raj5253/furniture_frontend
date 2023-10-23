import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./Profile.styles";
import { StatusBar } from "react-native";
import { COLORS } from "../constants";
import { useNavigation } from "@react-navigation/native";
import {
  AntDesign,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false); //true false, acc to development of that part. Connet to data base later one

  // const navigation = useNavigation();

  const userLogout = async () => {
    const id = await AsyncStorage.getItem('id')
    const useId = `user${JSON.parse(id)}`
    try {
      await AsyncStorage.multiRemove([useId, 'id']) //removeItem for single key
      navigation.replace('Bottom Navigation')
    } catch (error) {
      console.log("Error logging out the user:", error)
    }
  }

  const logout = () => {
    Alert.alert("Logout", "Are you sure you want to logout", [
      {
        text: "Cancel",
        onPress: () => {
          console.log("cancel pressed");
        },
      },
      {
        text: "Continue",
        onPress: () => {
          // console.log("cancel pressed");
          userLogout()
        },
      },
    ]);
  };

  const clearCache = () => {
    Alert.alert("Clear cache", "Are you sure you want to clear cache", [
      {
        text: "Cancel",
        onPress: () => {
          console.log("cancel  clear cache");
        },
      },
      {
        text: "Continue",
        onPress: () => {
          console.log("clear cache pressed");
        },
      },
    ]);
  };

  const deleteAccount = () => {
    Alert.alert("Delete Account", "Are you sure you want to delete account", [
      {
        text: "Cancel",
        onPress: () => {
          console.log("cancel  delete pressed");
        },
      },
      {
        text: "Continue",
        onPress: () => {
          console.log("clear cache pressed");
        },
      },
      // {
      //   defaultIndex: 1
      // }
    ]);
  };

  // after login fully done, checkExisting user created
  useEffect(() => {
    checkExistingUser()
  }, [])

  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem("id")
    const userId = `user${JSON.parse(id)}`

    try {
      const currentUser = await AsyncStorage.getItem(userId)

      if (currentUser !== null) {
        const parseData = JSON.parse(currentUser)
        setUserData(parseData)
        setUserLogin(true)
      }
      // else {
      //   navigation.navigate('Login')
      // }
    } catch (error) {
      console.log("Error in retrieving the data")
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.gray} />

        <View style={{ width: "100%" }}>
          <Image
            source={require("../assets/images/space.jpg")}
            style={styles.cover}
          />
        </View>

        <View style={styles.profileContainer}>
          <Image
            source={require("../assets/images/profile.jpeg")}
            style={styles.profile}
          />
          <Text style={styles.name}>
            {userLogin ? userData.username : "Please login into your account"}
          </Text>

          {userLogin === false ? (
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <View style={styles.loginBtn}>
                <Text style={styles.menuText}> L O G I N  </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.loginBtn}>
              <Text style={styles.menuText}>{userLogin ? userData.email : "your@email.com"}     </Text>
            </View>
          )}

          {userLogin === false ? (
            <View></View>
          ) : (
            <View style={styles.menuWrapper}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Favourites");
                }}
              >
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="heart-outline"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Favourites</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Orders");
                }}
              >
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="truck-delivery-outline"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Orders</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Cart");
                }}
              >
                <View style={styles.menuItem(0.2)}>
                  <SimpleLineIcons
                    name="bag"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Cart</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  clearCache();
                }}
              >
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="cached"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Clear cache</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  deleteAccount();
                }}
              >
                <View style={styles.menuItem(0.2)}>
                  <AntDesign
                    name="deleteuser"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Delete account</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => logout()}>
                <View style={styles.menuItem(0.2)}>
                  <AntDesign name="logout" size={24} color={COLORS.primary} />
                  <Text style={styles.menuText}>Logout</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
export default Profile;

//300 lines of code.🥲
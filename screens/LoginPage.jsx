import { Text, View, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native";
import BackBtn from "../components/BackBtn";
import { Image } from "react-native";
import styles from "./LoginPage.styles";
import Button from "../components/Button";
import { Formik } from "formik";
import * as Yup from "yup"; //import once other design of this page is completed
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, BASE_URL } from "../constants";
import { TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be atleast 8 characters")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
});

const LoginPage = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [obsecureText, setObsecureText] = useState(false);

  const isValidForm = () => {
    Alert.alert("Invalid Form", "Please provide all required fields", [
      {
        text: "Cancel",
        onPress: () => { },
      },
      {
        text: "Continue",
        onPress: () => { },
      },
    ]);
  };

  const login = async (values) => {
    setLoader(true)
    console.log(values);
    try {
      const data = values
      const res = await axios.post(`${BASE_URL}/api/login`, data);
      if (res.status === 200) {
        setLoader(false)
        setResponseData(res.data)
        const response = res.data
        await AsyncStorage.setItem(`user${response._id}`, JSON.stringify(response)) //upadate of responseData is still in waiting queue, soo response created
        await AsyncStorage.setItem('id', JSON.stringify(response._id))

        // const nweUser = await AsyncStorage.getItem(`user${responseData._id}`)
        // console.log(nweUser)
        navigation.replace('Bottom Navigation')
      } else {
        Alert.alert("Error logging in", "Please provide valid credentails", [
          {
            text: "Cancel",
            onPress: () => { },
          },
          {
            text: "Continue",
            onPress: () => { },
          },
        ]);
      }
    } catch (error) {
      console.log(error)
      Alert.alert("Error", "Oops, Error in loggin in try again", [
        {
          text: "Cancel",
          onPress: () => { },
        },
        {
          text: "Continue",
          onPress: () => { },
        },
      ]);
    } finally {
      setLoader(false)
    }
  }



  return (
    <ScrollView>
      <SafeAreaView style={{ marginHorizontal: 20 }}>
        <View>
          <BackBtn onPress={() => navigation.goBack()} />
          <Image
            source={require("./../assets/images/bk.png")}
            style={styles.cover}
          />
          <Text style={styles.title}>Unlimted Luxirous Furniture</Text>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            // onSubmit={(values) => console.log(values)}
            onSubmit={(values) => login(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              touched,
              values,
              errors,
              isValid,
              setFieldTouched,
              setFieldValue,
            }) => (
              <View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Email</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.email ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="Enter email"
                      onFocus={() => {
                        setFieldTouched("email", true);
                      }}
                      onBlur={() => {
                        setFieldTouched("email", "");
                        // setFieldTouched("email", false);
                      }}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                      value={values.email}
                      onChangeText={handleChange("email")}
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorMessage}>{errors.email}</Text>
                  )}
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>password</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.password ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="lock"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="Enter password"
                      onFocus={() => {
                        setFieldTouched("password", true);
                      }}
                      onBlur={() => {
                        setFieldTouched("password", "");
                        // setFieldTouched("password", false);
                      }}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                      value={values.password}
                      onChangeText={handleChange("password")}
                      secureTextEntry={!obsecureText}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setObsecureText(!obsecureText);
                      }}
                    >
                      <MaterialCommunityIcons
                        name={obsecureText ? "eye-outline" : "eye-off-outline"}
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  )}
                </View>

                <Button
                  title={" L O G I N "}
                  onPress={isValid ? handleSubmit : isValidForm}
                  isValid={isValid}
                  loader={loader}
                />

                <Text
                  style={styles.registration}
                  onPress={() => {
                    navigation.navigate("SignUp");
                  }}
                >
                  register
                </Text>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default LoginPage;

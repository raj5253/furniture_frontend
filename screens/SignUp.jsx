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
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { TouchableOpacity } from "react-native";
import axios from "axios";
import { BASE_URL } from "../constants";

const validationSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, "Password must be atleast 8 characters")
        .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    location: Yup.string()
        .min(3, "Provide a valid location")
        .required("Required"),
    username: Yup.string()
        .min(3, "Provide a valid username")
        .required("Required"),
});

const SignUp = ({ navigation }) => {
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

    const registerUser = async (values) => {
        setLoader(true);
        try {
            const data = values;
            const res = await axios.post(`${BASE_URL}/api/register`, data);
            if (res.status === 201) {
                navigation.replace("Login");
                setLoader(false);
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
            console.log(error);
            Alert.alert("Error", "Oops, Error in signup try again", [
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
            setLoader(false);
        }
    };

    return (
        <ScrollView>
            <SafeAreaView style={{ marginHorizontal: 20 }}>
                <View>
                    <BackBtn onPress={() => navigation.goBack()} />
                    <Image
                        source={require("./../assets/images/bk.png")}
                        style={{
                            height: SIZES.height / 5,
                            width: SIZES.width - 60,
                            resizeMode: "contain",
                            marginBottom: SIZES.xxLarge,
                        }}
                    />
                    <Text style={styles.title}>Unlimted Luxirous Furniture</Text>
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                            location: "",
                            username: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => registerUser(values)}
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
                                    <Text style={styles.label}>Username</Text>
                                    <View
                                        style={styles.inputWrapper(
                                            touched.email ? COLORS.secondary : COLORS.offwhite
                                        )}
                                    >
                                        <MaterialCommunityIcons
                                            name="face-man-profile"
                                            size={20}
                                            color={COLORS.gray}
                                            style={styles.iconStyle}
                                        />
                                        <TextInput
                                            placeholder="Username"
                                            onFocus={() => {
                                                setFieldTouched("username", true);
                                            }}
                                            onBlur={() => {
                                                setFieldTouched("username", "");
                                            }}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={{ flex: 1 }}
                                            value={values.username}
                                            onChangeText={handleChange("username")}
                                        />
                                    </View>
                                    {touched.username && errors.username && (
                                        <Text style={styles.errorMessage}>{errors.username}</Text>
                                    )}
                                </View>

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
                                    <Text style={styles.label}>Location</Text>
                                    <View
                                        style={styles.inputWrapper(
                                            touched.location ? COLORS.secondary : COLORS.offwhite
                                        )}
                                    >
                                        <Ionicons
                                            name="location-outline"
                                            size={20}
                                            color={COLORS.gray}
                                            style={styles.iconStyle}
                                        />
                                        <TextInput
                                            placeholder="Enter location"
                                            onFocus={() => {
                                                setFieldTouched("location", true);
                                            }}
                                            onBlur={() => {
                                                setFieldTouched("location", "");
                                                // setFieldTouched("location", false);
                                            }}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={{ flex: 1 }}
                                            value={values.location}
                                            onChangeText={handleChange("location")}
                                        />
                                    </View>
                                    {touched.location && errors.location && (
                                        <Text style={styles.errorMessage}>{errors.location}</Text>
                                    )}
                                </View>

                                <View style={styles.wrapper}>
                                    <Text style={styles.label}>Password</Text>
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
                                    title={" S I G N U P "}
                                    onPress={isValid ? handleSubmit : isValidForm}
                                    isValid={isValid}
                                    loader={loader}
                                />
                            </View>
                        )}
                    </Formik>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

export default SignUp;

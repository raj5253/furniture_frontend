import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/index";

const styles = StyleSheet.create({
  container: {
    width: 172,
    height: 210,
    marginEnd: 22,
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.secondary,
  },
  imgContainer: {
    flex: 1,
    width: 160,
    marginLeft: SIZES.small / 2,
    marginTop: SIZES.small / 2,
    borderRadius: SIZES.small,
    overflow: "hidden",
    // backgroundColor: COLORS.gray2,
  },
  image: {
    aspectRatio: 1, /// ???
    resizeMode: "cover",
  },
  details: {
    padding: SIZES.small,
  },
  title: { fontFamily: "bold", fontSize: SIZES.small, marginBottom: 1 },
  supplier: {
    fontFamily: "regular",
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  price: {
    fontFamily: "bold",
    fontSize: SIZES.medium,
  },

  addBtn: {
    position: "absolute",
    bottom: SIZES.xSmall,
    right: SIZES.xSmall,
  },
});

export default styles;

// npm i react-native-image-slider-box

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

export default function HomepageButtons({ text, imageSource, navigation, navLink }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate(navLink)} >
        <View style={styles.container}>
        <ImageBackground source={imageSource} style={{flex:1}} imageStyle={{opacity: 0.6}}>
          <Text style={styles.title}>{text}</Text>
        </ImageBackground>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    length: 100,
    width: 300
  },
  title: {
    color: "black",
    fontSize: 30,
    padding: 0,
    opacity: 1,
    fontWeight: "bold", 
    textAlign: "center"
  },
});
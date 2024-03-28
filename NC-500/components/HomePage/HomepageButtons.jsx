import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-paper";
import { Image } from "expo-image";


export default function HomepageButtons({
  imageSource,
  navigation,
  navLink,
  text,
}) {
  return (
    <Card style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate(navLink)}
        style={styles.button}
      >
        <Image
          style={styles.imageBackground}
          source={imageSource}
          contentFit="cover"
          transition={100}
        />
        <Text style={styles.textOverlay}>{text}</Text>
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    flex: 1,
  },
  textOverlay: {
    position: "absolute",
    bottom: 15,
    left: 15,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
 
  imageBackground: {
    flex: 1,
    margin: 5,
    resizeMode: "stretch",
    justifyContent: "center",
    aspectRatio: 1, 

  },
});

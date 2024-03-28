import { useState } from "react";
import { Linking, StyleSheet } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Image } from "expo-image";

const ToDoSingleEventMaximised = ({
  title,
  body,
  link,
  label,
  status,
  onPress,
  toggleMaximised,
  website,
}) => {
  const [addToItineraryClicked, setAddToItineraryClicked] = useState(false);
  const [buttonText, setButtonText] = useState(
    status === "unchecked" ? "Add to Itinerary" : "Remove From Itinerary"
  );

  const toggleButtonAddToItinerary = () => {
    onPress();
    setAddToItineraryClicked((prevValue) => !prevValue);
    setButtonText((prevText) =>
      prevText === "Add to Itinerary"
        ? "Remove From Itinerary"
        : "Add to Itinerary"
    );
  };

  return (
    <Card style={styles.card}>
      <Icon
        name="close"
        onPress={toggleMaximised}
        size={32}
        style={{ marginLeft: 15, marginTop: 15 }}
      />
      <Card.Content style={styles.cardContent}>
        <Text variant="headlineLarge">{title}</Text>
        <Text variant="bodyMedium">{body}</Text>
      </Card.Content>
      <Card.Cover style={styles.cardImage} source={{ uri: link }} />
      <Card.Actions style={styles.buttons}>
        <Button onPress={() => Linking.openURL(website)}>Website</Button>
        <Button onPress={toggleButtonAddToItinerary}>{buttonText}</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 5,
    height: "auto",
    marginBottom: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContent: {
    margin: 10,
    padding: 5,
    alignItems: "center",
  },
  cardImage: {
    margin: 10,
    width: 400,
    alignSelf: "center",
  },
  buttons: {
    margin: 10,
  },
});
export default ToDoSingleEventMaximised;

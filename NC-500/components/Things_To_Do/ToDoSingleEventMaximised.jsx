import { useState } from "react";
import { Linking } from "react-native";
import { Card, Text, Checkbox, Button } from "react-native-paper";

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
  const [buttonText, setButtonText] = useState("Add to Itinerary");

  const toggleButtonAddToItinerary = () => {
    setAddToItineraryClicked(!addToItineraryClicked);
    setButtonText(
      addToItineraryClicked ? "Add to Itinerary" : "Remove From Itinerary"
    );
    onPress();
  };

  return (
    <Card>
      <Card.Content>
        <Text variant="titleLarge">{title}</Text>
        <Text variant="bodyMedium">{body}</Text>
      </Card.Content>
      <Card.Cover source={{ uri: link }} />
      <Card.Actions>
        <Button onPress={() => Linking.openURL(website)}>Website</Button>
        <Button onPress={toggleButtonAddToItinerary}>{buttonText}</Button>
        <Button onPress={toggleMaximised}>Close</Button>
      </Card.Actions>
    </Card>
  );
};

export default ToDoSingleEventMaximised;

import { useState, useCallback } from "react";
import { Linking, StyleSheet } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ToDoSingleEventMaximised = ({
  title,
  body,
  link,
  toggleMaximised,
  website,
  selected,
  route_id,
  addLocationButton,
  removeLocationButton,
  location_id,
}) => {
  
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
      <Card.Cover
        style={styles.cardImage}
        source={{ uri: link }}
        loading="lazy"
      />
      <Card.Actions style={styles.buttons}>
        <Button
          onPress={() => Linking.openURL(website)}
          labelStyle={{ color: "#C67974" }}
          style={{
            borderColor: "#C67974",
          }}
        >
          Website
        </Button>
        {selected === false ? (
          <Button
            onPress={(e) => addLocationButton(e, route_id, location_id)}
            buttonColor="#C67974"
          >
            {"Add to Itinerary"}
          </Button>
        ) : (
          <Button
            // disabled={buttonLoading}
            onPress={(e) => removeLocationButton(e, route_id, location_id)}
            buttonColor="#C67974"
          >
            {"Remove From Itinerary"}
          </Button>
        )}
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

import React, { useState } from "react";
import { Card, Text, Checkbox } from "react-native-paper";
import ToDoSingleEventMaximised from "./ToDoSingleEventMaximised";
import { StyleSheet, TouchableOpacity } from "react-native";

const ToDoSingleEvent = React.memo(
  ({ title, body, link, label, status, onPress, website, lat, long}) => {
    const [maximised, setMaximised] = useState(false);

    const toggleMaximised = () => {
      setMaximised(!maximised);
    };

    if (maximised) {
      return (
        <ToDoSingleEventMaximised
          title={title}
          body={body}
          link={link}
          label={label}
          status={status}
          onPress={onPress}
          toggleMaximised={toggleMaximised}
          website={website}
          lat={lat}
          long={long}
        />
      );
    }
    return (
      <Card>
        <TouchableOpacity onPress={toggleMaximised}>
          <Card.Actions style={styles.container}>
            <Card.Cover source={{ uri: link }} style={styles.image} />
            <Text style={styles.title} variant="titleLarge">
              {title}
            </Text>
            <Checkbox.Item label={label} status={status} onPress={onPress} />
          </Card.Actions>
        </TouchableOpacity>
      </Card>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 5,
    marginTop: "5%",
    marginBottom: "5%",
  },
  content: {
    flex: 1,
    paddingRight: 5,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 4,
    flex: 1,
    marginRight: 5,
  },
  body: {
    marginBottom: 4,
  },
  website: {
    color: "blue",
    textDecorationLine: "underline",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 25,
    marginRight: 5,
  },
});

export default ToDoSingleEvent;

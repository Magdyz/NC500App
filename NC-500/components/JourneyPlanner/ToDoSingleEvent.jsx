import React, { useState } from "react";
import { Card, Text, Checkbox } from "react-native-paper";
import ToDoSingleEventMaximised from "./ToDoSingleEventMaximised";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const ToDoSingleEvent = React.memo(
  ({ title, body, link, label, status, onPress, website}) => {
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

        />
      );
    }
    return (
      <Card>
        <TouchableOpacity onPress={toggleMaximised}>
          <Card.Actions style={styles.container}>
            <Image
              style={styles.image}
              source={{ uri: link }}
              contentFit="cover"
              placeholder={blurhash}
              allowDownscaling={true}
              transition={100}
            />
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

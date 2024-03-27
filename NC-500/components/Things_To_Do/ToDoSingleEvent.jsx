import { useState } from "react";
import { Card, Text, Checkbox, TouchableRipple } from "react-native-paper";
import ToDoSingleEventMaximised from "./ToDoSingleEventMaximised";
import { StyleSheet } from "react-native-web";

const ToDoSingleEvent = ({
  title,
  body,
  link,
  label,
  status,
  onPress,
  website,
}) => {
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
      <TouchableRipple
        onPress={toggleMaximised}
        rippleColor="rgba(0, 0, 0, .32)"
      >
        <Card.Actions style={styles.container}>
          <Card.Cover source={{ uri: link }} style={styles.image} />
          <Text style={styles.title} variant="titleLarge">
            {title}
          </Text>
          <Checkbox.Item label={label} status={status} onPress={onPress} />
        </Card.Actions>
      </TouchableRipple>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
    paddingRight: 16,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 4,
    flex: 1,
    marginRight: 16,
  },
  body: {
    marginBottom: 4,
  },
  website: {
    color: "blue",
    textDecorationLine: "underline",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default ToDoSingleEvent;

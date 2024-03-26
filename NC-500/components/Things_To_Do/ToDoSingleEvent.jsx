import { useState } from "react";
import { Card, Text, Checkbox, TouchableRipple } from "react-native-paper";
import ToDoSingleEventMaximised from "./ToDoSingleEventMaximised";

const ToDoSingleEvent = ({
  title,
  body,
  link,
  label,
  status,
  onPress,
  navigation,
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
        website={"https://magz.dev"}
      />
    );
  }
  return (
    <Card>
      <TouchableRipple
        onPress={toggleMaximised}
        rippleColor="rgba(0, 0, 0, .32)"
      >
        <Card.Actions>
          <Card.Cover
            source={{ uri: link }}
            style={{
              resizeMode: "contain",
              height: 50,
              width: 50,
              borderRadius: 20,
            }}
          />
          <Text variant="titleLarge">{title}</Text>
          <Checkbox.Item label={label} status={status} onPress={onPress} />
        </Card.Actions>
      </TouchableRipple>
    </Card>
  );
};

export default ToDoSingleEvent;

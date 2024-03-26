import { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Appbar } from "react-native-paper";
import { SegmentedButtons } from "react-native-paper";
import ToDoSingleEvent from "./ToDoSingleEvent";

const ThingsToDo = ({ navigation }) => {
  const [value, setValue] = useState("");
  const [checkedItems, setCheckedItems] = useState({});
  console.log(checkedItems);

  // Function to toggle the checked state of a card
  const toggleChecked = (label) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [label]: !prevCheckedItems[label],
    }));
  };

  return (
    <ScrollView>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: "<-",
            label: "<-",
          },
          { value: "->", label: "->" },
        ]}
      />
      <ToDoSingleEvent
        title="Downright Gabbler"
        body="newBody"
        link="https://whereverly.com/wp-content/uploads/2022/07/nc500-case-study.jpg"
        label="item1"
        status={checkedItems["item1"] ? "checked" : "unchecked"}
        onPress={() => {
          toggleChecked("item1");
        }}
        navigation={navigation}
      />
      <ToDoSingleEvent
        title="Downright Gabbler"
        body="newBody"
        link="https://whereverly.com/wp-content/uploads/2022/07/nc500-case-study.jpg"
        label="item2"
        status={checkedItems["item2"] ? "checked" : "unchecked"}
        onPress={() => {
          toggleChecked("item2");
        }}
        navigation={navigation}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

const handleSearch = () => {};
const handleMore = () => {};

export default ThingsToDo;

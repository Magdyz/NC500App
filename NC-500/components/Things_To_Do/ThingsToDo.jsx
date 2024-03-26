import { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import ToDoSingleEvent from "./ToDoSingleEvent";

const ThingsToDo = () => {
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
        style={styles.segmentedButtons}
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
        title="Groam House Museum"
        body="This lovely museum is an outstanding centre for Pictish and Celtic Art in Ross-shire. The unique display is focused on 15 carved Pictish stones which all originated in the village, an important centre of early Christianity. The sculptures are amongst the works of Pictish Art that inspired George Bain, the ‘father of modern Celtic design’, most of whose surviving artwork is in the care of the museum."
        link="https://upload.wikimedia.org/wikipedia/commons/2/21/Groam_House_Museum_exterior.jpg"
        label="add"
        status={checkedItems["Groam House Museum"] ? "checked" : "unchecked"}
        onPress={() => {
          toggleChecked("Groam House Museum");
        }}
        website="https://groamhouse.org.uk/"
      />
      <ToDoSingleEvent
        title="Inverness Cathedral"
        body="Victorian Episcopalian cathedral church built of red stone and granite and hosting regular services."
        link="https://business.northcoast500.com/wp-content/uploads/nc500-members/332/288/89uip.jpg"
        label="add"
        status={checkedItems["Inverness Cathedral"] ? "checked" : "unchecked"}
        onPress={() => {
          toggleChecked("Inverness Cathedral");
        }}
        website="https://moray.anglican.org/inverness-cathedral/"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  segmentedButtons: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default ThingsToDo;

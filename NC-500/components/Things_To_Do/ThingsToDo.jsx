import { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Picker, View } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import ToDoSingleEvent from "./ToDoSingleEvent";
import { getAllLocationsPlusCategories } from "../../utils/supabase-api-calls";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";

const ThingsToDo = () => {
  const [value, setValue] = useState("");

  // checked items adds to itinarey to be sent to user it in database

  const [checkedItems, setCheckedItems] = useState({});
  console.log(checkedItems);
  const [locations, setLocations] = useState([]);
  const [loading, isLoading] = useState(true);
  const [selected, setSelected] = useState("all");

  // Function to toggle the checked state of a card
  const toggleChecked = (label) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [label]: !prevCheckedItems[label],
    }));
  };

  const data = [
    { key: "0", value: "all" },
    { key: "1", value: "museums" },
    { key: "2", value: "food and drinks" },
    { key: "3", value: "nature reserves" },
    { key: "4", value: "accommodation" },
    { key: "5", value: "outdoor activities" },
    { key: "6", value: "tours" },
    { key: "7", value: "points of interest" },
    { key: "8", value: "history and heritage" },
  ];

  useEffect(() => {
    getAllLocationsPlusCategories()
      .then((data) => {
        if (selected === "all") {
          setLocations(data);
        } else {
          setLocations(
            data.filter((location) => {
              return location.category_name === selected;
            })
          );
        }
        isLoading(false);
      })
      .catch((err) => console.log(err));
  }, [selected]);

  return (
    <View>
      <SegmentedButtons
        style={styles.segmentedButtons}
        value={value}
        onValueChange={setValue}
        search="false"
        buttons={[
          {
            value: "<-",
            label: "<-",
          },
          { value: "->", label: "->" },
        ]}
      />
      <SelectList
        setSelected={(val) => setSelected(val)}
        data={data}
        save="value"
      />
      <ScrollView>
        {!loading ? (
          locations.map((locationItem, index) => {
            return (
              <ToDoSingleEvent
                key={index}
                title={locationItem.name}
                body={locationItem.description}
                link={locationItem.img_url}
                label="add"
                status={
                  checkedItems[locationItem.name] ? "checked" : "unchecked"
                }
                onPress={() => {
                  toggleChecked(locationItem.name);
                }}
                website={locationItem.website_url}
              />
            );
          })
        ) : (
          <ActivityIndicator
            animating={true}
            size="large"
            color={MD2Colors.red800}
          />
        )}
      </ScrollView>
    </View>
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

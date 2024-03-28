import React, { useEffect, useState, useCallback, Suspense } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { getAllLocationsPlusCategories } from "../../utils/supabase-api-calls";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";
import { Button, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ToDoSingleEvent = React.lazy(() => import("./ToDoSingleEvent"));


const JourneyPlanner = () => {
  // checked items adds to itinerary to be sent to user it in database

  const [checkedItems, setCheckedItems] = useState({});
  console.log(checkedItems);
  const [locations, setLocations] = useState([]);
  const [loading, isLoading] = useState(true);
  const [selected, setSelected] = useState("all");
  const [day, setDay] = useState(1);

  // Function to toggle the checked state of a card
  const toggleChecked = useCallback((label) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [label]: !prevCheckedItems[label],
    }));
  }, []);

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

  const handleDayPress = useCallback(
    (direction) => {
      if (direction === "minus" && day > 1) {
        setDay(day - 1);
      } else if (direction === "plus" && day < 5) {
        setDay(day + 1);
      } else {
        setDay(1);
      }
    },
    [day]
  );
  useEffect(() => {
    getAllLocationsPlusCategories()
      .then((data) => {
        const dataByDay = data.filter((event) => {
          return event.day === day;
        });
        selected === "all"
          ? setLocations(dataByDay)
          : setLocations(
              dataByDay.filter((location) => {
                return location.category_name === selected;
              })
            );

        isLoading(false);
      })
      .catch((err) => console.log(err));
  }, [selected, day]);

  return (
    <View style={{ height: "100%" }}>
      <View style={styles.buttonDayToggle}>
        <Button onPress={() => handleDayPress("minus")}>
          <Icon name="arrow-left" size={20} />
        </Button>
        <Text>Day {day}</Text>
        <Button onPress={() => handleDayPress("plus")}>
          <Icon name="arrow-right" size={20} />
        </Button>
      </View>
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
                key={locationItem.location_id}
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
  buttonDayToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

export default JourneyPlanner;
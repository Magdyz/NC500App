import React, { useEffect, useState, useCallback, Suspense } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import {
  getAllLocationsPlusCategories,
  getRouteLocations,
} from "../../utils/supabase-api-calls";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";
import { Button, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ToDoSingleEvent = React.lazy(() => import("./ToDoSingleEvent"));

const JourneyPlanner = (props) => {
  const route_id = props.route.params.route_id;

  // checked items adds to itinerary to be sent to user it in database

  const [checkedItems, setCheckedItems] = useState({});
  const [locations, setLocations] = useState([]);
  const [loading, isLoading] = useState(true);
  const [selected, setSelected] = useState("all");
  const [day, setDay] = useState(1);

  useEffect(() => {
    getRouteLocations(route_id).then((response) => {
      let locations = {};
      response.forEach((location) => {
        locations[location.name] = true;
      });
      setCheckedItems(locations);
    });
  }, [day]);

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
          <Icon name="arrow-left" size={25} />
        </Button>
        <Text style={{ fontSize: 23 }}>Day {day}</Text>
        <Button onPress={() => handleDayPress("plus")}>
          <Icon name="arrow-right" size={25} />
        </Button>
      </View>
      <SelectList
        style={{ margin: 5 }}
        setSelected={(val) => setSelected(val)}
        data={data}
        save="value"
        search={false}
        defaultOption={{ key: "0", value: "all" }}
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
                route_id={route_id}
                location_id={locationItem.location_id}
                isSelected={checkedItems[locationItem.name] ? true : false}
                website={locationItem.website_url}
                lat={locationItem.lat}
                long={locationItem.long}
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
    height: "5%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

export default JourneyPlanner;

import React, { useState } from "react";
import { Card, Text, Checkbox, Button } from "react-native-paper";
import ToDoSingleEventMaximised from "./ToDoSingleEventMaximised";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import {
  addLocationToRoute,
  deleteLocationFromRoute,
} from "../../utils/supabase-api-calls";
import SmallMap from "../SmallMap"

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const ToDoSingleEvent = React.memo(
  ({
    title,
    body,
    link,
    label,
    status,
    onPress,
    website,
    isSelected,
    route_id,
    location_id,
    dayStart,
    dayNum,
    dayLocations,
    dayEnd
    
  }) => {
    const [maximised, setMaximised] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);

    const [selected, setSelected] = useState(isSelected);

    const toggleMaximised = () => {
      setMaximised(!maximised);
    };

    function addLocationButton(e, route_id, location_id) {
      e.preventDefault();
      setButtonLoading(true);
      setSelected(true);
      addLocationToRoute(route_id, location_id)
        .then(() => {
          setButtonLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setSelected(false);
          setButtonLoading(false);
        });
    }

    function removeLocationButton(e, route_id, location_id) {
      e.preventDefault();
      setButtonLoading(true);
      setSelected(false);
      deleteLocationFromRoute(route_id, location_id)
        .then(() => {
          setButtonLoading(false);
        })
        .catch((err) => {
          setSelected(true);
          setButtonLoading(false);
        });
    }

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
          dayNum={dayNum}
          dayStart={dayStart}
          dayEnd={dayEnd}
          dayLocations={dayLocations}
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
            {selected === false ? (
              <Button
                style={{ width: 140 }}
                onPress={(e) => addLocationButton(e, route_id, location_id)}
              >{`Add`}</Button>
            ) : (
              <Button
                disabled={buttonLoading}
                style={{ width: 140 }}
                onPress={(e) => removeLocationButton(e, route_id, location_id)}
              >{`Remove`}</Button>
            )}
            {/* <Checkbox.Item label={label} status={status} onPress={onPress} /> */}
          </Card.Actions>
        </TouchableOpacity>
        <SmallMap dayNum={1} dayLocations={[]} dayStart={null} dayEnd={null}> </SmallMap>
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

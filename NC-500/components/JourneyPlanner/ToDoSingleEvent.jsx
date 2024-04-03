import React, { useState } from "react";
import { Card, Text, Checkbox} from "react-native-paper";
import ToDoSingleEventMaximised from "./ToDoSingleEventMaximised";
import { StyleSheet, TouchableOpacity, Button } from "react-native";
import { Image } from "expo-image";
import {
  addLocationToRoute,
  deleteLocationFromRoute,
} from "../../utils/supabase-api-calls";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const ToDoSingleEvent = React.memo(
  ({
    title,
    body,
    link,
    website,
    isSelected,
    route_id,
    location_id,
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
          toggleMaximised={toggleMaximised}
          website={website}
          selected={selected}
          route_id={route_id}
          location_id={location_id}
          addLocationButton={addLocationButton}
          removeLocationButton={removeLocationButton}
        />
      );
    }
    return (
      <Card style={{backgroundColor:selected?'#DDE5B6':'white', marginBottom:10}}>
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
              {`${title}`}
            </Text>
            {selected === false ? (
              <Button
              title='    Add    '
              color={'#ADC178'}
                style={{ width: 140}}
                onPress={(e) => addLocationButton(e, route_id, location_id)}
              ></Button>
            ) : (
              <Button
              title='Remove'
              color={'#C67974'}
                disabled={buttonLoading}
                style={{ width: 140 }}
                onPress={(e) => removeLocationButton(e, route_id, location_id)}
              ></Button>
            )}
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

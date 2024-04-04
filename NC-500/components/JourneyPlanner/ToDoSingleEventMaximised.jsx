import { useState, useCallback } from "react";
import { Linking, StyleSheet, Button, View } from "react-native";
import { Card, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SmallMap from "../SmallMap"

const ToDoSingleEventMaximised = ({
  title,
  body,
  link,
  toggleMaximised,
  website,
  selected,
  route_id,
  addLocationButton,
  removeLocationButton,
  location_id,
  lat,
  long,
  day
  
}) => {
  return (
    <Card 
      style={(styles.card, { backgroundColor: selected ? "#DDE5B6" : "white", marginBottom:10 })}
    >
      <Icon
        name="close"
        onPress={toggleMaximised}
        size={32}
        style={{ marginLeft: 15, marginTop: 15 }}
      />
      <Card.Content style={styles.cardContent}>
        <Text variant="headlineLarge">{title}</Text>
        <Text variant="bodyMedium">{body}</Text>
      </Card.Content>
      <Card.Cover
        style={styles.cardImage}
        source={{ uri: link }}
        loading="lazy"
      />
      <Card.Actions style={styles.buttons}>

        <View
          style={{
            flexDirection: "row",
            width:200,
            alignItems: "center",
            justifyContent: "space-between",
            right: 90,
          }}
        >
          <Button
            title="Website"
            color={'#E7C5C5'}
            titleStyle={{color:'black'}}
            disabled={website === null ? true : false}
            onPress={() => Linking.openURL(website)}
          ></Button>
          {/* <Button onPress={toggleButtonAddToItinerary}>{buttonText}</Button> */}
          {selected === false ? (
            <Button
              title="    Add    "
              color={"#ADC178"}
              onPress={(e) => addLocationButton(e, route_id, location_id)}
            >
              {"Add to Itinerary"}
            </Button>
          ) : (
            <Button
              title="Remove"
              color={"#C67974"}
              onPress={(e) => removeLocationButton(e, route_id, location_id)}
            >
              {"Remove From Itinerary"}
            </Button>
          )}
        </View>

      </Card.Actions>
      <SmallMap dayNum={day} dayLocations={[{long:long, lat:lat}]} dayStart={null} dayEnd={null}> </SmallMap>

    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 5,
    height: "auto",
    marginBottom: '5%',
    justifyContent: "center",
    alignItems: "center",
  },
  cardContent: {
    margin: 10,
    padding: 5,
    alignItems: "center",
  },
  cardImage: {
    margin: 10,
    width: 400,
    alignSelf: "center",
  },
  buttons: {
    alignItems: "center",
    margin: 10,
    justifyContent: "center",
  },
});
export default ToDoSingleEventMaximised;

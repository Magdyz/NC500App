import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import apiKey from "../apiKey";
import { getMarkersData } from "../utils/supabase-api-calls";
import Header from "./Header";
import { Image } from "expo-image";

//markers pngs based on categoryId
const categoryImg = {
  1: require("../assets/Church_7.png"),
  2: require("../assets/Fork & Knife_6.png"),
  3: require("../assets/Leaf_8.png"),
  4: require("../assets/history.png"),
  5: require("../assets/Tennis_5-2.png"),
  6: require("../assets/Tour_8.png"),
  8: require("../assets/Home_8.png"),
};

// default Coordinates when map opens
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 57.7038169;
let LONGITUDE = -4.1384248;
let LATITUDE_DELTA = 4.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// Get API key
const GOOGLE_MAPS_APIKEY = apiKey;

// destination and origin values for markers
const destination = "57.5029169,-4.2386349";
const origin = "57.5029169,-4.2386349";

// Waypoints for markers
const waypoints = [
  "58.43906,-3.09424",
  "58.475708,-4.4173601",
  "58.6384,-3.0689",
  "57.89872000,-5.16039000",
  "58.56842,-4.74691",
  "58.3519,-5.15084",
  "58.23667,-5.17586",
  "58.19312,-5.33629",
  "57.83448,-5.57998",
  "57.5778,-5.80871",
  "57.43314,-5.81501",
  "57.545695,-5.512301",
];
const endOfDayCityArray = [
  {
    name: "Wick",
    description: "A town and royal burgh in Caithness.",
    coordinates: "58.43906,-3.09424",
  },
  {
    name: "Tongue",
    description: "Tongue is one of the main crofting townships.",
    coordinates: "58.475708,-4.4173601",
  },
  {
    name: "Ullapool",
    description: "The picturesque fishing town of Ullapool.",
    coordinates: "57.89872000,-5.16039000",
  },
  {
    name: "Torridon",
    description: "Torridon has a dramatic and desolate setting.",
    coordinates: "57.545695,-5.512301",
  },
];

const FullMaps = () => {
  // get directions from directions function
  const [directions, setDirections] = useState(null);
  // getting all locations for the markers from the database
  const [allMarkers, setAllMarkers] = useState([]);

  useEffect(() => {
    getMarkersData().then((markerResponse) => {
      setAllMarkers(markerResponse);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Map" />
      {
        <MapView
          style={styles.map}
          zoomEnabled={true}
          rotateEnabled={true}
          loadingEnabled={true}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          <Marker
            coordinate={{
              latitude: parseFloat(origin.split(",")[0]),
              longitude: parseFloat(origin.split(",")[1]),
            }}
            title="Inverness"
            description="Start and end of your journey"
          />
          {endOfDayCityArray.map((city) => {
            return (
              <Marker
                key={city.name}
                coordinate={{
                  latitude: parseFloat(city.coordinates.split(",")[0]),
                  longitude: parseFloat(city.coordinates.split(",")[1]),
                }}
                title={city.name}
                description={city.description}
              />
            );
          })}

          {allMarkers.map((location) => {
            const { category_id, location_id, lat, long, name, img_url } =
              location;
            if (categoryImg[category_id])
              return (
                <Marker
                  key={location_id}
                  coordinate={{
                    latitude: lat,
                    longitude: long,
                  }}
                  image={categoryImg[category_id]}
                  title={name}
                >
                  <Callout>
                    <View style={styles.markerContainer}>
                      <Text style={styles.title}>{name}</Text>

                      <Image
                        source={{ uri: img_url }}
                        style={styles.imageAndroid}
                      />
                    </View>
                  </Callout>
                </Marker>
              );
          })}

          <MapViewDirections
            origin={origin}
            waypoints={waypoints}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor="purple"
            mode="DRIVING"
            optimizeWaypoints={true}
          />
        </MapView>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },

  imageAndroid: {
    height: 200,
    width: 300,
    resizeMode: "stretch",
  },

  title: {
    textAlign: "center",
    color: "black",
    fontSize: 20,
    justifyContent: "center",
  },

  markerContainer: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    backgroundColor: "#C9CBA3",
  },
});

export default FullMaps;

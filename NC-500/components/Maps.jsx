import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import getDirections from "../utils/MapsApiCalls";
import apiKey from "../apiKey";

// default Coordinates when map opens
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 57.7038169;
let LONGITUDE = -4.1384248;
let LATITUDE_DELTA = 2.2922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// Get API key
const GOOGLE_MAPS_APIKEY = apiKey;

// destination and origin values for markers
const destination = "57.9088991,-4.0573518";
const origin = "57.5029169,-4.2386349";

// Waypoints for markers
const waypoints = ["57.5971317,-4.4235946", "57.6975343,-4.2713497"];

const Maps = () => {
  const [directions, setDirections] = useState(null);

  // get directions from directions function
  useEffect(() => {
    const fetchDirections = async () => {
      const data = await getDirections();
      setDirections(data);
    };
    fetchDirections();
  }, []);

  return (
    <View style={styles.container}>
      {directions && (
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
            coordinate={{ latitude: 57.5029169, longitude: -4.2386349 }}
            title="Start"
          />
          <Marker
            coordinate={{ latitude: 57.9088991, longitude: -4.0573518 }}
            title="Destination"
          />
          {waypoints.map((waypoint, index) => (
            <Marker
              key={index}
              pinColor="orange"
              coordinate={{
                latitude: parseFloat(waypoint.split(",")[0]),
                longitude: parseFloat(waypoint.split(",")[1]),
              }}
              title={`Location ${index + 1}`}
              description="nc500 point of interest"
            />
          ))}
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
      )}
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
});

export default Maps;

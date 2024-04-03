import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, StyleSheet, Dimensions, ScrollView, FlatList } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import apiKey from "../apiKey";


//dayNum should be a single number, 1-5, depending on day
//dayStart should be a string containing 2 coordinates, e.g ('57.4785, -3.456'). It will default to the city the day starts at if not given.
//dayEnd should be the same format as dayStart, it will also default to an ending city if not given.
//selectedLocationId will high a marker on the map
//dayLocations should be an array in the format: 
// [{"day": 1,
//  "img_url": "https://mediaim.expedia.com/destination/2/d1650b51f7741e243883d3e321237496.jpg", 
//  "lat": 57.573730494101, 
//  "long": -4.09424845767114,
//  "location_id": 7,
//  "name": "Chanonry Point"
//  "website_url": null}]

//map is non interactive for the time being, just displays information


function SmallMap({ dayNum, dayLocations=[], dayStart, dayEnd, selectedLocationId}) {

    const waypoints = []

    

    const [waypointHighlight, setWaypointHighlight] = useState(0)

    dayLocations.forEach((location)=>{
        waypoints.push((`${location.lat},${location.long}`))
    })

    useEffect(()=>{
      setWaypointHighlight(selectedLocationId)
     


    },[selectedLocationId])
 


    const dayRegionRef = {
      1: { lat: 58.0022523, long: -3.71908, delta: 1.2 },
      2: { lat: 58, long: -3.7, delta: 1.8 },
      3: { lat: 57.7, long: -5, delta: 1.8 },
      4: { lat: 57.4, long: -5.3, delta: 1.1 },
      5: { lat: 57, long: -4.9, delta: 1.8 },
    };

    const dayStartRef = {
      1: { name: "Inverness", lat: 57.4700272, long: -4.224261 },
      2: { name: "Wick", lat: 58.4405866, long: -3.1075801 },
      3: { name: "Tongue", lat: 58.4724224, long: -4.4251491 },
      4: { name: "Ullapool", lat: 57.899499, long: -5.1764874 },
      5: { name: "Torridon", lat: 57.546509, long: -5.5155031 },
    };

    const dayEndRef = {
      
      1: { name: "Wick", lat: 58.4405866, long: -3.1075801 },
      2: { name: "Tongue", lat: 58.4724224, long: -4.4251491 },
      3: { name: "Ullapool", lat: 57.899499, long: -5.1764874 },
      4: { name: "Torridon", lat: 57.546509, long: -5.5155031 },
      5: { name: "Inverness", lat: 57.4700272, long: -4.224261 }
    };

    const [mapLoaded, setMapLoaded] = useState(false);

    return (
      <View pointerEvents="none" style={{ flex: 1, backgroundColor:'white', borderColor:'#C67974',borderRadius:10, margin:10 }}>
            {!mapLoaded && (
                <View style={{height:400, marginTop: 180}}>
                    <ActivityIndicator size="large" color="#ADC178" />
                </View>
            )}
        <MapView
        key={waypointHighlight}
        pitchEnabled={false} rotateEnabled={false} zoomEnabled={false} scrollEnabled={false}
          style={{
            margin:10,
            width: Dimensions.get("window").width*0.9,
            height: Dimensions.get("window").height*0.45,
          }}
          loadingEnabled={true}
          initialRegion={{
            latitude: dayRegionRef[dayNum].lat,
            longitude: dayRegionRef[dayNum].long,
            latitudeDelta: dayRegionRef[dayNum].delta,
            longitudeDelta: dayRegionRef[dayNum].delta,
          }}
          onMapLoaded={() => setMapLoaded(true)}
        >

            {dayLocations.map((location)=>{
                return (
                    <Marker
                        key={location.location_id}
                        coordinate={{latitude: location.lat, longitude:location.long}}
                        title={location.name}
                        pinColor={location.location_id===waypointHighlight?'aqua':'red'}
                        onClick={(e)=>mapMarkerFunc(e)} >
                            
                        </Marker>
                )
            })}
            {dayStart!=="noDirection"? (<MapViewDirections
            origin={dayStart?dayStart:`${dayStartRef[dayNum].lat},${dayStartRef[dayNum].long}`}
           
            destination={dayEnd?dayEnd:`${dayEndRef[dayNum].lat},${dayEndRef[dayNum].long}`}
            apikey={apiKey}
            strokeWidth={5}
            waypoints={waypoints}
            strokeColor="purple"
            mode="DRIVING"
            optimizeWaypoints={true}
          />):null
        }
        </MapView>
      </View>
    );
  }

  export default SmallMap
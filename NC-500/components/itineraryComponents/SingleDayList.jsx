import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions, ScrollView, FlatList } from "react-native";
import { getRouteLocations } from "../../utils/supabase-api-calls";
import { Card, TouchableRipple } from "react-native-paper";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import apiKey from "../../apiKey";



function SingleDayList(props) {


  const route_id = props.route.params.route_id;
  const dayNum = props.route.params.dayNum;
  const [dayLocations, setDayLocations] = useState([]);
  const [selectedLocationId, setSelectedLocationId] = useState(null)

  useEffect(() => {
    getRouteLocations(route_id).then((response) => {
      const dayNumArray = [];
      response.forEach((location) => {
        if (location.day === dayNum) {
          dayNumArray.push(location);
        }
      });
      setDayLocations(dayNumArray);
    });
  }, []);

  function ListSection({ dayLocations }) {


    function selectCard(id){
        setSelectedLocationId(id)
    }
   
    return (
      <View
        style={{
          flex: 0.8,
          alignItems: "center",
          justifyContent: "center",
          
        }}
      >
       <ScrollView>
        
        {dayLocations.map((location, index) => {
          return <Card style={{height:50, width:350, backgroundColor:location.location_id===selectedLocationId?'pink':'white', marginBottom:10}}>
            <TouchableRipple onPress={(e)=>selectCard(location.location_id)}>
           
            <Text>{location.name}</Text>
          </TouchableRipple>
            </Card>;
        })}
        </ScrollView>
       
      </View>
    );
  }
  function DirectionsSection(){

    return(
    <View>
        <Card style={{height:50, width:350, backgroundColor:'orange'}}>
            <Text>Get Directions</Text>
        </Card>
    </View>
    )
  }

  function MapSection({ dayNum, dayLocations, dayStart, dayEnd, route_id }) {

    const waypoints = []

    dayLocations.forEach((location)=>{
        waypoints.push((`${location.lat},${location.long}`))
    })
    console.log(dayLocations)

    const dayRegionRef = {
      1: { lat: 57.3022523, long: -3.71908, delta: 2.5 },
      2: { lat: 58, long: -3.7, delta: 1.8 },
      3: { lat: 57.7, long: -5, delta: 1.8 },
      4: { lat: 57.4, long: -5.3, delta: 1.1 },
      5: { lat: 57, long: -4.9, delta: 1.6 },
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

    function mapMarkerFunc(e){

    }

    return (
      <View pointerEvents="none" style={{ flex: 1, backgroundColor: "pink" }}>
        <MapView
        pitchEnabled={false} rotateEnabled={false} zoomEnabled={false} scrollEnabled={false}
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
          }}
          loadingEnabled={true}
          initialRegion={{
            latitude: dayRegionRef[dayNum].lat,
            longitude: dayRegionRef[dayNum].long,
            latitudeDelta: dayRegionRef[dayNum].delta,
            longitudeDelta: dayRegionRef[dayNum].delta,
          }}
        >

            {dayLocations.map((location)=>{
                return (
                    <Marker
                        key={location.location_id}
                        coordinate={{latitude: location.lat, longitude:location.long}}
                        title={location.name}
                        pinColor={location.location_id===selectedLocationId?'aqua':'red'}
                        onClick={(e)=>mapMarkerFunc(e)} >
                            
                        </Marker>
                )
            })}
             <MapViewDirections
            origin={dayStart===undefined?`${dayStartRef[dayNum].lat},${dayStartRef[dayNum].long}`:dayStart}
           
            destination={dayEnd===undefined?`${dayEndRef[dayNum].lat},${dayEndRef[dayNum].long}`:dayEnd}
            apikey={apiKey}
            strokeWidth={5}
            waypoints={waypoints}
            strokeColor="purple"
            mode="DRIVING"
            optimizeWaypoints={true}
          />
        </MapView>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ListSection dayLocations={dayLocations}></ListSection>
      <DirectionsSection></DirectionsSection>
      <MapSection dayNum={dayNum} dayLocations={dayLocations}></MapSection>
    </View>
  );
}

export default SingleDayList;

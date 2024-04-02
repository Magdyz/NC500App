import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions, ScrollView, FlatList, Button } from "react-native";
import { getRouteLocations } from "../../utils/supabase-api-calls";
import { Card, TouchableRipple } from "react-native-paper";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import apiKey from "../../apiKey";
import SmallMap from "../SmallMap";



function SingleDayList(props) {
  const route_id = props.route.params.route_id;
  const dayNum = props.route.params.dayNum;
   //created a variable called dayStart and dayEnd to make the smallMaps work - need to discuss more how it works
   let dayStart = null
   let dayEnd = null
  const [dayLocations, setDayLocations] = useState([]);
  
  const [selectedLocationId, setSelectedLocationId] = useState(null)
  const navigation = props.navigation
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
    
    function selectCard(id) {
      setSelectedLocationId(id);
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
            return (
              <Card
              key={index}
                style={{
                  height: 50,
                  width: 350,
                  backgroundColor:
                    location.location_id === selectedLocationId
                      ? "pink"
                      : "white",
                  marginBottom: 10,
                }}
              >
                <TouchableRipple
                  onPress={(e) => selectCard(location.location_id)}
                >
                  <Text>{location.name}</Text>
                </TouchableRipple>
              </Card>
            );
          })}
        </ScrollView>
      </View>
    );
  }

  function DirectionsSection({navigation, dayNum, dayLocations}){

    return(
    <View>
        <Card style={{height:50, width:350, backgroundColor:'orange'}}>
            <Button title='Get Directions' onPress={(e)=>navigation.navigate('DayDirections',{dayNum:dayNum, dayLocations:dayLocations})}></Button>
        </Card>
    </View>
    )
  }

 

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ListSection dayLocations={dayLocations}></ListSection>
      <DirectionsSection navigation={navigation} dayNum ={dayNum} dayLocations = {dayLocations}></DirectionsSection>
      <SmallMap dayNum={dayNum} dayLocations={dayLocations} selectedLocationId={selectedLocationId}></SmallMap>
    </View>
  );
}

export default SingleDayList;

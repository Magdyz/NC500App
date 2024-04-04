import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { getRouteLocations } from "../../utils/supabase-api-calls";
import { Card, TouchableRipple, blurhash } from "react-native-paper";

import SmallMap from "../SmallMap";

function SingleDayList(props) {
  const route_id = props.route.params.route_id;
  const dayNum = props.route.params.dayNum;
  //created a variable called dayStart and dayEnd to make the smallMaps work - need to discuss more how it works
  let dayStart = null;
  let dayEnd = null;
  const [dayLocations, setDayLocations] = useState([]);

  const [selectedLocationId, setSelectedLocationId] = useState(0);
  const navigation = props.navigation;
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
          
        
        }}
      >
        <ScrollView style={{flex:1, alignContent:'center', marginTop:10}}>
          {dayLocations.map((location, index) => {
            return (
              <Card
                title={location.name}
                
                key={index}
                style={{
                  height: 80,
                  width: 380,
                  flex:1,
                  justifyContent:'space-between',
                  backgroundColor:
                    location.location_id === selectedLocationId
                      ? "#E7C5C5"
                      : "white",
                  marginBottom: 2,
                }}
              >
                <TouchableOpacity
                  onPress={(e) => selectCard(location.location_id)}
                  
                >
                  <Card.Actions
                    style={{
                    
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent:'space-between',
                      margin:5
                      
                      
                    }}
                  >
                    <Image
                      style={{
                        flex:0.2,
                        width: 60,
                        height: 60,
                        borderRadius: 25,
                        marginRight: 5,
                        
                        
                      }}
                      contentFit="cover"
                      placeholder={blurhash}
                      allowDownscaling={true}
                      source={{ uri: location.img_url }}
                    ></Image>
                    <Text style={{fontWeight:'bold', flex:1, margin:10}}>{location.name}</Text>
                    {/* <Button title='rate'></Button> */}
                  </Card.Actions>
                </TouchableOpacity>
              </Card>
            );
          })}
        </ScrollView>
      </View>
    );
  }

  function DirectionsSection({ navigation, dayNum, dayLocations }) {
    return (
      <View style={{ margin: 10 }}>
        <Button
        color='#ADC178'
          title="Get Directions"
          onPress={(e) =>
            navigation.navigate("DayDirections", {
              dayNum: dayNum,
              dayLocations: dayLocations,
            })
          }
        ></Button>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {dayLocations.length!==0?
      <>
      <ListSection dayLocations={dayLocations}></ListSection>
      <DirectionsSection
        navigation={navigation}
        dayNum={dayNum}
        dayLocations={dayLocations}
      ></DirectionsSection>
      <SmallMap
        dayNum={dayNum}
        dayLocations={dayLocations}
        selectedLocationId={selectedLocationId}
      ></SmallMap></>:
      <>
      <Text style={{color:'#C67974', textAlign:'center', fontSize:40, bottom:100}}>No locations selected for this day</Text>
      <Button color='#ADC178' title='Go to route planner' onPress={()=>navigation.navigate('RoutePlanRouteSelect')}></Button>
      </>}
      
    </View>
  );
}

export default SingleDayList;

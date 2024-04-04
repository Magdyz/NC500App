import { useContext, useEffect, useState } from "react";

import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";

import AuthContext from "../contexts/AuthContext";
import { getUserRoutes, deleteRoute } from "../utils/supabase-api-calls";
import ItineraryContext from "../contexts/ItineraryContext";

import Header from "./Header";

const Itinerary = ({ navigation }) => {
  const { itineraryRefresh, setItineraryRefresh } =
    useContext(ItineraryContext);

  const auth = useContext(AuthContext);
  const [userRoutes, setUserRoutes] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    if (auth !== null && auth.auth !== null) {
      getUserRoutes(auth).then((response) => {
        setUserRoutes(response);
      });
    }
    setLoading(false)
  }, [auth, itineraryRefresh]);

  if (loading===true){
    return (<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}><Text>Loading...</Text></View>)
  }

  if (auth.auth === null || auth === null) {
    return (
      <View>
        <Header title="Itinerary" />
        <Card
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            backgroundColor: "#F0EAD2",
          }}
        >
          
          <Text style={{color:'#C67974', fontSize:40, bottom:150, textAlign:'center'}}>Sign in to create a route plan</Text>
          <Button title='Go to sign in' color='#C67974' onPress={()=>navigation.navigate('Profile')}></Button>
        </Card>
      </View>
    );
  }

  return (
   <View style={{flex:1, backgroundColor:'#DDE5B6'}}>
    <Header title="Itinerary" />
    <View style={{flex:1, alignItems: "center", backgroundColor:'#DDE5B6'}}> 
    
    
        
        {userRoutes.length>0&&loading===false?userRoutes.map((route, index) => {
          return (
            
            <RouteBox
              key={index}
              routeName={route.route_name}
              route_id={route.route_id}
              itineraryRefresh={itineraryRefresh}
              setItineraryRefresh={setItineraryRefresh}
              navigation={navigation}
            ></RouteBox>
            
          );
        }):<View style={{top:150}}><Text style ={{color:'white', fontSize:50,textAlign:'center', margin:20}}>No routes created yet!</Text><Button marginTop='20%' color='#C67974' title='Go to route planner' onPress={()=>navigation.navigate('RoutePlanRouteSelect')}></Button></View>}
    
      
    </View>
    </View>
  );
};

function routeSelectButton(routeName, route_id, navigation) {
  navigation.navigate("DayList", { routeName: routeName, route_id: route_id });
}
function routeDeleteButton(e, route_id, itineraryRefresh, setItineraryRefresh) {
  e.preventDefault();
  deleteRoute(route_id)
    .then(() => {
      console.log("delete");
      setItineraryRefresh(!itineraryRefresh);
    })
    .catch((err) => {
      console.log(err);
    });
}
function RouteBox({
  routeName,
  route_id,
  navigation,
  itineraryRefresh,
  setItineraryRefresh,
}) {
  return (
    <Card style={{ width: 380, height: 80, marginTop: 30 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <Text style={{ textAlign: "center" }}>{`Route: `}</Text>
        <Text style={{ fontWeight: "bold" }}>{`${
          routeName[0].toUpperCase() + routeName.slice(1)
        }`}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Button
          color="#C9CBA3"
          title="Select"
          onPress={() => routeSelectButton(routeName, route_id, navigation)}
        ></Button>
        <Button
          color='#723D46'
          title="Delete"
          onPress={(e) =>
            routeDeleteButton(
              e,
              route_id,
              itineraryRefresh,
              setItineraryRefresh
            )
          }
        ></Button>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#C9CBA3",
  },
});

export default Itinerary;

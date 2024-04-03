import { useContext, useEffect, useState } from "react";
import { View, Text, Button, TextInput, ScrollView } from "react-native";
import { Card } from "react-native-paper";
import AuthContext from "../../contexts/AuthContext";
import {
  getUserRoutes,
  deleteRoute,
  createRoute,
} from "../../utils/supabase-api-calls";
import ItineraryContext from "../../contexts/ItineraryContext";


const RoutePlanRouteSelect = ({ navigation }) => {
    const { itineraryRefresh, setItineraryRefresh } =
      useContext(ItineraryContext);
  const auth = useContext(AuthContext);
  const [userRoutes, setUserRoutes] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("")
  const [newRouteName, setNewRouteName] = useState("");

  useEffect(() => {
    if (auth !== null && auth.auth !== null) {
      getUserRoutes(auth).then((response) => {
        setUserRoutes(response);
      });
    }
  }, [auth, buttonLoading]);

  if (auth.auth === null || auth === null) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Journey Planner</Text>
        <Text>Nothing here, sign in</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor:'#F0EAD2' }}>
      
        <ScrollView style={{flex:4}}>
        
        {userRoutes.map((route, index) => {
          return (
            <RouteBox
              setButtonLoading={setButtonLoading}
              buttonLoading={buttonLoading}
              key={index}
              routeName={route.route_name}
              route_id={route.route_id}
              navigation={navigation}
              itineraryRefresh={itineraryRefresh}
              setItineraryRefresh={setItineraryRefresh}
            ></RouteBox>
          );
        })}
        </ScrollView>
        <View style={{flex:1}}>
        <NewRouteBox
          buttonLoading={buttonLoading}
          setButtonLoading={setButtonLoading}
          newRouteName={newRouteName}
          setNewRouteName={setNewRouteName}
          auth={auth}
          setItineraryRefresh={setItineraryRefresh}
          itineraryRefresh={itineraryRefresh}
          setErrMessage={setErrMessage}
          errMessage={errMessage}
        ></NewRouteBox>
        </View>
      </View>
      
    
  );
};

function routeSelectButton(routeName, route_id, navigation) {
  navigation.navigate("JourneyPlanner", {
    routeName: routeName,
    route_id: route_id,
  });
}

function routeDeleteButton(e, route_id, setButtonLoading, itineraryRefresh, setItineraryRefresh) {
  setButtonLoading(true);

  deleteRoute(route_id)
    .then(() => {
      setButtonLoading(false);
      setItineraryRefresh(!itineraryRefresh)
    })
    .catch((err) => {
      console.log(err);
      setButtonLoading(false);
    });
}

function routeCreateButton(
  e,
  newRouteName,
  setNewRouteName,
  auth,
  setButtonLoading,
  setItineraryRefresh,
  itineraryRefresh,
  setErrMessage
) {
  setButtonLoading(true);
  setErrMessage('')

  if(newRouteName.length<4){
    setErrMessage('Name must be at least 4 characters')
    setButtonLoading(false)
    return;

  }


  setItineraryRefresh(!itineraryRefresh);
  createRoute(newRouteName, auth)
    .then(() => {
      setButtonLoading(false);
      setNewRouteName("");
    })
    .catch((err) => {
      console.log(err);
    });
}

function NewRouteBox({
  buttonLoading,
  setButtonLoading,
  newRouteName,
  setNewRouteName,
  auth = null,
  setItineraryRefresh,
  itineraryRefresh,
  setErrMessage,
  errMessage
}) {
  return (
    <Card style={{width: 380, height: 100, marginTop: 30}}>
      <Text style={{ textAlign: "center", padding:4 }}>{`Create new route`}</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <TextInput
          style={{backgroundColor:'white', width:200, padding:10}}
          placeholder="Name your route"
          value={newRouteName}
          onChangeText={(text) => setNewRouteName(text)}
        ></TextInput>
        <Button
          disabled={buttonLoading}
          color={'#ADC178'}
          title="Create"
          onPress={(e) =>
            routeCreateButton(
              e,
              newRouteName,
              setNewRouteName,
              auth,
              setButtonLoading,
              setItineraryRefresh,
              itineraryRefresh,
              setErrMessage
            )
          }
        ></Button>
       
      </View> 
      <Text style={{left:30, fontStyle:'italic'}}>{`${errMessage}`}</Text>
    </Card>
  );
}

function RouteBox({
  routeName,
  route_id,
  navigation,
  buttonLoading,
  setButtonLoading,
  itineraryRefresh, 
  setItineraryRefresh
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
          color="#ADC178"
          title="Select"
          onPress={() => routeSelectButton(routeName, route_id, navigation)}
        ></Button>
        <Button
          color='#C67974'
          title="Delete"
          onPress={(e) =>
            routeDeleteButton(
              e,
              route_id,
              setButtonLoading,
              itineraryRefresh,
              setItineraryRefresh
            )
          }
        ></Button>
      </View>
    </Card>
  );
}

export default RoutePlanRouteSelect;

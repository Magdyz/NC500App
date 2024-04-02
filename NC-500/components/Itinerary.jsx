import { useContext, useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import AuthContext from "../contexts/AuthContext";
import { getUserRoutes, deleteRoute } from "../utils/supabase-api-calls";
import ItineraryContext from "../contexts/ItineraryContext";

const Itinerary = ({ navigation }) => {
  const { itineraryRefresh, setItineraryRefresh } =
    useContext(ItineraryContext);

  const auth = useContext(AuthContext);
  const [userRoutes, setUserRoutes] = useState([]);

  useEffect(() => {
    if (auth !== null && auth.auth !== null) {
      getUserRoutes(auth).then((response) => {
        setUserRoutes(response);
      });
    }
  }, [auth, itineraryRefresh]);

  if (auth.auth === null || auth === null) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Itinerary</Text>
        <Text>Nothing here, sign in</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Itinerary</Text>
        {userRoutes.map((route, index) => {
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
        })}
      </View>
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      ></View>
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

export default Itinerary;

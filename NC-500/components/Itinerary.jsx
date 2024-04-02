import { useContext, useEffect, useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import AuthContext from "../contexts/AuthContext";
import { getUserRoutes } from "../utils/supabase-api-calls";
import ItineraryContext from "../contexts/ItineraryContext";
import { Card, Text } from "react-native-paper";
import Header from "./Header";

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
      <View>
        <Header title="Itinerary" />
        <Card
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            backgroundColor: "#FFE1A8",
          }}
        >
          <Text>Itinerary</Text>
          <Text>Nothing here, sign in</Text>
        </Card>
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

function RouteBox({ routeName, route_id, navigation }) {
  return (
    <View style={{ borderWidth: 3, width: 300, height: 70, marginTop: 30 }}>
      <Text style={{ textAlign: "center" }}>{`Route: ${routeName}`}</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Button
          title="Select"
          onPress={() => routeSelectButton(routeName, route_id, navigation)}
        ></Button>
        <Button title="Delete"></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#C9CBA3",
  },
});

export default Itinerary;

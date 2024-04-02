import { useContext, useEffect, useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import AuthContext from "../../contexts/AuthContext";
import {
  getUserRoutes,
  deleteRoute,
  createRoute,
} from "../../utils/supabase-api-calls";

const RoutePlanRouteSelect = ({ navigation }) => {
  const auth = useContext(AuthContext);
  const [userRoutes, setUserRoutes] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);

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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Select a route</Text>
        {userRoutes.map((route, index) => {
          return (
            <RouteBox
              setButtonLoading={setButtonLoading}
              buttonLoading={buttonLoading}
              key={index}
              routeName={route.route_name}
              route_id={route.route_id}
              navigation={navigation}
            ></RouteBox>
          );
        })}
        <NewRouteBox
          buttonLoading={buttonLoading}
          setButtonLoading={setButtonLoading}
          newRouteName={newRouteName}
          setNewRouteName={setNewRouteName}
          auth={auth}
        ></NewRouteBox>
      </View>
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      ></View>
    </View>
  );
};

function routeSelectButton(routeName, route_id, navigation) {
  navigation.navigate("JourneyPlanner", {
    routeName: routeName,
    route_id: route_id,
  });
}

function routeDelete(e, route_id, setButtonLoading) {
  setButtonLoading(true);

  deleteRoute(route_id)
    .then(() => {
      setButtonLoading(false);
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
  setButtonLoading
) {
  setButtonLoading(true);
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
}) {
  return (
    <View style={{ borderWidth: 3, width: 300, height: 70, marginTop: 30 }}>
      <Text style={{ textAlign: "center" }}>{`Create new route`}</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <TextInput
          placeholder="Name your route"
          value={newRouteName}
          onChangeText={(text) => setNewRouteName(text)}
        ></TextInput>
        <Button
          disabled={buttonLoading}
          title="Create"
          onPress={(e) =>
            routeCreateButton(
              e,
              newRouteName,
              setNewRouteName,
              auth,
              setButtonLoading
            )
          }
        ></Button>
      </View>
    </View>
  );
}

function RouteBox({
  routeName,
  route_id,
  navigation,
  buttonLoading,
  setButtonLoading,
}) {
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
          disabled={buttonLoading}
          onPress={() => routeSelectButton(routeName, route_id, navigation)}
        ></Button>
        <Button
          disabled={buttonLoading}
          title="Delete"
          onPress={(e) => routeDelete(e, route_id, setButtonLoading)}
        ></Button>
      </View>
    </View>
  );
}

export default RoutePlanRouteSelect;

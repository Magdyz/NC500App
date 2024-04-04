import "react-native-gesture-handler";
import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Image, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FullMaps from "./components/FullMaps";
import HomePage from "./components/HomePage/HomePage";
import supabase from "./utils/supabase";
import SignIn from "./components/Login_components/SignIn";
import CreateUser from "./components/Login_components/CreateUser";

import SingleDayList from "./components/itineraryComponents/SingleDayList";
import ThingsToDo from "./components/ThingsToDo.jsx";
import AuthContext from "./contexts/AuthContext";
import ItineraryContext from "./contexts/ItineraryContext.jsx";

import JourneyPlanner from "./components/JourneyPlanner/JourneyPlanner.jsx";
import RoutePlanRouteSelect from "./components/JourneyPlanner/RoutePlanRouteSelect.jsx";

import BottomBarNavigation from "./components/BottomBarNavigation";
import AboutPage from "./components/AboutPage";
import DayList from "./components/itineraryComponents/DayList";
import WholeRouteList from "./components/itineraryComponents/WholeRouteList.jsx";
import DayDirections from "./components/itineraryComponents/DayDirections.jsx";
import { Avatar } from "react-native-paper";

// import SingleDayList f

const Stack = createNativeStackNavigator();
const App = () => {
  const [auth, setAuth] = useState(null);
  const [itineraryRefresh, setItineraryRefresh] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuth(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setAuth(session);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ auth: auth, setAuth: setAuth }}>
      <ItineraryContext.Provider
        value={{ itineraryRefresh, setItineraryRefresh }}
      >
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: "DDE5B6",
              },
              headerTintColor: "",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          >
            <Stack.Screen
              name="BottomBar"
              component={BottomBarNavigation}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Home"
              component={HomePage}
              options={{
                title: "NC500",
                headerRight: () => (
                  <Button
                    onPress={() =>
                      alert(
                        auth !== null
                          ? `User ${auth.user.id}  is logged in`
                          : "Nobody is logged in"
                      )
                    }
                    title="Info"
                    color="black"
                  />
                ),
              }}
            />
            <Stack.Screen
              name="About"
              component={AboutPage}
              options={{
                headerStyle: {
                  backgroundColor: "#DDE5B6",
                },
                headerRight: () => (
                  <Avatar.Image
                    size={55}
                    source={require("./assets/NC500-Logo800.jpg")}
                  />
                ),
              }}
            />
            <Stack.Screen
              name="JourneyPlanner"
              component={JourneyPlanner}
              options={{
                headerStyle: {
                  backgroundColor: "#DDE5B6",
                },
                headerRight: () => (
                  <Avatar.Image
                    size={55}
                    source={require("./assets/NC500-Logo800.jpg")}
                  />
                ),
              }}
            />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="CreateUser" component={CreateUser} />
            <Stack.Screen name="Maps" component={FullMaps} />
            <Stack.Screen
              name="Days"
              component={DayList}
              options={{
                headerStyle: {
                  backgroundColor: "#DDE5B6",
                },
                headerRight: () => (
                  <Avatar.Image
                    size={55}
                    source={require("./assets/NC500-Logo800.jpg")}
                  />
                ),
              }}
            />
            <Stack.Screen
              name="Daily Locations"
              component={SingleDayList}
              options={{
                headerStyle: {
                  backgroundColor: "#DDE5B6",
                },
                headerRight: () => (
                  <Avatar.Image
                    size={55}
                    source={require("./assets/NC500-Logo800.jpg")}
                  />
                ),
              }}
            />
            <Stack.Screen
              name="WholeRouteList"
              
              component={WholeRouteList}
              options={{
                headerStyle: {
                  backgroundColor: "#DDE5B6",
                },
                headerRight: () => (
                  <Avatar.Image
                    size={55}
                    source={require("./assets/NC500-Logo800.jpg")}
                  />
                ),
              }}
            />
            <Stack.Screen
              name="DayDirections"
              component={DayDirections}
              options={{
                headerStyle: {
                  backgroundColor: "#DDE5B6",
                },
                headerRight: () => (
                  <Avatar.Image
                    size={55}
                    source={require("./assets/NC500-Logo800.jpg")}
                  />
                ),
              }}
            />
            <Stack.Screen
              name="Routes"
              component={RoutePlanRouteSelect}
              options={{
                headerStyle: {
                  backgroundColor: "#DDE5B6",
                },
                headerRight: () => (
                  <Avatar.Image
                    size={55}
                    source={require("./assets/NC500-Logo800.jpg")}
                  />
                ),
              }}
            ></Stack.Screen>

            <Stack.Screen
              name="ToDoEvent"
              component={ThingsToDo}
              options={{
                headerStyle: {
                  backgroundColor: "#DDE5B6",
                },
                headerRight: () => (
                  <Avatar.Image
                    size={55}
                    source={require("./assets/NC500-Logo800.jpg")}
                  />
                ),
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ItineraryContext.Provider>
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({});

export default App;

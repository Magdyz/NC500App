import "react-native-gesture-handler";
import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Image, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Maps from "./components/Maps";
import HomePage from "./components/HomePage";
import supabase from "./utils/supabase";
import SignIn from "./components/Login_components/SignIn";
import CreateUser from "./components/Login_components/CreateUser";
import ThingsToDo from "./components/ThingsToDo";
import AuthContext from "./contexts/AuthContext";
import JourneyPlanner from "./components/JourneyPlanner";

import { View } from "react-native-web";
import BottomBarNavigation from "./components/BottomBarNavigation";
import AboutPage from "./components/AboutPage";
import ToDoSingleEventMaximised from "./components/Things_To_Do/ToDoSingleEventMaximised";


const Stack = createNativeStackNavigator();
function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require("../NC-500/assets/NC500-Logo800.jpg")}
    />
  );
}
const App = () => {
  const [auth, setAuth] = useState(null);


  useEffect(()=>{
    supabase.auth.getSession()
    .then(({data: { session }})=>{
      setAuth(session)
    })

    supabase.auth.onAuthStateChange((_event, session)=>{

      setAuth(session)
    })
  
    


  },[])




  return (
    <AuthContext.Provider value={{ auth: auth, setAuth: setAuth }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitle: (props) => <LogoTitle {...props} />,
            headerStyle: {
              backgroundColor: "white",
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
            name="AboutPage"
            component={AboutPage}
            options={{
              title: "NC500",
              headerRight: () => (
                <Button
                  onPress={() => alert("This is a button!")}
                  title="Info"
                  color="black"
                />
              ),
            }}
          />
          <Stack.Screen name="JourneyPlanner" component={JourneyPlanner} />
        <Stack.Screen name="ThingsToDo" component={ThingsToDo} />
        <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="CreateUser" component={CreateUser} />
          <Stack.Screen name="Maps" component={Maps} />
          <Stack.Screen name="ToDoEvent" component={ToDoSingleEventMaximised} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({});

export default App;

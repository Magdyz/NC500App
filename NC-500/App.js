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
 

  // const [auth, setAuth] = useState(false)
  // useEffect(()=>{
  //   setAuth(supabase.auth.setSession());
  //   supabase.auth.onAuthStateChange((_event, session)=>{
  //     console.log(auth)
  //     setAuth(session)
  //   })


  // },[])

  return (
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
          name="Home"
          component={HomePage}
          options={{
            title: "NC500",
            headerRight: () => (
              
              <Button
                onPress={() => alert("This is a button!")}
                title='Info'
                color="black"
              />
            ),
          }}
        />
        <Stack.Screen name='SignIn' component={SignIn}/>
        <Stack.Screen name='CreateUser' component={CreateUser}/>
        <Stack.Screen name="Maps" component={Maps} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({});

export default App;

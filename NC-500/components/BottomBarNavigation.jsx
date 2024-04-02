import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, BottomNavigation } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// Tabs
import FullMaps from "./FullMaps";
import Profile from "./Profile";
import SignIn from "./Login_components/SignIn";
import CreateUser from "./Login_components/CreateUser";
import { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import Itinerary from "./Itinerary";
import HomePage from "./HomePage/HomePage";

const Tab = createBottomTabNavigator();

const BottomBarNavigation = () => {
  const auth = useContext(AuthContext);
  const [isNewUser, setIsNewUser] = useState(false);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          style={{ backgroundColor: "#C9CBA3" }}
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({
                focused,
                color: "#472D30",
                size: 24,
              });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title;

            return label;
          }}
        />
      )}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
      />

      <Tab.Screen
        name="Maps"
        component={FullMaps}
        options={{
          tabBarLabel: "Maps",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="map-search-outline" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Itinerary"
        component={Itinerary}
        options={{
          tabBarLabel: "Itinerary",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="notebook-outline" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        children={() =>
          auth.auth !== null && isNewUser === false ? (
            <Profile />
          ) : isNewUser === false ? (
            <SignIn isNewUser={isNewUser} setIsNewUser={setIsNewUser} />
          ) : (
            <CreateUser isNewUser={isNewUser} setIsNewUser={setIsNewUser} />
          )
        }
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="account-outline" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomBarNavigation;

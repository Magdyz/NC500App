import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, BottomNavigation } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// Tabs
import Maps from "./Maps";
import HomePage from "./HomePage";
import Itinerary from "./Itinerary";
import Profile from "./Profile";

const Tab = createBottomTabNavigator();

const BottomBarNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
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
              return options.tabBarIcon({ focused, color, size: 24 });
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
        component={Maps}
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
        component={Profile}
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
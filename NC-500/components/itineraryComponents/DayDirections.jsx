import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import axios from "axios";
import apiKey from "../../apiKey";
import { Card } from "react-native-paper";

function DayDirections(props) {
  const dayNum = props.route.params.dayNum;
  const dayLocations = props.route.params.dayLocations;

  const key = apiKey;
  const [routeDirections, setRouteDirections] = useState([]);
  const [routeStr, setRouteStr] = useState(
    `https://maps.googleapis.com/maps/api/directions/json?`
  );
  const [wayQuery, setWayQuery] = useState("");

  const dayStartRef = {
    1: { name: "Inverness", lat: 57.4700272, long: -4.224261 },
    2: { name: "Wick", lat: 58.4405866, long: -3.1075801 },
    3: { name: "Tongue", lat: 58.4724224, long: -4.4251491 },
    4: { name: "Ullapool", lat: 57.899499, long: -5.1764874 },
    5: { name: "Torridon", lat: 57.546509, long: -5.5155031 },
  };

  const dayEndRef = {
    1: { name: "Wick", lat: 58.4405866, long: -3.1075801 },
    2: { name: "Tongue", lat: 58.4724224, long: -4.4251491 },
    3: { name: "Ullapool", lat: 57.899499, long: -5.1764874 },
    4: { name: "Torridon", lat: 57.546509, long: -5.5155031 },
    5: { name: "Inverness", lat: 57.4700272, long: -4.224261 },
  };

  useEffect(() => {
    let wayPointsStr = "";
    if (dayLocations.length > 0) {
      wayPointsStr += "&waypoints=optimize:true";
    }

    dayLocations.forEach((location) => {
      wayPointsStr += `|${location.lat},${location.long}`;
    });

    setWayQuery(wayPointsStr);
  }, []);

  useEffect(() => {
    setRouteStr(
      `https://maps.googleapis.com/maps/api/directions/json?destination=${dayEndRef[dayNum].lat},${dayEndRef[dayNum].long}&origin=${dayStartRef[dayNum].lat},${dayStartRef[dayNum].long}`
    );
  }, []);

  useEffect(() => {
    console.log(routeStr);
    axios
      .get(`${routeStr}${wayQuery}&key=${key}`)
      .then((response) => {
        setRouteDirections(response.data.routes[0].legs);
      })
      .catch((err) => {
        console.log(err.response, "directionsErr");
      });
  }, [routeStr, wayQuery]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ScrollView>
        {routeDirections.map((leg, index) => {
          return (
            <Card style={{ width: 340, margin: 20 }} key={index}>
              <Card.Title
                style={{ height: 80 }}
                title={`${
                  index === 0
                    ? dayStartRef[dayNum].name
                    : dayLocations[index - 1].name
                } to ${
                  index === routeDirections.length - 1
                    ? dayEndRef[dayNum].name
                    : dayLocations[index].name
                }`}
                subtitle={`${leg.distance.text}     ${leg.duration.text}`}
              />
              {leg.steps.map((step, index) => {
                return (
                  <View key={index}>
                    <Text
                      style={{ color: "white", backgroundColor: "black" }}
                    >{`${step.distance.text}      ${step.duration.text}`}</Text>
                    <Text>
                      {step.html_instructions.replace(/<[^>]+>/g, " ")}
                    </Text>
                    <Text></Text>
                  </View>
                );
              })}
            </Card>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default DayDirections;

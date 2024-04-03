import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Text, Card } from "react-native-paper";

const AboutPage = ({ navigation }) => {
  return (
    <ScrollView>
      <Card style={styles.main}>
        <Card.Title title="About the NC500" />
        <Card.Content>
          <Text variant="bodyLarge">
            The North Coast 500 is Scotland's biggest roadtrip with the over 500
            mile scenic route taking you around the coast of north Scotland. The
            journey begins and ends at the northern city of Inverness, at one of
            the many highlights of history and heritage in the area, Inverness
            Castle.
          </Text>
          <Text variant="bodyLarge">
            The route will take you on a journey into the past as you discover
            ruins, castles and other landmarks, some of which dating back almost
            a thousand years! Above all there is plenty to do besides sight
            seeing. Take aim with some archery at Connell Outdoor Pursuits,
            Dornoch, or visit Gairloch Kayak Centre to take up oars and try a
            bit of Sea Kayaking. If you really fancy pushing the boat out (pun
            intended), you can visit EcoVentures at Cromarty Harbour and join
            them on their custom built 9.5m RIB on a tour of the area with
            regular appearances of bottlenose dolphins, harbour porpoises,
            seals, minke whales and a wide variety of seabirds.
          </Text>
          <Text variant="bodyLarge">
            This App is designed for you to get the best out of your roadtrip.
            Use our journey planner to view a list or a map of the activities
            you can choose from to get the most out of each day. Select which
            activities or places you want to visit, then select a campsite or
            hotel to end your journey for the day and thats your journey
            planned! Once all your days are planned, you can visit the Itinerary
            page to view a breakdown of each days activities and the optimal
            route to get the most out of your time!
          </Text>
        </Card.Content>

        <Card.Actions>
          <Button
            uppercase="true"
            style={styles.button}
            buttonColor="#C67974"
            textColor="white"
            mode="contained-tonal"
            onPress={() => navigation.navigate("Maps")}
          >
            Start Your Journey
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
    padding: 10,
    backgroundColor: "#F0EAD2",
  },
  header: {
  },

  button: {
    margin: 5,
    height: 60,
    justifyContent: "center",
  },
});

export default AboutPage;

import { View, Text, Button } from "react-native";

const HomePage = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Homepage</Text>
      <Button title="Go to Map" onPress={() => navigation.navigate("Maps")} />
    </View>
  );
};

export default HomePage;

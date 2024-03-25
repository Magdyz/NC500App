import { View, Text } from "react-native";
import { Appbar } from "react-native-paper";
import HomePage from "./HomePage";


const Itinerary = ({ navigation }) => {
  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.navigate("Home")} />
      <Appbar.Content title="Itinerary" />
      <Appbar.Action icon="magnify" onPress={handleSearch} />
      <Appbar.Action icon="dots-vertical" onPress={handleMore} />
    </Appbar.Header>
  );
};

const goBack = () => { }
const handleSearch = () => {};
const handleMore = () => {};


export default Itinerary;

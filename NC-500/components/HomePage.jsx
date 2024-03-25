import { View, Text, Button } from "react-native";
import AboutPage from "./AboutPage";

const HomePage = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Homepage</Text>
      <Button title ="Sign In" onPress={()=> navigation.navigate('SignIn')}/>
      <Button title="Go to Map" onPress={() => navigation.navigate("Maps")} />
      <Button title='Create new user' onPress={()=>navigation.navigate("CreateUser")}/>
      <Button title="Go to about" onPress={() => navigation.navigate("AboutPage")} />
    </View>
  );
};

export default HomePage;

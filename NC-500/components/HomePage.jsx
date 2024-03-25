import { View, Text, Button } from "react-native";
import supabase from "../utils/supabase";
import AboutPage from "./AboutPage";

const HomePage = ({ navigation }) => {

  function doSignOut(e){
   return supabase.auth.signOut()
   .then((response)=>{
    console.log(1)
   })

  }
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Homepage</Text>
      <Button title ="Sign In" onPress={()=> navigation.navigate('SignIn')}/>
      <Button title="Go to Map" onPress={() => navigation.navigate("Maps")} />
      <Button title='Create new user' onPress={()=>navigation.navigate("CreateUser")}/>
      <Button title= 'Sign Out' onPress={(e)=>doSignOut(e)}></Button>
      <Button title="Go to about" onPress={() => navigation.navigate("AboutPage")} />
    </View>
  );
};

export default HomePage;

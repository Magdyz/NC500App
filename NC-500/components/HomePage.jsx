import { View, Text, Button } from "react-native";
import supabase from "../utils/supabase";
import HomepageButton from "./HomepageButtons";

const HomePage = ({ navigation }) => {

  function doSignOut(e){
   return supabase.auth.signOut()
   .then((response)=>{
    console.log(1)
   })

  }
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", borderWidth: 2}}>
      <Text>Homepage</Text>
      <View style={{flex: 1, flexDirection: "column", alignItems: "center"}}>
      <HomepageButton imageSource={require("../assets/Archery.jpg")} text={"         Things To Do         "} navigation={navigation} navLink={'ThingsToDo'}/>
      <HomepageButton  imageSource={require("../assets/aboutNC500.png")} text={"    About the NC500     "} navigation={navigation} navLink={'AboutPage'}/>
      <HomepageButton imageSource={require("../assets/routePlanning.webp")} text={"        Journey Planner        "} navigation={navigation} navLink={'JourneyPlanner'}/>
      </View>
  
    </View>
  );
};

export default HomePage;

// buttons check for testing/deletion
{/* <Button title ="Sign In" onPress={()=> navigation.navigate('SignIn')}/>
<Button title="Go to Map" onPress={() => navigation.navigate("Maps")} />
<Button title='Create new user' onPress={()=>navigation.navigate("CreateUser")}/>
<Button title= 'Sign Out' onPress={(e)=>doSignOut(e)}></Button>
<Button title="Go to about" onPress={() => navigation.navigate("AboutPage")} />  */}
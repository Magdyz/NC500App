import { useContext } from "react";
import { View, Text, Button } from "react-native";
import AuthContext from "../contexts/AuthContext";
import supabase from "../utils/supabase";


const Profile = ({navigation}) => {

  const auth = useContext(AuthContext)

  function doSignOut(e){
    return supabase.auth.signOut()
    .then((response)=>{
     console.log(1)
    })
 
   }

 
    return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile page</Text>
      <Button title= 'Sign Out' onPress={(e)=>doSignOut(e)}></Button>
    </View>

)
  
  
};

export default Profile;

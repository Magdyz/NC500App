import { useContext, useEffect, useState } from "react";
import { View, Text, Button, Image } from "react-native";
import AuthContext from "../contexts/AuthContext";
import supabase from "../utils/supabase";
import { getUserInfo } from "../utils/supabase-api-calls";


const Profile = ({navigation}) => {

  const [loading, setLoading] = useState(true)

  const auth = useContext(AuthContext)
  const [userInfo, setUserInfo] = useState(null)

  useEffect(()=>{
    setLoading(true)

    getUserInfo(auth)
    .then((response)=>{
      setUserInfo(response)
      setLoading(false)

    })
    .catch((err)=>{
      console.log(err)
    })

  },[])

  function doSignOut(e){
    return supabase.auth.signOut()
    .then((response)=>{
     console.log(1)
    })
 
   }
  

   if (loading===true || userInfo===null){
    return(<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Loading...</Text>
    </View>)
   }

   console.log(userInfo)

 
    return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile page</Text>
      <Text>{`Username: ${userInfo.username!==undefined?userInfo.username:null}`}</Text>
      <Image 
      style={{width: 150, height: 150}}
      
      source={{uri:userInfo.avatar_url!==undefined?userInfo.avatar_url:null}}></Image>

      <Button title= 'Sign Out' onPress={(e)=>doSignOut(e)}></Button>
    </View>

)
  
  
};

export default Profile;


import { useContext, useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { TouchableOpacity } from "react-native";
import AuthContext from "../contexts/AuthContext";
import { getUserRoutes } from "../utils/supabase-api-calls";


const Itinerary = ({navigation}) => {

  

  const auth = useContext(AuthContext)
  const [userRoutes, setUserRoutes] = useState([])

  if (auth!==null&&auth.auth!==null){ 
    useEffect(()=>{




    
    getUserRoutes(auth)
    .then((response)=>{
      setUserRoutes(response)
    })

  },[])}

 

  if (auth.auth === null || auth === null){
    return(
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}><Text>Nothing here, sign in</Text></View>
    )
  }

  
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Itinerary</Text>
        {userRoutes.map((route)=>{
          return (
            <RouteBox routeName={route.route_name} route_id={route.route_id} navigation={navigation}></RouteBox>
          )
        })}
       
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }} >
        <Button title='Add new route'></Button>

      </View>
      </View>
    );
}


function routeSelectButton(routeName, route_id, navigation){
  navigation.navigate('DayList', {routeName:routeName, route_id:route_id})
}



function RouteBox({routeName, route_id, navigation}){
  return <View style={{borderWidth: 3, width:300, height:70, marginTop: 30}}>
    
      <Text style={{textAlign: 'center'}}>{`Route: ${routeName}`}</Text>
      <View style={{flexDirection:'row', alignItems:'center', justifyContent: "space-evenly" }}>
      <Button title='Select' onPress={()=>routeSelectButton(routeName, route_id, navigation)}></Button>
      <Button title='Delete'></Button>
      </View>

  </View>
}
 
export default Itinerary;


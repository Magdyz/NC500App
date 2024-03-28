import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native";



const DayList = (props) => {

  const navigation = props.navigation
 
  
 



  const routeName = props.route.params.routeName
  const route_id = props.route.params.route_id



 

    


    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{`Itinerary for ${routeName}, ID:${route_id}`}</Text>
        <FullRouteButton navigation={navigation} route_id={route_id}></FullRouteButton>
        <DayButton dayNum={1} navigation={navigation} route_id={route_id}></DayButton>
        <DayButton dayNum={2} navigation={navigation} route_id={route_id}></DayButton>
        <DayButton dayNum={3} navigation={navigation} route_id={route_id}></DayButton>
        <DayButton dayNum={4} navigation={navigation} route_id={route_id}></DayButton>
        <DayButton dayNum={5} navigation={navigation} route_id={route_id}></DayButton>
      </View>
    );
}

function dayButtonNav(e, dayNum, navigation, route_id){
navigation.navigate('SingleDayList', {dayNum:dayNum, route_id:route_id})
}

function fullRouteButtonNav(e, navigation, route_id){
  navigation.navigate('WholeRouteList',{route_id:route_id})

}

function FullRouteButton({navigation, route_id}){
  return <View style={{borderWidth: 3, width:300, height:80, marginTop: 30}}>
    <TouchableOpacity onPress={(e)=>fullRouteButtonNav(e, navigation, route_id)}>
      <Text style={{textAlign: 'center'}}>{`Full Route`}</Text>
    </TouchableOpacity>

  </View>
}

function DayButton({dayNum, navigation, route_id}){
  return <View style={{borderWidth: 3, width:300, height:80, marginTop: 30}}>
    <TouchableOpacity onPress={(e)=>dayButtonNav(e,dayNum, navigation, route_id)}>
      <Text style={{textAlign: 'center'}}>{`Day ${dayNum}`}</Text>
    </TouchableOpacity>

  </View>
}
 
export default DayList;
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native";



const DayList = (props) => {

  const navigation = props.navigation
 

 



  const routeName = props.route.params.routeName
  const route_id = props.route.params.route_id



 

    


    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{`Itinerary for ${routeName}, ID:${route_id}`}</Text>
        <DayButton dayNum={1} navigation={navigation} route_id={route_id}></DayButton>
        <DayButton dayNum={2} navigation={navigation} route_id={route_id}></DayButton>
        <DayButton dayNum={3} navigation={navigation} route_id={route_id}></DayButton>
        <DayButton dayNum={4} navigation={navigation} route_id={route_id}></DayButton>
        <DayButton dayNum={5} navigation={navigation} route_id={route_id}></DayButton>
      </View>
    );
}

function dayButtonNav(e, dayNum, navigation, route_id){
  console.log(1)

  navigation.navigate('SingleDayList', {dayNum:dayNum, route_id:route_id})



}

function DayButton({dayNum, navigation, route_id}){
  return <View style={{borderWidth: 3, width:300, height:100, marginTop: 30}}>
    <TouchableOpacity onPress={(e)=>dayButtonNav(e,dayNum, navigation, route_id)}>
      <Text style={{textAlign: 'center'}}>{`Day ${dayNum}`}</Text>
    </TouchableOpacity>

  </View>
}
 
export default DayList;
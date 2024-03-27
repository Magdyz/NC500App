import React, { useEffect, useState } from "react"
import { Text, View } from "react-native"
import { getRouteLocations } from "../../utils/supabase-api-calls"



function SingleDayList(props){

    const route_id = props.route.params.route_id
    const dayNum = props.route.params.dayNum
    const [dayLocations, setDayLocations] = useState([])

    useEffect(()=>{
        getRouteLocations(route_id)
        .then((response)=>{
            const dayNumArray = []
            response.forEach((location)=>{
                if (location.day===dayNum){
                    dayNumArray.push(location)
                }
            })
            setDayLocations(dayNumArray)
        
        })
      },[])

   
    

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text></Text>
        
        {dayLocations.map((location, index)=>{
            return (<Text key={index}>{`${location.name}`}</Text>)
        })}
        </View>

    )


}

export default SingleDayList



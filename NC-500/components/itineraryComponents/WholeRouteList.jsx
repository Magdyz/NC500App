import React, { useEffect, useState } from "react"
import { Text, View } from "react-native"
import { getRouteLocations } from "../../utils/supabase-api-calls"



function WholeRouteList(props){

    const route_id = props.route.params.route_id
    const [locations, setLocations] = useState([])

    useEffect(()=>{
        getRouteLocations(route_id)
        .then((response)=>{
            
            setLocations(response)
        
        })
      },[])

   
    console.log(locations, 'locations')

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text></Text>
        
        {locations.map((location, index)=>{
            return (<Text key={index}>{`${location.name}`}</Text>)
        })}
        </View>

    )


}

export default WholeRouteList
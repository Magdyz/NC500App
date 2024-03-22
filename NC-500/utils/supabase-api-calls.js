import supabase from './supabase';


function getAllLocations(){

    return supabase
    .from('Location_Data')
    .select()
    .then((response)=>{
        return response.data
    })
    .catch((err)=>{
        console.log(err)
    })
}

function getSingleLocation(location_id){

    return supabase
    .from('Location_Data')
    .select()
    .eq('id', location_id)
    .then((response)=>{
        return response.data[0]
    })
    .catch((err)=>{
        console.log(err)
    })
}

export { getAllLocations, getSingleLocation}
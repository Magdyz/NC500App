import supabase from './supabase';


function getAllLocations(){

    return supabase
    .from('Location_Data')
    .select()
    .then((response)=>{
        console.log(response, 'api')
        return response.data
    })
    .catch((err)=>{
        console.log(err)
    })
}

export { getAllLocations}
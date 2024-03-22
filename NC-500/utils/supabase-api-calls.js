import supabase from './supabase';


function getAllLocations(){

    supabase
    .from('locations')
    .select()
    .then((response)=>{
        return response.data
    })
    .catch((err)=>{
        console.log(err)
    })
}

export { getAllLocations}
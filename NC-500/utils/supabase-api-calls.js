import supabase from "./supabase";

function getAllLocations() {
  return supabase
    .from("Location_Data")
    .select()
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

function getSingleLocation(location_id) {
  return supabase
    .from("Location_Data")
    .select()
    .eq("id", location_id)
    .then((response) => {
      return response.data[0];
    })
    .catch((err) => {
      console.log(err);
    });
}

function getUserInfo(auth) {
  const authUserEmail = auth.auth.user.email;

  return supabase
    .from("user_data")
    .select()
    .eq("email", authUserEmail)
    .then((response) => {
      return response.data[0];
    })
    .catch((err) => {
      console.log(err);
    });
}

function getUserRoutes(auth){

    const authUserEmail = auth.auth.user.email

    return supabase
    .from('routes')
    .select()
    .eq('user_email', authUserEmail)
    .then((response)=>{
        return response.data
    })
    .catch((err)=>{
        console.log(err)
    })



}

function getRouteLocations(route_id){

    console.log(route_id, 'api')

    return supabase
    .from('routes_locations')
    .select('route_id, Location_Data(location_id, name, img_url, lat, long, day, website_url)')
    .eq('route_id', route_id)
    .then((response)=>{
        let locations = []
        
        response.data.forEach((element)=>{
           locations.push(element.Location_Data)
            
        })
        console.log(locations)
        return locations
    })
    .catch((err)=>{
        console.log(err)
    })




}

function getAllLocationsPlusCategories() {
  return supabase
    .from("Location_Data")
    .select(`*, ...Categories(*)`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

export { getAllLocations, getSingleLocation, getUserInfo, getUserRoutes, getRouteLocations, getAllLocationsPlusCategories}


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

 

    return supabase
    .from('routes_locations')
    .select('route_id, Location_Data(location_id, name, img_url, lat, long, day, website_url)')
    .eq('route_id', route_id)
    .then((response)=>{
        let locations = []
        
        response.data.forEach((element)=>{
           locations.push(element.Location_Data)
            
        })
       
        
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

function getMarkersData() {
    return supabase
    .from('Location_Data')
    .select("location_id, lat, long, category_id, name")
    .then((res) => {
        return res.data
    })
}

function addLocationToRoute(route_id, location_id){
  return supabase
  .from('routes_locations')
  .insert({route_id:route_id, location_id:location_id})
  .then((res)=>{
    return res.status
  })
  .catch((err)=>{
    console.log(err)
  })
}

function deleteLocationFromRoute(route_id, location_id){
  return supabase
  .from('routes_locations')
  .delete()
  .eq('route_id', route_id).eq('location_id', location_id)
  .then((res)=>{
    return res
  })
  .catch((err)=>{
    console.log(err)
  })
}

function deleteRoute(route_id){
  return supabase
  .from('routes')
  .delete()
  .eq('route_id', route_id)
  .then((res)=>{
   
    return res
  })
  .catch((err)=>{
    console.log(err)
  })
}

function createRoute(routeName, auth){
  const userEmail = auth.auth.user.email
  return supabase
  .from('routes')
  .insert({route_name:routeName, user_email:userEmail})
  .then((res)=>{
    return res
  })
  .catch((err)=>{
    console.log(err)
  })
}

export { getAllLocations, getSingleLocation, getUserInfo, getUserRoutes, getRouteLocations, getAllLocationsPlusCategories, getMarkersData, addLocationToRoute, deleteLocationFromRoute, deleteRoute, createRoute}

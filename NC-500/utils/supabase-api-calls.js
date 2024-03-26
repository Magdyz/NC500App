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

export {
  getAllLocations,
  getSingleLocation,
  getUserInfo,
  getAllLocationsPlusCategories,
};

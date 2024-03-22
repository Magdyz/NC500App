import apiKey from "../apiKey";

const getDirections = async () => {
  // Get API key
  const GOOGLE_MAPS_APIKEY = apiKey;
  // destination and origin values for markers
  const destination = "57.9088991,-4.0573518";
  const origin = "57.5029169,-4.2386349";
  // Waypoints for markers
  const waypoints = ["57.5971317,-4.4235946", "57.6975343,-4.2713497"];

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=${waypoints.join(
        "|"
      )}&key=${GOOGLE_MAPS_APIKEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching directions:", error);
    return null;
  }
};

export default getDirections;

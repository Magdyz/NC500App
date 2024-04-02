import { useContext, useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import AuthContext from "../contexts/AuthContext";
import supabase from "../utils/supabase";
import { getUserInfo } from "../utils/supabase-api-calls";
import { Button, Text } from "react-native-paper";

const Profile = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  const auth = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    setLoading(true);

    getUserInfo(auth)
      .then((response) => {
        setUserInfo(response);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function doSignOut(e) {
    return supabase.auth.signOut().then((response) => {
      console.log(1);
    });
  }

  if (loading === true || userInfo === null) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.main}>
      <Image
        style={{ width: 150, height: 150 }}
        source={{
          uri: userInfo.avatar_url !== undefined ? userInfo.avatar_url : null,
        }}
      ></Image>

      <Text>Profile page</Text>
      <Text>{`Username: ${
        userInfo.username !== undefined ? userInfo.username : null
      }`}</Text>

      <Button
        buttonColor="#ffe5d9"
        mode="contained-tonal"
        onPress={(e) => doSignOut(e)}
      >
        Sign Out
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default Profile;

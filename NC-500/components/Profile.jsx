import { useContext, useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import AuthContext from "../contexts/AuthContext";
import supabase from "../utils/supabase";
import { getUserInfo } from "../utils/supabase-api-calls";
import { Button, Text, Card } from "react-native-paper";
import Header from "./Header";

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
    <View>
      <Header title="Profile" />
      <View style={styles.main}>


        <Image
          style={{ width: 150, height: 150 }}
          source={{
            uri: userInfo.avatar_url !== undefined ? userInfo.avatar_url : null,
          }}
        ></Image>
        <Card style={styles.card}>
          <Text variant="bodyLarge" style={styles.text}>{`Username: ${
            userInfo.username !== undefined ? userInfo.username : null
          }`}</Text>
        </Card>
        <Button
          uppercase="true"
          style={styles.button}
          buttonColor="#723D46"
          textColor="white"
          mode="contained-tonal"
          onPress={(e) => doSignOut(e)}
        >
          Sign Out
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: "90%",
    justifyContent:"center",
    alignItems: "center",
    backgroundColor: "#FFE1A8",
  },
  button: {
    margin: 5,
    height: 60,
    justifyContent: "center",
  },
  text: {
    margin: 14,
    alignSelf: "flex-start",
  },
  card: {
    margin: 20,
    backgroundColor: "#C9CBA3",
  },
});

export default Profile;

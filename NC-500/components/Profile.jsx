import { useContext, useEffect, useState } from "react";
import { View, Image, StyleSheet, TextInput } from "react-native";
import AuthContext from "../contexts/AuthContext";
import supabase from "../utils/supabase";
import { getUserInfo, updateUserPic } from "../utils/supabase-api-calls";
import { Button, Text, Card } from "react-native-paper";
import Header from "./Header";
import * as ImagePicker from 'expo-image-picker'

const Profile = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [image, setImage] =useState(null)

  const auth = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [pictureEdit, setPictureEdit] = useState(false)
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

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
  }, [image]);

  function doSignOut(e) {
    return supabase.auth.signOut().then((response) => {
      console.log('signed out');
    });
  }

  async function pickImage(){
  
   
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });
    console.log(result)

    if (result.assets===null){
      return
    }
    
    const uri = result.assets[0].uri
    
    updateUserPic(uri, auth)
    .then((response)=>{
      setImage(result.assets[0].uri)
      
    })
    .catch((err)=>{
      console.log(err)
    })

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
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Image 
            style={{ width: 250, height: 250, borderRadius:20 }}
            source={{
              uri:
                userInfo.avatar_url !== undefined||userInfo.avatar_url!==null ? userInfo.avatar_url : null,
            }}
          ></Image>
          <View>
            {pictureEdit?<TextInput></TextInput>:<Button onPress={()=>pickImage()}>Change Picture</Button>}
          </View>
          <Card style={styles.card}>
            <Text variant="bodyLarge" style={styles.text}>{`Username: ${
              userInfo.username !== undefined ? userInfo.username : null
            }`}</Text>
          </Card>
          <Button
            uppercase="true"
            style={styles.button}
            buttonColor="#C67974"
            textColor="white"
            mode="contained-tonal"
            onPress={(e) => doSignOut(e)}
          >
            Sign Out
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0EAD2",
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
    backgroundColor: "#DDE5B6",
  },
});

export default Profile;

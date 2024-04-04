import { View } from "react-native";
import { StyleSheet, Alert } from "react-native";
import { useContext, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import supabase from "../../utils/supabase";
import { Button, Text, Card, TextInput } from "react-native-paper";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import AuthContext from "../../contexts/AuthContext";
import Header from "../Header";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format!")
    .required("Email is a required field"),
  password: yup
    .string()
    .required("Password is a required field")
    .min(6, "Must be at least 6 characters"),
});

export function ErrorText({ name, errors }) {
  return (
    <View style={{ color: "red" }}>
      {errors[name] && (
        <Text style={{ color: "red" }}>{errors?.[name]?.message}</Text>
      )}
    </View>
  );
}

const SignIn = (props) => {
  const setIsNewUser = props.setIsNewUser;

  const auth = useContext(AuthContext);
  useEffect(() => {
    if (auth.auth !== null) {
      console.log("sign in useContext");
    }
  }, [auth]);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    register("email");
    register("password");
  }, []);

  function doSignIn(userData) {
    

    return supabase.auth
      .signInWithPassword({
        email: userData.email,
        password: userData.password,
      })
      .then((response) => {
        
        if (response.error !== undefined) {
          errorAlert({
            title: "Could not be signed in",
            message: response.error.message,
          });
          return;
        }
        setIsNewUser(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function errorAlert({ title, message }) {
    Alert.alert(title, message, [{ text: "OK" }]);
  }

  function newUserButton(e) {
    e.preventDefault();
    setIsNewUser(true);
  }

  return (
    <View style={{ height: "100%" }}>
      <Header title="Profile" />
      <Card
        style={{
          backgroundColor: "#F0EAD2",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextInput

          placeholder="Email Address"
          id="email"
          style={styles.input}
          textContentType="emailAddress"
          autoCapitalize="none"
          onChangeText={(text) => setValue("email", text)}
        />
        <ErrorText name="email" errors={errors} />
        <TextInput
          placeholder="Password"
          id="password"
          style={styles.input}
          secureTextEntry={true}
          textContentType="password"
          autoCapitalize="none"
          onChangeText={(text) => setValue("password", text)}
        />
        <ErrorText name="password" errors={errors} />
        <Button
          uppercase="true"
          style={styles.button}
          buttonColor="#C67974"
          textColor="white"
          mode="contained-tonal"
          onPress={handleSubmit(doSignIn)}
        >
          Sign In
        </Button>
        <Button
          uppercase="true"
          style={styles.button}
          buttonColor="#C67974"
          textColor="white"
          mode="contained-tonal"
          onPress={(e) => newUserButton(e)}
        >
          Create new user
        </Button>
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    width: 300,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
  },

  button: {
    margin: 5,
    height: 60,
    justifyContent: "center",
  },
});

export default SignIn;

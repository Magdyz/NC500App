import { View, Text, Button, Card, Title, Alert } from "react-native";
import { TextInput, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import {yupResolver} from '@hookform/resolvers/yup'
import supabase from "../../utils/supabase";
import CreateUser from "./CreateUser";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {useForm} from "react-hook-form"
import * as yup from "yup"

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format!")
    .required("Email is a required field"),
  password: yup
    .string()
    .required("Password is a required field")
    .min(6, "Must be at least 6 characters")

})

export function ErrorText({name, errors}){
  return (
    <View style={{color: "red"}}>
      {errors[name] && (
        <Text style={{color: "red"}}>{errors?.[name]?.message}</Text>

      )}

    </View>
  )

}



const  SignIn = ({ navigation })=>{

  const {register,
        setValue,
        getValues, 
        control,
        handleSubmit,
        reset,
        formState: {errors}} =
        useForm({
          resolver: yupResolver(loginSchema),
          defaultValues :{
            email:"",
            password:""
          }
        })

 useEffect(()=>{
  register("email")
  register("password")

 }, [])

function doSignIn(userData){
  console.log(userData)



 return supabase.auth.signInWithPassword({email:userData.email, password:userData.password})
 .then((response)=>{
  console.log(1)
    console.log(response)
    console.log(response.error)
    console.log(response.data)
      if (response.error!==undefined){
        errorAlert({title:'Could not be signed in', message: response.error.message} )
        return
      }
 })
 .catch((err)=>{
  console.log(err)
 })
    

    }
 

 function errorAlert({title, message}){
  Alert.alert(title, message, [
    {text:'OK'}
  ])
 }

  return (
 
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    
        <Text>Sign In</Text>
        <Text>Email Address</Text>
        <TextInput
        id='email'
        style={styles.input}
        textContentType="emailAddress"
        autoCapitalize="none"
        
        onChangeText={(text)=>setValue("email", text)}
        />
        <ErrorText name='email' errors={errors}/>
         <Text>Password</Text>
        <TextInput
        id='password'
        style={styles.input}
        secureTextEntry={true}
        textContentType="password"
        autoCapitalize="none"
        
        onChangeText={(text)=>setValue("password", text)}
        />
         <ErrorText name='password' errors={errors}/>
        <Button title='Sign In' onPress={handleSubmit(doSignIn)}/>

   
  </View>
 
 
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default SignIn;
import { View, Text, Button, Card, Title, Alert } from "react-native";
import { TextInput, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import {yupResolver} from '@hookform/resolvers/yup'
import supabase from "../../utils/supabase";
import React from "react";

import {useForm} from "react-hook-form"
import * as yup from "yup"



  function CreateUser(props){

    const setIsNewUser = props.setIsNewUser


   const createUserSchema = yup.object().shape({
    
        email: yup
          .string()
          .email("Invalid email format!")
          .required("Email is a required field"),
        password: yup
          .string()
          .required("Password is a required field")
          .min(6, "Must be at least 6 characters"),
        username: yup
          .string()
          .required("Username is a required field")
          .min(6, "Username must be at least 6 characters")
            
      
      })

      

        const {register,
              setValue,
              handleSubmit,            
              formState: {errors}} =
              useForm({
                resolver: yupResolver(createUserSchema),
                defaultValues :{
                  email:"",
                  password:"",
                  username:""

                }
              })
      
       useEffect(()=>{
        register("email")
        register("password")
        register("username")
      
       }, [])

function ErrorText({name, errors}){
    return (
      <View style={{color: "red"}}>
        {errors[name] && (
          <Text style={{color: "red"}}>{errors?.[name]?.message}</Text>
  
        )}
  
      </View>
    )
}

function errorAlert({title, message}){
    Alert.alert(title, message, [
      {text:'OK'}
    ])
   }
  
  function doCreateUser(data){
    console.log(data)
     return supabase.auth.signUp({email: data.email, password:data.password})
     .then((response)=>{
        if (response?.error){
            errorAlert({title:'There was an error creating a new user', message: response.error.message})
            return
        }
      

    return supabase.from('user_data').insert({user_id:response.data.user.id, username:data.username}).select()
    .then((response)=>{
        if(response?.error){
            errorAlert({title:'There was an error creating a new user', message: response.error.message})
            return

        }
        setIsNewUser(false)
    })
     })
     .catch((err)=>{
        console.log(err)
     })



        
    }
  
    function signInButton(e){
      e.preventDefault()
      setIsNewUser(false)
    }

return (<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    
<Text>Username</Text>
<TextInput
id='username'
style={styles.input}
textContentType="username"
autoCapitalize="none"

onChangeText={(text)=>setValue("username", text)}
/>
<ErrorText name='username' errors={errors}/>

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
<Button title='Create profile' onPress={handleSubmit(doCreateUser)}/>
<Button title='Sign in as existing user' onPress={(e)=>{signInButton(e)}}/>



</View>)
  }

  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
  

  export default CreateUser
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    TextInput,
    Pressable,
    Alert
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { useNavigation } from "@react-navigation/native";
  import axios from "axios";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  
  const LoginScreen = () => {
    const navigation = useNavigation();
  
    useEffect(()=>{
      const homeNavigate = async () => {
        try {
          const token = await AsyncStorage.getItem("authToken");
          if (token) {
            navigation.replace("HomeScreen");
          }else{
            navigation.replace("LoginScreen")
          }
        } catch (error) {
          console.log("Error : " + error);
        }
      }
      homeNavigate();
    },[]);
  
    
  
    return (
      <View
        style={{
          backgroundColor: "white",
          padding: 10,
          alignItems: "center",
          justifyContent:"center",
          flex: 1,
        }}>
        <Text style={{
            textAlign:"center",
            fontSize:24,
            fontWeight:"700"
        }}>ChatWithMe</Text>
      </View>
    );
  };
  
  export default LoginScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
    },
  });
  
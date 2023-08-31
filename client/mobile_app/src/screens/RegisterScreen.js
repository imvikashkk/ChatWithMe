import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert
} from "react-native";
import React, {useState} from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const navigation = useNavigation();

  const handleRegistration = () =>{
    const user = {
      name,
      email,
      password,
      image,
    }

    axios.post('http://10.0.2.2:8000/api/auth/register', user).then((res)=>{
      console.log(res);
      Alert.alert("Registration Successful", 'You have been registered successfully')
    })
    .catch((err) =>{
        console.log(err);
        Alert.alert("Registration Failure", "An error occured while registering" ,err.message);
    })
    setEmail("");
    setName("");
    setImage('');
    setPassword('');
  }

  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 10,
        alignItems: "center",
        flex: 1,
      }}>

      <KeyboardAvoidingView>

        {/* Title */}
        <View style={{ marginTop: 100 }}>
          <Text
            style={{
              color: "#4A55A2",
              fontSize: 17,
              fontWeight: "600",
              textAlign: "center",
            }}>
            Sign In
          </Text>
          <Text
            style={{
              marginTop: 15,
              fontSize: 17,
              fontWeight: "600",
              textAlign: "center",
            }}>
            Sign In to Your Account
          </Text>
        </View>


        {/* Name */}
        <View style={{ marginTop: 40 }}>
          <Text>Name</Text>
          <TextInput 
               placeholder="Enter your name" 
               placeholderTextColor={"black"}
               style={{borderBottomColor: "black", borderBottomWidth:1, marginVertical:10, width:300, fontSize: name ? 18 : 18}}
               value={name}
               onChangeText={(text)=>setName(text)}
          />
        </View>


       {/* Email */}
        <View style={{ marginTop: 10 }}>
          <Text>Email</Text>
          <TextInput 
               placeholder="enter Your Email" 
               placeholderTextColor={"black"}
               style={{borderBottomColor: "black", borderBottomWidth:1, marginVertical:10, width:300, fontSize: email ? 18 : 18}}
               value={email}
               onChangeText={(text)=>setEmail(text)}
          />
        </View>

            {/* Password */}
        <View style={{ marginTop: 10 }}>
          <Text>Password</Text>
          <TextInput
               secureTextEntry={true}
               placeholder="enter Your Password" 
               placeholderTextColor={"black"}
               style={{borderBottomColor: "black", borderBottomWidth:1, marginVertical:10, width:300, fontSize: password ? 18 : 18}}
               value={password}
               onChangeText={(text)=>setPassword(text)}
          />
        </View>

            {/* Profile Image */}
        <View style={{ marginTop: 10 }}>
          <Text>ProfileImage</Text>
          <TextInput
               placeholder="select Your ProfileImage" 
               placeholderTextColor={"black"}
               style={{borderBottomColor: "black", borderBottomWidth:1, marginVertical:10, width:300, fontSize: email ? 18 : 18}}
               value={image}
               onChangeText={(text)=>setImage(text)}
          />
        </View>

          {/* Register */}
        <Pressable style={{
          width:260, 
          backgroundColor:"#4A55A2", 
          padding:15, 
          marginTop:50,
          marginLeft:"auto",
          marginRight:"auto",
          borderRadius:6
          }}
          onPress={handleRegistration}
          >
            <Text style={{
              color:"white",
              fontSize:16,
              fontWeight:"bold",
              textAlign:"center"
            }}>Register to your Account</Text>
        </Pressable>

            {/* Jump to Login Screen */}
        <Pressable style={{marginTop:15}} 
          onPress={()=>navigation.goBack()}
        >
          <Text style={{textAlign:"center", color:'gray', fontSize:16}}>Already have an Account? Sign In</Text>
        </Pressable>

      </KeyboardAvoidingView>

    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});

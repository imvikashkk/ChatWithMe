import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(()=>{
    const homeNavigate = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          navigation.replace("HomeScreen");
        }
      } catch (error) {
        console.log("Error : " + error);
      }
    }
    homeNavigate();
  },[]);

  const handleLogin = () => {
    const user = {
      email,
      password,
    };

    axios
      .post("http://10.0.2.2:8000/api/auth/login", user)
      .then(async (res) => {
        console.log(res.data);
        Alert.alert(res.data.message);

        if (res.status === 200 && res.data.success === true) {
          await AsyncStorage.setItem("authToken", res.data.token);
          navigation.replace("HomeScreen");
        }
      })
      .catch((err) => {
        console.log(err);
        Alert.alert(
          "Login Failure",
          "An error occured while Login",
          err.message
        );
      });

    setEmail("");
    setPassword("");
  };

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

        {/* Email */}
        <View style={{ marginTop: 50 }}>
          <Text>Email</Text>
          <TextInput
            placeholder="enter Your Email"
            placeholderTextColor={"black"}
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 1,
              marginVertical: 10,
              width: 300,
              fontSize: email ? 18 : 18,
            }}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        {/* Password */}
        <View style={{ marginTop: 20 }}>
          <Text>Password</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="enter Your Password"
            placeholderTextColor={"black"}
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 1,
              marginVertical: 10,
              width: 300,
              fontSize: password ? 18 : 18,
            }}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        {/* Login */}
        <Pressable
          style={{
            width: 200,
            backgroundColor: "#4A55A2",
            padding: 15,
            marginTop: 50,
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: 6,
          }}
          onPress={handleLogin}>
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
            }}>
            Login
          </Text>
        </Pressable>

        {/* Jump To Register Screen */}
        <Pressable
          style={{ marginTop: 15 }}
          onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
            Don't have an account? Sign Up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
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

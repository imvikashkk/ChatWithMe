import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useLayoutEffect, useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import User from "../components/User";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);

  const logOut = async () =>{
    try{
      await AsyncStorage.clear()
      navigation.replace('LoginScreen')
    }catch(err){
      console.log("Error occurred while logout")
    }
  }
  
  /* Header Change */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => {
        return (
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>ChatWithMe</Text>
        );
      },
      headerRight: () => {
        return (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 20,
            }}>
              <Text onPress={()=>logOut()} style={{fontSize:16, fontWeight:"500", color:"black"}}>Logout</Text>
            <Ionicons onPress={()=>navigation.navigate("ChatScreen")} name="chatbox-ellipses-outline" size={24} color="black" />
            <Ionicons onPress={()=>{navigation.navigate('FriendsScreen')}} name="people-outline" size={24} color="black" />
          </View>
        );
      },
    });
  }, []);

  /* API Calling For Users */
  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        const userS = await axios.get("http://10.0.2.2:8000/api/users/user", {
          headers: {
            authkey: token,
          },
        });
        setUsers(userS.data.users);
      }
    })();
  }, []);

  return (
    <View>
      <View style={{ padding: 10 }}>
        {users?.map((item, index) => {
          return <User key={index} item={item} />;
        })}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  separator: {},
});

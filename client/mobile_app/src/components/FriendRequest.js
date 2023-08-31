import { StyleSheet, Text, View, Pressable, Image} from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const FriendRequest = ({ item, users, setUsers }) => {
  const navigation = useNavigation();
  const acceptRequest = () =>{
    (async () => {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        try{
          const userS = await axios.post("http://10.0.2.2:8000/api/friend-request/accept",{userId:item._id} ,{
          headers: {
            authkey: token,
          },
        });
        if(userS?.data?.success === true){
          setUsers(users.filter(user => user !== item));
          navigation.navigate("ChatScreen")
        }
      }catch(err){
        console.log("____________________________",err)
      }
      }
    })();
  }

  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
      }}>
      <Image
        style={{ width: 50, height: 50, borderRadius: 25 }}
        source={{ uri: item.image }}
      />

      <Text
        style={{ fontSize: 15, fontWeight: "bold", marginLeft: 10, flex: 1 }}>
        {item?.name} sent you a friend request!!
      </Text>

      <Pressable
        onPress={() => acceptRequest()}
        style={{ backgroundColor: "#0066b2", padding: 10, borderRadius: 6 }}
      >
        <Text style={{ textAlign: "center", color: "white" }}>Accept</Text>
      </Pressable>

    </Pressable>
  );
};

export default FriendRequest;

const styles = StyleSheet.create({});

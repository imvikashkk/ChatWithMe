import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, {useState, useEffect} from "react";
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";

const User = ({ item}) => {
  const [requestSent, setRequestSent] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const [userFriends, setUserFriends] = useState([]);

  /* Send the friend request */
  const sendFriendRequest = () =>{
    (async () => {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        try{
          const userS = await axios.post("http://10.0.2.2:8000/api/friend-request/send",{userId:item._id} ,{
          headers: {
            authkey: token,
          },
        });
        setRequestSent(true);
      }catch(err){
        console.log("____________________________",err)
      }
      }
    })();
  }

    /* find the sent friend request */
  useEffect(()=>{
    (async () => {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        try{
          const userS = await fetch("http://10.0.2.2:8000/api/friend-request/sent/users",{
          method:"GET",
          headers: {
            authkey:token,
          },
        });

     
        const userData = await userS.json()
        if(userData.success === true) {
          setFriendRequests(userData.friends);
        }else{
          console.log("not a friend request")
        }
      }catch(err){
        console.log("______________Error______________",err)
      }
      }
    })();
  },[])

  /* user friends */
  useEffect(()=>{
    (async ()=>{
      try{
        const token = await AsyncStorage.getItem("authToken");
        const userS = await fetch("http://10.0.2.2:8000/api/user/friendlist",{
          method:"GET",
          headers: {
            authkey: token,
          },
        });
        const userData = await userS.json()
          if(userData.success === true) {
            console.log(userData.friendIds)
            setUserFriends(userData.friendIds)
          }
      }catch(err){
          console.log("error", err)
      }
    })()
  },[])

  return (
    <Pressable
      style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}
    >
      <View>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            resizeMode: "cover",
          }}
          source={{ uri: item.image }}
        />
      </View>

      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={{ fontWeight: "bold" }}>{item?.name}</Text>
        <Text style={{ marginTop: 4, color: "gray" }}>{item?.email}</Text>
      </View>     
      {userFriends.includes(item._id) ? (
        <Pressable
          style={{
            backgroundColor: "#82CD47",
            padding: 10,
            width: 105,
            borderRadius: 6,
          }}
        >
          <Text style={{ textAlign: "center", color: "white" }}>Friends</Text>
        </Pressable>
      ) : requestSent || friendRequests.some((friend) => friend._id === item._id) ? (
        <Pressable
          style={{
            backgroundColor: "gray",
            padding: 10,
            width: 105,
            borderRadius: 6,
          }}
        >
          <Text style={{ textAlign: "center", color: "white", fontSize: 13 }}>
            Request Sent
          </Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => sendFriendRequest()}
          style={{
            backgroundColor: "#567189",
            padding: 10,
            borderRadius: 6,
            width: 105,
          }}
        >
          <Text style={{ textAlign: "center", color: "white", fontSize: 13 }}>
            Add Friend
          </Text>
        </Pressable>
      )}
    </Pressable>
  );
};

export default User;

const styles = StyleSheet.create({});

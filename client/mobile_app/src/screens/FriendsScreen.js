import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState} from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FriendRequest from '../components/FriendRequest'

const FriendsScreen = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        console.log(token)
        const userS = await axios.get("http://10.0.2.2:8000/api/friend-request/requests", {
          headers: {
            authkey: token,
          },
        });
        if(userS.data.success === true){
          setUsers(userS.data.friendRequest)
        }
      } catch (e) {
        console.log("error", e);
      }
    }
    )();
  },[])

  console.log(users)
  return (
    <View style={{padding:10, marginHorizontal:12}}>
       {users.length > 0 && <Text>Your Friend Requests!</Text>}
       {users?.map((item, index)=>{
          return  <FriendRequest 
              key={index}
              item={item}
              users={users}
              setUsers={setUsers}
            />
       })}
    </View>
  )
}

export default FriendsScreen

const styles = StyleSheet.create({})
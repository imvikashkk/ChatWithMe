import { StyleSheet,ScrollView, Pressable  } from "react-native";
import React ,{useState, useEffect} from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import UserChat from "../components/UserChat"


const ChatScreen = () => {
  const [friends, setFriends] = useState([]);
  const navigation = useNavigation();


  /* API Calling */
  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const userS = await axios.get(
          "http://10.0.2.2:8000/api/user/friends",
          {
            headers: {
              authkey: token,
            },
          }
        );
        if(userS.data.success === true) {
          setFriends(userS.data.user.friends)
        }else{
          console.log("Error at ChatScreen")
        }
      } catch (err) {
        console.log("Error Showing in FriendList");
      }
    })();
  },[]);
  // console.log("friends : ", friends)

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Pressable>
          {friends?.map((item,index) => (
              <UserChat key={index} item={item}/>
          ))}
      </Pressable>
    </ScrollView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});

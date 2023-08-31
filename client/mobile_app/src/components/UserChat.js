import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const UserChat = ({ item }) => {
  const navigation = useNavigation();
  const [lastMessage, setLastMessage] = useState({})


  const fetchChats = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const chats = await axios.get(
        `http://10.0.2.2:8000/api/chat/${item._id}`,
        {
          headers: {
            authkey: token,
          },
        }
      );

      if (chats.data.success) {
        setLastMessage((chats.data.messages)[chats.data.messages.length - 1]);
      } else {
        console.log("Error Occured in ChatMessage API Calling for chats");
      }
    } catch (err) {
      console.log(
        "Error Occured in ChatMessage API Calling : " + err
      );
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);


  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };

  return (
    <Pressable
      onPress={() => navigation.navigate("ChatMessage",
        { recepientId: item._id }
      )}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderWidth: 0.7,
        borderColor: "#D0D0D0",
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        padding: 10,

      }}
    >

      <Image
        style={{ width: 50, height: 50, borderRadius: 25, resizeMode: "cover" }}
        source={{ uri: item?.image }}
      />

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>{item?.name}</Text>
        
     
          {
            lastMessage?.messageType === "text" ? (
              <Text style={{ marginTop: 3, color: "gray", fontWeight: "500" }}>
              {lastMessage?.message}
            </Text>
            ) : (
              <Text style={{ marginTop: 3, color: "gray", fontWeight: "500" }}>
                Image 📸
            </Text>
            )
          }
          
        

      </View>

      <View>
        <Text style={{ fontSize: 11, fontWeight: "400", color: "#585858" }}>
          {lastMessage && formatTime(lastMessage?.timeStamp)}
        </Text>
      </View>

    </Pressable>
  )
}

export default UserChat

const styles = StyleSheet.create({})
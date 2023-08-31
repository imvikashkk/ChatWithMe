import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState, useLayoutEffect, useEffect, useRef} from "react";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import EmojiSelector from "react-native-emoji-selector";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const ChatMessage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const recepientId = route.params.recepientId;
  const [message, setMessage] = useState("");
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [recepientData, setRecepientData] = useState();
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [Chats, setChats] = useState([]);

  const scrollViewRef = useRef(null);

  const scrollToBottom = () => {
    if(scrollViewRef.current){
        scrollViewRef.current.scrollToEnd({animated:false})
    }
}

const handleContentSizeChange = () => {
  scrollToBottom();
}

  /* Emoji Selection */
  const handleEmojiPress = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };

  /* API for Header Detail Recepient Data */
  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const userDetail = await axios.get(
          `http://10.0.2.2:8000/api/header/user/${recepientId}`,
          {
            headers: {
              authkey: token,
            },
          }
        );

        setRecepientData(userDetail.data.userData);
        //  console.log(userDetail.data.userData.image)
      } catch (err) {
        console.log(
          "Error Occured in ChatMessage API Calling For Header : " + err
        );
      }
    })();
  }, []);

  /* API for Fetch chat messages */
  const fetchChats = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const chats = await axios.get(
        `http://10.0.2.2:8000/api/chat/${recepientId}`,
        {
          headers: {
            authkey: token,
          },
        }
      );

      if (chats.data.success) {
        setChats(chats.data.messages);
      } else {
        console.log("Error Occured in ChatMessage API Calling for chats");
      }
    } catch (err) {
      console.log(
        "Error Occured in ChatMessage API Calling For Header : " + err
      );
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  /* API For Send The Message */

  const handleSend = async (messageType, imageUri) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const formData = new FormData();
      formData.append("recepientId", recepientId);

      //if the message type id image or a normal text
      if (messageType === "image") {
        formData.append("messageType", "image");
        formData.append("imageFile", {
          uri: imageUri,
          name: "image.jpg",
          type: "image/jpeg",
        });
      } else {
        formData.append("messageType", "text");
        formData.append("messageText", message);
      }

      const response = await fetch("http://10.0.2.2:8000/api/messages/send", {
        method: "POST",
        body: formData,
        headers: {
          authkey: token,
        },
      });

      fetchChats();
      setMessage("");
    } catch (error) {
      console.log("error in sending the message", error);
    }
  };

  /* Header info */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={24}
            color="black"
          />

          {selectedMessages.length > 0 ? (
            <View>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                {selectedMessages.length}
              </Text>
            </View>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  resizeMode: "cover",
                }}
                source={{ uri: recepientData?.image }}
              />

              <Text style={{ marginLeft: 5, fontSize: 15, fontWeight: "bold" }}>
                {recepientData?.name}
              </Text>
            </View>
          )}
        </View>
      ),
      headerRight: () =>
        selectedMessages.length > 0 ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Ionicons name="md-arrow-redo-sharp" size={24} color="black" />
            <Ionicons name="md-arrow-undo" size={24} color="black" />
            <FontAwesome name="star" size={24} color="black" />
            <MaterialIcons
              onPress={() => deleteMessage(selectedMessages)}
              name="delete"
              size={24}
              color="black"
            />
          </View>
        ) : null,
    });
  }, [recepientData, selectedMessages]);

  /* Time Formatter */
  const formateTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };


  /* Image Picking  */
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result.assets[0].uri);

    if (!result.canceled) {
      console.log(result);
      handleSend("image", result.assets[0].uri);
    }
  };

  /* Handle Image Selection */
  const handleSelectMessage = (message) => {
    // Check if the message is selected
    const isSelected = selectedMessages.includes(message._id)

    if(isSelected) {
      setSelectedMessages((prevSelected)=>prevSelected.filter((id)=> id !== message._id));
    }else{
      setSelectedMessages((prevSelected)=> [...prevSelected, message._id])
    }


  }


  /* Delee Message */
  const deleteMessage = async (messageIds) => {
    const token = await AsyncStorage.getItem("authToken");

    try{
      const response = await fetch("http://10.0.2.2:8000/api/messages/delete", {
        method: "POST",
        body:JSON.stringify({messages:messageIds}),
        headers: {
          "Content-Type":"application/json",
          authkey: token,
        },
      });

      if(response.ok){
        setSelectedMessages([])
        fetchChats()
      }

    }catch(err){
      console.log("Error Ocuured at Deleting The Message", err);
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#F0F0F0" }}>
      <ScrollView ref={scrollViewRef} contentContainerStyle={{flexGrow:1}} onContentSizeChange={handleContentSizeChange}>
        {Chats?.map((chat, index) => {
          if (chat.messageType === "text") {
            const isSelected = selectedMessages.includes(chat._id);
            return (
              <Pressable
                key={index}
                onLongPress={()=>handleSelectMessage(chat)}
                onPress={()=>{
                  if(selectedMessages.length > 0){
                    handleSelectMessage(chat)
                  }
                }}
                style={[
                  chat?.senderId._id !== recepientId
                    ? {
                        alignSelf: "flex-end",
                        backgroundColor: "#DCF8C6",
                        padding: 8,
                        maxWidth: "60%",
                        borderRadius: 7,
                        margin: 10,
                      }
                    : {
                        alignSelf: "flex-start",
                        backgroundColor: "white",
                        padding: 8,
                        maxWidth: "60%",
                        borderRadius: 7,
                        margin: 10,
                      },

                      isSelected && {width:"100%", backgroundColor:"skyblue"}
                ]}>
                <Text style={{ fontSize: 13, textAlign: isSelected ? "right" :"left" }}>
                  {chat?.message}
                </Text>

                <Text
                  style={{
                    textAlign: "right",
                    fontSize: 9,
                    color: "gray",
                    marginTop: 5,
                  }}>
                  {formateTime(chat.timeStamp)}
                </Text>
              </Pressable>
            );
          }

          if (chat.messageType === "image") {

            //! SETUP Here 
            const isSelected = selectedMessages.includes(chat._id);
            const baseUrl =
              "/Users/sujananand/Build/messenger-project/api/files/";
            const imageUrl = chat.imageUrl;
            const filename = imageUrl.split("\\").pop();
            const src = baseUrl + filename;

            //temporary
            const source = { uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"};
            //! SetUp End

            return (
              <Pressable

              onLongPress={()=>handleSelectMessage(chat)}
              onPress={()=>{
                if(selectedMessages.length > 0){
                  handleSelectMessage(chat)
                }}}

                key={index}
                style={[
                  chat?.senderId._id !== recepientId
                    ? {
                        alignSelf: "flex-end",
                        backgroundColor: "#DCF8C6",
                        padding: 8,
                        maxWidth: "60%",
                        borderRadius: 7,
                        margin: 10,
                      }
                    : {
                        alignSelf: "flex-start",
                        backgroundColor: "white",
                        padding: 8,
                        margin: 10,
                        borderRadius: 7,
                        maxWidth: "60%",
                      },

                      isSelected && {width:"100%", backgroundColor:"skyblue"}
                ]}
              >
                <View>
                  <Image
                    source={source}
                    style={{ width: isSelected ? "100%" : 200 , height: 200, borderRadius: 7 }}
                  />
                  <Text
                    style={{
                      textAlign: "right",
                      fontSize: 9,
                      position: "absolute",
                      right: 10,
                      bottom: 7,
                      color: "white",
                      marginTop: 5,
                    }}
                  >
                    {formateTime(chat?.timeStamp)}
                  </Text>
                </View>
              </Pressable>
            );
          }
        })}
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: "#dddddd",
          marginBottom: showEmojiSelector ? 0 : 25,
        }}>
        <Entypo
          onPress={handleEmojiPress}
          style={{ marginRight: 5 }}
          name="emoji-happy"
          size={24}
          color="gray"
        />

        <TextInput
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: "#dddddd",
            borderRadius: 20,
            paddingHorizontal: 10,
          }}
          placeholder="Type Your message..."
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 7,
            marginHorizontal: 8,
          }}>
          <Entypo
            onPress={() => pickImage()}
            name="camera"
            size={24}
            color="gray"
          />
          <Feather name="mic" size={24} color="gray" />
        </View>

        <Pressable
          onPress={() => handleSend("text")}
          style={{
            backgroundColor: "#007bff",
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 20,
          }}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Send</Text>
        </Pressable>
      </View>

      {showEmojiSelector && (
        <EmojiSelector
          onEmojiSelected={(emoji) => {
            setMessage((prevMessage) => prevMessage + emoji);
          }}
          style={{ height: 250 }}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default ChatMessage;

const styles = StyleSheet.create({});

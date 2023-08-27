import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { io } from "socket.io-client";

const baseUrl = "http://192.168.1.8:3001";
const socket = io.connect(baseUrl);

export default function App() {
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState("");
  const [messageList, setMessageList] = useState("");

  const sendMessage = () => {
    // console.log("Sed data : ", { messages, room });
    socket.emit("send_message", { messages, room });
  };

  const joinRoom = () => {
    socket.emit("join_room", room);
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      // console.log(data);
      setMessageList(data.messages);
    });
  }, []);

  console.log("Message List : ", messageList);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            width: "60%",
          }}
          placeholder="Room ID"
          onChangeText={(text) => setRoom(text)}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "blue",
            width: "20%",
            height: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => joinRoom()}
        >
          <Text style={{ color: "white" }}>Send</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            width: "80%",
          }}
          placeholder="Type Message"
          onChangeText={(text) => setMessages(text)}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "blue",
            width: "20%",
            height: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => sendMessage()}
        >
          <Text style={{ color: "white" }}>Send</Text>
        </TouchableOpacity>
      </View>
      <View>
        <ScrollView
          style={{
            backgroundColor: "#ccc",
            height: 300,
            width: "80%",
          }}
        >
          <Text>{messageList}</Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "start",
    padding: 15,
    marginTop: 20,
  },
});

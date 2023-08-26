import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
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
  const [roomID, setRoomID] = useState("");
  const [messages, setMessages] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", { messages, roomID });
  };

  const joinRoom = () => {
    socket.emit("join_room", roomID);
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("Hi");
    });
  }, []);
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
          onChangeText={(text) => setRoomID(text)}
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

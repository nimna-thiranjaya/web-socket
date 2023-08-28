import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const ENDPOINT = "http://192.168.1.8:3001";

var socket, selectedChatCompare;
const Chat = (props) => {
  const [conversationId, setConversationId] = useState("");
  const [messages, setMessages] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const getMessages = async () => {
    await axios
      .get(`/message/${props.route.params.conversationId}`)
      .then((res) => {
        setMessages(res.data.data);
        socket.emit("join_room", props.route.params.conversationId);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  useEffect(() => {
    setConversationId(props.route.params.conversationId);
    getMessages();

    selectedChatCompare = props.route.params.conversationId;
  }, [props.route.params.conversationId]);

  useEffect(() => {
    AsyncStorage.getItem("user").then((res) => {
      setUser(JSON.parse(res));
      // console.log("User Data : ", user);

      socket = io(ENDPOINT);
      socket.emit("setup", res);
      socket.on("connection", () => {
        setSocketConnected(true);
      });

      socket.on("receive_message", (messageReceived) => {
        if (
          messageReceived.conversationId != props.route.params.conversationId
        ) {
          return;
        } else {
          setMessages([...messages, messageReceived]);
        }
      });
    });
  }, []);

  useEffect(() => {});

  const sendMessage = async () => {
    // console.log("Message : ", message);
    if (message == "") {
      alert("Please type message");
      return;
    }

    await axios
      .post("/message/send", {
        conversationId,
        sender: user,
        text: message,
      })
      .then((res) => {
        socket.emit("send_message", res.data.data);
        setMessages([...messages, res.data.data]);
        setMessage("");
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Chat : {conversationId}
      </Text>

      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            width: "70%",
            borderRadius: 10,
            padding: 10,
          }}
          onChangeText={(text) => setMessage(text)}
          placeholder="Type Message"
        />
        <TouchableOpacity
          style={{
            backgroundColor: "blue",
            width: "20%",
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 10,
            borderRadius: 10,
          }}
          onPress={sendMessage}
        >
          <Text style={{ color: "white" }}>Send</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "100%",
          marginTop: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ScrollView
          style={{
            height: "100%",
            width: "90%",
          }}
        >
          {messages.map((message) => (
            <View
              style={{
                borderRadius: 10,
                height: 40,
                width: "100%",
                marginTop: 10,
                justifyContent: "center",
                backgroundColor: message.sender === user ? "blue" : "#ccc",
                padding: 10,
              }}
            >
              <Text
                style={{
                  textAlign: message.sender === user ? "right" : "left",
                  color: message.sender === user ? "white" : "black",
                  fontWeight: "bold",
                }}
              >
                {message.text}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

{
  /*  */
}
export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "start",
    padding: 15,
    marginTop: 50,
    with: "100%",
  },
});

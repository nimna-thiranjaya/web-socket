import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
const messages = [
  {
    _id: "60f3f1b0e6c3a1b4b4f7e0b1",
    message: "Hello",
  },
  {
    _id: "60f3f1b0e6c3a1b4b4f7e0b2",
    message: "Hi",
  },
];

const Chat = (props) => {
  const [conversationId, setConversationId] = useState("");

  useEffect(() => {
    setConversationId(props.route.params.conversationId);
  }, []);

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
            height: 300,
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
                backgroundColor: "#ccc",
                padding: 10,
              }}
            >
              <Text>{message.message}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

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

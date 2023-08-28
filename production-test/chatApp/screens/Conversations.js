import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";

const Conversations = () => {
  const [conversations, setConversations] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getConversation();
  }, []);

  const getConversation = async () => {
    await axios
      .get("/conversation")
      .then((res) => {
        setConversations(res.data.data);
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
        Conversations
      </Text>

      <ScrollView
        style={{
          height: 300,
          width: "90%",
          marginTop: 10,
        }}
      >
        {conversations.map((conversation) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("chat", {
                conversationId: conversation._id,
              });
            }}
          >
            <View
              style={{
                borderRadius: 10,
                height: 40,
                width: "100%",
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ccc",
              }}
              key={conversation._id}
            >
              <Text>{conversation._id}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Conversations;
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

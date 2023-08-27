import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/core";

const conversations = [
  {
    _id: "60f3f1b0e6c3a1b4b4f7e0b1",
  },
  {
    _id: "60f3f1b0e6c3a1b4b4f7e0b2",
  },
];
const Conversations = () => {
  const navigation = useNavigation();

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

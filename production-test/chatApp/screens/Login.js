import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Login = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Login Screen
      </Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          width: "60%",
          borderRadius: 10,
          marginTop: 10,
          padding: 10,
        }}
        placeholder="Username"
      />
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          width: "60%",
          marginTop: 10,
          borderRadius: 10,
          padding: 10,
        }}
        secureTextEntry={true}
        placeholder="Password"
      />

      <TouchableOpacity
        style={{
          backgroundColor: "blue",
          width: "20%",
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
          borderRadius: 10,
        }}
        onPress={() => {
          navigation.navigate("conversation");
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

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

export default Login;

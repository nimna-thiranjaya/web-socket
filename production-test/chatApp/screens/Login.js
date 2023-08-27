import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { AsyncStorage } from "react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const Login = async () => {
    if (username == "" || password == "") {
      alert("Please fill all the fields");
      return;
    }

    await axios
      .post("/user/login", {
        username,
        password,
      })
      .then((res) => {
        // console.log("Login Data : ", res.data.data._id);
        // AsyncStorage.setItem("user", JSON.stringify(res.data.data._id));

        alert(res.data.message);
        navigation.navigate("conversation");
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
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
          width: "90%",
          borderRadius: 10,
          marginTop: 10,
          padding: 10,
        }}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          width: "90%",
          marginTop: 10,
          borderRadius: 10,
          padding: 10,
        }}
        secureTextEntry={true}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
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
        onPress={Login}
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
    marginTop: 50,
  },
});

export default Login;

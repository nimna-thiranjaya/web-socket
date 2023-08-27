import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/Login";
import Conversations from "./screens/Conversations";
import Chat from "./screens/Chat";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="conversation"
          component={Conversations}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="chat"
          component={Chat}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

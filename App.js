import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { Button, StyleSheet, Text, View } from "react-native";

// TAB SCREEN COMPONENTS
const HomeScreen = () => {
  const navigate = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Home</Text>
      <Button
        title="Settings"
        onPress={() => {
          navigate.navigate("Settings", {
            message: "This is a message from Home Screen.",
          });
        }}
      />
      <Button
        title="Profile"
        onPress={() => {
          navigate.navigate("Profile");
        }}
      />
    </View>
  );
};

const SettingsScreen = ({ route }) => {
  const navigate = useNavigation();
  const { message } = route.params || {
    message: "Default message in Setting Screen.",
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Settings</Text>
      <Text>{message}</Text>
      <Button
        title="Home"
        onPress={() => {
          navigate.navigate("Home");
        }}
      />
      <Button
        title="Profile"
        onPress={() => {
          navigate.navigate("Profile");
        }}
      />
    </View>
  );
};

const ProfileScreen = () => {
  const navigate = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Profile</Text>
      <Button
        title="Home"
        onPress={() => {
          navigate.navigate("Home");
        }}
      />
      <Button
        title="Settings"
        onPress={() => {
          navigate.navigate("Settings", {
            message: "This is a message from Profile Screen.",
          });
        }}
      />
    </View>
  );
};

// DRAWER SCREEN COMPONENTS
const Feed = () => {
  const navigate = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Feed</Text>
      <Button
        title="Article"
        onPress={() => {
          navigate.navigate("Article", {
            message: "This is a message from Feed Screen.",
          });
        }}
      />
    </View>
  );
};

const Article = ({ route }) => {
  const navigate = useNavigation();
  const { message } = route.params || {
    message: "This is an article.",
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Article</Text>
      <Text>{message}</Text>
      <Button
        title="Feed"
        onPress={() => {
          navigate.navigate("Feed");
        }}
      />
    </View>
  );
};

// CREATE TAB NAVIGATION
const Tab = createBottomTabNavigator();

const TabNavigator = ({ route }) => {
  const currentScreen = route.name || "Home";

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size }) => {
          const iconSize = 24;
          if (route.name === "Home") {
            return (
              <AntDesign name="home" size={iconSize} color={color} />
            );
          } else if (route.name === "Settings") {
            return (
              <Feather
                name="settings"
                size={iconSize}
                color={color}
              />
            );
          } else if (route.name === "Profile") {
            return (
              <AntDesign name="user" size={iconSize} color={color} />
            );
          }
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={
          currentScreen === "Feed"
            ? Feed
            : currentScreen === "Article"
            ? Article
            : HomeScreen
        }
      />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// CREATE STACK NAVIGATOR
const Stack = createStackNavigator();

// CREATE DRAWER NAVIGATION
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home">
        {(props) => <TabNavigator {...props} />}
      </Drawer.Screen>
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Article" component={Article} />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="All Tabs"
          component={DrawerNavigator}
          options={{ headerShown: false }} // HIDE DEFAULT STACK HEADER
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { colorTokens } from "@tamagui/themes";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "tamagui";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorTokens.light.blue.blue10,
        tabBarStyle: {
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          position: "absolute",
          borderTopWidth: 0,
          elevation: 0,
          height: 55,
        },
        tabBarIconStyle: {
          marginBottom: 8,
        },
        tabBarShowLabel: false,
      }}
      tabBar={(props) => (
        <View>
          <BottomTabBar {...props} />
        </View>
      )}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={26} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="voice"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="keyboard-voice" size={26} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MenuScreen from "../screens/MenuScreen"; // Verifique o caminho dos arquivos
import CriarCanhotosScreen from "../screens/CriarCanhotosScreen"; // Verifique o caminho dos arquivos
import HistoricoCanhotosScreen from "../screens/HistoricoCanhotosScreen"; // Verifique o caminho dos arquivos
import FotosScreen from "../screens/FotosScreen"; // Verifique o caminho dos arquivos
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Menu"
          component={MenuScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Embarques"
          component={CriarCanhotosScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="document-text-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Histórico"
          component={HistoricoCanhotosScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="time-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Fotos"
          component={FotosScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="image-outline" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

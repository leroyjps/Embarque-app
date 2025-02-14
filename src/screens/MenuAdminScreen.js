import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function MenuAdminScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu Admin</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Embarques")}
      >
        <Text style={styles.buttonText}>Embarques</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Histórico")}
      >
        <Text style={styles.buttonText}>Histórico Canhotos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Fotos")}
      >
        <Text style={styles.buttonText}>Fotos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

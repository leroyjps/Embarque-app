import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

export default function MenuScreen({ navigation }) {
  return (
    <ImageBackground
      source={{
        uri: "https://drive.google.com/uc?export=view&id=1V5LUPAvvbbqHVmrIMGvL4D424IJ68VKg", // Link para imagem corrigido
      }}
      style={styles.container}
    >
      <Text style={styles.title}>Menu</Text>

      <View style={styles.menuContainer}>
        <View style={styles.buttonContainer}>
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
      </View>

      <TouchableOpacity
        style={styles.exitButton}
        onPress={() => {
          signOut(auth)
            .then(() => navigation.replace("Login")) // Certifique-se de que a tela "Login" existe
            .catch((error) => console.error("Erro ao sair:", error));
        }}
      >
        <Text style={styles.exitButtonText}>Sair</Text>
      </TouchableOpacity>
    </ImageBackground>
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
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#fff",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  menuContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#007bff",
    borderRadius: 15,
    marginBottom: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  button: {
    width: 150,
    height: 150,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "blue",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  exitButton: {
    marginTop: 30,
    width: 150,
    height: 50,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  exitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

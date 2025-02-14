import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { db } from "../config/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function CriarCanhotosScreen() {
  const [notaFiscal, setNotaFiscal] = useState("");
  const [cliente, setCliente] = useState("");
  const [transportadora, setTransportadora] = useState("");
  const [volumes, setVolumes] = useState("");
  const [nomeOperador, setNomeOperador] = useState("");
  const [placaVeiculo, setPlacaVeiculo] = useState("");
  const [fotos, setFotos] = useState([]);

  const escolherFotos = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Autorize o acesso à galeria.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setFotos([...fotos, result.assets[0].uri]);
    }
  };

  const abrirCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Autorize o acesso à câmera.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setFotos([...fotos, result.assets[0].uri]);
    }
  };

  const removerFoto = (index) => {
    setFotos(fotos.filter((_, i) => i !== index));
  };

  const adicionarCanhoto = async () => {
    if (
      !notaFiscal ||
      !cliente ||
      !transportadora ||
      !volumes ||
      !nomeOperador ||
      !placaVeiculo
    ) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    try {
      const canhotoData = {
        notaFiscal,
        cliente,
        transportadora,
        volumes,
        nomeOperador,
        placaVeiculo,
        fotos,
        dataCriacao: new Date().toISOString(),
      };

      await addDoc(collection(db, "canhotos"), canhotoData);
      setNotaFiscal("");
      setCliente("");
      setTransportadora("");
      setVolumes("");
      setNomeOperador("");
      setPlacaVeiculo("");
      setFotos([]);

      Alert.alert("Sucesso", "Canhoto criado com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao salvar o canhoto.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        style={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Criar Canhoto</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nota Fiscal"
            placeholderTextColor="#666"
            value={notaFiscal}
            onChangeText={setNotaFiscal}
          />
          <TextInput
            style={styles.input}
            placeholder="Cliente"
            placeholderTextColor="#666"
            value={cliente}
            onChangeText={setCliente}
          />
          <TextInput
            style={styles.input}
            placeholder="Transportadora"
            placeholderTextColor="#666"
            value={transportadora}
            onChangeText={setTransportadora}
          />
          <TextInput
            style={styles.input}
            placeholder="Volumes"
            placeholderTextColor="#666"
            value={volumes}
            onChangeText={setVolumes}
          />
          <TextInput
            style={styles.input}
            placeholder="Nome do Operador"
            placeholderTextColor="#666"
            value={nomeOperador}
            onChangeText={setNomeOperador}
          />
          <TextInput
            style={styles.input}
            placeholder="Placa do Veículo"
            placeholderTextColor="#666"
            value={placaVeiculo}
            onChangeText={setPlacaVeiculo}
          />
        </View>

        <View style={styles.fotosContainer}>
          {fotos.map((foto, index) => (
            <View key={index} style={styles.fotoContainer}>
              <Image source={{ uri: foto }} style={styles.foto} />
              <TouchableOpacity
                style={styles.removeFotoButton}
                onPress={() => removerFoto(index)}
              >
                <Text style={styles.removeFotoButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={escolherFotos}>
          <Text style={styles.buttonText}>Escolher da Galeria</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={abrirCamera}>
          <Text style={styles.buttonText}>Tirar Foto</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSubmit}
          onPress={adicionarCanhoto}
        >
          <Text style={styles.buttonSubmitText}>Salvar Canhoto</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
    color: "#007bff",
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#333",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonSubmit: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonSubmitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  fotosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  fotoContainer: {
    position: "relative",
    marginRight: 10,
    marginBottom: 10,
  },
  foto: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  removeFotoButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 5,
    borderRadius: 10,
  },
  removeFotoButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

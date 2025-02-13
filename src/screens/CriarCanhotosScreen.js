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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { db } from "../config/firebaseConfig"; // Importe o Firebase configurado
import { collection, addDoc } from "firebase/firestore"; // Funções para Firestore

export default function CriarCanhotosScreen() {
  const [notaFiscal, setNotaFiscal] = useState("");
  const [cliente, setCliente] = useState("");
  const [transportadora, setTransportadora] = useState("");
  const [volumes, setVolumes] = useState("");
  const [nomeOperador, setNomeOperador] = useState("");
  const [placaVeiculo, setPlacaVeiculo] = useState("");
  const [fotos, setFotos] = useState([]);

  // Função para escolher imagem da galeria
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

  // Função para tirar foto com a câmera
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

  // Função para remover foto
  const removerFoto = (index) => {
    const newFotos = fotos.filter((_, i) => i !== index);
    setFotos(newFotos);
  };

  // Função para adicionar canhoto no Firestore
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
      // Dados do canhoto
      const canhotoData = {
        notaFiscal,
        cliente,
        transportadora,
        volumes,
        nomeOperador,
        placaVeiculo,
        fotos,
        dataCriacao: new Date().toISOString(), // Data de criação
      };

      // Adicionando dados ao Firestore
      const docRef = await addDoc(collection(db, "canhotos"), canhotoData);
      console.log("Canhoto adicionado com ID: ", docRef.id);

      // Limpar campos após salvar
      setNotaFiscal("");
      setCliente("");
      setTransportadora("");
      setVolumes("");
      setNomeOperador("");
      setPlacaVeiculo("");
      setFotos([]);

      Alert.alert("Sucesso", "Canhoto criado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar canhoto: ", error);
      Alert.alert("Erro", "Ocorreu um erro ao salvar o canhoto.");
    }
  };

  // Função de envio do formulário
  const enviarFormulario = () => {
    adicionarCanhoto(); // Chama a função para salvar no Firestore
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Criar Canhoto</Text>

      <TextInput
        style={styles.input}
        placeholder="Nota Fiscal"
        value={notaFiscal}
        onChangeText={setNotaFiscal}
      />
      <TextInput
        style={styles.input}
        placeholder="Cliente"
        value={cliente}
        onChangeText={setCliente}
      />
      <TextInput
        style={styles.input}
        placeholder="Transportadora"
        value={transportadora}
        onChangeText={setTransportadora}
      />
      <TextInput
        style={styles.input}
        placeholder="Volumes"
        value={volumes}
        onChangeText={setVolumes}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome do Operador"
        value={nomeOperador}
        onChangeText={setNomeOperador}
      />
      <TextInput
        style={styles.input}
        placeholder="Placa do Veículo"
        value={placaVeiculo}
        onChangeText={setPlacaVeiculo}
      />

      {/* Exibir fotos anexadas */}
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

      {/* Botões de anexar foto */}
      <TouchableOpacity style={styles.button} onPress={escolherFotos}>
        <Text style={styles.buttonText}>Escolher da Galeria</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={abrirCamera}>
        <Text style={styles.buttonText}>Tirar Foto</Text>
      </TouchableOpacity>

      {/* Botão de envio */}
      <TouchableOpacity style={styles.buttonSubmit} onPress={enviarFormulario}>
        <Text style={styles.buttonSubmitText}>Salvar Canhoto</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#007bff",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 40,
    marginBottom: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonSubmit: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 40,
    marginBottom: 20,
    alignItems: "center",
  },
  buttonSubmitText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  fotosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
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
    top: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 5,
    borderRadius: 10,
  },
  removeFotoButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

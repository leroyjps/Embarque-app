import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { db } from "../config/firebaseConfig"; // Importando a configuração do Firebase
import { collection, getDocs } from "firebase/firestore";

export default function HistoricoCanhotosScreen({ navigation }) {
  const [canhotos, setCanhotos] = useState([]); // Estado para armazenar os canhotos

  // Função para buscar os canhotos do Firebase
  const fetchCanhotos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "canhotos"));
      const canhotosList = [];
      querySnapshot.forEach((doc) => {
        canhotosList.push({ id: doc.id, ...doc.data() });
      });
      setCanhotos(canhotosList);
    } catch (error) {
      console.error("Erro ao buscar os canhotos: ", error);
    }
  };

  useEffect(() => {
    fetchCanhotos(); // Carrega os canhotos ao iniciar a tela
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Canhotos</Text>

      {/* Renderizando a lista de canhotos */}
      <FlatList
        data={canhotos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.canhotoContainer}>
            <Text style={styles.canhotoText}>
              <Text style={styles.bold}>ID: </Text>
              {item.id}
            </Text>
            <Text style={styles.canhotoText}>
              <Text style={styles.bold}>Cliente: </Text>
              {item.cliente}
            </Text>
            <Text style={styles.canhotoText}>
              <Text style={styles.bold}>Transportadora: </Text>
              {item.transportadora}
            </Text>
            <Text style={styles.canhotoText}>
              <Text style={styles.bold}>Volumes: </Text>
              {item.volumes}
            </Text>
            <Text style={styles.canhotoText}>
              <Text style={styles.bold}>Data: </Text>
              {item.dataCriacao}
            </Text>
            {/* Botão para visualizar detalhes */}
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() =>
                navigation.navigate("DetalhesCanhoto", { canhotoId: item.id })
              }
            >
              <Text style={styles.buttonText}>Ver Detalhes</Text>
            </TouchableOpacity>
          </View>
        )}
      />
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
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  canhotoContainer: {
    width: "100%",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  canhotoText: {
    fontSize: 16,
    marginVertical: 5,
  },
  bold: {
    fontWeight: "bold",
  },
  detailsButton: {
    marginTop: 10,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import { db, auth } from "../config/firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function HistoricoCanhotosScreen({ navigation }) {
  const [canhotos, setCanhotos] = useState([]);
  const [expandedCanhotoId, setExpandedCanhotoId] = useState(null);
  const [userRole, setUserRole] = useState("user");

  useEffect(() => {
    const fetchCanhotos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "canhotos"));
        const canhotosList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCanhotos(canhotosList);
      } catch (error) {
        console.error("Erro ao buscar os canhotos: ", error);
      }
    };

    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        setUserRole(userDoc.data().role);
      }
    };

    fetchCanhotos();
    fetchUserRole();
  }, []);

  const toggleExpand = (id) => {
    setExpandedCanhotoId(expandedCanhotoId === id ? null : id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "canhotos", id));
      setCanhotos(canhotos.filter((canhoto) => canhoto.id !== id));
      Alert.alert("Sucesso", "Canhoto excluído com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao excluir o canhoto.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Canhotos</Text>

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
              {new Date(item.dataCriacao).toLocaleDateString()}
            </Text>

            {userRole === "admin" && (
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.deleteButtonText}>Excluir</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => toggleExpand(item.id)}
            >
              <Text style={styles.buttonText}>
                {expandedCanhotoId === item.id
                  ? "Fechar Detalhes"
                  : "Ver Detalhes"}
              </Text>
            </TouchableOpacity>

            {expandedCanhotoId === item.id && (
              <View style={styles.detailsContainer}>
                <Text style={styles.detailText}>
                  <Text style={styles.bold}>Endereço: </Text>
                  {item.endereco}
                </Text>
                <Text style={styles.detailText}>
                  <Text style={styles.bold}>Contato: </Text>
                  {item.contato}
                </Text>
                <Text style={styles.detailText}>
                  <Text style={styles.bold}>Observações: </Text>
                  {item.observacoes}
                </Text>
              </View>
            )}
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
  detailsContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  detailText: {
    fontSize: 14,
    marginVertical: 3,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

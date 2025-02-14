import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { db } from "../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function FotosScreen() {
  const [canhotos, setCanhotos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchCanhotos = async () => {
      const querySnapshot = await getDocs(collection(db, "canhotos"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCanhotos(data);
    };
    fetchCanhotos();
  }, []);

  // Função para tentar carregar a imagem e alternar para uma versão JPEG se necessário
  const getImageUri = (uri) => {
    if (uri.endsWith(".HEIC")) {
      return uri.replace(".HEIC", ".jpg");
    }
    return uri;
  };

  const openImage = (imageUri) => {
    setSelectedImage(getImageUri(imageUri)); // Corrige HEIC
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={styles.canhotoContainer}>
      <Text style={styles.dateText}>
        {new Date(item.dataCriacao).toLocaleDateString()}
      </Text>
      <FlatList
        data={item.fotos}
        keyExtractor={(uri, index) => index.toString()}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openImage(item)}>
            <Image source={{ uri: getImageUri(item) }} style={styles.image} />
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={canhotos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      {/* Modal para exibir a imagem em tela cheia */}
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={styles.fullScreenImage}
            />
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  canhotoContainer: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  image: {
    width: 100,
    height: 100,
    margin: 2,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenImage: {
    width: "90%",
    height: "80%",
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

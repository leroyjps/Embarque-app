import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { db } from "../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function FotosScreen() {
  const [canhotos, setCanhotos] = useState([]);

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
          <Image source={{ uri: item }} style={styles.image} />
        )}
      />
    </View>
  );

  return (
    <FlatList
      data={canhotos}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
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
});
